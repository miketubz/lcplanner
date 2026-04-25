const DEFAULT_DAILY_CALORIE_TARGET = 1600;

const COUNTRY_BASE_TARGETS = {
  US: 2000,
  UK: 1900,
  Philippines: 1800,
  Japan: 1800,
  Korean: 1900,
  China: 1850,
  India: 1850,
  Mediterranean: 1850,
  Australia: 2000,
  Canada: 1950
};

const GOAL_ADJUSTMENTS = {
  "Lose weight": -300,
  Maintain: 0,
  "Gain muscle": 300
};

const FREE_CUISINE_COUNTRIES = new Set(["Philippines", "Korean", "US", "UK"]);

const COUNTRY_DISPLAY_NAMES = {
  US: "United States",
  UK: "United Kingdom"
};

const COUNTRY_CALORIE_PROFILES = {
  US: { Breakfast: 420, Lunch: 560, Dinner: 680 },
  UK: { Breakfast: 390, Lunch: 530, Dinner: 650 },
  Philippines: { Breakfast: 400, Lunch: 550, Dinner: 650 },
  Japan: { Breakfast: 370, Lunch: 520, Dinner: 620 },
  Korean: { Breakfast: 390, Lunch: 540, Dinner: 650 },
  China: { Breakfast: 380, Lunch: 530, Dinner: 640 },
  India: { Breakfast: 390, Lunch: 540, Dinner: 640 },
  Mediterranean: { Breakfast: 380, Lunch: 520, Dinner: 630 },
  Australia: { Breakfast: 410, Lunch: 560, Dinner: 670 },
  Canada: { Breakfast: 400, Lunch: 550, Dinner: 660 }
};

const PORTION_BY_MEAL = {
  Breakfast: "1 plate / 1 bowl",
  Lunch: "1.5 cups main + 1 cup vegetables",
  Dinner: "1.5 cups main + 1 cup vegetables"
};

const GROCERY_CATEGORIES = {
  Protein: [
    "chicken", "beef", "pork", "salmon", "tuna", "shrimp", "fish", "bangus",
    "liempo", "kippers", "mackerel", "longganisa", "egg", "eggs", "tofu", "tokwa", "cheese", "yogurt"
  ],
  Vegetables: [
    "avocado", "asparagus", "broccoli", "spinach", "mushroom", "mushrooms", "zucchini", "cabbage",
    "cauliflower", "tomato", "tomatoes", "cucumber", "bell pepper", "peppers", "green beans", "kangkong",
    "pechay", "ampalaya", "radish", "papaya", "chili leaves", "malunggay", "eggplant", "talong",
    "leek", "courgettes", "greens"
  ],
  "Pantry and Extras": [
    "almond", "almonds", "chia", "pickle", "pickles", "mayo", "cream cheese", "horseradish",
    "butter", "garlic", "sugar-free syrup"
  ]
};

