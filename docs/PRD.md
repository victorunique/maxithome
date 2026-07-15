# Product Requirements Document (PRD) - MaxitHome v1.0

## 1. Executive Summary
MaxitHome is a modern, accessibility-first, metadata-driven web-based aggregator designed to organize, categorize, and recommend online applications that enhance human cognitive skills and intelligence (Cognitive Apps). MaxitHome does not execute the cognitive tools directly; instead, it serves as a unified entry portal. Each application operates as a completely independent project hosted on its own subdomain or external URL, while MaxitHome guides users to discover them. The platform is entirely frontend-only, designed to run as a static site on Cloudflare Pages, with all pages, tags, search queries, and details generated from a single configuration file (`apps.json`).

---

## 2. Background
The digital brain training and cognitive assessment market is expanding rapidly, driven by an aging global population seeking to prevent cognitive decline and younger demographics focusing on productivity, memory, and executive function. However, the existing landscape is highly fragmented: users must search across disparate websites or commit to expensive walled-garden apps with complex, intimidating interfaces. MaxitHome solves this fragmentation by offering a warm, cohesive, and structured directory.

---

## 3. Problem Statement
*   **Fragmentation:** Cognitive improvement apps are scattered across the internet, making them difficult to find and compare.
*   **Intimidating UI/UX:** Many brain training platforms feature overly complex developer-oriented dashboards or clinical tables that alienate younger children (8+) and seniors (80).
*   **Lack of Multi-Dimensional Tagging:** Existing aggregators categorize apps under generic headers (e.g., "Games") rather than specific cognitive dimensions (e.g., executive function, spatial reasoning, processing speed).
*   **High Friction:** Mandatory signup gates prevent users from trying tools quickly and bookmarking favorites immediately.

---

## 4. Product Vision Alignment
MaxitHome aims to be the **"Product Hunt for Cognitive Training"** by aligning with three core principles:
*   **Metadata-Driven:** Easy scaling where adding or editing an app requires updating a single config file (`apps.json`) with zero React code changes.
*   **Warm & Accessible UX:** Friendly, clean, and highly readable interfaces that accommodate users of all age brackets and abilities (WCAG 2.1 AA compliant).
*   **Frontend-Only Efficiency:** Zero database or backend runtime requirements, enabling free, secure, and fast global hosting on Cloudflare Pages.

---

## 5. Goals
*   **Dynamic Directory:** Render all landing, category, and detail pages dynamically based on `apps.json`.
*   **Warm Design System:** Establish a premium, welcoming design system using custom colors, smooth transitions, and large interactive targets.
*   **Search & Multi-Select Filters:** Enable instantaneous, client-side global search and multi-dimensional filtering.
*   **No-Auth Bookmarking:** Allow immediate bookmarking of favorite apps saved to browser `LocalStorage`.
*   **Dynamic SEO Generation:** Ensure each app and category has indexable pages for search engine exposure.

---

## 6. Non-goals
*   **Hosting App Execution:** Running the actual interactive game or tool logic within MaxitHome.
*   **Backend Databases:** Implementing server-side databases, user account systems, or cloud-based data synchronization.
*   **Payment & Subscriptions:** Processing payments, subscriptions, or membership accounts.

---

## 7. Target Users
*   **Children (8-12):** Gamified cognitive apps to build logic, mathematics, and creativity.
*   **Teenagers & College Students (13-22):** Focus, advanced logic, programming puzzles, and processing speed.
*   **Working Professionals (23-60):** Executive function, memory recall, planning, and high-performance tools.
*   **Seniors (60-80+):** Memory retention, attention, processing speed, requiring accessible, high-contrast, simple layouts.

---

## 8. Personas

### Persona A: Arthur, 72 (Retired Educator)
*   **Goal:** Keep his mind active, improve short-term memory recall, and occupy his spare time.
*   **Pain Points:** Finds complex tech dashboards confusing. Suffers from minor visual impairment, needing large fonts and high-contrast buttons.
*   **How MaxitHome helps:** Simple, clean layout, font-scaling compatibility, clear category tags (e.g., "Memory", "Senior Friendly"). Arthur can bookmark games like Sudoku and Jigsaw to his personal list without setting up an account or remembering a password.

### Persona B: Leo, 9 (Primary School Student)
*   **Goal:** Play fun, engaging games that challenge his creativity and logic.
*   **Pain Points:** Gets bored quickly by clinical or dry academic exercises.
*   **How MaxitHome helps:** Fun cards, colorful icons, clear labels (e.g., "8+", "Creativity"). Leo can find games like Herbert or Maths Quest that look welcoming and play them on separate subdomains.

---

## 9. User Journeys

