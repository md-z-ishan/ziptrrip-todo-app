import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Edit3, Trash2, Tag, Flag } from 'lucide-react';
import { getPriorityInfo, getCategoryInfo, getDueDateStatus, formatDate } from '../utils/helpers';

export function TodoCard({ todo, onToggleComplete, onEdit, onDelete }) {
  const navigate = useNavigate();
  const priorityInfo = getPriorityInfo(todo.priority);
  const categoryInfo = getCategoryInfo(todo.category);
  const dueDateStatus = getDueDateStatus(todo.dueDate, todo.completed);

  const handleCardClick = (e) => {
    // Prevent navigation if clicking interactive elements
    if (e.target.closest('.interactive-action')) return;
    navigate(`/todos?id=${todo.id}`);
  };

  return (
    <div
      className={`todo-card animate-fade-in ${todo.completed ? 'completed' : ''}`}
      onClick={handleCardClick}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick(e);
        }
      }}
    >
      {/* Complete Checkbox */}
      <div className="interactive-action" style={{ paddingTop: '0.1rem' }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="custom-checkbox"
          aria-label={`Mark task "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
      </div>

      {/* Main Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h3 className="todo-title" style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            {todo.title}
          </h3>

          {/* Action Buttons (Edit / Delete) */}
          <div className="todo-card-actions interactive-action" style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => onEdit(todo)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.35rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
              }}
              title="Edit Task"
              aria-label="Edit task"
            >
              <Edit3 size={16} />
            </button>

            <button
              onClick={() => onDelete(todo.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.35rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-danger)',
              }}
              title="Delete Task"
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Description line */}
        {todo.description && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {todo.description}
          </p>
        )}

        {/* Badges Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
          {/* Priority Badge */}
          <span
            className="badge"
            style={{ color: priorityInfo.color, backgroundColor: priorityInfo.bgColor }}
          >
            <Flag size={12} />
            {priorityInfo.label}
          </span>

          {/* Category Badge */}
          <span
            className="badge"
            style={{ color: categoryInfo.color, backgroundColor: categoryInfo.bgColor }}
          >
            <Tag size={12} />
            {categoryInfo.label}
          </span>

          {/* Due Date Status */}
          {dueDateStatus && (
            <span
              className="badge"
              style={{ color: dueDateStatus.color, backgroundColor: dueDateStatus.bgColor }}
            >
              <Calendar size={12} />
              {dueDateStatus.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
