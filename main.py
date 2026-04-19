import csv
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple


MealPlan = Dict[str, Dict[str, str]]

DEFAULT_DAILY_CALORIE_TARGET = 1600
COUNTRY_BASE_TARGETS = {
    "US": 2000,
    "UK": 1900,
    "Philippines": 1800,
    "Others": DEFAULT_DAILY_CALORIE_TARGET,
}
GOAL_ADJUSTMENTS = {
    "Lose weight": -300,
    "Maintain": 0,
    "Gain muscle": 300,
}
COUNTRY_CALORIE_PROFILES = {
    "US": {
        "Breakfast": 420,
        "Lunch": 560,
        "Dinner": 680,
    },
    "UK": {
        "Breakfast": 390,
        "Lunch": 530,
        "Dinner": 650,
    },
    "Philippines": {
        "Breakfast": 400,
        "Lunch": 550,
        "Dinner": 650,
    },
    "Others": {
        "Breakfast": 380,
        "Lunch": 520,
        "Dinner": 620,
    },
}
PORTION_BY_MEAL = {
    "Breakfast": "1 plate / 1 bowl",
    "Lunch": "1.5 cups main + 1 cup vegetables",
    "Dinner": "1.5 cups main + 1 cup vegetables",
}

GROCERY_CATEGORIES = {
    "Protein": [
        "chicken",
        "beef",
        "pork",
        "salmon",
        "tuna",
        "shrimp",
        "fish",
        "bangus",
        "liempo",
        "kippers",
        "mackerel",
        "longganisa",
        "egg",
        "eggs",
        "tofu",
        "tokwa",
        "cheese",
        "yogurt",
    ],
    "Vegetables": [
        "avocado",
        "asparagus",
        "broccoli",
        "spinach",
        "mushroom",
        "mushrooms",
        "zucchini",
        "cabbage",
        "cauliflower",
        "tomato",
        "tomatoes",
        "cucumber",
        "bell pepper",
        "peppers",
        "green beans",
        "kangkong",
        "pechay",
        "ampalaya",
        "radish",
        "papaya",
        "chili leaves",
        "malunggay",
        "eggplant",
        "talong",
        "leek",
        "courgettes",
        "greens",
    ],
    "Pantry and Extras": [
        "almond",
        "almonds",
        "chia",
        "pickle",
        "pickles",
        "mayo",
        "cream cheese",
        "horseradish",
        "butter",
        "garlic",
        "sugar-free syrup",
    ],
}


