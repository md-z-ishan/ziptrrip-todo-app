import React from 'react';

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