const MEAL_PLANS = {
  US: {
    Monday: {
      Breakfast: "Veggie omelet with cheddar and avocado",
      Lunch: "Grilled chicken Caesar salad (no croutons)",
      Dinner: "Baked salmon with roasted asparagus"
    },
    Tuesday: {
      Breakfast: "Greek yogurt with walnuts and chia",
      Lunch: "Turkey lettuce wraps with cucumber",
      Dinner: "Beef stir-fry with broccoli and bell peppers"
    },
    Wednesday: {
      Breakfast: "Scrambled eggs with spinach and mushrooms",
      Lunch: "Tuna salad stuffed in avocado",
      Dinner: "Pork chops with sauteed green beans"
    },
    Thursday: {
      Breakfast: "Cottage cheese bowl with almonds",
      Lunch: "Bunless cheeseburger with side salad",
      Dinner: "Lemon herb chicken thighs with zucchini"
    },
    Friday: {
      Breakfast: "Smoked salmon and cream cheese roll-ups",
      Lunch: "Cobb salad with egg, bacon, and chicken",
      Dinner: "Shrimp scampi over zucchini noodles"
    },
    Saturday: {
      Breakfast: "Egg muffins with turkey and peppers",
      Lunch: "Chicken salad lettuce boats",
      Dinner: "Steak with garlic butter mushrooms"
    },
    Sunday: {
      Breakfast: "Almond flour pancakes with sugar-free syrup",
      Lunch: "Buffalo chicken salad",
      Dinner: "Roast chicken with cauliflower mash"
    }
  },
  UK: {
    Monday: {
      Breakfast: "Full low-carb fry-up (eggs, bacon, mushrooms, tomato)",
      Lunch: "Coronation chicken salad",
      Dinner: "Roast cod with buttered cabbage"
    },
    Tuesday: {
      Breakfast: "Poached eggs with smoked mackerel",
      Lunch: "Ploughman-style ham, cheese, pickles, and salad",
      Dinner: "Lamb chops with minted courgettes"
    },
    Wednesday: {
      Breakfast: "Greek yogurt with hazelnuts",
      Lunch: "Egg mayo lettuce cups",
      Dinner: "Chicken tikka with cauliflower rice"
    },
    Thursday: {
      Breakfast: "Cheese omelet with spinach",
      Lunch: "Prawn and avocado salad",
      Dinner: "Bangers (high-meat sausages) with buttery greens"
    },
    Friday: {
      Breakfast: "Kippers with scrambled eggs",
      Lunch: "Roast beef salad with horseradish mayo",
      Dinner: "Fish pie topping replaced with cauliflower mash"
    },
    Saturday: {
      Breakfast: "Chia pudding with unsweetened almond milk",
      Lunch: "Chicken and leek soup (no potato)",
      Dinner: "Shepherd's pie with cauliflower topping"
    },
    Sunday: {
      Breakfast: "Bacon and eggs with grilled tomato",
      Lunch: "Cheese and pickle salad plate",
      Dinner: "Sunday roast beef with broccoli and cauliflower"
    }
  },
  Philippines: {
    Monday: {
      Breakfast: "Tortang talong with tomato and cucumber",
      Lunch: "Inihaw na manok with ensaladang talong",
      Dinner: "Sinigang na salmon with radish and kangkong"
    },
    Tuesday: {
      Breakfast: "Longganisa-style chicken sausage with eggs",
      Lunch: "Adobong manok with sauteed pechay",
      Dinner: "Pork giniling with cabbage and green beans"
    },
    Wednesday: {
      Breakfast: "Tokwa and egg scramble",
      Lunch: "Ginisang ampalaya with ground pork",
      Dinner: "Inihaw na liempo with atchara and salad"
    },
    Thursday: {
      Breakfast: "Daing na bangus with salted egg and tomato",
      Lunch: "Chicken afritada without potato, extra bell pepper",
      Dinner: "Beef nilaga without corn and potato"
    },
    Friday: {
      Breakfast: "Omelet with malunggay and cheese",
      Lunch: "Bicol express with steamed pechay",
      Dinner: "Tinolang manok with papaya and chili leaves"
    },
    Saturday: {
      Breakfast: "Sardines with egg and sauteed onion",
      Lunch: "Pork adobo with kangkong",
      Dinner: "Grilled tuna belly with cucumber salad"
    },
    Sunday: {
      Breakfast: "Arroz caldo-style chicken soup using cauliflower rice",
      Lunch: "Lumpiang sariwa filling bowl (no wrapper)",
      Dinner: "Lechon kawali with chopped atchara and greens"
    }
  },
  Japan: {
    Monday: {
      Breakfast: "Tamago omelet with sauteed spinach",
      Lunch: "Teriyaki salmon salad bowl (no rice)",
      Dinner: "Shabu-shabu style beef and napa cabbage"
    },
    Tuesday: {
      Breakfast: "Miso soup with tofu and egg",
      Lunch: "Chicken yakitori with cucumber sesame salad",
      Dinner: "Saba mackerel with grilled eggplant"
    },
    Wednesday: {
      Breakfast: "Avocado natto bowl with soft-boiled egg",
      Lunch: "Tuna sashimi salad with nori strips",
      Dinner: "Ginger pork with shredded cabbage"
    },
    Thursday: {
      Breakfast: "Chawanmushi with mushrooms",
      Lunch: "Chicken katsu-style cutlet (almond crust) with greens",
      Dinner: "Miso cod with bok choy"
    },
    Friday: {
      Breakfast: "Tofu scramble with scallions",
      Lunch: "Beef tataki salad with ponzu",
      Dinner: "Shrimp and vegetable stir-fry"
    },
    Saturday: {
      Breakfast: "Egg roll with spinach and cheese",
      Lunch: "Pork tonjiru (no potato)",
      Dinner: "Grilled yellowtail with daikon salad"
    },
    Sunday: {
      Breakfast: "Miso egg drop soup",
      Lunch: "Chicken tsukune lettuce wraps",
      Dinner: "Sukiyaki-style beef with tofu and mushrooms (no noodles)"
    }
  },
  Korean: {
    Monday: {
      Breakfast: "Gyeran mari (Korean egg roll) with kimchi",
      Lunch: "Dak bulgogi lettuce wraps",
      Dinner: "Samgyeopsal with ssam greens and ssamjang"
    },
    Tuesday: {
      Breakfast: "Doenjang soup with tofu",
      Lunch: "Spicy pork stir-fry with cabbage",
      Dinner: "Grilled mackerel with spinach banchan"
    },
    Wednesday: {
      Breakfast: "Steamed eggs with mushrooms",
      Lunch: "Bibimbap-style bowl over cauliflower rice",
      Dinner: "Galbi beef with grilled zucchini"
    },
    Thursday: {
      Breakfast: "Kimchi and egg skillet",
      Lunch: "Chicken japchae-style stir-fry (no noodles)",
      Dinner: "Sundubu jjigae with seafood"
    },
    Friday: {
      Breakfast: "Tofu and scallion scramble",
      Lunch: "Bossam lettuce wraps",
      Dinner: "Spicy squid and vegetables"
    },
    Saturday: {
      Breakfast: "Greek yogurt with sesame and almonds",
      Lunch: "Bulgogi beef salad bowl",
      Dinner: "Kimchi stew with pork belly and tofu"
    },
    Sunday: {
      Breakfast: "Egg drop soup with seaweed",
      Lunch: "Gochujang chicken skewers with cucumber salad",
      Dinner: "Braised cod with radish"
    }
  },
  China: {
    Monday: {
      Breakfast: "Egg and chive stir-fry with cucumber",
      Lunch: "Kung pao chicken (no sugar) with stir-fried greens",
      Dinner: "Steamed fish with ginger and bok choy"
    },
    Tuesday: {
      Breakfast: "Century egg tofu bowl",
      Lunch: "Beef and broccoli stir-fry",
      Dinner: "Mapo tofu (low-carb, light sauce)"
    },
    Wednesday: {
      Breakfast: "Pork and cabbage egg scramble",
      Lunch: "Roast duck salad cups",
      Dinner: "Garlic shrimp with snow peas"
    },
    Thursday: {
      Breakfast: "Tomato egg stir-fry",
      Lunch: "Chicken and mushroom stir-fry",
      Dinner: "Black pepper beef with bell peppers"
    },
    Friday: {
      Breakfast: "Soy milk tofu pudding with nuts (unsweetened)",
      Lunch: "Steamed chicken with ginger scallion sauce",
      Dinner: "Salt and pepper squid with sauteed greens"
    },
    Saturday: {
      Breakfast: "Scallion omelet",
      Lunch: "Braised tofu and pork mince",
      Dinner: "Cumin lamb with cabbage"
    },
    Sunday: {
      Breakfast: "Egg drop soup with spinach",
      Lunch: "Sichuan poached fish (reduced oil)",
      Dinner: "Chicken claypot style with mushrooms"
    }
  },
  India: {
    Monday: {
      Breakfast: "Paneer bhurji with cucumber",
      Lunch: "Tandoori chicken salad",
      Dinner: "Fish curry with sauteed okra"
    },
    Tuesday: {
      Breakfast: "Masala omelet",
      Lunch: "Chicken tikka with mint salad",
      Dinner: "Palak paneer with roasted cauliflower"
    },
    Wednesday: {
      Breakfast: "Greek yogurt with almonds and cardamom",
      Lunch: "Keema with cabbage stir-fry",
      Dinner: "Butter chicken (light cream) with green beans"
    },
    Thursday: {
      Breakfast: "Boiled eggs with spiced avocado",
      Lunch: "Paneer tikka salad bowl",
      Dinner: "Prawn masala with sauteed spinach"
    },
    Friday: {
      Breakfast: "Coconut chia pudding with pistachio",
      Lunch: "Mutton seekh kebab with cucumber raita",
      Dinner: "Egg curry with cauliflower rice"
    },
    Saturday: {
      Breakfast: "Besan chilla (low-carb) with mint chutney",
      Lunch: "Chicken saag",
      Dinner: "Grilled fish tikka with mixed vegetables"
    },
    Sunday: {
      Breakfast: "Paneer and bell pepper scramble",
      Lunch: "Tandoori salmon salad",
      Dinner: "Lamb curry (no potato) with sauteed cabbage"
    }
  },
  Mediterranean: {
    Monday: {
      Breakfast: "Greek yogurt with walnuts and cinnamon",
      Lunch: "Chicken souvlaki salad with tzatziki",
      Dinner: "Baked sea bass with olives and tomato"
    },
    Tuesday: {
      Breakfast: "Spinach feta omelet",
      Lunch: "Tuna and chickpea-style salad (extra greens, minimal chickpeas)",
      Dinner: "Lemon herb chicken with roasted zucchini"
    },
    Wednesday: {
      Breakfast: "Labneh bowl with cucumber and mint",
      Lunch: "Turkey kofta with cucumber salad",
      Dinner: "Garlic shrimp with sauteed spinach"
    },
    Thursday: {
      Breakfast: "Scrambled eggs with tomato and feta",
      Lunch: "Salmon Nicoise-style salad (no potatoes)",
      Dinner: "Lamb kebabs with grilled peppers"
    },
    Friday: {
      Breakfast: "Chia pudding with almonds",
      Lunch: "Halloumi and avocado salad",
      Dinner: "Stuffed eggplant with minced beef and herbs"
    },
    Saturday: {
      Breakfast: "Herb omelet with olives",
      Lunch: "Chicken shawarma bowl over cauliflower rice",
      Dinner: "Roasted cod with fennel and lemon"
    },
    Sunday: {
      Breakfast: "Yogurt with pistachios",
      Lunch: "Mediterranean antipasto protein plate",
      Dinner: "Beef moussaka-style bake (no potato)"
    }
  },
  Australia: {
    Monday: {
      Breakfast: "Avocado eggs with grilled tomato",
      Lunch: "Chicken and macadamia salad",
      Dinner: "Barramundi with lemon asparagus"
    },
    Tuesday: {
      Breakfast: "Greek yogurt with berries and almonds",
      Lunch: "Beef burger bowl with pickles",
      Dinner: "Lamb chops with minty greens"
    },
    Wednesday: {
      Breakfast: "Mushroom and cheddar omelet",
      Lunch: "Tuna and avocado lettuce boats",
      Dinner: "Garlic prawns with zucchini ribbons"
    },
    Thursday: {
      Breakfast: "Egg muffins with spinach",
      Lunch: "Roast chicken salad with pumpkin seeds",
      Dinner: "Steak with sauteed broccoli"
    },
    Friday: {
      Breakfast: "Smoked salmon and cream cheese roll-ups",
      Lunch: "Turkey and egg cobb salad",
      Dinner: "Baked snapper with green beans"
    },
    Saturday: {
      Breakfast: "Chia pudding with coconut milk",
      Lunch: "Chicken satay salad",
      Dinner: "Pork loin with cauliflower mash"
    },
    Sunday: {
      Breakfast: "Bacon and eggs with spinach",
      Lunch: "Roast beef salad bowl",
      Dinner: "Herb chicken tray bake with zucchini"
    }
  },
  Canada: {
    Monday: {
      Breakfast: "Scrambled eggs with smoked salmon",
      Lunch: "Grilled chicken kale Caesar (no croutons)",
      Dinner: "Maple mustard salmon with broccoli"
    },
    Tuesday: {
      Breakfast: "Greek yogurt with pecans",
      Lunch: "Turkey club lettuce wraps",
      Dinner: "Beef and mushroom skillet"
    },
    Wednesday: {
      Breakfast: "Spinach feta omelet",
      Lunch: "Tuna salad stuffed peppers",
      Dinner: "Roast chicken with Brussels sprouts"
    },
    Thursday: {
      Breakfast: "Cottage cheese with chia and almonds",
      Lunch: "Egg salad avocado bowl",
      Dinner: "Pork chops with cabbage slaw"
    },
    Friday: {
      Breakfast: "Bacon egg cups with peppers",
      Lunch: "Shrimp and cucumber dill salad",
      Dinner: "Baked cod with cauliflower mash"
    },
    Saturday: {
      Breakfast: "Protein smoothie bowl (low-carb)",
      Lunch: "Chicken and cheddar salad",
      Dinner: "Steak with garlic green beans"
    },
    Sunday: {
      Breakfast: "Mushroom and egg skillet",
      Lunch: "Roast turkey salad plate",
      Dinner: "Slow-cooked beef with roasted vegetables"
    }
  }
};

