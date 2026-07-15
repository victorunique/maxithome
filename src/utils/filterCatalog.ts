import type { CognitiveApp } from '../types';

export interface FilterState {
  type: string[];
  skills: string[];
  difficulty: string[];
  age: string[];
  showFavoritesOnly: boolean;
}

export function filterCatalog(
  catalog: CognitiveApp[],
  filters: FilterState,
  searchQuery: string,
  favorites: string[]
): CognitiveApp[] {
  return catalog.filter((app) => {
    // 1. LocalStorage Favorites Filter
    if (filters.showFavoritesOnly && !favorites.includes(app.id)) {
      return false;
    }

    // 2. Global Text Search Match (Name, description, skills, type tags)
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const textMatch =
        app.name.toLowerCase().includes(q) ||
        app.shortDescription.toLowerCase().includes(q) ||
        app.longDescription.toLowerCase().includes(q) ||
        app.tags.skills.some((s) => s.toLowerCase().includes(q)) ||
        app.tags.type.some((t) => t.toLowerCase().includes(q));
      if (!textMatch) return false;
    }

    // 3. Multi-Dimensional Tag Matching (AND across dimensions, OR within dimensions)

    // Dimension A: Type
    if (filters.type.length > 0) {
      const hasMatchingType = app.tags.type.some((t) => filters.type.includes(t));
      if (!hasMatchingType) return false;
    }

    // Dimension B: Cognitive Skills
    if (filters.skills.length > 0) {
      const hasMatchingSkill = app.tags.skills.some((s) => filters.skills.includes(s));
      if (!hasMatchingSkill) return false;
    }

    // Dimension C: Difficulty
    if (filters.difficulty.length > 0) {
      const hasMatchingDifficulty = app.tags.difficulty.some((d) => filters.difficulty.includes(d));
      if (!hasMatchingDifficulty) return false;
    }

    // Dimension D: Age Suitability
    if (filters.age.length > 0) {
      const hasMatchingAge = app.tags.age.some((a) => filters.age.includes(a));
      if (!hasMatchingAge) return false;
    }

    return true;
  });
}
