import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SettingsProvider } from '../context/SettingsContext';
import { Header } from '../components/Header';
import { HomeView } from '../views/HomeView';
import type { CognitiveApp } from '../types';

// Mock matchMedia for jsdom
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

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
];

describe('Header & HomeView Modifications', () => {
  it('does NOT render "Apps & Games" link in Header', () => {
    render(
      <HelmetProvider>
        <SettingsProvider>
          <BrowserRouter>
            <Header showFavoritesOnly={false} onToggleFavorites={() => {}} />
          </BrowserRouter>
        </SettingsProvider>
      </HelmetProvider>
    );

    // This should fail on current code because "Apps & Games" is present
    const links = screen.queryAllByText(/Apps & Games/i);
    expect(links.length).toBe(0);
  });

  it('renders the new tagline description in HomeView page details', () => {
    render(
      <HelmetProvider>
        <SettingsProvider>
          <BrowserRouter>
            <HomeView
              catalog={mockCatalog}
              favorites={[]}
              toggleFavorite={() => {}}
              showFavoritesOnly={false}
              setShowFavoritesOnly={() => {}}
            />
          </BrowserRouter>
        </SettingsProvider>
      </HelmetProvider>
    );

    // This should fail on current code because the old tagline is rendered
    const newTagline = 'A curated directory of classic cognitive training tools, puzzles, and interactive educational games designed to challenge your mind and sharpen your skills.';
    const textElement = screen.queryByText(newTagline);
    expect(textElement).toBeTruthy();
  });

  it('renders mobile filter drawer with z-[100] when mobile filters button is clicked', async () => {
    const { fireEvent } = await import('@testing-library/react');
    render(
      <HelmetProvider>
        <SettingsProvider>
          <BrowserRouter>
            <HomeView
              catalog={mockCatalog}
              favorites={[]}
              toggleFavorite={() => {}}
              showFavoritesOnly={false}
              setShowFavoritesOnly={() => {}}
            />
          </BrowserRouter>
        </SettingsProvider>
      </HelmetProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /filters/i });
    fireEvent.click(toggleButton);

    const closeButton = screen.getByRole('button', { name: /close filters/i });
    expect(closeButton).toBeDefined();
    
    const overlay = closeButton.closest('.fixed');
    expect(overlay).toBeDefined();
    expect(overlay?.className).toContain('z-[100]');
  });

  it('defaults sort option to "date-newest" (Recently Updated) and does not contain "default" option', () => {
    render(
      <HelmetProvider>
        <SettingsProvider>
          <BrowserRouter>
            <HomeView
              catalog={mockCatalog}
              favorites={[]}
              toggleFavorite={() => {}}
              showFavoritesOnly={false}
              setShowFavoritesOnly={() => {}}
            />
          </BrowserRouter>
        </SettingsProvider>
      </HelmetProvider>
    );

    const sortSelect = screen.getByLabelText(/sort apps/i) as HTMLSelectElement;
    expect(sortSelect.value).toBe('date-newest');

    const options = Array.from(sortSelect.options).map(opt => opt.value);
    expect(options).not.toContain('default');
    expect(options).toContain('date-newest');
  });
});