const GENERIC_LOW_CARB_PLAN = {
  Monday: { Breakfast: "Egg scramble with mixed vegetables", Lunch: "Grilled chicken salad", Dinner: "Baked fish with steamed greens" },
  Tuesday: { Breakfast: "Greek yogurt with nuts", Lunch: "Turkey lettuce wraps", Dinner: "Beef and broccoli stir-fry" },
  Wednesday: { Breakfast: "Cheese omelet with spinach", Lunch: "Tuna avocado salad", Dinner: "Roast chicken with cauliflower mash" },
  Thursday: { Breakfast: "Cottage cheese and almonds", Lunch: "Egg salad bowl", Dinner: "Shrimp with garlic zucchini" },
  Friday: { Breakfast: "Smoked fish and boiled eggs", Lunch: "Chicken Caesar salad (no croutons)", Dinner: "Pork chops with green beans" },
  Saturday: { Breakfast: "Chia pudding (unsweetened)", Lunch: "Beef burger patty with side salad", Dinner: "Salmon and asparagus" },
  Sunday: { Breakfast: "Veggie frittata", Lunch: "Grilled tofu and vegetable bowl", Dinner: "Roast beef with sauteed cabbage" }
};

const state = {
  lastResult: null,
  selectedDay: "All",
  customGroceries: [],
  currentPhotoEstimate: null,
  photoEstimates: [],
  manualFoodItems: []
};

const PREFERENCES_KEY = "lc_meal_planner_preferences";

const dayFilterEl = document.getElementById("dayFilter");
const countryEl = document.getElementById("country");
const goalEl = document.getElementById("goal");
const dailyTargetEl = document.getElementById("dailyTarget");
const recommendedTargetTextEl = document.getElementById("recommendedTargetText");
const summaryEl = document.getElementById("summary");
const planOutputEl = document.getElementById("planOutput");
const groceryOutputEl = document.getElementById("groceryOutput");
const generateBtn = document.getElementById("generateBtn");
const savePrefBtn = document.getElementById("savePrefBtn");
const clearPrefBtn = document.getElementById("clearPrefBtn");
const downloadTxtBtn = document.getElementById("downloadTxtBtn");
const downloadCsvBtn = document.getElementById("downloadCsvBtn");
const exportPdfBtn = document.getElementById("exportPdfBtn");
const mealPhotoInputEl = document.getElementById("mealPhotoInput");
const photoFileHintEl = document.getElementById("photoFileHint");
const takeShotBtn = document.getElementById("takeShotBtn");
const analyzePhotoBtn = document.getElementById("analyzePhotoBtn");
const savePhotoEstimateBtn = document.getElementById("savePhotoEstimateBtn");
const clearPhotoBtn = document.getElementById("clearPhotoBtn");
const photoEstimateResultEl = document.getElementById("photoEstimateResult");
const savedPhotoEstimatesEl = document.getElementById("savedPhotoEstimates");
const manualPhotoFallbackEl = document.getElementById("manualPhotoFallback");
const manualFoodInputEl = document.getElementById("manualFoodInput");
const addManualFoodBtn = document.getElementById("addManualFoodBtn");
const manualFoodHintEl = document.getElementById("manualFoodHint");
const manualFoodListEl = document.getElementById("manualFoodList");
const estimateManualBtn = document.getElementById("estimateManualBtn");

