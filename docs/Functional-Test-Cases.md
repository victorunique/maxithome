# Functional Test Cases - MaxitHome v1.0

This specification document outlines functional test cases at the UI and feature levels for the MaxitHome v1.0 aggregator platform.

---

## 1. Global Shell & Navigation

### Feature: Header Controls
*   **Test Case ID:** FT-SHELL-01
*   **Preconditions:** User is on any page of the platform.
*   **Steps:**
    1. Click the light/dark theme switch icon in the header.
    2. Observe the interface transition (cream/sand background $\leftrightarrow$ deep slate/amber accents).
    3. Reload the browser page.
*   **Expected Result:** The interface switches visual modes matching the HSL values defined in the Design System. The selection persists in `LocalStorage` (`maxithome_theme`) and is restored upon page reload.
*   **Priority:** High

*   **Test Case ID:** FT-SHELL-02
*   **Preconditions:** Viewport width is set to 375px (mobile simulation).
*   **Steps:**
    1. Observe the header layout.
    2. Click the Hamburger menu button.
    3. Select a navigation link (e.g. "About" or "Apps & Games").
*   **Expected Result:** The header logo collapses to icon-only. The navigation links and settings toggles collapse into a visible drawer. Clicking the menu icon toggles drawer visibility. Selecting a link smoothly scrolls to the target anchor.
*   **Priority:** High

### Feature: Accessibility Font Scaling
*   **Test Case ID:** FT-SHELL-03
*   **Preconditions:** User is on the Homepage directory. LocalStorage has no prior `maxithome_font_scale` key.
*   **Steps:**
    1. Locate the Font Scale selector in the settings header.
    2. Select the "Large" option.
    3. Observe the typography scale changes.
    4. Select the "Extra-Large" option.
    5. Observe the typography scale changes.
    6. Select the "Normal" option.
*   **Expected Result:** Selecting "Large" and "Extra-Large" immediately increases body copy and caption font-sizes dynamically without breaking layouts or overlapping elements. Value is persisted in LocalStorage as `"large"` or `"extra-large"`. Selecting "Normal" returns the UI font size to the base spacing unit (`1rem = 16px`).
*   **Priority:** Medium

---

## 2. Search & Filter Engine

### Feature: Global Search Input
*   **Test Case ID:** FT-SEARCH-01
*   **Preconditions:** App catalog `apps.json` contains active records (e.g., "FlashLearn", "Maths Quest", "Herbert"). Search field is empty.
*   **Steps:**
    1. Focus on the search input box.
    2. Type the query `"logic"`.
    3. Observe the card listing grid.
*   **Expected Result:** The search input receives a visible focus ring matching the `Accent Focus` color token. The card grid dynamically updates within 100ms (debounce) to display cards matching "logic" in name, description, or tags (e.g., "Herbert").
*   **Priority:** High

*   **Test Case ID:** FT-SEARCH-02
*   **Preconditions:** Search input is active and contains the string `"logic"`.
*   **Steps:**
    1. Verify the presence of the clear ("X") button in the input field.
    2. Click the clear ("X") button.
*   **Expected Result:** The search query is immediately cleared, the input returns to its default placeholder state, and the directory grid restores the full listing of apps.
*   **Priority:** High

*   **Test Case ID:** FT-SEARCH-03
*   **Preconditions:** User is on the Homepage directory.
*   **Steps:**
    1. Type a query containing non-alphanumeric characters: `"<script>alert(1)</script>"`.
    2. Press Enter.
*   **Expected Result:** The search input sanitizes the text string, avoids cross-site scripting (XSS) execution, and gracefully degrades to showing the "No apps found" Empty State.
*   **Priority:** High

### Feature: Multi-Dimensional Tag Filter Panel
*   **Test Case ID:** FT-FILTER-01
*   **Preconditions:** User is on the Homepage directory. All filter checkboxes are unchecked.
*   **Steps:**
    1. Click the "Game" checkbox under the **Type** category.
    2. Click the "Logic" checkbox under the **Cognitive Skill** category.
    3. Observe the grid.
*   **Expected Result:** The checkboxes render selected states with checking icons and brand colors. The grid applies AND logic: displaying only cards that are categorized as both a "Game" AND train "Logic" skills.
*   **Priority:** High

