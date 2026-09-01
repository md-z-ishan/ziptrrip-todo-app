import React from 'react';
import { CATEGORIES, PRIORITIES } from '../utils/constants.js';

export function FilterTabs({
  selectedCategory,
  setSelectedCategory,
  selectedPriority,
  setSelectedPriority,
  stats,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.5rem' }}>
      {/* Category Filter Pills */}
      <div className="filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            border: `1px solid ${selectedCategory === 'all' ? 'var(--brand-primary)' : 'var(--border-color)'}`,
            backgroundColor: selectedCategory === 'all' ? 'rgba(124, 58, 237, 0.12)' : 'var(--bg-card)',
            color: selectedCategory === 'all' ? 'var(--brand-primary)' : 'var(--text-secondary)',
            fontWeight: selectedCategory === 'all' ? 600 : 500,
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          All Categories {stats?.total !== undefined ? `(${stats.total})` : ''}
        </button>

        {CATEGORIES.map((cat) => {
          const count = stats?.byCategory?.[cat.id] || 0;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${isSelected ? cat.color : 'var(--border-color)'}`,
                backgroundColor: isSelected ? cat.bgColor : 'var(--bg-card)',
                color: isSelected ? cat.color : 'var(--text-secondary)',
                fontWeight: isSelected ? 600 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              <span>{cat.label}</span>
              <span style={{ opacity: 0.75, fontSize: '0.75rem' }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Priority Level Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Priority:</span>
        <button
          onClick={() => setSelectedPriority('all')}
          style={{
            padding: '0.25rem 0.625rem',
            borderRadius: 'var(--radius-sm)',
            border: `1px solid ${selectedPriority === 'all' ? 'var(--brand-primary)' : 'var(--border-color)'}`,
            backgroundColor: selectedPriority === 'all' ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
            color: selectedPriority === 'all' ? 'var(--brand-primary)' : 'var(--text-secondary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          All
        </button>

        {PRIORITIES.map((p) => {
          const count = stats?.byPriority?.[p.id] || 0;
          const isSelected = selectedPriority === p.id;

          return (
            <button
              key={p.id}
              onClick={() => setSelectedPriority(p.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.25rem 0.625rem',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${isSelected ? p.color : 'var(--border-color)'}`,
                backgroundColor: isSelected ? p.bgColor : 'transparent',
                color: isSelected ? p.color : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span>{p.label}</span>
              <span>({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
