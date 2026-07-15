# Visual Guidelines

This document outlines the visual design system, styling guidelines, and accessibility standards for the MaxitHome platform.

---

## 1. Design Philosophy

### 1.1 Brand Personality
MaxitHome is a warm, welcoming, and inclusive portal. Unlike complex developer platforms or clinical academic databases, MaxitHome feels like a digital library: clean, soft, cozy, and extremely readable.

### 1.2 Design Principles
*   **Warmth over Coldness:** Use cream, sand, and amber shades instead of stark, sterile blue/grey or pitch black.
*   **Approachable Aesthetics:** Utilize soft rounded corners, ample whitespace, and clean layouts.
*   **A11y-First:** Prioritize visual comfort, high readability, and physical ease of interaction for both young children (8+) and older seniors (80).

### 1.3 Visual Tone
Friendly, premium, lightweight, and clean.

---

## 2. Colour System (Warm Mode Theme)

The interface supports a dual-theme warm color system, carefully selected for optimal contrast and low cognitive fatigue.

| Token | Light Mode (Warm Cream/Sand) | Dark Mode (Cozy Slate/Amber) | Purpose |
| :--- | :--- | :--- | :--- |
| **Background** | `hsl(36, 33%, 97%)` (Cream) | `hsl(215, 25%, 12%)` (Deep slate) | Main layout background canvas |
| **Surface** | `hsl(36, 25%, 92%)` (Soft sand) | `hsl(215, 20%, 18%)` (Dark surface) | Card containers, sidebar filters |
| **Border** | `hsl(36, 12%, 80%)` (Warm grey) | `hsl(215, 12%, 28%)` (Slate grey) | Borders, dividing lines |
| **Text Primary**| `hsl(24, 15%, 15%)` (Warm charcoal)| `hsl(36, 30%, 94%)` (Soft ivory) | High-contrast body copy & headings |
| **Text Muted** | `hsl(24, 10%, 45%)` (Muted sand) | `hsl(36, 10%, 70%)` (Muted slate) | Subtitles, descriptions, captions |
| **Accent Solid**| `hsl(28, 80%, 48%)` (Orange/Amber) | `hsl(38, 90%, 55%)` (Vibrant amber) | Focus rings, key interactive states |
| **Accent Light**| `hsl(28, 80%, 94%)` (Amber tint) | `hsl(38, 90%, 20%)` (Amber deep tint) | Hover states, selected options |
| **Semantic Error**| `hsl(0, 75%, 45%)` (Warm red) | `hsl(0, 85%, 60%)` (Soft coral red) | Error badges, status indicators |
| **Semantic Safe** | `hsl(140, 50%, 35%)` (Warm green) | `hsl(140, 60%, 65%)` (Mint green) | Success states, bookmarks indicator |

### 2.1 Contrast Rules
*   Body text must exceed a minimum contrast ratio of **4.5:1** against the background.
*   Headings and large text elements must exceed a contrast ratio of **3:1**.
*   Border visual decorations do not have a strict ratio requirement, but interactive border elements (e.g. text field outlines in default state) must be at least **3.0:1** for visibility.

---

## 3. Typography

### 3.1 Font Family Selection
*   **Display Font:** `Outfit` (sans-serif) for brand markings and headings.
*   **Body Font:** `Inter` (sans-serif) for description copy, filter labels, and instructions.

### 3.2 Typographic Hierarchy
| Category | Element | Font Family | Size | Weight | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | Hero Title | `Outfit` | `3.00rem` (48px) | Bold (700) | 1.15 |
| **Header 1** | Page H1 | `Outfit` | `2.25rem` (36px) | Bold (700) | 1.20 |
| **Header 2** | Section H2 | `Outfit` | `1.75rem` (28px) | SemiBold (600) | 1.25 |
| **Header 3** | App Title / H3 | `Outfit` | `1.25rem` (20px) | Medium (500) | 1.30 |
| **Body** | Standard Reading| `Inter` | `1.00rem` (16px) | Regular (400) | 1.60 |
| **Captions** | Tag Pills / Labels| `Inter` | `0.875rem` (14px)| Medium (500) | 1.40 |