*   **Test Case ID:** FT-FILTER-02
*   **Preconditions:** "Memory" checkbox is selected under **Cognitive Skill**.
*   **Steps:**
    1. Click the "Focus" checkbox under the same **Cognitive Skill** category.
    2. Observe the grid.
*   **Expected Result:** Both boxes render selected. The grid applies OR logic within the category: displaying apps that train "Memory" OR "Focus".
*   **Priority:** High

*   **Test Case ID:** FT-FILTER-03
*   **Preconditions:** The catalog has zero apps that match a specific combination of filters (e.g., Type: Tool + Cognitive Skill: Creativity + Difficulty: Advanced).
*   **Steps:**
    1. Select the conflicting filter combination.
    2. Observe the grid display.
*   **Expected Result:** The grid transitions using smooth animations to an **Empty State** showing the custom illustration, "No results found matching your criteria," and displaying a prominent "Clear Filters" button. Clicking the button resets all checkbox states and restores the grid.
*   **Priority:** High

*   **Test Case ID:** FT-FILTER-04
*   **Preconditions:** Active filters exist.
*   **Steps:**
    1. Tab through the Filter Panel using keyboard navigation.
    2. Verify each option is focusable.
    3. Press the Spacebar on a selected filter checkbox.
*   **Expected Result:** Focus ring is clearly visible on each checkbox. Pressing Spacebar toggles the checkbox state and triggers client-side filter updates instantly.
*   **Priority:** High

### Feature: Sort Dropdown
*   **Test Case ID:** FT-SORT-01
*   **Preconditions:** User is on the Homepage directory. Sort dropdown is set to "Default".
*   **Steps:**
    1. Observe the order of App Cards in the grid.
*   **Expected Result:** The cards display in the original order defined in `apps.json` (the default catalog sequence).
*   **Priority:** High

*   **Test Case ID:** FT-SORT-02
*   **Preconditions:** User is on the Homepage directory with multiple app cards visible.
*   **Steps:**
    1. Click the Sort dropdown.
    2. Select "Name (A → Z)".
    3. Observe the card grid.
*   **Expected Result:** The App Cards reorder alphabetically by name in ascending order (e.g., BlockCraft, Chess, FlashLearn, Gomoku, ...).
*   **Priority:** High

*   **Test Case ID:** FT-SORT-03
*   **Preconditions:** Sort dropdown is set to "Name (A → Z)".
*   **Steps:**
    1. Change the Sort dropdown to "Name (Z → A)".
    2. Observe the card grid.
*   **Expected Result:** The App Cards reorder alphabetically by name in descending order (e.g., Word Search, Uno, Sudoku, ...).
*   **Priority:** High

*   **Test Case ID:** FT-SORT-04
*   **Preconditions:** Sort dropdown is set to a non-default option (e.g., "Name (A → Z)").
*   **Steps:**
    1. Click the "Reset All" button in the Filter Panel or the "Reset All Filters" button.
    2. Observe the Sort dropdown and card grid.
*   **Expected Result:** The Sort dropdown resets to "Default" and the card grid returns to the original `apps.json` catalog order.
*   **Priority:** High

*   **Test Case ID:** FT-SORT-05
*   **Preconditions:** User has active filters applied (e.g., Type: "Game") and cards are visible.
*   **Steps:**
    1. Select "Recently Updated" from the Sort dropdown.
    2. Observe the card grid.
*   **Expected Result:** Only the filtered subset of cards (matching the active filters) is displayed, and within that subset, the cards are sorted by `updatedAt` date in descending order (most recently updated first).
*   **Priority:** High

---

## 3. App Card Interactions

### Feature: App Card UI
*   **Test Case ID:** FT-CARD-01
*   **Preconditions:** A populated grid of App Cards is displayed.
*   **Steps:**
    1. Hover the cursor over an individual App Card.
    2. Verify transition visual behavior.
*   **Expected Result:** The App Card shifts -4px vertically using a smooth ease-out curve, displays a subtle drop-shadow, and highlights its borders with a light brand accent tint.
*   **Priority:** Medium

