import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const ThemeContext = createContext({ theme: 'dark', setTheme: () => {}, toggleTheme: () => {} });

const STORAGE_KEY = 'solutpag-theme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  // Load from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark') {
        setTheme(saved);
      } else {
        setTheme('dark');
      }
    } catch (e) {
      setTheme('dark');
    }
  }, []);

  // Persist + set data-theme on document element for tooling
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-solutpag-theme', theme);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'dark' : 'dark'));
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}