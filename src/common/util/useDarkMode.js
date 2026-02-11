import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

const DARK_MODE_KEY = 'darkMode';

export const useDarkMode = () => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    if (stored !== null) {
      return stored === 'true';
    }
    return prefersDark;
  });

  const toggleDarkMode = (value) => {
    const newValue = value !== undefined ? value : !darkMode;
    setDarkMode(newValue);
    localStorage.setItem(DARK_MODE_KEY, String(newValue));
  };

  return [darkMode, toggleDarkMode];
};

export const getDarkModeFromStorage = () => {
  const stored = localStorage.getItem(DARK_MODE_KEY);
  if (stored !== null) {
    return stored === 'true';
  }
  return null;
};
