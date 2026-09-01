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
      <Loader2 size={30} style={{ animation: 'spin 1s linear infinite' }} />
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
