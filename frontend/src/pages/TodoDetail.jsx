import React from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header.jsx';
import { mockTodos } from '../data/mockTodos.js';
import { formatDate, getPriorityInfo, getCategoryInfo, getDueDateLabel } from '../utils/helpers.js';
import { ArrowLeft, Edit3, Trash2, Calendar, Tag, Flag, Clock, AlertCircle } from 'lucide-react';

export function TodoDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();

  // Find todo in mock dataset
  const todo = mockTodos.find((item) => item.id === id);

  if (!todo) {
    return (
      <div>
        <Header />
        <main className="container page-wrapper" style={{ textAlign: 'center', paddingTop: '6rem' }}>
          <div
            style={{
              maxWidth: '420px',
              margin: '0 auto',
              padding: '2.5rem 1.5rem',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--color-danger)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
              }}
            >
              <AlertCircle size={30} />
            </div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Task Not Found</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              The requested task with ID <code>{id || 'null'}</code> could not be found or has been removed.
            </p>
            <Link to="/todos" className="btn btn-primary">
              <ArrowLeft size={16} />
              <span>Return to Tasks</span>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const priorityInfo = getPriorityInfo(todo.priority);
  const categoryInfo = getCategoryInfo(todo.category);
  const dueDateLabel = getDueDateLabel(todo.dueDate, todo.completed);

  return (
    <div>
      <Header />

      <main className="container page-wrapper">
        {/* Navigation Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button onClick={() => navigate('/todos')} className="btn btn-secondary" aria-label="Back to tasks list">
            <ArrowLeft size={16} />
            <span>Back to Tasks</span>
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" aria-label="Edit task">
              <Edit3 size={16} />
              <span>Edit</span>
            </button>
            <button className="btn btn-secondary" style={{ color: 'var(--color-danger)', borderColor: 'var(--border-color)' }} aria-label="Delete task">
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Task Detail Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Status Header Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.875rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: todo.completed ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-primary)',
              border: `1px solid ${todo.completed ? 'var(--color-success)' : 'var(--border-color)'}`,
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: todo.completed ? 'var(--color-success)' : 'var(--text-primary)' }}>
              {todo.completed ? '✓ Task Completed' : '⏳ Task Pending'}
            </span>

            {dueDateLabel && (
              <span className="badge" style={{ color: dueDateLabel.color, backgroundColor: dueDateLabel.bgColor }}>
                <Calendar size={12} />
                {dueDateLabel.text}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{todo.title}</h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {todo.description || 'No additional description provided.'}
            </p>
          </div>

          {/* Metadata Badges Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', paddingTop: '0.5rem' }}>
            {/* Priority */}
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Priority Level
              </span>
              <span className="badge" style={{ color: priorityInfo.color, backgroundColor: priorityInfo.bgColor, fontSize: '0.85rem', padding: '0.3rem 0.75rem' }}>
                <Flag size={14} />
                {priorityInfo.label}
              </span>
            </div>

            {/* Category */}
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Category Tag
              </span>
              <span className="badge" style={{ color: categoryInfo.color, backgroundColor: categoryInfo.bgColor, fontSize: '0.85rem', padding: '0.3rem 0.75rem' }}>
                <Tag size={14} />
                {categoryInfo.label}
              </span>
            </div>

            {/* Due Date */}
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Due Date
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                {formatDate(todo.dueDate)}
              </span>
            </div>
          </div>

          {/* Timestamps Footer */}
          <div
            style={{
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1rem',
              marginTop: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.78125rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <span>ID: <code>{todo.id}</code></span>
            <span>Created: {formatDate(todo.createdAt)}</span>
            <span>Updated: {formatDate(todo.updatedAt)}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
