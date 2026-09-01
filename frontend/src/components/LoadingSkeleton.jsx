import React from 'react';

export function LoadingSkeleton({ count = 3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="skeleton-shimmer"
          style={{
            height: '5.25rem',
            width: '100%',
          }}
        />
      ))}
    </div>
  );
}
