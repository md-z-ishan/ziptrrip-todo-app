import React from 'react';
import { CATEGORIES, PRIORITIES, SORT_OPTIONS } from '../utils/constants';

export function FilterTabs({
  selectedCategory,
  setSelectedCategory,
  selectedPriority,
  setSelectedPriority,
  sortBy,
  setSortBy,
  stats,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      {/* Category Pills Bar */}
      <div className="filter-tabs-bar" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            border: `1px solid ${selectedCategory === 'all' ? 'var(--brand-primary)' : 'var(--border-color)'}`,
            backgroundColor: selectedCategory === 'all' ? 'rgba(124, 58, 237, 0.15)' : 'var(--bg-card)',
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
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${isSelected ? cat.color : 'var(--border-color)'}`,
                backgroundColor: isSelected ? cat.bgColor : 'var(--bg-card)',
                color: isSelected ? cat.color : 'var(--text-secondary)',
                fontWeight: isSelected ? 600 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span style={{ opacity: 0.75, fontSize: '0.75rem' }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Priority Bar & Sort Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        {/* Priority Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Priority:</span>
          <button
            onClick={() => setSelectedPriority('all')}
            style={{
              padding: '0.25rem 0.625rem',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${selectedPriority === 'all' ? 'var(--brand-primary)' : 'var(--border-color)'}`,
              backgroundColor: selectedPriority === 'all' ? 'rgba(124, 58, 237, 0.12)' : 'transparent',
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
                <span>{p.icon}</span>
                <span>{p.label}</span>
                <span>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Sort Select Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