### Journey 1: Discovering and Bookmarking an App (New User)
1.  **Entry:** User arrives at the MaxitHome homepage.
2.  **Browsing:** User views a visually appealing grid of cognitive apps.
3.  **Filtering:** User selects "Memory" from the Cognitive Skills filter list.
4.  **Reviewing Details:** User clicks "Details" on an app card (e.g., "FlashLearn") to read the instructions, screenshots, and age recommendations without leaving the platform.
5.  **Bookmarking:** User clicks "Save to Favorites" (adds the app to their LocalStorage-backed list).
6.  **Launching:** User clicks "Enter App" and is redirected to `https://flashlearn.maxithome.com` (or open in a new tab).

### Journey 2: Accessing Saved Favorites (Returning User)
1.  **Entry:** User visits MaxitHome.
2.  **Navigation:** User navigates to the "My Favorites" section at the top of the homepage or in the navigation bar.
3.  **Access:** The user sees their bookmarked apps instantly loaded from local storage and clicks "Enter App" directly to launch one.

---

## 10. User Stories
*   *As a visitor,* I want to search for cognitive apps by keyword (name or description) so that I can quickly find a specific tool.
*   *As a visitor,* I want to filter apps by multiple tags (difficulty, skill, age) simultaneously so that I can narrow down my search to exactly what I need.
*   *As a user,* I want to bookmark apps without creating an account so that I don't have to go through a login process.
*   *As a search engine crawler,* I want each app details page and category/skill page to have its own indexable URL and metadata so that search users can land directly on them.

---

## 11. Functional Requirements

### 11.1 Metadata-Driven Page Generation
*   **FR-1.1:** The app must load the catalog from a static `apps.json` file.
*   **FR-1.2:** Homepage, detail views, and filtering widgets must draw their information entirely from this file.
*   **FR-1.3:** The application code must not contain hardcoded lists of the apps.

### 11.2 Multi-Dimensional Search & Filtering
*   **FR-2.1:** Real-time client-side search indexing the fields: `name`, `shortDescription`, `longDescription`, and `tags`.
*   **FR-2.2:** Real-time filters for:
    *   **Type:** Tool, Game, Learning, Assessment, Other.
    *   **Cognitive Skill:** Memory, Focus, Attention, Logic, Reasoning, Spatial, Processing Speed, Language, Mathematics, Creativity, Executive Function, Decision Making.
    *   **Difficulty:** Beginner, Intermediate, Advanced.
    *   **Age Suitability:** 8+, 12+, Adult, Senior Friendly.
*   **FR-2.3:** Filters must support multi-selection (AND logic between different dimensions, OR logic within a single dimension).

### 11.3 Detailed Landing Pages
*   **FR-3.1:** A dedicated layout for `/apps/:id` displaying:
    *   App Icon, Name, and Quick Tags.
    *   Long Description and "How to Use" instructions.
    *   Image/Screenshot Gallery.
    *   Launch redirect button ("Enter App") and Bookmark toggle.
    *   "Related Apps" section (displaying other apps sharing similar skill tags).

### 11.4 No-Auth Favorites
*   **FR-4.1:** Users can toggle bookmark status on app cards and details pages.
*   **FR-4.2:** Favorites list is persisted across browser restarts using `LocalStorage`.
*   **FR-4.3:** A dedicated section or toggle filters the dashboard to show only favorited apps.

### 11.5 Dynamic SEO & Routing
*   **FR-5.1:** React Router routing for:
    *   `/` (Home and Directory)
    *   `/apps/:id` (App details)
    *   `/skills/:skill` (List of apps matching a cognitive skill)
    *   `/type/:type` (List of apps matching a type tag)
*   **FR-5.2:** HTML Document titles and meta descriptions must update dynamically using React Helmet (or equivalent) matching the selected app/skill details.

---

## 12. Non-functional Requirements

### 12.1 Performance
*   **NFR-1.1:** Sub-second client-side interaction speed for searches and filters.
*   **NFR-1.2:** Fast initial page load: static bundle size optimized (Gzipped core JS < 150KB).

### 12.2 Accessibility (a11y) & Inclusivity
*   **NFR-2.1:** WCAG 2.1 AA Compliance.
*   **NFR-2.2:** Keyboard focus indication and complete keyboard navigability.
*   **NFR-2.3:** Aria attributes on all interactive elements (buttons, inputs, filters).
*   **NFR-2.4:** Support browser zoom levels up to 200% without breaking layouts.
*   **NFR-2.5:** Responsive typography and minimum touch target size of 44x44px.

### 12.3 Style & Aesthetics
*   **NFR-3.1:** Warm color mode design system with support for both warm light mode (cozy cream/sand backgrounds) and warm dark mode (deep slate/amber accents) to maximize readability and approachability for children and seniors.
*   **NFR-3.2:** Smooth page transition micro-animations using Framer Motion.

---

