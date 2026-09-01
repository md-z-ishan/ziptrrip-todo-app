import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Search, Sun, Moon, Plus } from 'lucide-react';
import { applyTheme } from '../utils/themes';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function Header({ searchQuery, setSearchQuery, onOpenCreateModal }) {
  const [theme, setTheme] = useLocalStorage('ziptrip_theme', 'dark');

  React.useEffect(() => {
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
        {/* Brand Title */}
        <Link to="/" className="brand-logo" aria-label="TodoHub Home">
          <CheckSquare size={26} />
          <span className="brand-title-text">TaskMaster</span>
        </Link>

        {/* Search Input Bar */}
        <div className="header-search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search todos"
          />
        </div>

        {/* Actions & Theme Switcher */}
        <div className="header-actions">
          <button
            onClick={onOpenCreateModal}
            className="btn btn-primary"
            style={{ display: 'inline-flex', gap: '0.4rem', padding: '0.5rem 1rem' }}
          >
            <Plus size={18} />
            <span style={{ fontWeight: 600 }}>New Task</span>
          </button>

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} color="#F59E0B" /> : <Moon size={20} color="#7C3AED" />}
          </button>
        </div>
      </div>
    </header>
  );
}
