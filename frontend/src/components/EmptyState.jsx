import React from 'react';
import { ClipboardList, Plus } from 'lucide-react';

export function EmptyState({ title = 'No todos found!', message = 'Get started by creating your first task.', onAction }) {
  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        textAlign: 'center',
        backgroundColor: 'var(--bg-card)',
        border: '1px border-dashed var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          backgroundColor: 'rgba(124, 58, 237, 0.12)',
          color: 'var(--brand-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
        }}
      >
        <ClipboardList size={36} />
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '360px', marginBottom: '1.5rem' }}>
        {message}
      </p>

      {onAction && (
        <button onClick={onAction} className="btn btn-primary">
          <Plus size={18} />
          <span>Create New Task</span>
        </button>
      )}
    </div>
  );
}
