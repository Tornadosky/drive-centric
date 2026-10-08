# DriveCentral

Marketing site for DriveCentral, an AI-powered CRM for car dealerships. Live at [drivecentric.space](https://drivecentric.space).

Plain HTML, CSS and vanilla JavaScript. No build step.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Structure

- `index.html`: page markup and the inline SVG icon set
- `styles.css`: design tokens, layout, animations and breakpoints
- `script.js`: header state, mobile menu, headline animation, live lead feed, scroll reveals and counters
- `assets/`: logo, favicon and editorial images

## Deploy

The site is hosted on Vercel in the `drivecentric` project. From this folder:

```bash
vercel deploy --prod
```
