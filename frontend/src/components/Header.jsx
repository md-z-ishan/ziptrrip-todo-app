import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Sun, Moon } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { applyTheme } from '../utils/themes.js';

export function Header() {
  const location = useLocation();
  const [theme, setTheme] = useLocalStorage('ziptrip_theme', 'dark');

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <header className="app-header">
      <div className="container header-inner">
        {/* Application Branding */}
        <Link to="/todos" className="brand-logo" aria-label="Ziptrrip Todo Application Home">
          <CheckSquare size={24} />
          <span>TaskMaster</span>
        </Link>

        {/* Navigation & Theme Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <nav className="header-nav" aria-label="Main Navigation">
            <Link
              to="/todos"
              className={`nav-link ${location.pathname === '/todos' || location.pathname === '/' ? 'active' : ''}`}
            >
              Tasks
            </Link>
          </nav>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'background-color 150ms ease, transform 150ms ease',
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#7C3AED" />}
          </button>
        </div>
      </div>
    </header>
  );
}
