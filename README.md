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
- Photo calorie estimate (camera or upload)
- Save calorie estimates (numbers only, no photo stored)

## Photo Calorie Estimate Setup (Netlify)

The photo calorie feature uses a Netlify Function:
- Function path: `netlify/functions/analyze-calories.js`
- Endpoint used by the app: `/.netlify/functions/analyze-calories`

Required environment variable in Netlify:
- `OPENAI_API_KEY` = your OpenAI API key

Privacy behavior:
- The app does not save photo files in localStorage.
- Photos are sent only for one-time analysis and are cleared when you tap Clear Photo.
- Saved entries contain only calorie estimate text/numbers.

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

## Copyright

Copyright 2026 Mike Tubel. All rights reserved.

Created by Mike Tubel.

## Medical Disclaimer

This planner is for general educational guidance only and is not medical advice.
If you have any medical condition, are pregnant, nursing, or taking medication, consult your doctor or a licensed healthcare professional before starting any diet plan.
