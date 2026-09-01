import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Tag, Flag, Check } from 'lucide-react';
import { getPriorityInfo, getCategoryInfo, getDueDateLabel } from '../utils/helpers.js';

export function TodoCard({ todo }) {
  const navigate = useNavigate();

  const priorityInfo = getPriorityInfo(todo.priority);
  const categoryInfo = getCategoryInfo(todo.category);
  const dueDateLabel = getDueDateLabel(todo.dueDate, todo.completed);

  const handleCardClick = () => {
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
          handleCardClick();
        }
      }}
    >
      {/* Completion Indicator */}
      <div
        className={`checkbox-indicator ${todo.completed ? 'checked' : ''}`}
        aria-label={`Task is ${todo.completed ? 'completed' : 'pending'}`}
      >
        {todo.completed && <Check size={14} />}
      </div>

      {/* Main Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <h3 className="todo-title" style={{ fontSize: '1rem', fontWeight: 600 }}>
          {todo.title}
        </h3>

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
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

          {/* Due Date Label */}
          {dueDateLabel && (
            <span
              className="badge"
              style={{ color: dueDateLabel.color, backgroundColor: dueDateLabel.bgColor }}
            >
              <Calendar size={12} />
              {dueDateLabel.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
