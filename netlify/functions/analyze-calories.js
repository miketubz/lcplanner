const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";
const USDA_API_KEY = process.env.USDA_API_KEY || "DEMO_KEY";

function getQuantityMultiplier(text) {
  const normalized = String(text || "").toLowerCase();
  const match = normalized.match(/(\d+(?:\.\d+)?)\s*(cup|cups|slice|slices|piece|pieces|serving|servings|can|cans|bottle|bottles|tbsp|tsp)/);
  if (match) {
    const value = Number(match[1]);
    return Number.isFinite(value) && value > 0 ? value : 1;
  }
  if (normalized.includes("half") || normalized.includes("1/2")) {
    return 0.5;
  }
  return 1;
}

function extractEnergyKcal(food) {
  if (food && food.labelNutrients && food.labelNutrients.calories && Number.isFinite(Number(food.labelNutrients.calories.value))) {
    return Number(food.labelNutrients.calories.value);
  }

  const nutrients = food && Array.isArray(food.foodNutrients) ? food.foodNutrients : [];
  const energy = nutrients.find((nutrient) => {
    const name = String(nutrient.nutrientName || "").toLowerCase();
    const unit = String(nutrient.unitName || "").toUpperCase();
    return name.includes("energy") && unit.includes("KCAL") && Number.isFinite(Number(nutrient.value));
  });
  return energy ? Number(energy.value) : null;
}

async function estimateFromUsda(manualItems) {
  let totalCalories = 0;
  let matchedCount = 0;

  for (const item of manualItems) {
    const response = await fetch(`${USDA_API_URL}?api_key=${encodeURIComponent(USDA_API_KEY)}&query=${encodeURIComponent(item)}&pageSize=1`);
    if (!response.ok) {
      continue;
    }
    const payload = await response.json();
    const food = payload && Array.isArray(payload.foods) ? payload.foods[0] : null;
    if (!food) {
      continue;
    }
    const kcal = extractEnergyKcal(food);
    if (!Number.isFinite(kcal)) {
      continue;
    }

    const estimatedItemCalories = Math.max(0, Math.round(kcal * getQuantityMultiplier(item)));
    totalCalories += estimatedItemCalories;
    matchedCount += 1;
  }

  if (matchedCount === 0) {
    return null;
  }

  const confidence = Math.max(0.15, Math.min(0.8, matchedCount / Math.max(1, manualItems.length)));
  return {
    totalCalories: Math.max(1, Math.round(totalCalories)),
    estimatedCalories: Math.max(1, Math.round(totalCalories)),
    confidence,
    items: manualItems,
    notes: "Estimated using online USDA food database fallback."
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  let imageDataUrl = "";
  let manualItems = [];
  try {
    const body = JSON.parse(event.body || "{}");
    imageDataUrl = typeof body.imageDataUrl === "string" ? body.imageDataUrl : "";
    manualItems = Array.isArray(body.manualItems)
      ? body.manualItems.map((item) => String(item).trim()).filter(Boolean).slice(0, 10)
      : [];
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON request body." })
    };
  }

  if (!imageDataUrl.startsWith("data:image/") && !manualItems.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Please upload a valid image or provide manualItems." })
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    if (manualItems.length) {
      try {
        const usdaEstimate = await estimateFromUsda(manualItems);
        if (usdaEstimate) {
          return { statusCode: 200, body: JSON.stringify(usdaEstimate) };
        }
      } catch {
        // Continue to error response below.
      }
    }
    return {
      statusCode: 503,
      body: JSON.stringify({ error: "Photo analysis is unavailable right now. Add food items manually below." })
    };
  }

  try {
    const modePrompt = manualItems.length
      ? `Estimate total calories for these food items: ${manualItems.join(", ")}. Return strict JSON only with keys: totalCalories (number), confidence (0 to 1), items (array of strings), notes (string). Keep notes brief.`
      : "Estimate total calories for the food in this photo. Return strict JSON only with keys: totalCalories (number), confidence (0 to 1), items (array of strings), notes (string). Keep notes brief.";

    const content = [
      {
        type: "input_text",
        text: modePrompt
      }
    ];
    if (imageDataUrl.startsWith("data:image/")) {
      content.push({
        type: "input_image",
        image_url: imageDataUrl
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content
          }
        ],
        temperature: 0.2,
        max_output_tokens: 220
      })
    });

    if (!response.ok) {
      if (manualItems.length) {
        const usdaEstimate = await estimateFromUsda(manualItems);
        if (usdaEstimate) {
          return { statusCode: 200, body: JSON.stringify(usdaEstimate) };
        }
      }

      const errorText = await response.text();
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "AI analysis failed.", detail: errorText.slice(0, 500) })
      };
    }

    const payload = await response.json();
    let rawText = payload.output_text;

    if (!rawText && Array.isArray(payload.output)) {
      rawText = payload.output
        .flatMap((item) => (Array.isArray(item.content) ? item.content : []))
        .map((part) => part.text)
        .filter(Boolean)
        .join("\n");
    }

    if (!rawText) {
      if (manualItems.length) {
        const usdaEstimate = await estimateFromUsda(manualItems);
        if (usdaEstimate) {
          return { statusCode: 200, body: JSON.stringify(usdaEstimate) };
        }
      }
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "No analysis content returned from AI." })
      };
    }

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    }

    if (!parsed || !Number.isFinite(Number(parsed.totalCalories))) {
      if (manualItems.length) {
        const usdaEstimate = await estimateFromUsda(manualItems);
        if (usdaEstimate) {
          return { statusCode: 200, body: JSON.stringify(usdaEstimate) };
        }
      }
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Could not parse calorie estimate from AI response." })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        totalCalories: Math.max(0, Math.round(Number(parsed.totalCalories))),
        estimatedCalories: Math.max(0, Math.round(Number(parsed.totalCalories))),
        confidence: Number.isFinite(Number(parsed.confidence)) ? Number(parsed.confidence) : 0,
        items: Array.isArray(parsed.items) ? parsed.items.slice(0, 10).map((v) => String(v)) : manualItems,
        notes: typeof parsed.notes === "string" ? parsed.notes : ""
      })
    };
  } catch (error) {
    if (manualItems.length) {
      try {
        const usdaEstimate = await estimateFromUsda(manualItems);
        if (usdaEstimate) {
          return { statusCode: 200, body: JSON.stringify(usdaEstimate) };
        }
      } catch {
        // Fall through to error response.
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unexpected server error.", detail: error.message })
    };
  }
};
