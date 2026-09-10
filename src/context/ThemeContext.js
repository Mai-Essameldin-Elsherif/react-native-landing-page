import React, { createContext, useState, useContext } from 'react';

export const themeColors = {
  dark: {
    background: '#0B0E14',
    cardBg: '#111827',
    cardBorder: '#1F2937',
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    primary: '#6366F1',
    headerBg: '#0F1520',
    chipBg: '#1E293B',
    accent: '#818CF8',
    isDark: true,
  },
  light: {
    background: '#F8FAFC',
    cardBg: '#FFFFFF',
    cardBorder: '#E2E8F0',
    text: '#0F172A',
    textMuted: '#64748B',
    primary: '#4F46E5',
    headerBg: '#FFFFFF',
    chipBg: '#F1F5F9',
    accent: '#6366F1',
    isDark: false,
  },
};

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('dark');

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const theme = themeColors[themeMode];

  return (
    <ThemeContext.Provider value={{ themeMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
