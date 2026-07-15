import type { CognitiveApp } from '../types';

let cachedCatalog: CognitiveApp[] | null = null;

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

// Helper to set mock data in testing or pre-rendering scenarios
export function setMockCatalog(catalog: CognitiveApp[]): void {
  cachedCatalog = catalog;
}
