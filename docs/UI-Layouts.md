# UI Layouts

This document outlines the screen structures, responsive layout behaviors, and structural wireframes for key screens of the MaxitHome platform.

---

## 1. Global Navigation & Layout Shell

### 1.1 Screen Structure
The platform utilizes a consistent global wrapper layout comprising three main regions:
*   **Header Region (Sticky):** Houses brand identification, global navigation, and visual settings toggles.
*   **Main Workspace Region:** Dynamically swaps content blocks depending on current routes.
*   **Footer Region (Static):** Houses compliance declarations, copyright, external links, and analytics tags.

### 1.2 Layout Diagram (Mermaid)

```mermaid
graph TD
    subgraph Global Layout Shell
        Header[Header Bar: Logo | Navigation | Favorites Toggle | Theme Selector]
        Main[Main Content Area: Swaps Views dynamically]
        Footer[Footer Bar: FTC Disclaimer | Copyright | Socials & Analytics]
        Header --> Main
        Main --> Footer
    end
```

---

## 2. Directory Homepage View (`/`)

### 2.1 Responsive Layout Behaviours

#### Desktop (1200px+)
*   **Header:** Standard sticky flex row.
*   **Hero Unit:** Large typography, centered.
*   **Main Grid:** Two columns: Sticky left filter panel (width: 25%) and right content grid (width: 75%).
*   **App Card Grid:** 3 to 4 columns.

#### Tablet (768px - 1024px)
*   **Header:** Sticky flex row.
*   **Hero Unit:** Centered, medium font sizing.
*   **Main Grid:** Single-column layout. The Filter Panel is hidden, replaced by a floating "Filters" button at the bottom-right.
*   **App Card Grid:** 2 columns.

#### Mobile (< 768px)
*   **Header:** Condensed spacing. Logo is icon-only; settings links are in a hamburger menu.
*   **Hero Unit:** Condensed typography.
*   **Main Grid:** Single-column layout. The Filter Panel is hidden.
*   **App Card Grid:** 1 column.

### 2.2 Wireframe Diagram (ASCII)

#### 2.2.1 Desktop Layout Wireframe
```
+-----------------------------------------------------------------------------+
| [Logo] MindFlex                 [Favorites Only O]  [Light/Dark Theme O]    |
+-----------------------------------------------------------------------------+
|                                                                             |
|                     HUMAN INTELLIGENCE, AUGMENTED FOR TOMORROW              |
|                     A curated repository of cognitive apps.                 |
|                                                                             |
|  +---------------------+  +----------------------------------------------+  |
|  | FILTER PANEL        |  | [ Search cognitive apps...                 ] |  |
|  +---------------------+  +----------------------------------------------+  |
|  | [ ] Type            |  | Active Filters: [Game x] [Memory x]          |  |
|  |   [x] Game          |  +----------------------------------------------+  |
|  |   [ ] Tool          |  | +------------------+  +------------------+   |  |
|  |                     |  | | Icon    [Heart]  |  | Icon    [Heart]  |   |  |
|  | [ ] Cognitive Skill |  | | App Name         |  | App Name         |   |  |
|  |   [x] Memory        |  | | Short Desc       |  | Short Desc       |   |  |
|  |   [ ] Focus         |  | | [Tags List]      |  | [Tags List]      |   |  |
|  |                     |  | | [Details] [Play] |  | [Details] [Play] |   |  |
|  | [ ] Difficulty      |  | +------------------+  +------------------+   |  |
|  |   [ ] Beginner      |  | +------------------+  +------------------+   |  |
|  |                     |  | | Icon    [Heart]  |  | Icon    [Heart]  |   |  |
|  | [ ] Recommended Age |  | | App Name         |  | App Name         |   |  |
|  |   [ ] 8+            |  | | Short Desc       |  | Short Desc       |   |  |
|  |                     |  | | [Tags List]      |  | [Tags List]      |   |  |
|  +---------------------+  | | [Details] [Play] |  | [Details] [Play] |   |  |
|                           | +------------------+  +------------------+   |  |
|                           +----------------------------------------------+  |
+-----------------------------------------------------------------------------+
| FTC Outcome Disclaimer: MaxitHome does not guarantee cognitive improvement. |
+-----------------------------------------------------------------------------+
```

