# Month Calendar

A simple 7-column monthly calendar layout built with React, Vite, and Tailwind CSS. Borders and grid integrity are emphasized to keep the layout consistent.

## Scripts
- `npm install` – install dependencies
- `npm run dev` – start the dev server
- `npm run build` – create a production build
- `npm run preview` – preview the production build

## Notes
- The calendar relies on a strict `grid-cols-7` layout; altering the column count will break the grid logic.
- Tailwind is configured via `tailwind.config.js` with content scanning for `index.html` and `src/**/*.{js,jsx}`.
