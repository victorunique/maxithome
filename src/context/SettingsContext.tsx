import React, { useState, useEffect } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/storage';
import { SettingsContext, type ThemeMode, type FontScale } from './settingsContextDef';

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
