# MaxitHome - Project Constraints and Assumptions

This document outlines the technical boundaries, architectural constraints, and compliance requirements governing the development of MaxitHome.

---

## Technology Constraints
The project must be built using the following frontend technology stack:
*   **Core Framework:** React (Vite-based) with TypeScript.
*   **Styling:** Tailwind CSS and shadcn/ui.
*   **Navigation:** React Router.
*   **Icons:** Lucide Icons.
*   **Animations:** Framer Motion (restricted to light and non-intrusive micro-animations).

---

## Platform & Infrastructure Constraints
*   **Frontend-Only:** The architecture must contain no backend, no active servers, and no server-side Node runtime.
*   **Client-Side Persistence:** LocalStorage is the sole storage mechanism for saving application favorites. No user databases are allowed.
*   **Metadata Single Source of Truth:** All dynamic content must be driven by `apps.json`. Modifying or adding an app must require zero changes to the React source code.

---

## Deployment Constraints
*   **Host Platform:** The application must be deployable as a static site on Cloudflare Pages.
*   **Zero-Server Builds:** The build pipeline must produce only static assets (HTML, CSS, JS, and media) with no server-side execution.

---

## Performance Constraints
*   **Page Load Time:** Page interactions, search, and filtering must execute entirely on the client-side to ensure sub-second response times.
*   **Lightweight Assets:** Media assets (screenshots, icons) must be optimized to keep the initial page bundle minimal.

---

## Security Constraints
*   **No Sensitive Client Data:** No personally identifiable information (PII) or secrets should be stored in `LocalStorage`.
*   **Domain Isolation:** The platform must not embed applications in iframe structures if it introduces security/CORS vulnerabilities. Instead, users must be redirected to the independent subdomain.

---

## Compliance & Accessibility (a11y)
*   **Inclusive Design:** Must support keyboard navigation, screen reader compatibility (semantic HTML tags), dark mode, high contrast options, font scaling, and sufficiently large touch targets.
*   **WCAG Guidelines:** Strive for WCAG 2.1 AA alignment to accommodate users from ages 8 to 80.

---

## Known Assumptions
*   **Independent Subdomains:** The target cognitive applications are assumed to be hosted on distinct, fully configured subdomains (e.g., `https://minecraft.maxithome.com`).
*   **Scale of Catalog:** The number of listed apps remains small enough to fit within a single local `apps.json` file without requiring pagination APIs or external database queries.

---

## Explicit Non-Goals
*   **Backend Integration:** Implementing databases, server environments, or user login systems in v1.0.
*   **Functional Application Code:** Developing or maintaining the source code of the individual cognitive apps displayed on the platform.
