# Screen Specifications

This document outlines the screen specifications, layouts, interactive components, validations, states, and navigation transitions for each view on the MaxitHome platform.

---

## 1. Homepage / App Directory (`/`)

### 1.1 Overview
*   **Screen Name:** App Directory Home
*   **Purpose:** Act as the central entry portal, enabling discovery, filtering, and quick navigation to cognitive applications.
*   **User Goals:** Search for apps, filter by categories, bookmark favorites, and launch specific apps.

### 1.2 Layout
*   **Header Section:** Persistent global branding navigation, containing a "Favorites Only" toggle switch and light/dark theme switch.
*   **Hero Unit:** Welcoming description of the platform tailored to a friendly, accessible aesthetic.
*   **Main Workspace:** 
    *   *Desktop:* Two-column layout with a sticky Sidebar Filter Panel on the left, and a Search Bar + App Grid on the right.
    *   *Mobile/Tablet:* Single-column layout. The Filter Panel is collapsed behind a floating "Filters" floating button that triggers an overlay drawer.
*   **Footer Section:** Contains FTC outcome disclaimer, copyright notice, social links, and privacy-first analytics details.

### 1.3 Components

#### 1.3.1 Search Input Bar
*   **Purpose:** Allows users to find apps by typing search terms.
*   **Behaviour:** Client-side real-time filtering as the user types (debounce: 100ms).
*   **Interactions:** Typing updates the directory grid instantly. Clicking the "X" (clear) button clears the search query.
*   **States:**
    *   *Default:* Display placeholder "Search cognitive apps (e.g. Memory, logic)..."
    *   *Focused:* Highlighted with the focus ring color token.
    *   *Active:* Shows clear ("X") button if characters are present.
*   **Validation:** Input length capped at 100 characters. Special characters are sanitized.

#### 1.3.2 Filter Panel
*   **Purpose:** Multi-dimensional checkbox selections for refining app cards.
*   **Dimensions:**
    *   *Type:* Checklist (Tool, Game, Learning, Assessment, Other).
    *   *Cognitive Skill:* Checklist (Memory, Focus, Logic, Reasoning, Spatial, etc.).
    *   *Difficulty:* Checklist (Beginner, Intermediate, Advanced).
    *   *Age Suitability:* Checklist (8+, 12+, Adult, Senior Friendly).
*   **Behaviour:** Supports multi-selection. Uses AND logic between dimensions (e.g., must be a "Game" AND "Beginner"), and OR logic within the same dimension (e.g., "Memory" OR "Focus").
*   **States:**
    *   *Unchecked:* Normal outline.
    *   *Checked:* Filled state with brand accent color and checkmark icon.
    *   *Disabled:* Dimmed state if no apps in the catalog match this tag (dynamic disabling).
*   **Accessibility:** Fully keyboard navigability (`Tab` to move, `Space` to toggle, reads `aria-checked`).

#### 1.3.3 Sort Dropdown
*   **Purpose:** Allows users to reorder the app card grid by various criteria.
*   **Options:**
    *   *Default:* Preserves the original catalog order from `apps.json`.
    *   *Name (A → Z):* Alphabetical ascending sort by app name.
    *   *Name (Z → A):* Alphabetical descending sort by app name.
    *   *Recently Updated:* Sort by `updatedAt` date descending (newest first).
    *   *Oldest First:* Sort by `createdAt` date ascending (oldest first).
*   **Behaviour:** Selecting a sort option immediately reorders the card grid. Sorting is applied after search and filter operations on the filtered subset.
*   **States:**
    *   *Default:* Displays "Default" as the selected label.
    *   *Active:* Displays the selected sort option label.
    *   *Reset:* Clicking the "Reset All" button in the Filter Panel or the "Reset All Filters" button in the Empty State also resets the sort option to "Default".
*   **Accessibility:** Fully keyboard navigable (`Tab` to focus, `Enter`/`Space` to open, `Arrow` keys to navigate options).

#### 1.3.4 App Card
*   **Purpose:** Displays high-level info about a specific cognitive app.
*   **Properties:**
    *   *App Icon:* Located top-left, decorative, must have descriptive `alt` attribute.
    *   *App Title:* Prominent, clear type.
    *   *Short Description:* Max 120 characters.
    *   *Tag Badges:* Visual pills representing skills, difficulty, and age.
    *   *Favorite Heart Toggle:* Large, responsive heart button (target: 48x48px).
    *   *Enter App CTA (Primary):* Solid button linking to the subdomain, opens in a new tab.
    *   *Details CTA (Secondary):* Outlined button routing to `/apps/:id`.