MEAL_PLANS: Dict[str, MealPlan] = {
    "US": {
        "Monday": {
            "Breakfast": "Veggie omelet with cheddar and avocado",
            "Lunch": "Grilled chicken Caesar salad (no croutons)",
            "Dinner": "Baked salmon with roasted asparagus",
        },
        "Tuesday": {
            "Breakfast": "Greek yogurt with walnuts and chia",
            "Lunch": "Turkey lettuce wraps with cucumber",
            "Dinner": "Beef stir-fry with broccoli and bell peppers",
        },
        "Wednesday": {
            "Breakfast": "Scrambled eggs with spinach and mushrooms",
            "Lunch": "Tuna salad stuffed in avocado",
            "Dinner": "Pork chops with sauteed green beans",
        },
        "Thursday": {
            "Breakfast": "Cottage cheese bowl with almonds",
            "Lunch": "Bunless cheeseburger with side salad",
            "Dinner": "Lemon herb chicken thighs with zucchini",
        },
        "Friday": {
            "Breakfast": "Smoked salmon and cream cheese roll-ups",
            "Lunch": "Cobb salad with egg, bacon, and chicken",
            "Dinner": "Shrimp scampi over zucchini noodles",
        },
        "Saturday": {
            "Breakfast": "Egg muffins with turkey and peppers",
            "Lunch": "Chicken salad lettuce boats",
            "Dinner": "Steak with garlic butter mushrooms",
        },
        "Sunday": {
            "Breakfast": "Almond flour pancakes with sugar-free syrup",
            "Lunch": "Buffalo chicken salad",
            "Dinner": "Roast chicken with cauliflower mash",
        },
    },
    "UK": {
        "Monday": {
            "Breakfast": "Full low-carb fry-up (eggs, bacon, mushrooms, tomato)",
            "Lunch": "Coronation chicken salad",
            "Dinner": "Roast cod with buttered cabbage",
        },
        "Tuesday": {
            "Breakfast": "Poached eggs with smoked mackerel",
            "Lunch": "Ploughman-style ham, cheese, pickles, and salad",
            "Dinner": "Lamb chops with minted courgettes",
        },
        "Wednesday": {
            "Breakfast": "Greek yogurt with hazelnuts",
            "Lunch": "Egg mayo lettuce cups",
            "Dinner": "Chicken tikka with cauliflower rice",
        },
        "Thursday": {
            "Breakfast": "Cheese omelet with spinach",
            "Lunch": "Prawn and avocado salad",
            "Dinner": "Bangers (high-meat sausages) with buttery greens",
        },
        "Friday": {
            "Breakfast": "Kippers with scrambled eggs",
            "Lunch": "Roast beef salad with horseradish mayo",
            "Dinner": "Fish pie topping replaced with cauliflower mash",
        },
        "Saturday": {
            "Breakfast": "Chia pudding with unsweetened almond milk",
            "Lunch": "Chicken and leek soup (no potato)",
            "Dinner": "Shepherd's pie with cauliflower topping",
        },
        "Sunday": {
            "Breakfast": "Bacon and eggs with grilled tomato",
            "Lunch": "Cheese and pickle salad plate",
            "Dinner": "Sunday roast beef with broccoli and cauliflower",
        },
    },
    "Philippines": {
        "Monday": {
            "Breakfast": "Tortang talong with tomato and cucumber",
            "Lunch": "Inihaw na manok with ensaladang talong",
            "Dinner": "Sinigang na salmon with radish and kangkong",
        },
        "Tuesday": {
            "Breakfast": "Longganisa-style chicken sausage with eggs",
            "Lunch": "Adobong manok with sauteed pechay",
            "Dinner": "Pork giniling with cabbage and green beans",
        },
        "Wednesday": {
            "Breakfast": "Tokwa and egg scramble",
            "Lunch": "Ginisang ampalaya with ground pork",
            "Dinner": "Inihaw na liempo with atchara and salad",
        },
        "Thursday": {
            "Breakfast": "Daing na bangus with salted egg and tomato",
            "Lunch": "Chicken afritada without potato, extra bell pepper",
            "Dinner": "Beef nilaga without corn and potato",
        },
        "Friday": {
            "Breakfast": "Omelet with malunggay and cheese",
            "Lunch": "Bicol express with steamed pechay",
            "Dinner": "Tinolang manok with papaya and chili leaves",
        },
        "Saturday": {
            "Breakfast": "Sardines with egg and sauteed onion",
            "Lunch": "Pork adobo with kangkong",
            "Dinner": "Grilled tuna belly with cucumber salad",
        },
        "Sunday": {
            "Breakfast": "Arroz caldo-style chicken soup using cauliflower rice",
            "Lunch": "Lumpiang sariwa filling bowl (no wrapper)",
            "Dinner": "Lechon kawali with chopped atchara and greens",
        },
    },
}

GENERIC_LOW_CARB_PLAN: MealPlan = {
    "Monday": {
        "Breakfast": "Egg scramble with mixed vegetables",
        "Lunch": "Grilled chicken salad",
        "Dinner": "Baked fish with steamed greens",
    },
    "Tuesday": {
        "Breakfast": "Greek yogurt with nuts",
        "Lunch": "Turkey lettuce wraps",
        "Dinner": "Beef and broccoli stir-fry",
    },
    "Wednesday": {
        "Breakfast": "Cheese omelet with spinach",
        "Lunch": "Tuna avocado salad",
        "Dinner": "Roast chicken with cauliflower mash",
    },
    "Thursday": {
        "Breakfast": "Cottage cheese and almonds",
        "Lunch": "Egg salad bowl",
        "Dinner": "Shrimp with garlic zucchini",
    },
    "Friday": {
        "Breakfast": "Smoked fish and boiled eggs",
        "Lunch": "Chicken Caesar salad (no croutons)",
        "Dinner": "Pork chops with green beans",
    },
    "Saturday": {
        "Breakfast": "Chia pudding (unsweetened)",
        "Lunch": "Beef burger patty with side salad",
        "Dinner": "Salmon and asparagus",
    },
    "Sunday": {
        "Breakfast": "Veggie frittata",
        "Lunch": "Grilled tofu and vegetable bowl",
        "Dinner": "Roast beef with sauteed cabbage",
    },
}