#### 2.2.2 Mobile Layout Wireframe
```
+--------------------------------------------+
| [Logo] MindFlex                       [hamburger] |
+--------------------------------------------+
|  HUMAN INTELLIGENCE, AUGMENTED             |
|  +---------------------------------------+ |
|  | [ Search cognitive apps...          ] | |
|  +---------------------------------------+ |
|  | Active Filters: [Game x]              | |
|  +---------------------------------------+ |
|  | +-----------------------------------+ | |
|  | | Icon                      [Heart] | | |
|  | | App Name                          | | |
|  | | Short Desc                        | | |
|  | | [Tags List]                       | | |
|  | | [ Details ]        [ Enter App ]  | | |
|  | +-----------------------------------+ | |
|  +---------------------------------------+ |
|                                            |
|                  +-----------------------+ |
|                  | [ Floating Filters ]  | |
|                  +-----------------------+ |
+--------------------------------------------+
```

---

## 3. App Details View (`/apps/:id`)

### 3.1 Responsive Layout Behaviours

#### Desktop (1200px+)
*   **Navigation:** Top breadcrumbs / Back button link.
*   **Column Setup:** 2-column layout (60% main details on the left, 40% metadata and related apps on the right).
*   **Gallery:** Horizontal thumbnail carousel.

#### Mobile / Tablet (< 1024px)
*   **Column Setup:** Single column layout. Left details elements stack vertically on top of right metadata details.
*   **Gallery:** Large horizontal swipe-scroll grid.

### 3.2 Wireframe Diagram (ASCII)

```
+-----------------------------------------------------------------------------+
| [Logo] MindFlex                 [Favorites Only O]  [Light/Dark Theme O]    |
+-----------------------------------------------------------------------------+
|                                                                             |
|  <- Back to Directory                                                       |
|                                                                             |
|  +-----------------------------------------------------------------------+  |
|  | App Icon   App Title                                      [Heart Save]|  |
|  |            Difficulty: Intermediate | Age: 8+ | Type: Game            |  |
|  +-----------------------------------------------------------------------+  |
|                                                                             |
|  +-----------------------------------+  +---------------------------------+  |
|  | SCREENSHOT GALLERY / CAROUSEL      |  | QUICK ACTION SUMMARY            |  |
|  | +-------------------------------+  |  +---------------------------------+  |
|  | |                               |  |  | Click Enter App to launch      |  |
|  | |         Screenshot #1         |  |  | Flashcard system.               |  |
|  | |                               |  |  |                                 |  |
|  | +-------------------------------+  |  |        [ ENTER APP ]            |  |
|  |    < (Prev)   (Dots)   Next >      |  |  |                                 |  |
|  |                                   |  |  | *Opens subdomain in a new tab.  |  |
|  | DESCRIPTION                       |  |  +---------------------------------+  |
|  | Flashcard application designed    |  |                                 |  |
|  | to help build long-term memory.   |  | APP DETAILS SUMMARY             |  |
|  |                                   |  | * Creator: Victor Xu            |  |
|  | HOW TO USE                        |  | * Category: Memory, Learning    |  |
|  | 1. Select a card deck topic.      |  | * Last updated: 2026-07-15      |  |
|  | 2. Click cards to reveal answer.  |  |                                 |  |
|  | 3. Grade recall difficulty.       |  | RELATED COGNITIVE APPS          |  |
|  +-----------------------------------+  | +-----------------------------+ |  |
|                                         | | Icon  Maths Quest     [Play]| |  |
|                                         | +-----------------------------+ |  |
|                                         | +-----------------------------+ |  |
|                                         | | Icon  Herbert         [Play]| |  |
|                                         | +-----------------------------+ |  |
|                                         +---------------------------------+  |
+-----------------------------------------------------------------------------+
```