*   **States:**
    *   *Default:* Soft sand card outline.
    *   *Hover:* Translates -4px upwards, adds subtle drop-shadow, highlights border with light accent tint.
    *   *Focus:* Receives 2px dotted outline.
    *   *Favorited:* Heart icon changes from outline to filled red/amber.

### 1.4 Screen States

*   **Loading:** Skeletons render placeholders for search, filters, and a grid of blank loading card blocks (200ms duration).
*   **Empty:** Triggers when search queries or filters yield zero matches. Displays an illustration, "No results found matching your criteria," and a prominent "Clear Filters" button.
*   **Populated:** Standard grid view showing active card selections.
*   **Offline:** Uses cached `apps.json` from the browser service worker. A non-intrusive status bar at the top displays "Offline Mode - Showing cached directory."

---

## 2. App Details Screen (`/apps/:id`)

### 2.1 Overview
*   **Screen Name:** Application Details Page
*   **Purpose:** Provide instructions, specifications, screenshots, and bookmarking options for a specific cognitive application.
*   **User Goals:** Read how to use the app, verify age/difficulty suitability, add to bookmarks, and launch the application.

### 2.2 Layout
*   **Top Bar:** Contains a "← Back to Directory" button preserving active filter state.
*   **Hero Header:** Split view with large App Icon, Title, quick stats (Difficulty, Age, Type), and primary CTA buttons ("Enter App" and "Favorite Toggle").
*   **Main Grid (2-column layout):**
    *   *Left Column:* Screenshot Gallery Carousel, Long Description, and "How to Use" step-by-step instructions.
    *   *Right Column:* Specifications panel (Developer details, last updated, tags list) and a "Related Apps" card section.

### 2.3 Components

#### 2.3.1 Screenshot Gallery Carousel
*   **Purpose:** Showcases visual app interfaces.
*   **Behaviour:** Horizontal sliding preview. Users can click left/right navigation arrows or progress dot indicators.
*   **States:**
    *   *Loading:* Spinner overlay while images fetch.
    *   *Empty:* Shows a default styled illustration matching the warm theme if no screenshots are in `apps.json`.
*   **Accessibility:** Arrows must support keyboard control (`Left`/`Right` arrow keys). Every image includes detailed `alt` tags.

#### 2.3.2 Action CTA Group
*   **Primary CTA ("Enter App"):** Large warm-colored button. Triggers a new tab (`target="_blank"`) to launch the subdomain.
*   **Favorite Button:** Toggles the heart state and synchronizes with `LocalStorage` arrays.
*   **Disclaimers:** Displays FTC compliance disclaimer adjacent to the primary CTA: *"This tool is designed to challenge cognitive skills; it does not claim to cure or prevent cognitive decline."*

#### 2.3.3 Related Apps Grid
*   **Purpose:** Recommends 3 similar applications.
*   **Logic:** Matches other records from `apps.json` sharing the maximum count of cognitive skill tags.

### 2.4 Screen States
*   **Loading:** Displays layout skeletons with placeholder text lines and image frames.
*   **Populated:** Displays full details loaded from `apps.json`.
*   **System Error:** If the ID cannot be found, displays a friendly "Application Not Found" 404 message block and a CTA redirection button back to the directory home.

---

## 3. Cognitive Skill / Type Filter Views (`/skills/:skill`, `/type/:type`)

### 3.1 Overview
*   **Screen Name:** Filtered Subpage (SEO-optimized)
*   **Purpose:** Provide crawler-friendly indexable landing pages pre-filtered by skill or type.
*   **User Goals:** Browse all memory games, focus tools, or age-specific applications.

### 3.2 Layout & Components
*   Identical to the Homepage / App Directory layout.
*   **Behavioural Deviation:**
    *   The matching filter checkbox is **pre-checked** on page initialization.
    *   The browser header metadata is updated to match the filter: e.g. `<title>Cognitive Memory Apps & Games | MindFlex</title>`.
    *   A custom H1 header is displayed at the top of the grid: e.g. "Memory Apps & Exercises".

---

## 4. Global Navigation / Shell Components

### 4.1 Header Bar
*   **Purpose:** Houses navigation, brand logo, and utility settings.
*   **Components:**
    *   *Branding:* Logo mark + "MindFlex" text. Redirects to `/` on click.
    *   *Favorites Toggle:* Filter switch labeled "My Bookmarks" or "Favorites Only".
    *   *Theme Selector:* Toggle switch between Warm Light Mode and Warm Dark Mode.

### 4.2 Error / 404 View
*   **Screen Name:** Resource Not Found
*   **Purpose:** Handle invalid routes.
*   **Components:** "Oops! Page not found" message, illustration, and a "Return to Home Directory" button.
