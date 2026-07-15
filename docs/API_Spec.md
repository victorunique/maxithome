# MaxitHome API & Metadata Specification

This document defines the metadata formats, JSON schemas, URL routing structures, client-side data loaders, and analytical event schemas for MaxitHome v1.0.

---

## 1. Catalog Configuration Metadata (`apps.json`)

The single source of truth for the entire platform is a static JSON file located at `/public/apps.json`. Below is the complete JSON Schema defining its structure.

### 1.1 JSON Schema Definition

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "AppCatalog",
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "id",
      "name",
      "subdomain",
      "icon",
      "shortDescription",
      "longDescription",
      "howToUse",
      "screenshots",
      "tags"
    ],
    "properties": {
      "id": {
        "type": "string",
        "description": "Unique identifier of the application (kebab-case, matches routing parameter).",
        "pattern": "^[a-z0-9-]+$"
      },
      "name": {
        "type": "string",
        "description": "User-facing name of the application."
      },
      "subdomain": {
        "type": "string",
        "description": "Absolute destination URL where the application is deployed (can be subdomains or third-party domains).",
        "format": "uri"
      },
      "icon": {
        "type": "string",
        "description": "Absolute URL path to the app icon in the public assets directory (e.g. /icons/minecraft.png)."
      },
      "shortDescription": {
        "type": "string",
        "maxLength": 120,
        "description": "A concise one-sentence description displayed on aggregator cards."
      },
      "longDescription": {
        "type": "string",
        "description": "Comprehensive description of the application's cognitive goals. Avoid health claims (FTC compliant)."
      },
      "howToUse": {
        "type": "string",
        "description": "Step-by-step instructions on how the user plays/interacts with the application."
      },
      "screenshots": {
        "type": "array",
        "description": "List of absolute paths to screenshot assets.",
        "items": {
          "type": "string"
        }
      },
      "officialWebsite": {
        "type": "string",
        "description": "Optional landing page link for third-party tools.",
        "format": "uri"
      },
      "featured": {
        "type": "boolean",
        "description": "Promotes the app to a highlighted slot on the home dashboard."
      },
      "new": {
        "type": "boolean",
        "description": "Flags the app with a 'New' badge."
      },
      "tags": {
        "type": "object",
        "required": ["type", "skills", "difficulty", "age"],
        "properties": {
          "type": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": ["Tool", "Game", "Learning", "Assessment", "Other"]
            }
              },
          "skills": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "Memory", "Focus", "Attention", "Logic", "Reasoning",
                "Spatial", "Processing Speed", "Language", "Mathematics",
                "Creativity", "Executive Function", "Decision Making"
              ]
            }
          },
          "difficulty": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": ["Beginner", "Intermediate", "Advanced"]
            }
          },
          "age": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": ["8+", "12+", "Adult", "Senior Friendly"]
            }
          }
        }
      }
    }
  }
}
```

### 1.2 TypeScript Interfaces

To ensure strict type safety across the React codebase:

```typescript
export type AppType = 'Tool' | 'Game' | 'Learning' | 'Assessment' | 'Other';

export type CognitiveSkill =
  | 'Memory'
  | 'Focus'
  | 'Attention'
  | 'Logic'
  | 'Reasoning'
  | 'Spatial'
  | 'Processing Speed'
  | 'Language'
  | 'Mathematics'
  | 'Creativity'
  | 'Executive Function'
  | 'Decision Making';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type AgeSuitability = '8+' | '12+' | 'Adult' | 'Senior Friendly';

export interface AppTags {
  type: AppType[];
  skills: CognitiveSkill[];
  difficulty: DifficultyLevel[];
  age: AgeSuitability[];
}

export interface CognitiveApp {
  id: string;
  name: string;
  subdomain: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  howToUse: string;
  screenshots: string[];
  officialWebsite?: string;
  featured?: boolean;
  new?: boolean;
  tags: AppTags;
}
```

---

## 2. Client Data-Loading Logic

Since the platform is entirely static, metadata is loaded asynchronously at launch.

```typescript
let cachedCatalog: CognitiveApp[] | null = null;

/**
 * Fetches and caches the dynamic cognitive application catalog
 */
export async function getAppCatalog(): Promise<CognitiveApp[]> {
  if (cachedCatalog) {
    return cachedCatalog;
  }
  
  try {
    const response = await fetch('/apps.json');
    if (!response.ok) {
      throw new Error(`Failed to load app catalog. HTTP Status: ${response.status}`);
    }
    cachedCatalog = await response.json();
    return cachedCatalog || [];
  } catch (error) {
    console.error('MaxitHome Loader Error:', error);
    return [];
  }
}
```

---

## 3. URL Routing & Search Contracts

### 3.1 Client & Prerender Routes

*   **Homepage Directory:** `/`
    *   *Purpose:* Displays search input, multi-select checklist filters, favorites list, and responsive app card grids.
*   **App Detail View:** `/apps/:id`
    *   *Purpose:* Displays custom landing pages for the application matching `:id`. If `:id` is not present in `apps.json`, renders a 404 page.
*   **Cognitive Skill View:** `/skills/:skill`
    *   *Purpose:* Automatically filters directory dashboard views to only show apps possessing the parameter `:skill` (case-insensitive string matching of `CognitiveSkill` enum values).
*   **Application Type View:** `/type/:type`
    *   *Purpose:* Filters dashboard views to only show apps matching `:type` (case-insensitive string matching of `AppType` enum values).

### 3.2 Dynamic Search Engine Logic
The local client-side search matches a query string `Q` against a item `A` by checking:
```typescript
const matchQuery = (app: CognitiveApp, q: string): boolean => {
  const normalizedQ = q.toLowerCase().trim();
  if (!normalizedQ) return true;
  
  return (
    app.name.toLowerCase().includes(normalizedQ) ||
    app.shortDescription.toLowerCase().includes(normalizedQ) ||
    app.longDescription.toLowerCase().includes(normalizedQ) ||
    app.tags.skills.some(skill => skill.toLowerCase().includes(normalizedQ)) ||
    app.tags.type.some(t => t.toLowerCase().includes(normalizedQ))
  );
};
```

---

## 4. Subdomain & External Redirect Integration

To prevent context loss, secure external links, and ensure user retention:

1.  **Tab Isolation:** All links navigating away from `maxithome.com` (to app subdomains or external official sites) MUST use the following anchor configuration:
    ```html
    <a 
      href="https://sudoku.maxithome.com" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      Launch App
    </a>
    ```
2.  **Safety Notice:** To satisfy FTC transparency guidelines regarding outcomes:
    > "MaxitHome aggregates third-party software for entertainment and skill challenge purposes. MaxitHome does not host the interactive applications directly, nor does it guarantee specific cognitive enhancement outcomes."

---

## 5. Analytics & Observability Integration

MaxitHome integrates Cloudflare Web Analytics to monitor click-through rates. The CDN auto-injects the tracking tag, but for granular tracking of external application launches, the following client click-tracker event hook is defined:

```typescript
/**
 * Custom tracking function for external navigation
 * Sends click event metrics to Cloudflare Custom Events (if configured)
 */
export function trackAppLaunch(appId: string, destinationUrl: string): void {
  // Safe execution checker
  if (typeof window !== 'undefined' && (window as any).cf) {
    (window as any).cf('send', {
      type: 'event',
      category: 'Outbound Navigation',
      action: 'Launch App',
      label: appId,
      value: destinationUrl
    });
  }
  console.log(`[Analytics Log] User launched app: ${appId} -> ${destinationUrl}`);
}
```
