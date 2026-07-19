import { describe, it, expect } from 'vitest';
import { sortCatalog } from '../utils/sortCatalog';
import type { CognitiveApp } from '../types';

const mockCatalog: CognitiveApp[] = [
  {
    id: 'chess',
    name: 'Chess',
    subdomain: 'https://victorunique.github.io/chess',
    icon: '/icons/chess.png',
    shortDescription: 'Strategy game.',
    longDescription: 'Classic chess.',
    howToUse: 'Move pieces.',
    screenshots: [],
    createdAt: '2024-12-15',
    updatedAt: '2025-09-30',
    tags: {
      type: ['Game'],
      skills: ['Logic', 'Executive Function', 'Decision Making'],
      difficulty: ['Advanced'],
      age: ['12+', 'Adult'],
    },
  },
  {
    id: 'flashlearn',
    name: 'FlashLearn',
    subdomain: 'https://victorunique.github.io/flashlearn',
    icon: '/icons/flashlearn.png',
    shortDescription: 'Flashcard system.',
    longDescription: 'Active recall builder.',
    howToUse: 'Flip cards.',
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
    shortDescription: 'Number puzzle.',
    longDescription: 'Logic deduction.',
    howToUse: 'Fill cells.',
    screenshots: [],
    createdAt: '2024-11-01',
    updatedAt: '2026-06-01',
    tags: {
      type: ['Game'],
      skills: ['Logic', 'Reasoning'],
      difficulty: ['Intermediate', 'Advanced'],
      age: ['12+', 'Adult', 'Senior Friendly'],
    },
  },
];

describe('sortCatalog', () => {
  it('sorts alphabetically A→Z by name when sort option is "name-asc"', () => {
    const result = sortCatalog(mockCatalog, 'name-asc');
    expect(result.map((a) => a.name)).toEqual(['Chess', 'FlashLearn', 'Sudoku']);
  });

  it('sorts reverse alphabetically Z→A by name when sort option is "name-desc"', () => {
    const result = sortCatalog(mockCatalog, 'name-desc');
    expect(result.map((a) => a.name)).toEqual(['Sudoku', 'FlashLearn', 'Chess']);
  });

  it('sorts by updatedAt descending (newest first) when sort option is "date-newest"', () => {
    // updatedAt: Sudoku 2026-06-01, FlashLearn 2026-03-10, Chess 2025-09-30
    const result = sortCatalog(mockCatalog, 'date-newest');
    expect(result.map((a) => a.id)).toEqual(['sudoku', 'flashlearn', 'chess']);
  });

  it('sorts by createdAt ascending (oldest first) when sort option is "date-oldest"', () => {
    // createdAt: Sudoku 2024-11-01, Chess 2024-12-15, FlashLearn 2025-01-15
    const result = sortCatalog(mockCatalog, 'date-oldest');
    expect(result.map((a) => a.id)).toEqual(['sudoku', 'chess', 'flashlearn']);
  });

  it('returns an empty array when given an empty array', () => {
    const result = sortCatalog([], 'name-asc');
    expect(result).toEqual([]);
  });

  it('returns a single-element array unchanged regardless of sort option', () => {
    const single = [mockCatalog[0]];
    const result = sortCatalog(single, 'name-desc');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('chess');
  });

  it('does not mutate the original array', () => {
    const original = [...mockCatalog];
    sortCatalog(mockCatalog, 'name-desc');
    expect(mockCatalog.map((a) => a.id)).toEqual(original.map((a) => a.id));
  });
});
