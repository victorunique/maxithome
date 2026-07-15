import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppDetailView } from '../views/AppDetailView';
import type { CognitiveApp } from '../types';

const scrollToMock = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToMock, writable: true });

const mockCatalog: CognitiveApp[] = [
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
      skills: ['Logic'],
      difficulty: ['Intermediate'],
      age: ['12+'],
    },
  },
  {
    id: 'block-craft',
    name: 'Block Craft',
    subdomain: 'https://victorunique.github.io/block-craft',
    icon: '/icons/block-craft.png',
    shortDescription: 'Build blocks.',
    longDescription: 'Creative building block craft.',
    howToUse: 'Place blocks',
    screenshots: [],
    createdAt: '2026-07-10',
    updatedAt: '2026-07-15',
    tags: {
      type: ['Game'],
      skills: ['Logic'],
      difficulty: ['Intermediate'],
      age: ['12+'],
    },
  },
];

describe('AppDetailView Scroll Behavior', () => {
  beforeEach(() => {
    scrollToMock.mockClear();
  });

  it('scrolls to the top of the page when app detail page is loaded', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/apps/sudoku']}>
          <Routes>
            <Route
              path="/apps/:id"
              element={
                <AppDetailView
                  catalog={mockCatalog}
                  favorites={[]}
                  toggleFavorite={() => {}}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });
});