---

## 4. Spacing & Grid System

To support layout consistency and zooming, the platform uses a 4px base spacing system expressed in `rem`.

*   **Base Unit:** `1rem = 16px`.
*   **Spacing Scale:**
    *   `0.25rem` (4px) - Tag internal padding.
    *   `0.50rem` (8px) - Text to tag margin.
    *   `1.00rem` (16px) - Inner card padding.
    *   `1.50rem` (24px) - Grid gap spacing.
    *   `3.00rem` (48px) - Section separation margins.

### 4.1 Grid & Layout Columns
*   **Desktop (1200px+):** Max width `1280px` centered. 12-column flex grid. Left sidebar occupies 3 columns; right listing grid occupies 9 columns.
*   **Tablet (768px - 1024px):** Main content occupies full width. Left filter panel collapses into a mobile modal drawer.
*   **Mobile (< 768px):** Single-column layout. Horizontal paddings set to `1.00rem` (16px).

---

## 5. Component Standards

### 5.1 Buttons
*   **Primary Action Button:** 
    *   *Style:* Solid `Accent Solid` background with white text (light mode) or charcoal text (dark mode).
    *   *Radius:* Fully rounded (`rounded-full` / 9999px) for friendly child/senior interaction.
    *   *Hover State:* Slight scaling (`scale-102`), background shifts 5% darker, light shadow.
*   **Secondary Action Button:** 
    *   *Style:* Transparent background, outline border using `Border` color, `Text Primary` copy.
    *   *Hover State:* Background changes to `Accent Light`.
*   **Icon Action Button (e.g. Heart Toggle):** 
    *   *Size:* Enclosed in a circular container with minimum target dimensions of `48px x 48px`.

### 5.2 Form Inputs & Checkboxes
*   **Text Inputs:**
    *   *Style:* Background `Surface`, border `Border`, `rounded-xl` (12px) corners.
    *   *Focus State:* Border changes to `Accent Solid` with a 2px outline ring.
*   **Checkboxes:**
    *   *Size:* Large checkbox grid (`24px x 24px` instead of standard 16px) to ease tap interactions for seniors and children.
    *   *State:* Filled with checkmark and brand colors on selection.

### 5.3 App Cards
*   *Border-radius:* `rounded-2xl` (16px).
*   *Styling:* Glassmorphism border and background overlays.
*   *Interaction:* On hover, card translates -4px vertically using a smooth ease-out curve (200ms duration).

### 5.4 Dialogs & Modals
*   *Overlay Backdrop:* Dark semi-transparent filter (`rgba(15, 23, 42, 0.6)`) with a blur filter (`backdrop-blur-md`).
*   *Modal Box:* Rounded corners `rounded-3xl` (24px), background `Background`, shadow `shadow-2xl`.

---

## 6. Accessibility & Inclusivity Guidelines (WCAG 2.1 AA)

To satisfy the `8-80` age suitability requirements, the following accessibility metrics must be met:

*   **Touch Targets:** All interactive elements (filters, links, buttons, CTAs) must offer a physical target area of at least **48x48px** with appropriate margins.
*   **Focus Ring Indicator:** 
    *   Every interactive component must receive a clearly visible focus style when selected via keyboard tab navigation.
    *   *Token:* `2px solid Accent Solid` with a `2px` offset. Do not hide focus styles (`outline: none` is forbidden unless replaced by custom `:focus-visible`).
*   **Semantic HTML Markup:** Always use proper HTML tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<button>`, `<input>`).
*   **Screen Reader Labels:** 
    *   Images/Screenshots must map descriptive `alt` tags from metadata.
    *   Heart bookmark button requires `aria-label="Save [App Name] to bookmarks"` and `aria-pressed="true/false"`.
*   **Browser Zoom Robustness:** Layout structures must scale gracefully up to **200% zoom** without content cropping, horizontal scrollbars, or text overlap. Do not use absolute pixel positions or fixed heights.