*   **Test Case ID:** FT-CARD-02
*   **Preconditions:** User is logged out (default state, zero auth).
*   **Steps:**
    1. Find a card (e.g., "Sudoku").
    2. Click the Heart Bookmark button on the card.
    3. Verify heart visual state.
    4. Reload the page.
    5. Verify card state.
*   **Expected Result:** The heart icon updates from an outline shape to a solid red/amber filled shape. The app's unique ID (`"sudoku"`) is appended to the browser's `LocalStorage` favorites array. Upon page reload, the heart icon remains in its solid filled state.
*   **Priority:** Critical

*   **Test Case ID:** FT-CARD-03
*   **Preconditions:** The "Favorites Only" toggle in the header is turned OFF. User has bookmarked "Sudoku" (FT-CARD-02 is completed).
*   **Steps:**
    1. Click the "Favorites Only" toggle to ON.
    2. Observe the directory grid.
*   **Expected Result:** The grid dynamically filters to show only the "Sudoku" card. All other non-bookmarked apps are hidden.
*   **Priority:** Critical

*   **Test Case ID:** FT-CARD-04
*   **Preconditions:** User is navigating via keyboard.
*   **Steps:**
    1. Tab to an App Card.
    2. Tab to the "Enter App" button.
    3. Press Enter.
*   **Expected Result:** Focus outlines are clearly visible. Pressing Enter triggers a browser redirection to the app subdomain (e.g., `https://sudoku.maxithome.com`) opening in a new tab (`target="_blank"`), leaving the aggregator page open.
*   **Priority:** Critical

---

## 4. App Details Screen

### Feature: App Landing Page (`/apps/:id`)
*   **Test Case ID:** FT-DETAIL-01
*   **Preconditions:** User is on the Homepage directory.
*   **Steps:**
    1. Click the "Details" button on the "FlashLearn" card.
    2. Observe the browser URL and page layout.
*   **Expected Result:** The page navigates to `/apps/flashlearn`. The details view dynamically populates text fields (Name, description, "How to Use" instructions) matching the `"flashlearn"` ID record. Document title changes to `FlashLearn | MindFlex Cognitive Apps`.
*   **Priority:** High

*   **Test Case ID:** FT-DETAIL-02
*   **Preconditions:** User is on `/apps/flashlearn`.
*   **Steps:**
    1. Click the Left/Right navigation arrows on the Screenshot Gallery Carousel.
    2. Tab through indicators via keyboard.
*   **Expected Result:** The gallery transitions between application screenshots using a horizontal sliding layout. Image `alt` tags read descriptive labels from metadata. Left and right arrow keys control navigation when focused.
*   **Priority:** Medium

*   **Test Case ID:** FT-DETAIL-03
*   **Preconditions:** User is on `/apps/flashlearn`.
*   **Steps:**
    1. Locate the "Related Apps" card grid.
    2. Observe the recommendations.
*   **Expected Result:** A list of 3 similar apps is loaded based on shared skill tags. Clicking on any related app card navigates smoothly to its details page.
*   **Priority:** Medium

*   **Test Case ID:** FT-DETAIL-04
*   **Preconditions:** User is on `/apps/flashlearn`.
*   **Steps:**
    1. Click the "← Back to Directory" link.
*   **Expected Result:** User is navigated back to the `/` root. The homepage restores the exact search queries, filter state, and scroll position previously set before the user entered the details route.
*   **Priority:** High

*   **Test Case ID:** FT-DETAIL-05
*   **Preconditions:** User inputs an invalid or non-existent app ID: `/apps/unknown-game`.
*   **Steps:**
    1. Navigate directly to `/apps/unknown-game` in the browser URL.
*   **Expected Result:** The application catches the route error, avoids execution exceptions, and redirects the user to a custom 404 error page presenting a "Return to Home Directory" CTA.
*   **Priority:** High

*   **Test Case ID:** FT-DETAIL-06
*   **Preconditions:** User has disabled LocalStorage cookies/storage in browser settings.
*   **Steps:**
    1. Load any app details page `/apps/:id`.
    2. Attempt to click the Heart bookmark button.
*   **Expected Result:** The toggle detects the browser exception, prevents a application crash, and displays a non-intrusive warning badge indicating: "Favorites cannot be saved because cookies/storage are disabled."
*   **Priority:** High