function savePreferences() {
  const prefs = {
    country: countryEl.value,
    goal: goalEl.value,
    dailyTarget: dailyTargetEl.value
  };
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));

  const originalLabel = savePrefBtn.textContent;
  savePrefBtn.textContent = "Saved";
  savePrefBtn.disabled = true;
  setTimeout(() => {
    savePrefBtn.textContent = originalLabel;
    savePrefBtn.disabled = false;
  }, 900);
}

function loadPreferences() {
  const raw = localStorage.getItem(PREFERENCES_KEY);
  if (!raw) {
    return;
  }

  try {
    const prefs = JSON.parse(raw);

    if (prefs.country && COUNTRY_BASE_TARGETS[prefs.country] !== undefined) {
      countryEl.value = prefs.country;
    }
    if (prefs.goal && GOAL_ADJUSTMENTS[prefs.goal] !== undefined) {
      goalEl.value = prefs.goal;
    }

    if (prefs.dailyTarget !== undefined && prefs.dailyTarget !== null && String(prefs.dailyTarget).trim() !== "") {
      const parsed = Number(prefs.dailyTarget);
      if (Number.isFinite(parsed) && parsed >= 1000 && parsed <= 3500) {
        dailyTargetEl.value = String(Math.round(parsed));
      }
    }
  } catch {
    // Ignore invalid saved preferences and continue with defaults.
  }
}

function clearPreferences() {
  localStorage.removeItem(PREFERENCES_KEY);

  countryEl.value = "UK";
  goalEl.value = "Maintain";
  dailyTargetEl.value = "";
  updateRecommendedTargetText();
  clearPhotoSelection();

  const originalLabel = clearPrefBtn.textContent;
  clearPrefBtn.textContent = "Cleared";
  clearPrefBtn.disabled = true;
  setTimeout(() => {
    clearPrefBtn.textContent = originalLabel;
    clearPrefBtn.disabled = false;
  }, 900);
}

function getRecommendedDailyTarget(country, goal) {
  const base = COUNTRY_BASE_TARGETS[country] ?? DEFAULT_DAILY_CALORIE_TARGET;
  const adjustment = GOAL_ADJUSTMENTS[goal] ?? 0;
  return base + adjustment;
}

function getDailyTarget(country, goal) {
  const fallback = getRecommendedDailyTarget(country, goal);
  const raw = Number(dailyTargetEl.value);
  if (!Number.isFinite(raw)) {
    return fallback;
  }
  if (raw < 1000 || raw > 3500) {
    return fallback;
  }
  return Math.round(raw);
}

function getCalorieProfile(country) {
  return COUNTRY_CALORIE_PROFILES[country] ?? COUNTRY_CALORIE_PROFILES.UK;
}

function getCountryDisplayName(country) {
  return COUNTRY_DISPLAY_NAMES[country] ?? country;
}

function renderPlusOnlyMessage(country) {
  summaryEl.classList.remove("hidden");
  summaryEl.textContent = `${getCountryDisplayName(country)} is available on Plus version only.`;
  dayFilterEl.classList.add("hidden");
  planOutputEl.innerHTML = "";
  groceryOutputEl.classList.add("hidden");
  groceryOutputEl.innerHTML = "";
  state.lastResult = null;

  if (downloadTxtBtn) {
    downloadTxtBtn.disabled = true;
  }
  if (downloadCsvBtn) {
    downloadCsvBtn.disabled = true;
  }
  if (exportPdfBtn) {
    exportPdfBtn.disabled = true;
  }
}

function shufflePlan(plan) {
  const days = Object.keys(plan);
  const meals = days.map((d) => plan[d]);
  for (let i = meals.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [meals[i], meals[j]] = [meals[j], meals[i]];
  }
  const shuffled = {};
  days.forEach((day, i) => { shuffled[day] = meals[i]; });
  return shuffled;
}

function getMealPlan(country) {
  const plan = MEAL_PLANS[country] ?? MEAL_PLANS.UK;
  return shufflePlan(JSON.parse(JSON.stringify(plan)));
}

function updateRecommendedTargetText() {
  const target = getRecommendedDailyTarget(countryEl.value, goalEl.value);
  recommendedTargetTextEl.textContent = `Recommended target: ${target} kcal`;
}

function getGroceryList(plan) {
  const groceries = {
    Protein: [],
    Vegetables: [],
    "Pantry and Extras": [],
    Other: []
  };

  const combinedText = Object.values(plan)
    .map((meals) => Object.values(meals).join(" "))
    .join(" ")
    .toLowerCase();

  Object.entries(GROCERY_CATEGORIES).forEach(([category, keywords]) => {
    keywords.forEach((keyword) => {
      if (combinedText.includes(keyword) && !groceries[category].includes(keyword)) {
        groceries[category].push(keyword);
      }
    });
  });

  if (combinedText.includes("caesar") && !groceries.Other.includes("caesar dressing")) {
    groceries.Other.push("caesar dressing");
  }

  return groceries;
}

function getMealIcon(mealName) {
  if (mealName === "Breakfast") {
    return "🍳";
  }
  if (mealName === "Lunch") {
    return "🍱";
  }
  return "🍽";
}

function getDailyStatusText(dailyEstimate, dailyTarget) {
  const delta = dailyEstimate - dailyTarget;
  if (delta > 0) {
    return {
      text: `+${delta} kcal over target`,
      className: "over"
    };
  }
  if (delta === 0) {
    return {
      text: "Within target",
      className: "within"
    };
  }
  return {
    text: `${Math.abs(delta)} kcal under target`,
    className: "within"
  };
}

