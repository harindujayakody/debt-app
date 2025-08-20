import { useState, useEffect } from 'react';

const themes = ['theme-light', 'theme-dark', 'theme-midnight'];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('theme-light');

  useEffect(() => {
    document.documentElement.classList.add(theme);
    return () => {
      document.documentElement.classList.remove(theme);
    };
  }, [theme]);

  function cycleTheme() {
    const next = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(next);
  }

  return (
    <button className="theme-toggle" onClick={cycleTheme}>
      Theme: {theme.replace('theme-', '')}
    </button>
  );
}
