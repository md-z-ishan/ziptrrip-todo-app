import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ label = 'Loading tasks...' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem',
        gap: '0.75rem',
        color: 'var(--text-secondary)',
      }}
    >
      <Loader2 size={32} className="animate-pulse-check" style={{ animation: 'spin 1s linear infinite' }} />
      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</span>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function LoadingSkeletons({ count = 3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="skeleton-box"
          style={{
            height: '5.5rem',
            width: '100%',
            borderRadius: 'var(--radius-lg)',
          }}
        />
      ))}
    </div>
  );
}
