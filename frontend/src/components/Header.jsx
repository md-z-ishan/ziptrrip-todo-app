import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Sun, Moon, Download, Upload } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { applyTheme } from '../utils/themes.js';
import { exportTodosToJson, importTodosFromJson } from '../utils/backup.js';
import { useToast } from '../hooks/useToast.jsx';

export function Header({ todos = [], onImportSuccess }) {
  const location = useLocation();
  const [theme, setTheme] = useLocalStorage('ziptrip_theme', 'dark');
  const fileInputRef = useRef(null);
  const { addToast } = useToast();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const handleExport = () => {
    if (!todos || todos.length === 0) {
      addToast({ message: 'No tasks available to export', type: 'info' });
      return;
    }
    exportTodosToJson(todos);
    addToast({ message: '📥 Todos exported to JSON file!', type: 'success' });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const importedData = await importTodosFromJson(file);
      if (onImportSuccess) {
        onImportSuccess(importedData);
      }
      addToast({ message: `📤 Successfully imported ${importedData.length} tasks!`, type: 'success' });
    } catch (err) {
      addToast({ message: err.message || 'Failed to import JSON file', type: 'error' });
    } finally {
      e.target.value = '';
    }
  };

  return (
    <header className="app-header">
      <div className="container header-inner">
        {/* Application Branding */}
        <Link to="/todos" className="brand-logo" aria-label="Ziptrrip Todo Application Home">
          <CheckSquare size={24} />
          <span>TaskMaster</span>
        </Link>

        {/* Hidden File Input for Import */}
        <input
          type="file"
          ref={fileInputRef}
          accept=".json"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* Actions & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <nav className="header-nav" aria-label="Main Navigation">
            <Link
              to="/todos"
              className={`nav-link ${location.pathname === '/todos' || location.pathname === '/' ? 'active' : ''}`}
            >
              Tasks
            </Link>
          </nav>

          {/* Export JSON Button */}
          <button
            onClick={handleExport}
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.65rem', fontSize: '0.78125rem', minHeight: '2.25rem' }}
            title="Export tasks as JSON backup file"
          >
            <Download size={14} />
            <span className="brand-title-text">Export</span>
          </button>

          {/* Import JSON Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.65rem', fontSize: '0.78125rem', minHeight: '2.25rem' }}
            title="Import tasks from JSON backup file"
          >
            <Upload size={14} />
            <span className="brand-title-text">Import</span>
          </button>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.35rem',
              height: '2.35rem',
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
