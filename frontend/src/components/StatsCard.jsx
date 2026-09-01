import React from 'react';
import { CATEGORIES } from '../utils/constants.js';
import { AlertCircle, TrendingUp } from 'lucide-react';

export function StatsCard({ stats }) {
  if (!stats) return null;

  const { total, completed, completionPercentage, overdueCount, byPriority, byCategory } = stats;

  // SVG Circle Progress calculations
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div
      className="animate-fade-in"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginBottom: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <TrendingUp size={20} color="var(--brand-primary)" />
          <span>Productivity Dashboard</span>
        </h3>
        <span style={{ fontSize: '0.78125rem', color: 'var(--text-muted)' }}>
          Updated in real-time
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem' }}>
        {/* Progress SVG Ring */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ position: 'relative', width: '88px', height: '88px', flexShrink: 0 }}>
            <svg width="88" height="88" viewBox="0 0 88 88">
              <circle
                cx="44"
                cy="44"
                r={radius}
                fill="none"
                stroke="var(--border-color)"
                strokeWidth="7"
              />
              <circle
                cx="44"
                cy="44"
                r={radius}
                fill="none"
                stroke="var(--brand-primary)"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 44 44)"
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
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
              <span style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1 }}>{completionPercentage}%</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Done</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, lineHeight: 1.1 }}>
              {completed} / {total}
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Tasks Completed
            </p>

            {overdueCount > 0 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.4rem', color: 'var(--color-danger)', fontSize: '0.75rem', fontWeight: 600 }}>
                <AlertCircle size={13} />
                <span>{overdueCount} task{overdueCount > 1 ? 's' : ''} overdue</span>
              </div>
            )}
          </div>
        </div>

        {/* Priority Breakdown Mini Cards */}
        <div>
          <span style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Tasks by Priority
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(239, 68, 68, 0.08)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: '#EF4444', fontWeight: 600, display: 'block' }}>High</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#EF4444' }}>{byPriority?.high || 0}</span>
            </div>
            <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(245, 158, 11, 0.08)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: '#F59E0B', fontWeight: 600, display: 'block' }}>Medium</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F59E0B' }}>{byPriority?.medium || 0}</span>
            </div>
            <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.08)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 600, display: 'block' }}>Low</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10B981' }}>{byPriority?.low || 0}</span>
            </div>
          </div>
        </div>

        {/* Category Distribution Bars */}
        <div>
          <span style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Category Distribution
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {CATEGORIES.slice(0, 4).map((cat) => {
              const count = byCategory?.[cat.id] || 0;
              const barPercent = total > 0 ? (count / total) * 100 : 0;

              return (
                <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                  <span style={{ width: '60px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {cat.label}
                  </span>
                  <div style={{ flex: 1, height: '5px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${barPercent}%`,
                        height: '100%',
                        backgroundColor: cat.color,
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                  <span style={{ width: '18px', textAlign: 'right', fontWeight: 600 }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
