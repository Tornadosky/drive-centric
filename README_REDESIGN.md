# DriveCentral landing page redesign

This handoff keeps the original project stack: plain HTML, CSS, and vanilla JavaScript with no build step.

## What changed

- Replaced the gradient loop logo with a compact monochrome D mark and updated `logo.svg`, `logo-white.svg`, and `favicon.svg`.
- Rebuilt the landing page around a warm neutral palette, dark ink, and one lime accent.
- Replaced the gradient pill buttons with compact, rounded rectangular buttons and clear hover states.
- Replaced generic feature icons with contained motion scenes for response speed, pipeline hygiene, lead routing, CRM, communications, AI, integrations, campaigns, and reporting.
- Made motion local to product scenes. The hero product window has a pause/play control; `prefers-reduced-motion` pauses animated scenes.
- Removed height-changing, page-dragging feed behavior and kept the hero preview in a fixed layout.
- Reworked the “For your reps” stories into a larger phone, manager dashboard, and next-best-action composition.
- Updated all public contact points from `hello@drivecentric.space` to `support@drivecentric.space`.
- Added `dashboard.html` for before/after review and `before/` as a rollback copy of the original repository.

## Integrate

1. Copy `index.html`, `styles.css`, and `script.js` over the matching files in the existing project.
2. Copy `assets/logo.svg`, `assets/logo-white.svg`, and `assets/favicon.svg`.
3. Keep `dashboard.html`, `dashboard.css`, `README_REDESIGN.md`, and `before/` if you want the review dashboard and rollback snapshot.
4. Open `index.html` or deploy the folder as before.

No external JavaScript dependency was added. The source remains deployable as a static site.
