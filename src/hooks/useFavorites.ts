import { useState, useEffect, useCallback } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/storage';

const FAVORITES_KEY = 'maxithome_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [storageError, setStorageError] = useState<boolean>(false);

  // Load initially
  useEffect(() => {
    const initial = getLocalStorageItem<string[]>(FAVORITES_KEY, []);
    setFavorites(initial);
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.includes(id);
    },
    [favorites]
  );

  const toggleFavorite = useCallback((id: string) => {
    try {
      // Test if storage is writeable (for FT-DETAIL-06)
      if (typeof window !== 'undefined') {
        const testKey = '__storage_test__';
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
      }

      setFavorites((prev) => {
        const next = prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
        setLocalStorageItem(FAVORITES_KEY, next);
        return next;
      });
      setStorageError(false);
    } catch (e) {
      console.error('[Favorites Error] LocalStorage is not writable:', e);
      setStorageError(true);
    }
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    storageError,
  };
}
