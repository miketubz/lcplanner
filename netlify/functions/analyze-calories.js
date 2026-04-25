exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server is missing OPENAI_API_KEY." })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const imageDataUrl = typeof body.imageDataUrl === "string" ? body.imageDataUrl : "";

    if (!imageDataUrl.startsWith("data:image/")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please upload a valid image." })
      };
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
            content: [
              {
                type: "input_text",
                text: "Estimate total calories for the food in this photo. Return strict JSON only with keys: totalCalories (number), confidence (0 to 1), items (array of strings), notes (string). Keep notes brief."
              },
              {
                type: "input_image",
                image_url: imageDataUrl
              }
            ]
          }
        ],
        temperature: 0.2,
        max_output_tokens: 220
      })
    });

    if (!response.ok) {
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
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Could not parse calorie estimate from AI response." })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        totalCalories: Math.max(0, Math.round(Number(parsed.totalCalories))),
        confidence: Number.isFinite(Number(parsed.confidence)) ? Number(parsed.confidence) : 0,
        items: Array.isArray(parsed.items) ? parsed.items.slice(0, 10).map((v) => String(v)) : [],
        notes: typeof parsed.notes === "string" ? parsed.notes : ""
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unexpected server error.", detail: error.message })
    };
  }
};
