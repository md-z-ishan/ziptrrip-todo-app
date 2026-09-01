import React from 'react';
import { CATEGORIES } from '../utils/constants';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export function StatsCard({ stats }) {
  if (!stats) return null;

  const { total, completed, pending, completionPercentage, overdueCount, byPriority, byCategory } = stats;

  // SVG Circle calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>📊 Productivity Overview</span>
      </h3>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {/* Progress SVG Ring */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ position: 'relative', width: '96px', height: '96px' }}>
            <svg width="96" height="96" viewBox="0 0 96 96">
              {/* Background circle */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke="var(--border-color)"
                strokeWidth="8"
              />
              {/* Animated Progress circle */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke="var(--brand-primary)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 48 48)"
                style={{ transition: 'stroke-dashoffset 0.6s ease-in-out' }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1 }}>{completionPercentage}%</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Done</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.1 }}>
              {completed} / {total}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Tasks Completed
            </p>

            {overdueCount > 0 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', color: 'var(--color-danger)', fontSize: '0.75rem', fontWeight: 600 }}>
                <AlertCircle size={14} />
                <span>{overdueCount} task{overdueCount > 1 ? 's' : ''} overdue</span>
              </div>
            )}
          </div>
        </div>

        {/* Priority Counts Mini Cards */}
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            By Priority Level
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(239, 68, 68, 0.1)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: 600, display: 'block' }}>High</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#EF4444' }}>{byPriority?.high || 0}</span>
            </div>
            <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(245, 158, 11, 0.1)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 600, display: 'block' }}>Medium</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F59E0B' }}>{byPriority?.medium || 0}</span>
            </div>
            <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.1)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600, display: 'block' }}>Low</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10B981' }}>{byPriority?.low || 0}</span>
            </div>
          </div>
        </div>

        {/* Category Bar Charts */}
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Category Distribution
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {CATEGORIES.slice(0, 4).map((cat) => {
              const count = byCategory?.[cat.id] || 0;
              const barPercent = total > 0 ? (count / total) * 100 : 0;

              return (
                <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                  <span style={{ width: '65px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {cat.icon} {cat.label}
                  </span>
                  <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${barPercent}%`,
                        height: '100%',
                        backgroundColor: cat.color,
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                  <span style={{ width: '20px', textAlign: 'right', fontWeight: 600 }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