function renderPlanCards(plan, calorieProfile, dailyTarget, filterDay) {
  planOutputEl.innerHTML = "";

  const entries = filterDay === "All"
    ? Object.entries(plan)
    : Object.entries(plan).filter(([day]) => day === filterDay);

  entries.forEach(([day, meals]) => {
    let dailyEstimate = 0;
    const card = document.createElement("article");
    card.className = "day-card";

    const headingWrap = document.createElement("div");
    headingWrap.className = "day-card-header";

    const heading = document.createElement("h3");
    heading.textContent = day;

    const regenBtn = document.createElement("button");
    regenBtn.type = "button";
    regenBtn.className = "regen-btn";
    regenBtn.textContent = "↻ Regenerate";
    regenBtn.addEventListener("click", () => regenerateDay(day));

    headingWrap.appendChild(heading);
    headingWrap.appendChild(regenBtn);
    card.appendChild(headingWrap);

    Object.entries(meals).forEach(([mealName, suggestion]) => {
      const est = calorieProfile[mealName] ?? 500;
      const portion = PORTION_BY_MEAL[mealName] ?? "1 serving";
      dailyEstimate += est;

      const mealBlock = document.createElement("section");
      mealBlock.className = `meal-block ${mealName.toLowerCase()}`;

      const mealHeader = document.createElement("div");
      mealHeader.className = "meal-header";
      mealHeader.textContent = `${getMealIcon(mealName)} ${mealName}`;

      const mealNameText = document.createElement("p");
      mealNameText.className = "meal-name";
      mealNameText.textContent = suggestion;

      const metaWrap = document.createElement("div");
      metaWrap.className = "meal-meta";

      const portionPill = document.createElement("span");
      portionPill.className = "meta-pill";
      portionPill.textContent = `Portion: ${portion}`;

      const caloriesPill = document.createElement("span");
      caloriesPill.className = "meta-pill";
      caloriesPill.textContent = `Calories: ${est} kcal`;

      metaWrap.appendChild(portionPill);
      metaWrap.appendChild(caloriesPill);
      mealBlock.appendChild(mealHeader);
      mealBlock.appendChild(mealNameText);
      mealBlock.appendChild(metaWrap);
      card.appendChild(mealBlock);
    });

    const dailyStatus = getDailyStatusText(dailyEstimate, dailyTarget);

    const totalWrap = document.createElement("section");
    totalWrap.className = "daily-total";

    const totalValue = document.createElement("p");
    totalValue.className = "daily-total-value";
    totalValue.textContent = `Daily Estimated Total: ${dailyEstimate} kcal`;

    const totalStatus = document.createElement("p");
    totalStatus.className = `daily-total-status ${dailyStatus.className}`;
    totalStatus.textContent = `${dailyStatus.text} (Target: ${dailyTarget} kcal)`;

    totalWrap.appendChild(totalValue);
    totalWrap.appendChild(totalStatus);
    card.appendChild(totalWrap);

    planOutputEl.appendChild(card);
  });
}

function renderResult(country, goal, dailyTarget, plan, calorieProfile, groceries) {
  summaryEl.classList.remove("hidden");
  summaryEl.textContent = `Cuisine Style: ${getCountryDisplayName(country)} | Goal: ${goal} | Daily target: ${dailyTarget} kcal`;

  dayFilterEl.classList.remove("hidden");

  renderPlanCards(plan, calorieProfile, dailyTarget, state.selectedDay);

  renderGroceryList(groceries);
}

function renderGroceryList(groceries) {
  groceryOutputEl.classList.remove("hidden");
  groceryOutputEl.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Weekly Grocery List";
  groceryOutputEl.appendChild(title);

  const grid = document.createElement("div");
  grid.className = "grocery-grid";

  // Merge custom items into Other before rendering
  const mergedGroceries = Object.assign({}, groceries);
  mergedGroceries.Other = [
    ...(groceries.Other || []),
    ...state.customGroceries.filter((item) => !(groceries.Other || []).includes(item))
  ];

  Object.entries(mergedGroceries).forEach(([category, items]) => {
    const isOther = category === "Other";
    if (!items.length && !isOther) {
      return;
    }
    const col = document.createElement("section");
    col.className = "grocery-col";

    const h3 = document.createElement("h3");
    h3.textContent = category;
    col.appendChild(h3);

    const ul = document.createElement("ul");
    [...items].sort().forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    col.appendChild(ul);

    if (isOther) {
      const addRow = document.createElement("div");
      addRow.className = "grocery-add-row";

      const input = document.createElement("input");
      input.type = "text";
      input.className = "grocery-add-input";
      input.placeholder = "Add an item...";

      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "grocery-add-btn";
      addBtn.textContent = "+ Add";

      function addItem() {
        const val = input.value.trim().toLowerCase();
        if (!val || state.customGroceries.includes(val)) {
          input.value = "";
          return;
        }
        state.customGroceries.push(val);
        input.value = "";
        renderGroceryList(state.lastResult.groceries);
      }

      addBtn.addEventListener("click", addItem);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          addItem();
        }
      });

      addRow.appendChild(input);
      addRow.appendChild(addBtn);
      col.appendChild(addRow);
    }

    grid.appendChild(col);
  });

  groceryOutputEl.appendChild(grid);
}

function regenerateDay(day) {
  if (!state.lastResult) {
    return;
  }
  const { plan, calorieProfile, dailyTarget } = state.lastResult;
  const otherDays = Object.keys(plan).filter((d) => d !== day);
  if (otherDays.length === 0) {
    return;
  }

  // Swap each meal type independently with a random other day so no duplicates occur
  ["Breakfast", "Lunch", "Dinner"].forEach((mealType) => {
    const swapDay = otherDays[Math.floor(Math.random() * otherDays.length)];
    const temp = state.lastResult.plan[day][mealType];
    state.lastResult.plan[day][mealType] = state.lastResult.plan[swapDay][mealType];
    state.lastResult.plan[swapDay][mealType] = temp;
  });

  state.lastResult.groceries = getGroceryList(state.lastResult.plan);
  renderPlanCards(state.lastResult.plan, calorieProfile, dailyTarget, state.selectedDay);
  renderGroceryList(state.lastResult.groceries);
}

function buildTxtContent(result) {
  const lines = [];
  lines.push("Low-Carb Weekly Meal Suggestion");
  lines.push(`Cuisine Style: ${result.country}`);
  lines.push(`Goal: ${result.goal}`);
  lines.push(`Daily Calorie Target: ${result.dailyTarget} kcal`);
  lines.push("");

  Object.entries(result.plan).forEach(([day, meals]) => {
    lines.push(day);
    lines.push("-".repeat(day.length));
    let dailyEstimate = 0;

    Object.entries(meals).forEach(([mealName, suggestion]) => {
      const est = result.calorieProfile[mealName] ?? 500;
      const portion = PORTION_BY_MEAL[mealName] ?? "1 serving";
      dailyEstimate += est;
      lines.push(`${mealName}: ${suggestion} | Portion: ${portion} | Est: ${est} kcal`);
    });

    lines.push(`Daily Estimated Total: ${dailyEstimate} kcal (Target: ${result.dailyTarget} kcal)`);
    lines.push("");
  });

  lines.push("Weekly Grocery List");
  lines.push("===================");

  Object.entries(result.groceries).forEach(([category, items]) => {
    if (!items.length) {
      return;
    }
    lines.push("");
    lines.push(category);
    lines.push("-".repeat(category.length));
    [...items].sort().forEach((item) => lines.push(`- ${item}`));
  });

  return lines.join("\n");
}

