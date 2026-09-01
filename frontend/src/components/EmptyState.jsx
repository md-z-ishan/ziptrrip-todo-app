import React from 'react';
import { ClipboardList, Plus } from 'lucide-react';

export function EmptyState({
  title = 'No tasks yet',
  message = 'Create your first task and keep your day moving.',
  onAction,
}) {
  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        backgroundColor: 'var(--bg-card)',
        border: '1px dashed var(--border-color)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <div
        style={{
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          color: 'var(--brand-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <ClipboardList size={30} />
      </div>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.35rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '320px', marginBottom: '1.25rem' }}>
        {message}
      </p>

      {onAction && (
        <button onClick={onAction} className="btn btn-primary">
          <Plus size={16} />
          <span>New Task</span>
        </button>
      )}
    </div>
  );
}
