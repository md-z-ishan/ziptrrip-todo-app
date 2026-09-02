import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Tag, Flag, Check, CheckSquare } from 'lucide-react';
import { getPriorityInfo, getCategoryInfo, getDueDateLabel } from '../utils/helpers.js';

export function TodoCard({ todo, onToggleComplete, onEdit, onDelete }) {
  const navigate = useNavigate();

  const priorityInfo = getPriorityInfo(todo.priority);
  const categoryInfo = getCategoryInfo(todo.category);
  const dueDateLabel = getDueDateLabel(todo.dueDate, todo.completed);

  const subtasks = todo.subtasks || [];
  const completedSubtasksCount = subtasks.filter((s) => s.completed).length;

  const handleCardClick = (e) => {
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
      {/* Completion Indicator */}
      <div className="interactive-action" style={{ paddingTop: '0.1rem' }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete && onToggleComplete(todo.id)}
          className="checkbox-indicator checked"
          style={{ width: '1.35rem', height: '1.35rem', cursor: 'pointer' }}
          aria-label={`Mark task as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
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

        {/* Subtasks Progress Indicator */}
        {subtasks.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
            <CheckSquare size={12} color="var(--brand-primary)" />
            <span>{completedSubtasksCount} of {subtasks.length} subtasks done</span>
          </div>
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
