import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '../hooks/useFavorites';

describe('useFavorites Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  });

  it('loads initial empty favorites array', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('loads existing favorites from local storage', () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('maxithome_favorites', JSON.stringify(['sudoku', 'herbert']));
    }
    
    const { result } = renderHook(() => useFavorites());
    // Wait for useEffect initialization
    act(() => {
      // Trigger update cycle
    });
    
    expect(result.current.favorites).toEqual(['sudoku', 'herbert']);
    expect(result.current.isFavorite('sudoku')).toBe(true);
    expect(result.current.isFavorite('flashlearn')).toBe(false);
  });

  it('toggles favorites state and persists to local storage', () => {
    const { result } = renderHook(() => useFavorites());

    // Toggle on
    act(() => {
      result.current.toggleFavorite('sudoku');
    });

    expect(result.current.favorites).toEqual(['sudoku']);
    expect(result.current.isFavorite('sudoku')).toBe(true);
    expect(
      JSON.parse(window.localStorage.getItem('maxithome_favorites') || '[]')
    ).toEqual(['sudoku']);

    // Toggle off
    act(() => {
      result.current.toggleFavorite('sudoku');
    });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.isFavorite('sudoku')).toBe(false);
    expect(
      JSON.parse(window.localStorage.getItem('maxithome_favorites') || '[]')
    ).toEqual([]);
  });
});
