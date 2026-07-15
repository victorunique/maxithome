# MaxitHome - Vision and Product Definition

MaxitHome is a modern, web-based aggregator designed to catalog, categorize, and recommend online applications that enhance human cognitive skills and intelligence (Cognitive Apps). 

Rather than executing the applications themselves, MaxitHome serves as a unified entry portal. Each application is a completely independent project running on its own subdomain (e.g., `minecraft.maxithome.com`), while the aggregator platform organizes and guides users to discover them.

---

## Target Users
MaxitHome is designed for a broad demographic, spanning ages 8 to 80. The primary target groups include:
*   **Children (8+):** Engaging in educational and cognitive games.
*   **Teenagers & College Students:** Improving focus, logic, and reasoning skills.
*   **Working Professionals:** Enhancing productivity, mathematics, and executive function.
*   **Seniors:** Maintaining memory, processing speed, and attention through senior-friendly interfaces.

---

## User Problems
*   **Fragmentation:** Cognitive improvement apps are scattered across the internet, making them hard for users to find, evaluate, and trust in one place.
*   **Complex or Intimidating UIs:** Many existing cognitive tools are tailored for developers or geeks, featuring complex dashboards that alienate younger children or older adults.
*   **Lack of Structure:** Users lack a centralized portal that classifies apps across multiple cognitive dimensions (e.g., memory vs. focus) and difficulty levels.

---

## Product Goals
*   **Centralized Cognitive Portal:** Provide a single, curated repository of high-quality cognitive apps.
*   **Warm and Friendly Experience:** Design a clean, welcoming, and intuitive user interface that feels approachable to all ages, avoiding complex "geek-style" dashboards.
*   **Metadata-Driven Scalability:** Ensure the platform remains easy to extend, where adding new apps is as simple as updating a configuration file.
*   **Seamless Discovery:** Offer robust multi-dimensional search and filtering to connect users with apps suited to their exact needs.

---

## Core Capabilities
*   **Metadata-Driven Architecture:** All platform pages, categories, search results, and details are dynamically generated from a single config file (`apps.json`).
*   **Multi-Dimensional Tagging:** Applications are classified across four key dimensions:
    1.  *Type:* Tool, Game, Learning, Assessment, Other.
    2.  *Cognitive Skill:* Memory, Focus, Attention, Logic, Reasoning, Spatial, Processing Speed, Language, Mathematics, Creativity, Executive Function, Decision Making.
    3.  *Difficulty:* Beginner, Intermediate, Advanced.
    4.  *Age Suitability:* 8+, 12+, Adult, Senior Friendly.
*   **Global Search & Dynamic Filtering:** Instantaneous search across app names, descriptions, and tags with real-time multi-select filters.
*   **SEO-Optimized Pages:** Automatically generated subpages for individual app details, skills (e.g., `/skills/memory`), and types (e.g., `/type/game`) to maximize search engine visibility.
*   **No-Auth Bookmarks (Favorites):** Local saving of favorite apps using browser `LocalStorage` for immediate utility without user registration barriers.
*   **Dedicated App Details:** Static landing pages detailing app functionality, screenshots, usage instructions, and related applications, pointing directly to the app's subdomain.

---

## Out-of-Scope
*   **Application Logic Hosting:** Hosting or running the actual interactive cognitive tools. All tools run independently on separate subdomains.
*   **Backend Services:** User accounts, database management, cloud bookmark syncing, and Server-Side Rendering (SSR) are excluded from the initial scope.

---

## Success Metrics
*   **Discoverability:** High search engine indexing across cognitive tags and app keywords.
*   **Engagement:** Percentage of return users who save apps to their local favorites list.
*   **Usability & Performance:** Sub-second page rendering and high Lighthouse accessibility scores.

---

## Future Direction
*   **Cloud Synchronization:** Integration of user accounts and database systems for cloud-saved favorites.
*   **Content Management System (CMS):** Migration from a static `apps.json` to a Headless CMS, REST API, or GraphQL to allow non-technical management of the catalog.
*   **AI Recommendations:** Algorithmic app recommendations based on user preferences and cognitive assessment scores.
