import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

export function Header() {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="container header-inner">
        {/* Application Branding */}
        <Link to="/todos" className="brand-logo" aria-label="Ziptrrip Todo Application Home">
          <CheckSquare size={24} />
          <span>TaskMaster</span>
        </Link>

        {/* Header Navigation */}
        <nav className="header-nav" aria-label="Main Navigation">
          <Link
            to="/todos"
            className={`nav-link ${location.pathname === '/todos' || location.pathname === '/' ? 'active' : ''}`}
          >
            Tasks
          </Link>
        </nav>
      </div>
    </header>
  );
}
