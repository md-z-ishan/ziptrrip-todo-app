import React from 'react';
import { useToast } from '../hooks/useToast.jsx';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast animate-toast toast-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' && <CheckCircle2 size={18} color="#10B981" />}
            {toast.type === 'error' && <AlertCircle size={18} color="#EF4444" />}
            {toast.type === 'warning' && <AlertCircle size={18} color="#F59E0B" />}
            {toast.type === 'info' && <Info size={18} color="#3B82F6" />}
          </div>

          <div style={{ flex: 1, fontSize: '0.85rem' }}>{toast.message}</div>

          {toast.action && (
            <button
              onClick={() => {
                toast.action.onClick();
                removeToast(toast.id);
              }}
              style={{
                background: 'var(--brand-primary)',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {toast.action.label}
            </button>
          )}

          <button
            onClick={() => removeToast(toast.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
