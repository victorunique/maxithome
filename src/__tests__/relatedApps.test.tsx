import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppDetailView } from '../views/AppDetailView';
import type { CognitiveApp } from '../types';

Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

const mockCatalog: CognitiveApp[] = [
  {
    id: 'party-nest',
    name: 'Party Nest',
    subdomain: 'https://partynest.maxithome.com',
    icon: '/icons/party-nest.png',
    shortDescription: 'Birthday party invitation and RSVP manager.',
    longDescription: 'Full description.',
    howToUse: 'Use it.',
    screenshots: [],
    createdAt: '2026-07-01',
    updatedAt: '2026-07-01',
    tags: {
      type: ['Tool'],
      skills: ['Executive Function', 'Decision Making'],
      difficulty: ['Beginner'],
      age: ['8+'],
    },
  },
  {
    id: 'xherbert',
    name: 'XHerbert',
    subdomain: 'https://xherbert.maxithome.com',
    icon: '/icons/xherbert.png',
    shortDescription:
      'An algorithmic programming puzzle game in which you guide a robot through grids with minimal instructions.',
    longDescription: 'Full description.',
    howToUse: 'Program robot.',
    screenshots: [],
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    tags: {
      type: ['Game'],
      skills: ['Executive Function'],
      difficulty: ['Intermediate'],
      age: ['8+'],
    },
  },
];

describe('AppDetailView Related Apps layout', () => {
  it('prevents Related Apps icon from shrinking and constrains text container width', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/apps/party-nest']}>
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

    const relatedHeading = screen.getByRole('heading', { name: 'Related Apps' });
    const relatedSection = relatedHeading.parentElement;
    expect(relatedSection).not.toBeNull();

    const relatedLink = screen.getByRole('link', { name: /XHerbert/i });
    const iconWrapper = relatedLink.firstElementChild;
    const textWrapper = relatedLink.lastElementChild;

    expect(iconWrapper?.className).toContain('shrink-0');
    expect(textWrapper?.className).toContain('min-w-0');
    expect(textWrapper?.className).toContain('flex-1');
  });
});