function csvEscape(value) {
  const stringValue = String(value ?? "");
  if (stringValue.includes(",") || stringValue.includes("\"") || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function buildCsvContent(result) {
  const rows = [
    ["row_type", "country", "goal", "day", "meal", "suggestion", "portion", "estimated_kcal", "daily_target", "category", "item"]
  ];

  Object.entries(result.plan).forEach(([day, meals]) => {
    Object.entries(meals).forEach(([mealName, suggestion]) => {
      rows.push([
        "meal",
        result.country,
        result.goal,
        day,
        mealName,
        suggestion,
        PORTION_BY_MEAL[mealName] ?? "1 serving",
        result.calorieProfile[mealName] ?? 500,
        result.dailyTarget,
        "",
        ""
      ]);
    });
  });

  Object.entries(result.groceries).forEach(([category, items]) => {
    [...items].sort().forEach((item) => {
      rows.push([
        "grocery",
        result.country,
        result.goal,
        "",
        "",
        "",
        "",
        "",
        result.dailyTarget,
        category,
        item
      ]);
    });
  });

  return rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

function downloadText(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function getTimestamp() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const sec = String(now.getSeconds()).padStart(2, "0");
  return `${yyyy}${mm}${dd}_${hh}${min}${sec}`;
}

function downloadTxt(result) {
  const timestamp = getTimestamp();
  const country = result.country.toLowerCase().replace(/\s+/g, "_");
  downloadText(buildTxtContent(result), `weekly_plan_${country}_${timestamp}.txt`, "text/plain;charset=utf-8");
}

function downloadCsv(result) {
  const timestamp = getTimestamp();
  const country = result.country.toLowerCase().replace(/\s+/g, "_");
  downloadText(buildCsvContent(result), `weekly_plan_${country}_${timestamp}.csv`, "text/csv;charset=utf-8");
}

function showPhotoEstimateMessage(message, isError = false) {
  if (!photoEstimateResultEl) {
    return;
  }
  photoEstimateResultEl.classList.remove("hidden", "error");
  if (isError) {
    photoEstimateResultEl.classList.add("error");
  }
  photoEstimateResultEl.innerHTML = `<p class="photo-estimate-main">${message}</p>`;
}

function renderPhotoEstimateResult(estimate) {
  if (!photoEstimateResultEl) {
    return;
  }
  photoEstimateResultEl.classList.remove("hidden", "error");
  const confidence = Number.isFinite(estimate.confidence)
    ? `Confidence: ${Math.round(estimate.confidence * 100)}%`
    : "Confidence: n/a";
  const items = Array.isArray(estimate.items) && estimate.items.length
    ? `Detected items: ${estimate.items.join(", ")}`
    : "Detected items: n/a";
  const notes = estimate.notes ? `Notes: ${estimate.notes}` : "";
  photoEstimateResultEl.innerHTML = `
    <p class="photo-estimate-main">Estimated calories: ${estimate.totalCalories} kcal</p>
    <p class="photo-estimate-detail">${items}</p>
    <p class="photo-estimate-detail">${confidence}</p>
    ${notes ? `<p class="photo-estimate-detail">${notes}</p>` : ""}
  `;
}

function renderSavedPhotoEstimates() {
  if (!savedPhotoEstimatesEl) {
    return;
  }
  if (!state.photoEstimates.length) {
    savedPhotoEstimatesEl.classList.add("hidden");
    savedPhotoEstimatesEl.innerHTML = "";
    return;
  }

  const items = state.photoEstimates
    .slice(0, 10)
    .map((entry) => {
      const date = new Date(entry.createdAt).toLocaleString();
      return `<li>${entry.totalCalories} kcal - ${date}</li>`;
    })
    .join("");

  savedPhotoEstimatesEl.classList.remove("hidden");
  savedPhotoEstimatesEl.innerHTML = `<h4>Saved calorie estimates</h4><ul>${items}</ul>`;
}

function updateManualFoodHint() {
  if (!manualFoodHintEl) {
    return;
  }
  manualFoodHintEl.textContent = `${state.manualFoodItems.length}/10 items added.`;
}

function renderManualFoodList() {
  if (!manualFoodListEl) {
    return;
  }

  if (!state.manualFoodItems.length) {
    manualFoodListEl.innerHTML = "";
    updateManualFoodHint();
    return;
  }

  manualFoodListEl.innerHTML = state.manualFoodItems
    .map((item, index) => `<li><span>${item}</span><button type="button" class="secondary manual-food-remove" data-remove-index="${index}">Remove</button></li>`)
    .join("");

  updateManualFoodHint();
}

function showManualFallback(message) {
  if (manualPhotoFallbackEl) {
    manualPhotoFallbackEl.classList.remove("hidden");
    manualPhotoFallbackEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  if (message) {
    showPhotoEstimateMessage(message, true);
  }
  renderManualFoodList();
  if (manualFoodInputEl) {
    manualFoodInputEl.focus();
  }
}

function hideManualFallback() {
  if (manualPhotoFallbackEl) {
    manualPhotoFallbackEl.classList.add("hidden");
  }
}

function addManualFoodItem() {
  if (!manualFoodInputEl) {
    return;
  }

  const value = manualFoodInputEl.value.trim();
  if (!value) {
    return;
  }
  if (state.manualFoodItems.length >= 10) {
    showPhotoEstimateMessage("You can add up to 10 items only.", true);
    return;
  }

  state.manualFoodItems.push(value);
  manualFoodInputEl.value = "";
  renderManualFoodList();
}

async function estimateManualFoodItems() {
  if (!state.manualFoodItems.length) {
    showPhotoEstimateMessage("Add at least one item first.", true);
    return;
  }

  const originalLabel = estimateManualBtn ? estimateManualBtn.textContent : "Estimate From List";
  if (estimateManualBtn) {
    estimateManualBtn.disabled = true;
    estimateManualBtn.textContent = "Estimating...";
  }

  try {
    const response = await fetch("/.netlify/functions/analyze-calories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ manualItems: state.manualFoodItems.slice(0, 10) })
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Could not estimate from list.");
    }

    const estimate = {
      totalCalories: Number(payload.totalCalories) || Number(payload.estimatedCalories) || 0,
      confidence: Number(payload.confidence),
      items: Array.isArray(payload.items) ? payload.items : state.manualFoodItems.slice(0, 10),
      notes: typeof payload.notes === "string" ? payload.notes : ""
    };

    if (!estimate.totalCalories) {
      throw new Error("No calorie estimate was returned.");
    }

    state.currentPhotoEstimate = estimate;
    renderPhotoEstimateResult(estimate);
    hideManualFallback();
    if (savePhotoEstimateBtn) {
      savePhotoEstimateBtn.disabled = false;
    }
  } catch (error) {
    showPhotoEstimateMessage(error.message || "Manual estimate failed.", true);
  } finally {
    if (estimateManualBtn) {
      estimateManualBtn.disabled = false;
      estimateManualBtn.textContent = originalLabel;
    }
  }
}

function clearPhotoSelection() {
  if (mealPhotoInputEl) {
    mealPhotoInputEl.value = "";
  }
  if (photoFileHintEl) {
    photoFileHintEl.textContent = "No photo selected.";
  }
  state.currentPhotoEstimate = null;
  state.manualFoodItems = [];
  if (manualFoodInputEl) {
    manualFoodInputEl.value = "";
  }
  renderManualFoodList();
  hideManualFallback();
  if (savePhotoEstimateBtn) {
    savePhotoEstimateBtn.disabled = true;
  }
  if (photoEstimateResultEl) {
    photoEstimateResultEl.classList.add("hidden");
    photoEstimateResultEl.classList.remove("error");
    photoEstimateResultEl.innerHTML = "";
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read photo."));
    reader.readAsDataURL(file);
  });
}

async function resizeImageDataUrl(dataUrl, maxDimension = 1280) {
  const image = new Image();
  image.src = dataUrl;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = () => reject(new Error("Could not load image."));
  });

  const largestSide = Math.max(image.width, image.height);
  if (largestSide <= maxDimension) {
    return dataUrl;
  }

  const scale = maxDimension / largestSide;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.82);
}

