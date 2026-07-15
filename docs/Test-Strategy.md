# Test Strategy - MaxitHome v1.0

This document outlines the testing strategy, test levels, automation guidelines, quality gates, and risk prioritization for the MaxitHome v1.0 aggregator platform.

---

## 1. Test Levels & Scope

MaxitHome is a frontend-only, metadata-driven Single Page Application (SPA) designed to be built with React, Vite, and Vite SSG (prerendering), and deployed on Cloudflare Pages. The testing pyramid is tailored to validate local client-side state, JSON contracts, routing, accessibility (a11y), and user flows.

### 1.1 Unit Testing (Code Scope Only)
*   **Scope:** Individual pure functions, React utility hooks, and component rendering logic.
*   **Key Targets:**
    *   `filterCatalog` algorithm (verifying AND/OR logic constraints).
    *   LocalStorage helpers (`getLocalStorageItem`, `setLocalStorageItem`).
    *   API loader error-recovery pathways (e.g., fallback empty array on corrupted fetch).
    *   Outbound tracking link event parameters (`trackAppLaunch`).
*   **Framework Guidance:** Vitest + React Testing Library (TDD-aligned).

### 1.2 Integration Testing
*   **Scope:** Communication boundaries, JSON contract structure, and module interactions.
*   **Key Targets:**
    *   `apps.json` schema validation (checking types, skills, difficulty, and age enums).
    *   Route-to-metadata binding (verifying route parameters trigger correct updates in React Helmet).
    *   Related Apps recommendation indexing (verifying correct algorithm output of top 3 matching apps).
*   **Framework Guidance:** MSW (Mock Service Worker) for API mocking, Vitest.

### 1.3 System Testing
*   **Scope:** Layout assembly, styling responsiveness, and accessibility compliance.
*   **Key Targets:**
    *   WCAG 2.1 AA keyboard navigation (focus rings on active states).
    *   Lighthouse Accessibility audit checks (target score $\ge$ 95).
    *   200% zoom responsiveness (verifying fluid layouts using relative `rem` sizes).
*   **Framework Guidance:** Playwright (A11y/responsive checks).

### 1.4 End-to-End (E2E) Testing
*   **Scope:** Full user journeys simulating real-world usage patterns in the browser.
*   **Key Targets:**
    *   Deep-link entry and route redirection (invalid ID routing to 404).
    *   Search querying combined with multi-select filter adjustments.
    *   LocalStorage persistence (saving a bookmark, reloading, and toggling "Favorites Only" view).
    *   Outbound redirect link properties (`target="_blank"`, `rel="noopener noreferrer"`).
*   **Framework Guidance:** Playwright.

---

## 2. Feature Coverage Model (PRD Traceability)

| Feature ID | PRD Functional Requirement | Test Level | Risk Priority | Key Focus Areas |
| :--- | :--- | :--- | :--- | :--- |
| **FR-1.0** | Metadata-Driven Generation | Integration / System | **Critical** | `apps.json` loading, catalog schema validation, dynamic list rendering. |
| **FR-2.0** | Search & Multi-Select Filters | Unit / E2E | **High** | Instant client-side search (debounce 100ms), multi-select tag combo logic. |
| **FR-3.0** | Detailed Landing Pages | System / E2E | **High** | Instruction displays, screenshot carousel navigability, related apps recommendations. |
| **FR-4.0** | No-Auth Favorites | E2E | **Critical** | LocalStorage state updates, toggle interactions, persistence across browser reloads. |
| **FR-5.0** | Dynamic SEO & Routing | Integration | **Medium** | Route mappings, title/meta tag updates via React Helmet, Vite SSG pre-compile targets. |
| **NFR-1.0** | Performance | System | **Medium** | Sub-second client interaction speed, Lighthouse performance score $\ge$ 90. |
| **NFR-2.0** | Accessibility (a11y) | System | **High** | WCAG 2.1 AA, keyboard focus indicators, touch targets $\ge$ 48x48px, ARIA labels. |
| **NFR-3.0** | Style & Aesthetics | System | **Medium** | Warm theme styling, Framer Motion micro-animations. |
| **BR-1.1** | Outcome Claims Disclaimer | System | **High** | Legal compliance verbiage on app details pages and aggregator footers. |
| **BR-1.2** | Subdomain Isolation | E2E | **Critical** | Security audit of outbound links (open in new tab to preserve retention). |

---

## 3. Automation vs. Manual Testing Strategy

### 3.1 What Must Be Automated
*   **JSON Schema Integrity:** Build-time check validating `apps.json` properties against the draft-2020-12 schema.
*   **Search & Filter Logic:** Unit tests covering edge-case query text inputs and multi-selection filter permutations.
*   **Bookmarking state machine:** E2E tests validating the append/remove LocalStorage flow.
*   **Route Prerendering Index:** Build step script checking that Vite SSG output contains static index files for all apps.
*   **Outbound Links Target Policy:** E2E check confirming all outgoing buttons have `target="_blank"`.

### 3.2 What Should Be Tested Manually
*   **Visual Warm-Theme Aesthetics:** Reviewing color mode contrast comfort in light and dark settings under varying physical screens.
*   **Framer Motion Animation Smoothness:** Subjective evaluation of the 200–300ms transition times to ensure no UI stuttering or lag.
*   **Screen Reader Voice Quality:** Spot-testing VoiceOver or NVDA readout compatibility during keyboard traversals.

### 3.3 Regression Strategy
*   Pre-commit git hooks to run the complete Vitest unit test suite.
*   CI/CD pipeline triggers Playwright E2E smoke tests and Lighthouse audits prior to merging PR branches.

### 3.4 TDD Alignment for Coding Agents
To implement features safely following Test-Driven Development (TDD):
1.  **Red Phase:** Write failing Unit/Integration tests defining expected component states or filter output (e.g., test inputting an invalid route parameter raises a redirect).
2.  **Green Phase:** Implement minimal code inside components (e.g., React Router boundary or Vite configuration) to make the test pass.
3.  **Refactor Phase:** Optimize clean rendering, extract helper logic, and confirm all tests remain green.

---

## 4. Quality Gates & Release Readiness

### 4.1 Entry Criteria for Testing
1.  Code compiles successfully with no TypeScript compiler errors.
2.  The metadata catalog file `apps.json` satisfies the structural schema.
3.  Unit/Integration test harnesses are configured.

### 4.2 Exit Criteria for Testing (Release Readiness)
*   **Code Coverage:** Statement coverage $\ge$ 85% for core algorithms (`filterCatalog`, storage wrappers).
*   **Automated Tests:** 100% of automated unit, integration, and E2E regression tests pass.
*   **Lighthouse Scores:**
    *   Accessibility (a11y) score $\ge$ 95.
    *   Performance score $\ge$ 90.
*   **Accessibility Gates:** Zero critical failures flagged by `axe-core` accessibility engine.
*   **Build Verification:** Vite SSG outputs valid static HTML pages for all `/apps/:id` entry items.
*   **Legal Compliance:** Disclaimers (FTC outcome disclaimer) correctly present on footer and detail layouts.
