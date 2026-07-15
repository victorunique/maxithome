# MindFlex - Cognitive Training Apps & Games Aggregator

MindFlex is a curated directory and aggregator platform that gathers classic cognitive training tools, puzzles, and interactive educational games. It aims to support human intelligence augmentation in the AI era by offering challenges focused on memory, language, mathematics, spatial reasoning, logic, and attention.

---

## 1. Project Background

In the age of rapid AI advancements, keeping cognitive faculties sharp and active is increasingly important. MindFlex provides users with a central, elegant, and modern interface to discover, bookmark, and launch local or external cognitive exercises and games.

---

## 2. Architecture Overview

MindFlex is built as a single-page application (SPA) with a server-side pre-rendering build step for SEO optimization.

- **Frontend Core**: React 19, TypeScript, and React Router Dom 7.
- **Styling**: Tailwind CSS v4 (configured via PostCSS with `@config`).
- **SEO & Pre-rendering**: Custom pre-render script (`scripts/prerender.js`) that outputs pre-populated static pages for all cognitive app detail views, skill category lists, and type filters to optimize page load speeds and search engine readability.
- **State Management & Persistence**: Local browser-based storage (LocalStorage) for bookmarking favorite applications.

---

## 3. Design Principles

- **Rich & Warm Aesthetics**: A curated off-white/dark theme built on warm hues (`hsl(36, ...)`), sleek layout, subtle micro-animations (framer-motion), and rounded containers to provide a premium, modern, and accessible user experience.
- **Accessibility (A11y)**: Built-in text scaling (Normal, Large, Extra Large), keyboard navigation support with high-contrast `:focus-visible` ring indicators, and screen reader-friendly labels.
- **Responsive Layout**: Fluid CSS Grid and Flexbox layouts optimized for mobile devices, tablets, and wide desktop screens.

---

## 4. Environment & Dependency Setup

The project uses `uv` for managing virtual environments and tool execution for test automation, and `npm` for Node.js package management.

### Python Environment (for Playwright Tests)
Ensure `uv` is installed on your system. Run the following commands:
```bash
# Create a virtual environment
uv venv

# Install Playwright and browser binaries
uv pip install playwright
uv run playwright install chromium
```

### Node.js Frontend Dependencies
```bash
npm install
```

---

## 5. Build Instructions

To compile the TypeScript code, generate the production bundles, and run the SEO pre-rendering step, run:
```bash
npm run build
```
This script runs three tasks sequentially:
1. `tsc -b`: Compiles TypeScript.
2. `vite build`: Packages assets into the `dist/` directory.
3. `npm run prerender`: Runs `scripts/prerender.js` to pre-generate HTML directories for SEO.

---

## 6. Testing Instructions

### Unit & Hook Tests
To run unit and custom React hook tests using Vitest:
```bash
npm run test
```

### End-to-End (E2E) Layout & UI Tests
To run end-to-end integration and layout tests via Playwright:
```bash
# Run general layout test
uv run python /Users/victorxu/.gemini/config/skills/webapp-testing/scripts/with_server.py --server "npm run dev" --port 5173 -- uv run python src/__tests__/e2e_layout_test.py

# Run footer layout & info refactoring test
uv run python /Users/victorxu/.gemini/config/skills/webapp-testing/scripts/with_server.py --server "npm run dev" --port 5173 -- uv run python src/__tests__/e2e_footer_test.py
```

---

## 7. Deployment Instructions

Since the application is fully static, the deployment process involves serving the `dist/` folder.
1. Run `npm run build` to compile the production bundle.
2. Deploy the generated files inside `dist/` to any static hosting provider (e.g., GitHub Pages, Vercel, Netlify, or AWS S3).

---

## 8. Usage Examples

### Running the Development Server
To launch the hot-reloading development server locally:
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### Bookmarking a Cognitive Application
1. Browse the directory grid on the homepage.
2. Click the **Heart icon** in the top-right corner of any App Card.
3. Click the **Favorites Only** toggle in the navigation header to view only your saved exercises.