def get_country_choice() -> str:
    print("Choose your country for localized low-carb meals:")
    print("1. US")
    print("2. UK")
    print("3. Philippines")
    print("4. Others")

    selection_map = {
        "1": "US",
        "2": "UK",
        "3": "Philippines",
        "4": "Others",
        "us": "US",
        "uk": "UK",
        "philippines": "Philippines",
        "others": "Others",
    }

    raw = input("Enter choice (1-4 or country name): ").strip().lower()
    return selection_map.get(raw, "Others")


def get_goal_choice() -> str:
    print("\nChoose your nutrition goal:")
    print("1. Lose weight")
    print("2. Maintain")
    print("3. Gain muscle")

    selection_map = {
        "1": "Lose weight",
        "2": "Maintain",
        "3": "Gain muscle",
        "lose": "Lose weight",
        "lose weight": "Lose weight",
        "maintain": "Maintain",
        "gain": "Gain muscle",
        "gain muscle": "Gain muscle",
    }
    raw = input("Enter choice (1-3 or goal): ").strip().lower()
    return selection_map.get(raw, "Maintain")


def get_recommended_daily_target(country: str, goal: str) -> int:
    base_target = COUNTRY_BASE_TARGETS.get(country, COUNTRY_BASE_TARGETS["Others"])
    adjustment = GOAL_ADJUSTMENTS.get(goal, 0)
    return base_target + adjustment


def get_daily_calorie_target(country: str, goal: str) -> int:
    recommended = get_recommended_daily_target(country, goal)
    raw = input(
        f"Enter your daily calorie target (press Enter for recommended {recommended}): "
    ).strip()
    if not raw:
        return recommended

    try:
        value = int(raw)
        if value < 1000 or value > 3500:
            return recommended
        return value
    except ValueError:
        return recommended


def get_export_choice() -> bool:
    print("\nDo you want to export this plan to files?")
    print("1. Yes")
    print("2. No")

    selection_map = {
        "1": True,
        "2": False,
        "yes": True,
        "y": True,
        "no": False,
        "n": False,
    }
    raw = input("Enter choice (1-2): ").strip().lower()
    return selection_map.get(raw, True)


def get_calorie_profile(country: str) -> Dict[str, int]:
    return COUNTRY_CALORIE_PROFILES.get(country, COUNTRY_CALORIE_PROFILES["Others"])


def get_grocery_list(plan: MealPlan) -> Dict[str, List[str]]:
    grocery_list: Dict[str, List[str]] = {
        "Protein": [],
        "Vegetables": [],
        "Pantry and Extras": [],
        "Other": [],
    }

    for meals in plan.values():
        combined_text = " ".join(meals.values()).lower()
        for category, keywords in GROCERY_CATEGORIES.items():
            for keyword in keywords:
                if keyword in combined_text and keyword not in grocery_list[category]:
                    grocery_list[category].append(keyword)

    seen_items = set(
        grocery_list["Protein"]
        + grocery_list["Vegetables"]
        + grocery_list["Pantry and Extras"]
    )
    if "caesar" in " ".join(" ".join(v.values()) for v in plan.values()).lower():
        if "caesar dressing" not in seen_items:
            grocery_list["Other"].append("caesar dressing")

    return grocery_list


def print_grocery_list(plan: MealPlan) -> None:
    groceries = get_grocery_list(plan)
    print("\n" + "=" * 58)
    print("Weekly Grocery List")
    print("=" * 58)
    for category, items in groceries.items():
        if not items:
            continue
        print(f"\n{category}")
        print("-" * len(category))
        for item in sorted(items):
            print(f"- {item}")
    return groceries


