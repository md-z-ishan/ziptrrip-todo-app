import React from 'react';
import { TodoModal } from './TodoModal';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDelete({ isOpen, todoTitle, onConfirm, onCancel }) {
  return (
    <TodoModal isOpen={isOpen} title="Confirm Deletion" onClose={onCancel}>
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            color: 'var(--color-danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
          }}
        >
          <AlertTriangle size={28} />
        </div>

        <p style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.5rem' }}>
          Are you sure you want to delete this task?
        </p>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            marginBottom: '1.5rem',
            wordBreak: 'break-word',
          }}
        >
          "{todoTitle}"
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger">
            Delete Task
          </button>
        </div>
      </div>
    </TodoModal>
  );
}
