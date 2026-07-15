# Integration Test Cases - MaxitHome v1.0

This specification document outlines integration test scenarios to validate system boundaries, data contracts, state serialization, and analytics event delivery for the MaxitHome v1.0 aggregator platform.

---

## 1. Metadata API Contract Integration

### Feature: JSON Catalog Loading (`/apps.json`)
*   **Endpoint:** `/apps.json` (runtime fetch boundary)
*   **Test Case ID:** IT-CONTRACT-01
*   **Description:** Validate that the client application parses and conforms to the specified JSON schema when fetching the catalog.
*   **Input Data:** Mocked HTTP response from `/apps.json` containing compliant configurations.
*   **Validation Steps:**
    1. Verify that all returned objects include the mandatory properties: `id`, `name`, `subdomain`, `icon`, `shortDescription`, `longDescription`, `howToUse`, `screenshots`, and `tags`.
    2. Check that the `id` field conforms to the regex format `^[a-z0-9-]+$`.
    3. Validate that properties under `tags` (`type`, `skills`, `difficulty`, `age`) contain only values defined in their respective HSL type enums.
*   **Expected Result:** The client parses the JSON structure without exceptions, maps data directly to the memory models, and renders UI grids without formatting corruption.
*   **Priority:** Critical

*   **Test Case ID:** IT-CONTRACT-02 (Failure Handling)
*   **Description:** Validate partial failure resilience when the HTTP request to load `/apps.json` fails or returns malformed data.
*   **Input Data:** Mocked HTTP status `500 Internal Server Error`, network timeout, or a corrupted JSON string (e.g., malformed syntax).
*   **Validation Steps:**
    1. Intercept the network request to fetch `/apps.json` and return a failure state.
    2. Observe console warning outputs and check UI recovery.
*   **Expected Result:** The data loader logic (`getAppCatalog`) catches the fetch exception, returns a clean empty array fallback `[]`, avoids client-side crashes, and displays a friendly error badge on the dashboard.
*   **Priority:** High

---

## 2. Router & Metadata Sync Integration

### Feature: URL Route and Parameter Binding
*   **Endpoint:** `/apps/:id` (dynamic detail routes)
*   **Test Case ID:** IT-ROUTE-01
*   **Description:** Validate that router parameters correctly match catalog items and render matching page metadata.
*   **Input Data:** Navigation trigger to `/apps/maths_quest` (case-insensitive routing parameter).
*   **Validation Steps:**
    1. Read route parameter `:id` from React Router context.
    2. Verify `appLookupMap` resolves the item `maths_quest` in $O(1)$ time complexity.
    3. Check document head metadata (rendered by React Helmet).
*   **Expected Result:** The page loads the correct card details. The document title is set to `Maths Quest | MindFlex Cognitive Apps` and meta descriptions match the short description in `apps.json`.
*   **Priority:** High

*   **Endpoint:** `/skills/:skill` and `/type/:type` (filtered subpages)
*   **Test Case ID:** IT-ROUTE-02
*   **Description:** Validate path-based SEO routing pre-initializes filter panel selections.
*   **Input Data:** Deep-link navigation directly to `/skills/memory`.
*   **Validation Steps:**
    1. Read parameter `:skill` (case-insensitive matching `Memory`).
    2. Verify that the "Memory" checkbox under the Cognitive Skills dimension in the Filter state is set to `true` on load.
*   **Expected Result:** The directory grid renders only apps matching the "Memory" tag on initialization. The document title updates to `Cognitive Memory Apps & Games | MindFlex`.
*   **Priority:** High

---

## 3. Storage Persistence Integration

### Feature: LocalStorage State Sync
*   **Storage Boundary:** Browser LocalStorage Namespace
*   **Test Case ID:** IT-STORE-01
*   **Description:** Verify data integrity and consistency of user bookmarks when writing and reading local state.
*   **Input Data:** Actions toggling bookmarks for `"sudoku"` and `"herbert"`.
*   **Validation Steps:**
    1. Bookmark `"sudoku"`. Verify the key `maxithome_favorites` stores `["sudoku"]`.
    2. Bookmark `"herbert"`. Verify the key `maxithome_favorites` updates to `["sudoku", "herbert"]`.
    3. Un-bookmark `"sudoku"`. Verify the key updates to `["herbert"]`.
*   **Expected Result:** Serialized arrays match user actions precisely. There is zero latency between UI toggle state updates and LocalStorage commits.
*   **Priority:** Critical

*   **Test Case ID:** IT-STORE-02 (Storage Parse Corruption Recovery)
*   **Description:** Verify resilience against corrupted data stored in LocalStorage.
*   **Input Data:** Set key `maxithome_favorites` directly in browser dev tools to a malformed non-JSON string: `"corrupted_data_value"`.
*   **Validation Steps:**
    1. Initialize the application or trigger a page refresh.
    2. Try to toggle bookmarks.
*   **Expected Result:** The accessor function `getLocalStorageItem` catches the syntax parsing error, returns the clean default value `[]`, and avoids browser runtime crashes.
*   **Priority:** High

*   **Test Case ID:** IT-STORE-03 (Incognito Mode Failure Resilience)
*   **Description:** Verify app capability to run when browser storage access permissions are restricted.
*   **Input Data:** Browser environment where `localStorage.setItem` throws `DOMException` (e.g., blocked third-party storage cookies / incognito settings).
*   **Validation Steps:**
    1. Mock browser to throw quota or security permissions error on `setItem` calls.
    2. Toggle heart bookmarks in the UI.
*   **Expected Result:** The app handles the write failure gracefully via the storage write fallback checks, does not freeze the UI, and alerts the user of local storage restrictions.
*   **Priority:** High

---

## 4. Analytics Redirection Boundary

### Feature: Outbound Tracking Navigation
*   **Endpoint:** Custom event function `trackAppLaunch`
*   **Test Case ID:** IT-ANALYTICS-01
*   **Description:** Validate that outbound click tracking correctly passes events to Cloudflare Analytics.
*   **Input Data:** Click event on the "Launch App" button for `"flashlearn"` targeting `https://victorunique.github.io/flashlearn`.
*   **Validation Steps:**
    1. Intercept the custom tracking event wrapper.
    2. Check parameters sent to `(window as any).cf`.
*   **Expected Result:** The function outputs custom event parameters matches:
    *   `category`: `"Outbound Navigation"`
    *   `action`: `"Launch App"`
    *   `label`: `"flashlearn"`
    *   `value`: `"https://victorunique.github.io/flashlearn"`
*   **Priority:** Medium