def print_meal_plan(
    country: str, goal: str, daily_target: int
) -> Tuple[MealPlan, Dict[str, int], Dict[str, List[str]]]:
    print("\n" + "=" * 58)
    print(f"Low-Carb Weekly Meal Suggestion ({country})")
    print("Mon to Sun")
    print(f"Goal: {goal}")
    print(f"Daily Calorie Target: {daily_target} kcal")
    print("=" * 58)

    plan = MEAL_PLANS.get(country, GENERIC_LOW_CARB_PLAN)
    calorie_profile = get_calorie_profile(country)
    for day, meals in plan.items():
        print(f"\n{day}")
        print("-" * len(day))
        daily_estimate = 0
        for meal_name, suggestion in meals.items():
            meal_calories = calorie_profile.get(meal_name, 500)
            meal_portion = PORTION_BY_MEAL.get(meal_name, "1 serving")
            daily_estimate += meal_calories
            print(
                f"{meal_name}: {suggestion} | Portion: {meal_portion} | Est: {meal_calories} kcal"
            )
        print(f"Daily Estimated Total: {daily_estimate} kcal (Target: {daily_target} kcal)")

    groceries = print_grocery_list(plan)
    return plan, calorie_profile, groceries


def export_plan_files(
    country: str,
    goal: str,
    daily_target: int,
    plan: MealPlan,
    calorie_profile: Dict[str, int],
    groceries: Dict[str, List[str]],
) -> Tuple[str, str]:
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_country = country.lower().replace(" ", "_")
    txt_path = Path(f"weekly_plan_{safe_country}_{timestamp}.txt")
    csv_path = Path(f"weekly_plan_{safe_country}_{timestamp}.csv")

    with txt_path.open("w", encoding="utf-8") as txt_file:
        txt_file.write("Low-Carb Weekly Meal Suggestion\n")
        txt_file.write(f"Country: {country}\n")
        txt_file.write(f"Goal: {goal}\n")
        txt_file.write(f"Daily Calorie Target: {daily_target} kcal\n")
        txt_file.write("\n")

        for day, meals in plan.items():
            txt_file.write(f"{day}\n")
            txt_file.write("-" * len(day) + "\n")
            daily_estimate = 0
            for meal_name, suggestion in meals.items():
                meal_calories = calorie_profile.get(meal_name, 500)
                meal_portion = PORTION_BY_MEAL.get(meal_name, "1 serving")
                daily_estimate += meal_calories
                txt_file.write(
                    f"{meal_name}: {suggestion} | Portion: {meal_portion} | Est: {meal_calories} kcal\n"
                )
            txt_file.write(
                f"Daily Estimated Total: {daily_estimate} kcal (Target: {daily_target} kcal)\n\n"
            )

        txt_file.write("Weekly Grocery List\n")
        txt_file.write("===================\n")
        for category, items in groceries.items():
            if not items:
                continue
            txt_file.write(f"\n{category}\n")
            txt_file.write("-" * len(category) + "\n")
            for item in sorted(items):
                txt_file.write(f"- {item}\n")

    with csv_path.open("w", newline="", encoding="utf-8") as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(
            [
                "row_type",
                "country",
                "goal",
                "day",
                "meal",
                "suggestion",
                "portion",
                "estimated_kcal",
                "daily_target",
                "category",
                "item",
            ]
        )

        for day, meals in plan.items():
            for meal_name, suggestion in meals.items():
                writer.writerow(
                    [
                        "meal",
                        country,
                        goal,
                        day,
                        meal_name,
                        suggestion,
                        PORTION_BY_MEAL.get(meal_name, "1 serving"),
                        calorie_profile.get(meal_name, 500),
                        daily_target,
                        "",
                        "",
                    ]
                )

        for category, items in groceries.items():
            for item in sorted(items):
                writer.writerow(
                    [
                        "grocery",
                        country,
                        goal,
                        "",
                        "",
                        "",
                        "",
                        "",
                        daily_target,
                        category,
                        item,
                    ]
                )

    return str(txt_path), str(csv_path)


def main() -> None:
    country = get_country_choice()
    goal = get_goal_choice()
    daily_target = get_daily_calorie_target(country, goal)
    should_export = get_export_choice()
    plan, calorie_profile, groceries = print_meal_plan(country, goal, daily_target)
    if should_export:
        txt_file, csv_file = export_plan_files(
            country, goal, daily_target, plan, calorie_profile, groceries
        )
        print("\nFiles exported:")
        print(f"- {txt_file}")
        print(f"- {csv_file}")
    else:
        print("\nExport skipped.")


if __name__ == "__main__":
    main()
