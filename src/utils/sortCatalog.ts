import type { CognitiveApp } from '../types';

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'date-newest'
  | 'date-oldest';

/**
 * Sort a list of cognitive apps by the given sort option.
 * Returns a new array — does not mutate the input.
 */
export function sortCatalog(
  apps: CognitiveApp[],
  sortOption: SortOption
): CognitiveApp[] {

  const sorted = [...apps];

  switch (sortOption) {
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'date-newest':
      sorted.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      break;
    case 'date-oldest':
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      break;
  }

  return sorted;
}
