# Acceptance Criteria - MaxitHome v1.0

This specification document outlines the formal, deterministic Acceptance Criteria (AC) and Definition of Done (DoD) for the MaxitHome v1.0 aggregator platform, derived from the product requirements.

---

## 1. Feature: Metadata-Driven Page Generation

### Acceptance Conditions
*   **AC-1.1 (Single Source of Truth):** The application catalog must be maintained exclusively in `/public/apps.json` conforming to the Draft-2020-12 JSON schema. No application arrays or parameters may be hardcoded into the React codebase.
*   **AC-1.2 (Dynamic Directory Rendering):** Adding a new JSON object to `apps.json` must automatically generate its corresponding homepage card, details landing page layout, search index keys, and filter checkbox states on app launch.
*   **AC-1.3 (Zero-Code Scalability):** Addition or editing of application information (such as screenshots, tags, name, subdomain, instructions) must require zero modifications to React components, routing configurations, or build tools.

### Definition of Done (DoD)
1.  JSON Schema validation script passes successfully in the build pipeline.
2.  Dynamic routes are resolved at build time using Vite SSG, producing pre-rendered HTML files for each catalog ID.
3.  The console displays zero react rendering warnings or data parsing errors on initialization.

---

## 2. Feature: Multi-Dimensional Search & Filtering

### Acceptance Conditions
*   **AC-2.1 (Instant Query Matching):** Real-time text search must filter the directory grid based on matching character sequences in the fields: `name`, `shortDescription`, `longDescription`, and tag strings.
*   **AC-2.2 (Tag Selection Logic):** Checkbox selections must apply:
    *   **OR logic** (union) within the same category (e.g., selecting "Memory" and "Focus" displays apps matching either skill).
    *   **AND logic** (intersection) across different categories (e.g., selecting "Game" and "Beginner" displays only apps that match both criteria).
*   **AC-2.3 (UI State Transitions):** Grid card layouts must transition smoothly (200–300ms duration) using Framer Motion animations as filters or searches change.
*   **AC-2.4 (Empty Search Recovery):** If selections result in zero matches, the UI must render a custom Empty illustration with a "Reset Filters" action button. Clicking the action button must clear all checkboxes and text queries.
*   **AC-2.5 (Input Sanitization):** Search input strings must be sanitized of special characters. HTML or JavaScript script inputs must not execute.

### Definition of Done (DoD)
1.  Search debounce time is verified to be 100ms.
2.  Unit tests cover AND/OR tag combination algorithms with 100% statement coverage.
3.  Input forms are validated to prevent injection vulnerabilities.

---

## 3. Feature: App Details Landing Page (`/apps/:id`)

### Acceptance Conditions
*   **AC-3.1 (Details Layout Completeness):** The `/apps/:id` path must render:
    *   Dynamic assets (Icon, Title, Category tags, Difficulty, Age Suitability).
    *   Step-by-step instructions under a "How to Use" header.
    *   A horizontal sliding Screenshot Gallery Carousel.
    *   An outcome claims disclaimer complying with FTC guidelines.
    *   A "Related Apps" sidebar containing up to 3 apps with the highest overlap of cognitive skill tags.
*   **AC-3.2 (Outbound Redirection Security):** Clicking the primary CTA button "Launch App" must redirect the user to the destination subdomain. The link must open in a new browser tab (`target="_blank"`) and contain security attributes `rel="noopener noreferrer"`.
*   **AC-3.3 (Invalid ID Handling):** Navigating directly to a URL parameter `:id` that is not present in `apps.json` must redirect the user to a styled 404 page.
*   **AC-3.4 (State Preservation):** Clicking the "← Back to Directory" navigation link must return the user to the `/` root, restoring the exact filter states and grid scroll position active before entering the details page.

### Definition of Done (DoD)
1.  Verification that all outbound links include `target="_blank"` and `rel="noopener noreferrer"`.
2.  Dynamic title bindings are confirmed working via React Helmet.
3.  Carousel arrows are verified to support Left/Right keyboard events.

---

## 4. Feature: No-Auth Favorites / Bookmarking

### Acceptance Conditions
*   **AC-4.1 (No-Auth Toggle):** Users must be able to toggle bookmark status on cards or detail layouts. The toggle action must update the heart icon outline to a solid fill instantly.
*   **AC-4.2 (State Persistence):** Favorited application IDs must be persisted in the browser `LocalStorage` under the key `maxithome_favorites`. Bookmarks must survive browser restarts.
*   **AC-4.3 (Favorites Dashboard Filter):** Activating the "Favorites Only" switch in the header navigation must filter the directory grid to display only bookmarked cards. If the bookmarks list is empty, displays custom empty state instructions.
*   **AC-4.4 (Incognito & Permission Robustness):** If LocalStorage access is blocked by browser policies (e.g. incognito settings), the application must catch the write exception, allow normal browsing, and notify the user via a status banner.

### Definition of Done (DoD)
1.  Data validation verifies only valid string IDs are saved to local storage.
2.  Manual test confirms bookmarks remain populated after closing and re-opening the browser window.
3.  Robust try-catch fallback structures cover all storage accessor functions.

---

## 5. Feature: Responsive Visual & Accessibility Shell

### Acceptance Conditions
*   **AC-5.1 (Contrast & Theme Conformity):** Color theme switches must alter all layout backgrounds, surface containers, borders, and text tokens matching the HSL values defined in `Visual-Guidelines.md`. Color contrast ratios must exceed **4.5:1** for standard body copy.
*   **AC-5.2 (Accessibility Font Adjustments):** Selecting font-scale options in the settings header ("Large", "Extra-Large") must scale text elements dynamically. The layout must handle the scaling without text collisions or clipping.
*   **AC-5.3 (Keyboard Navigation & Outlines):** Users must be able to navigate all inputs, filters, buttons, and links using the `Tab` key. Active focus states must receive a visible focus outline: `2px solid Accent Solid` with a `2px` offset.
*   **AC-5.4 (Screen Reader Compatibility):** All interactive components must utilize semantic HTML tags and feature dynamic ARIA attributes (e.g., `aria-checked` for checkboxes, `aria-pressed` for bookmark buttons). Images must populate `alt` text from metadata.
*   **AC-5.5 (Touch Targets):** Buttons, checkboxes, toggles, and details CTAs must offer a minimum touch target area of **48px x 48px** with appropriate margins.

### Definition of Done (DoD)
1.  Lighthouse Accessibility audit score yields $\ge$ 95.
2.  Lighthouse Performance score yields $\ge$ 90.
3.  The application layout is verified scale-resilient up to 200% zoom without horizontal scrollbars.
4.  Zero accessibility warnings or critical issues are identified by `axe-core`.
