import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark';
export type FontScale = 'normal' | 'large' | 'extra-large';

export interface SettingsContextProps {
  theme: ThemeMode;
  fontScale: FontScale;
  toggleTheme: () => void;
  setFontScale: (scale: FontScale) => void;
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
