import React from 'react';
import { Plus } from 'lucide-react';

export function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fab-btn animate-scale-up"
      aria-label="Add Todo"
      title="Add Todo"
    >
      <Plus size={28} />
    </button>
  );
}
