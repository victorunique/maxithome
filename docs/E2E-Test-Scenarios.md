# E2E Test Scenarios - MaxitHome v1.0

This specification document outlines End-to-End (E2E) testing scenarios for MaxitHome v1.0. These scenarios simulate real-world user behaviors, accessibility navigation, and state-retention flows.

---

## 1. Journey 1: Child Discovery & Multi-Select Filter

*   **Traceability:** `User-Flows.md` Section 2.1, `PRD.md` FR-2.0
*   **Target User:** Leo (9-year-old child) seeking a beginner-friendly logic game.
*   **Test Environment:** Desktop and Mobile layout viewports.

### E2E-FLOW-01: Filter Intersection & Empty Recovery
1.  **Start State:** User opens browser and loads the homepage `/`. All cards from `apps.json` are rendered.
2.  **Action - Search:** User types `"logic"` in the search input box.
    *   *Verification:* Grid updates using Framer Motion animations in under 100ms. Non-matching apps are filtered out.
3.  **Action - Filter Application:** Under the Filter Panel, the user clicks the checkboxes:
    *   **Type:** `Game`
    *   **Cognitive Skill:** `Logic`
    *   **Difficulty:** `Beginner`
    *   **Age Suitability:** `8+`
    *   *Verification:* The checkbox visual fills update immediately. Grid filters apply intersection logic (AND across dimensions, OR within dimensions), displaying only compliant cards (e.g., "Herbert").
4.  **Action - No Matches Scenario:** User keeps active selections and clicks "12+" under Age Suitability.
    *   *Verification:* If no apps match, the card grid transitions to an **Empty State** displaying: *"No results found matching your criteria"* alongside a clear "Reset Filters" button.
5.  **Action - Recovery:** User clicks the "Reset Filters" button.
    *   *Verification:* Checkbox selection resets, input search query clears, and the full catalog grid is restored.

---

## 2. Journey 2: App Landing, Favorites Sync & Launch

*   **Traceability:** `User-Flows.md` Section 2.2, `PRD.md` FR-3.0, FR-4.0
*   **Target User:** Regular user seeking detailed instructions and tool access.
*   **Test Environment:** Standard browser viewport, LocalStorage active.

### E2E-FLOW-02: App Detail Lifecycle & Outbound Launch
1.  **Start State:** User is on the Homepage directory.
2.  **Action - Detail Entry:** User identifies the card for "FlashLearn" and clicks "Details".
    *   *Verification:* Router redirects path to `/apps/flashlearn`. Page displays:
        *   App Title: "FlashLearn".
        *   Instruction Text: "Boost your vocabulary and memory..."
        *   Screenshot Gallery Carousel is populated.
        *   FTC Legal outcome disclaimer is displayed.
        *   Document title changes to `FlashLearn | MindFlex Cognitive Apps`.
3.  **Action - Bookmarking:** User clicks the Heart Bookmark toggle.
    *   *Verification:* Heart icon changes from outlined to solid colored. Browser `LocalStorage` key `maxithome_favorites` contains `"flashlearn"`.
4.  **Action - Tab Navigation Carousel:** User clicks the "Next" button in the gallery carousel.
    *   *Verification:* Slideshow shifts horizontally to reveal the second screenshot. Alt tags load dynamically.
5.  **Action - Launching Redirect:** User clicks the primary CTA button "Enter App".
    *   *Verification:* Browser opens a new tab (`target="_blank"`, `rel="noopener noreferrer"`) loading `https://victorunique.github.io/flashlearn`. The main MaxitHome aggregator page remains active in the original tab. Custom analytics hook `trackAppLaunch` logs the event details.
6.  **Action - State Retention on Return:** User returns to the MaxitHome tab and clicks "← Back to Directory".
    *   *Verification:* Router returns user to the `/` root, preserving previously applied search/filter inputs and grid scroll location.

---

## 3. Journey 3: Returning User & Bookmarks Grid

*   **Traceability:** `User-Flows.md` Section 2.3, `PRD.md` FR-4.0, FR-5.0
*   **Target User:** Arthur (Senior, 72) returning to launch his bookmarked Sudoku game.
*   **Test Environment:** Standard browser viewport.

### E2E-FLOW-03: Favorites Dashboard & Offline Mode
1.  **Start State:** User has previously bookmarked `"sudoku"` and `"gomoku"`. Browser `LocalStorage` contains `["sudoku", "gomoku"]`. User loads `/`.
2.  **Action - Bookmarks Toggle:** User clicks the "Favorites Only" switch in the header.
    *   *Verification:* The directory grid filters immediately to only display the two cards for "Sudoku" and "Gomoku".
3.  **Action - Remove Bookmark:** User clicks the Heart toggle on the "Gomoku" card.
    *   *Verification:* The "Gomoku" card disappears from the grid immediately. `LocalStorage` favorites array is updated to `["sudoku"]`.
4.  **Action - Clear All Bookmarks:** User removes the bookmark for "Sudoku".
    *   *Verification:* The grid transitions to an empty favorites view showing: *"You haven't saved any apps yet! Browse the directory and click the heart icon to save."*
5.  **Action - Offline Operations:** User disconnects network coverage (offline simulation) and reloads the homepage.
    *   *Verification:* The service worker serves the cached HTML, CSS, and catalog metadata from `apps.json`. An offline status banner displays: *"Offline Mode - Showing cached directory."* The favorites list remains fully interactive and functional.

---

## 4. Journey 4: Senior Accessibility Navigation

*   **Traceability:** `Visual-Guidelines.md` Section 6, `PRD.md` NFR-2.0
*   **Target User:** Arthur (Senior, 72) requiring custom layouts and visual aids.
*   **Test Environment:** Accessible keyboard-only control (no mouse cursor).

### E2E-FLOW-04: Keyboard Navigation & Theme Transition
1.  **Start State:** User opens the platform `/`. Font Scaling is set to `"Normal"`.
2.  **Action - Font Change:** User clicks the font scale button in the accessibility settings, changing the preference to "Large".
    *   *Verification:* Typography scales up to large dimensions across all cards, titles, and layouts. The elements scale without text cropping or page overlaps.
3.  **Action - High Contrast Dark Mode:** User switches theme to Warm Dark Mode.
    *   *Verification:* Surface containers change colors to deep slate, text to soft ivory, and interactive elements to vibrant amber. Text contrast ratio exceeds 4.5:1.
4.  **Action - Keyboard Focus Traversal:** User presses the `Tab` key to traverse the interactive page elements.
    *   *Verification:* Focus indicator outlines (`2px solid Accent Solid` with a `2px` offset) appear sequentially on:
        *   Logo Brand Link
        *   Theme Switcher
        *   Favorites Toggle
        *   Search Box
        *   Filter Checkboxes (Type, Skill, etc.)
        *   App Cards CTA buttons
5.  **Action - Selection Execution:** User tabs to the "Game" filter checkbox and presses the Spacebar.
    *   *Verification:* Checkbox toggles state, filtering the card grid. Screen reader reads the state using correct `aria-checked` values.
