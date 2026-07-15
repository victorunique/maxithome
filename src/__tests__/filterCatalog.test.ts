import { describe, it, expect } from 'vitest';
import { filterCatalog } from '../utils/filterCatalog';
import type { FilterState } from '../utils/filterCatalog';
import type { CognitiveApp } from '../types';

const mockCatalog: CognitiveApp[] = [
  {
    id: 'flashlearn',
    name: 'FlashLearn',
    subdomain: 'https://victorunique.github.io/flashlearn',
    icon: '/icons/flashlearn.png',
    shortDescription: 'Boost your vocabulary and memory.',
    longDescription: 'Active recall language builder.',
    howToUse: 'Flip cards',
    screenshots: [],
    createdAt: '2025-01-15',
    updatedAt: '2026-03-10',
    tags: {
      type: ['Learning', 'Tool'],
      skills: ['Memory', 'Language'],
      difficulty: ['Beginner'],
      age: ['8+'],
    },
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    subdomain: 'https://victorunique.github.io/sudoku',
    icon: '/icons/sudoku.png',
    shortDescription: 'Classic number puzzle.',
    longDescription: 'Logical deduction workout.',
    howToUse: 'Fill cells',
    screenshots: [],
    createdAt: '2025-03-01',
    updatedAt: '2026-05-20',
    tags: {
      type: ['Game'],
      skills: ['Logic', 'Reasoning'],
      difficulty: ['Intermediate', 'Advanced'],
      age: ['12+', 'Senior Friendly'],
    },
  },
];

const defaultFilters: FilterState = {
  type: [],
  skills: [],
  difficulty: [],
  age: [],
  showFavoritesOnly: false,
};

describe('filterCatalog Algorithm', () => {
  it('returns all apps when query and filters are empty', () => {
    const results = filterCatalog(mockCatalog, defaultFilters, '', []);
    expect(results).toHaveLength(2);
  });

  it('filters apps by search query case-insensitively', () => {
    const results = filterCatalog(mockCatalog, defaultFilters, 'SUDOKU', []);
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('sudoku');
  });

  it('filters apps by search query matching descriptions', () => {
    const results = filterCatalog(mockCatalog, defaultFilters, 'vocabulary', []);
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('flashlearn');
  });

  it('applies OR logic within the same filter category (e.g. Type: Game or Tool)', () => {
    const filters = {
      ...defaultFilters,
      type: ['Game', 'Tool'],
    };
    const results = filterCatalog(mockCatalog, filters, '', []);
    expect(results).toHaveLength(2);
  });

  it('applies AND logic across different filter categories (e.g. Type: Game AND Skills: Logic)', () => {
    const filters = {
      ...defaultFilters,
      type: ['Game'],
      skills: ['Logic'],
    };
    const results = filterCatalog(mockCatalog, filters, '', []);
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('sudoku');
  });

  it('applies AND logic which yields empty results if there is a mismatch', () => {
    const filters = {
      ...defaultFilters,
      type: ['Tool'],
      skills: ['Logic'],
    };
    const results = filterCatalog(mockCatalog, filters, '', []);
    expect(results).toHaveLength(0);
  });

  it('filters by bookmarks when showFavoritesOnly is true', () => {
    const filters = {
      ...defaultFilters,
      showFavoritesOnly: true,
    };
    const results = filterCatalog(mockCatalog, filters, '', ['sudoku']);
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('sudoku');
  });
});