async function analyzePhotoCalories() {
  if (!mealPhotoInputEl || !mealPhotoInputEl.files || !mealPhotoInputEl.files[0]) {
    showPhotoEstimateMessage("Please select a meal photo first.", true);
    return;
  }

  const selectedFile = mealPhotoInputEl.files[0];
  if (photoFileHintEl) {
    photoFileHintEl.textContent = `Selected: ${selectedFile.name}`;
  }

  const originalLabel = analyzePhotoBtn ? analyzePhotoBtn.textContent : "Calculate Calories";
  if (analyzePhotoBtn) {
    analyzePhotoBtn.textContent = "Analyzing...";
    analyzePhotoBtn.disabled = true;
  }

  try {
    const base64DataUrl = await fileToDataUrl(selectedFile);
    const resizedDataUrl = await resizeImageDataUrl(base64DataUrl);

    const response = await fetch("/.netlify/functions/analyze-calories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ imageDataUrl: resizedDataUrl })
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Could not analyze the photo.");
    }

    const estimate = {
      totalCalories: Number(payload.totalCalories) || 0,
      confidence: Number(payload.confidence),
      items: Array.isArray(payload.items) ? payload.items : [],
      notes: typeof payload.notes === "string" ? payload.notes : ""
    };

    if (!estimate.totalCalories) {
      throw new Error("No calorie estimate was returned. Try another photo.");
    }

    state.currentPhotoEstimate = estimate;
    renderPhotoEstimateResult(estimate);
    hideManualFallback();
    if (savePhotoEstimateBtn) {
      savePhotoEstimateBtn.disabled = false;
    }
  } catch (error) {
    showManualFallback(error.message || "Photo estimate is unavailable right now. Add up to 10 food items below, then tap Estimate From List.");
  } finally {
    if (analyzePhotoBtn) {
      analyzePhotoBtn.textContent = originalLabel;
      analyzePhotoBtn.disabled = false;
    }
  }
}

function savePhotoEstimate() {
  if (!state.currentPhotoEstimate) {
    showPhotoEstimateMessage("Run a photo calculation first.", true);
    return;
  }

  state.photoEstimates.unshift({
    totalCalories: state.currentPhotoEstimate.totalCalories,
    confidence: state.currentPhotoEstimate.confidence,
    items: state.currentPhotoEstimate.items,
    notes: state.currentPhotoEstimate.notes,
    createdAt: new Date().toISOString()
  });
  state.photoEstimates = state.photoEstimates.slice(0, 50);
  renderSavedPhotoEstimates();
  showPhotoEstimateMessage("Estimate saved. Photo was not stored.");
}

function generatePlan() {
  const country = countryEl.value;
  if (!FREE_CUISINE_COUNTRIES.has(country)) {
    renderPlusOnlyMessage(country);
    return;
  }

  const goal = goalEl.value;
  const dailyTarget = getDailyTarget(country, goal);
  const plan = getMealPlan(country);
  const calorieProfile = getCalorieProfile(country);
  const groceries = getGroceryList(plan);

  // Reset filter to All Week on fresh generate
  state.selectedDay = "All";
  state.customGroceries = [];
  dayFilterEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  dayFilterEl.querySelector("[data-day='All']").classList.add("active");

  state.originalPlan = JSON.parse(JSON.stringify(plan));
  state.lastResult = { country, goal, dailyTarget, plan, calorieProfile, groceries };

  renderResult(country, goal, dailyTarget, plan, calorieProfile, groceries);
  if (downloadTxtBtn) {
    downloadTxtBtn.disabled = false;
  }
  if (downloadCsvBtn) {
    downloadCsvBtn.disabled = false;
  }
  if (exportPdfBtn) {
    exportPdfBtn.disabled = false;
  }
}

countryEl.addEventListener("change", () => {
  updateRecommendedTargetText();
  if (!FREE_CUISINE_COUNTRIES.has(countryEl.value)) {
    renderPlusOnlyMessage(countryEl.value);
  } else if (!state.lastResult) {
    summaryEl.classList.add("hidden");
  }
});
goalEl.addEventListener("change", updateRecommendedTargetText);

dayFilterEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn || !state.lastResult) {
    return;
  }
  state.selectedDay = btn.dataset.day;
  dayFilterEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  const { plan, calorieProfile, dailyTarget } = state.lastResult;
  renderPlanCards(plan, calorieProfile, dailyTarget, state.selectedDay);
});