## 13. Business Rules
*   **BR-1.1 (Outcome Claims Disclaimer):** To comply with advertising regulations (FTC), the platform must not promise or guarantee specific health or intelligence outcomes. Safe language like "Designed to challenge focus" or "Exercises spatial reasoning" must be used in descriptions instead of "Cures memory loss".
*   **BR-1.2 (Subdomain Isolation):** All external links/subdomain links to apps must launch in a new browser tab (`target="_blank"`) to ensure user retention on the main MaxitHome aggregator portal.

---

## 14. Assumptions
*   **Data Size:** The app catalog is small enough (<100 apps) to fit within a single local `apps.json` file (~100KB) without requiring backend pagination or chunking.
*   **Subdomain & Hosting Domain Infrastructure:** Target apps are hosted on independent subdomains under `maxithome.com` (e.g., `https://*.maxithome.com`), GitHub Pages (`https://*.github.io`), or external third-party domains (e.g., `https://brainhq.com`). This multi-domain support ensures smooth migration of existing applications and flexibility for future additions.

---

## 15. Constraints
*   **Frontend-Only:** No database queries, server-side code execution, Node.js process runtime, or serverless functions are permitted.
*   **Styling Stack:** Must use Tailwind CSS and shadcn/ui. Ad-hoc styling should be avoided.
*   **Build Output & Prerendering:** Output must compile into purely static HTML, CSS, and JS assets using **Vite SSG** (`vite-ssg`) at build time to prerender all dynamic routes, ensuring optimal SEO indexability on Cloudflare Pages.
*   **Analytics:** Must use **Cloudflare Web Analytics** (privacy-focused, cookie-free, zero-maintenance, and high performance) auto-injected by the hosting provider or via a lightweight script to track visits and outgoing clicks.

---

## 16. Dependencies
*   **Core:** React, TypeScript, React Router, Vite.
*   **Libraries:** Tailwind CSS, shadcn/ui, Lucide Icons, Framer Motion.
*   **Metadata Source:** `public/apps.json`.

---

## 17. Risks
*   **Search Crawler Limitations:** Pure SPA client routing might result in poor indexing of detail routes (e.g., `/apps/sudoku`) by crawlers that do not execute JS thoroughly.
    *   *Mitigation:* Plan for static prerendering (SSG) in the build pipeline.
*   **Data Loss:** If users clear cookies/browser storage, local bookmarks will be deleted.
    *   *Mitigation:* State clearly in the UI that bookmarks are saved locally to their browser.

---

## 18. Acceptance Criteria
*   **AC-1:** Adding a new JSON object to `apps.json` immediately populates it on the home screen, detail pages, search indexing, and filtering menus without code modifications.
*   **AC-2:** Searching and selecting multiple tags displays only the matching apps.
*   **AC-3:** Clicking Details page loads instruction texts and screenshots corresponding to the app ID, and clicking "Enter App" redirects to the subdomain in a new tab.
*   **AC-4:** Bookmarked apps remain listed on reload, even in offline mode.
*   **AC-5:** Lighthouse Accessibility (a11y) audit score is >= 95.

---

## 19. Success Metrics
*   **User Engagement:** Number of active bookmarks stored in users' local storage.
*   **Load Performance:** Lighthouse performance score >= 90.
*   **Search Visibility:** Successful Google Indexation of at least 80% of generated detail pages.

---

## 20. Scope
*   **In-Scope (v1.0):**
    *   Static metadata architecture (`apps.json`).
    *   Search, filter, details page layout.
    *   LocalStorage bookmark list.
    *   Warm color mode design system (light/dark dual theme) with premium aesthetics.
*   **Future Scope (v2.0+):**
    *   User Auth & Cloud Synchronization (Supabase/Clerk).
    *   Headless CMS Integration.
    *   Rating/Review submissions.

---

## 21. Future Scope
*   **Cloud Account Sync:** Allow saving favorites across multiple devices.
*   **Content Management System:** A dashboard for non-technical curators to edit and publish new apps.
*   **AI Assessment & Recommendation:** Recommending specific games based on user test performance in assessment tools.

---

## 22. Open Questions
None at this stage; all initial architecture design choices (prerendering, domain scope, analytics, color mode) have been resolved via user feedback.

---

## 23. Change Log

| Timestamp | Type | Summary | Sections |
|-----------|------|---------|----------|
| 2026-07-15T06:14:00Z | Add | Created initial PRD from Vision, Constraints, Research Report, and Idea files | All |
| 2026-07-15T06:25:00Z | Replace | Resolved questions on prerendering (Vite SSG), domain scope (maxithome.com, github.io, 3rd party), and analytics (Cloudflare Analytics). Updated aesthetic design to support warm color mode (light/dark dual theme). | NFRs, Scope, Open Questions, Change Log |
