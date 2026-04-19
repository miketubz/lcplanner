# Low-Carb Weekly Meal Planner

This project now includes:
- A web app (static HTML, CSS, JS)
- The original Python CLI

Supported country options:
- US
- UK
- Philippines
- Others (generic low-carb fallback)

## Run As Web App (Recommended)

Open [index.html](index.html) in your browser.

If you want a local server, run this from the project folder:

python -m http.server 8000

Then open http://localhost:8000

Web app features:
- Country + goal selection
- Auto-recommended daily calorie target
- Monday to Sunday meal output
- Country-based calorie profile
- Grocery list generation
- CSV and TXT download

## Run As Python CLI

python main.py

CLI flow:
- Choose country
- Choose goal
- Enter daily calorie target (or press Enter for recommendation)
- Choose export Yes or No

## Will This Work On GitHub Or Vercel?

Yes, both.

### GitHub

Use GitHub Pages with [index.html](index.html) as the site entry file.

Quick steps:
1. Push this project to a GitHub repository.
2. In repository settings, open Pages.
3. Set source to Deploy from a branch.
4. Select main branch and root folder.
5. Save and wait for the site URL.

### Vercel

This is a static site, so Vercel deploy is straightforward.

Quick steps:
1. Import the GitHub repository in Vercel.
2. Framework preset: Other.
3. Build command: leave empty.
4. Output directory: leave empty (root).
5. Deploy.

Vercel will serve [index.html](index.html) automatically.
