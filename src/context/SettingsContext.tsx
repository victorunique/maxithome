import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/storage';

export type ThemeMode = 'light' | 'dark';
export type FontScale = 'normal' | 'large' | 'extra-large';

interface SettingsContextProps {
  theme: ThemeMode;
  fontScale: FontScale;
  toggleTheme: () => void;
  setFontScale: (scale: FontScale) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    // Detect system preference or saved value
    if (typeof window !== 'undefined') {
      const saved = getLocalStorageItem<ThemeMode | null>('maxithome_theme', null);
      if (saved === 'light' || saved === 'dark') return saved;
      
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemDark ? 'dark' : 'light';
    }
    return 'light';
  });

  const [fontScale, setFontScaleState] = useState<FontScale>(() => {
    return getLocalStorageItem<FontScale>('maxithome_font_scale', 'normal');
  });

  // Apply theme class to HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setLocalStorageItem('maxithome_theme', theme);
  }, [theme]);

  // Apply font scale class to HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('font-scale-normal', 'font-scale-large', 'font-scale-extra-large');
    root.classList.add(`font-scale-${fontScale}`);
    setLocalStorageItem('maxithome_font_scale', fontScale);
  }, [fontScale]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setFontScale = (scale: FontScale) => {
    setFontScaleState(scale);
  };

  return (
    <SettingsContext.Provider value={{ theme, fontScale, toggleTheme, setFontScale }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