generateBtn.addEventListener("click", generatePlan);
if (savePrefBtn) {
  savePrefBtn.addEventListener("click", savePreferences);
}
if (clearPrefBtn) {
  clearPrefBtn.addEventListener("click", clearPreferences);
}

if (mealPhotoInputEl) {
  mealPhotoInputEl.addEventListener("change", () => {
    if (mealPhotoInputEl.files && mealPhotoInputEl.files[0]) {
      photoFileHintEl.textContent = `Selected: ${mealPhotoInputEl.files[0].name}`;
      if (photoEstimateResultEl) {
        photoEstimateResultEl.classList.add("hidden");
      }
      if (savePhotoEstimateBtn) {
        savePhotoEstimateBtn.disabled = true;
      }
      state.currentPhotoEstimate = null;
      state.manualFoodItems = [];
      renderManualFoodList();
      hideManualFallback();
    } else {
      clearPhotoSelection();
    }
  });
}

if (takeShotBtn && mealPhotoInputEl) {
  takeShotBtn.addEventListener("click", () => {
    mealPhotoInputEl.click();
  });
}

if (analyzePhotoBtn) {
  analyzePhotoBtn.addEventListener("click", analyzePhotoCalories);
}

if (savePhotoEstimateBtn) {
  savePhotoEstimateBtn.addEventListener("click", savePhotoEstimate);
}

if (clearPhotoBtn) {
  clearPhotoBtn.addEventListener("click", () => {
    clearPhotoSelection();
    if (photoEstimateResultEl) {
      photoEstimateResultEl.classList.add("hidden");
      photoEstimateResultEl.innerHTML = "";
    }
  });
}

if (addManualFoodBtn) {
  addManualFoodBtn.addEventListener("click", addManualFoodItem);
}

if (manualFoodInputEl) {
  manualFoodInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addManualFoodItem();
    }
  });
}

if (manualFoodListEl) {
  manualFoodListEl.addEventListener("click", (event) => {
    const removeBtn = event.target.closest("[data-remove-index]");
    if (!removeBtn) {
      return;
    }
    const index = Number(removeBtn.getAttribute("data-remove-index"));
    if (!Number.isFinite(index)) {
      return;
    }
    state.manualFoodItems.splice(index, 1);
    renderManualFoodList();
  });
}

if (estimateManualBtn) {
  estimateManualBtn.addEventListener("click", estimateManualFoodItems);
}

if (downloadTxtBtn) {
  downloadTxtBtn.addEventListener("click", () => {
    if (state.lastResult) {
      downloadTxt(state.lastResult);
    }
  });
}

if (downloadCsvBtn) {
  downloadCsvBtn.addEventListener("click", () => {
    if (state.lastResult) {
      downloadCsv(state.lastResult);
    }
  });
}

if (exportPdfBtn) {
  exportPdfBtn.addEventListener("click", () => {
    if (!state.lastResult) return;
    if (!window.jspdf || !window.jspdf.jsPDF) {
      alert("PDF export library is not loaded.");
      return;
    }
    const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const result = state.lastResult;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 15;
  const colW = pageW - margin * 2;
  let y = margin;

  function checkPage(needed) {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function writeLine(text, opts) {
    const { size = 10, bold = false, color = [30, 30, 30], indent = 0 } = opts || {};
    doc.setFontSize(size);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, colW - indent);
    lines.forEach((line) => {
      checkPage(6);
      doc.text(line, margin + indent, y);
      y += size * 0.45;
    });
  }

  function drawRule(thickness, grayVal) {
    doc.setDrawColor(grayVal ?? 180);
    doc.setLineWidth(thickness ?? 0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 3;
  }

  // ---- Header ----
  writeLine("LC MEAL PLANNER", { size: 9, bold: false, color: [80, 100, 160] });
  y += 2;
  writeLine("Your Companion to Health", { size: 18, bold: true, color: [20, 20, 20] });
  y += 2;
  writeLine(`Cuisine Style: ${result.country}  |  Goal: ${result.goal}  |  Daily target: ${result.dailyTarget} kcal`, { size: 9, color: [100, 100, 100] });
  y += 4;
  drawRule(0.5, 150);
  y += 2;

  // ---- Meal Plan ----
  writeLine("WEEKLY MEAL PLAN", { size: 11, bold: true, color: [31, 75, 143] });
  y += 3;

  const calorieProfile = result.calorieProfile;
  Object.entries(result.plan).forEach(([day, meals]) => {
    checkPage(30);
    writeLine(day.toUpperCase(), { size: 11, bold: true, color: [20, 20, 20] });
    y += 1;
    drawRule(0.2, 200);
    let dayTotal = 0;
    Object.entries(meals).forEach(([mealName, suggestion]) => {
      const est = calorieProfile[mealName] ?? 500;
      const portion = PORTION_BY_MEAL[mealName] ?? "1 serving";
      dayTotal += est;
      writeLine(`${mealName}`, { size: 9, bold: true, color: [80, 80, 80], indent: 2 });
      y += 0.5;
      writeLine(suggestion, { size: 10, bold: false, color: [20, 20, 20], indent: 4 });
      writeLine(`Portion: ${portion}  |  Est. ${est} kcal`, { size: 8, color: [120, 120, 120], indent: 4 });
      y += 2;
    });
    writeLine(`Daily estimated total: ${dayTotal} kcal  (target: ${result.dailyTarget} kcal)`, { size: 8, bold: true, color: [31, 75, 143], indent: 2 });
    y += 5;
  });

  // ---- Grocery List ----
  checkPage(20);
  drawRule(0.5, 150);
  y += 2;
  writeLine("WEEKLY GROCERY LIST", { size: 11, bold: true, color: [31, 75, 143] });
  y += 3;

  const mergedGroceries = Object.assign({}, result.groceries);
  mergedGroceries.Other = [
    ...(result.groceries.Other || []),
    ...state.customGroceries.filter((item) => !(result.groceries.Other || []).includes(item))
  ];

  Object.entries(mergedGroceries).forEach(([category, items]) => {
    if (!items.length) return;
    checkPage(12);
    writeLine(category, { size: 10, bold: true, color: [40, 40, 40] });
    y += 1;
    [...items].sort().forEach((item) => {
      checkPage(6);
      writeLine(`• ${item}`, { size: 9, color: [50, 50, 50], indent: 3 });
    });
    y += 3;
  });

  // ---- Footer ----
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.text(`Your LC Meal Companion  |  Page ${i} of ${pageCount}`, margin, pageH - 8);
  }

    doc.save(`lc_meal_plan_${getTimestamp()}.pdf`);
  });
}

loadPreferences();
updateRecommendedTargetText();
renderSavedPhotoEstimates();
