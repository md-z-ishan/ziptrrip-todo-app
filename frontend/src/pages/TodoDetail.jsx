import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { ConfirmDelete } from '../components/ConfirmDelete.jsx';
import apiClient from '../utils/apiClient.js';
import { useToast } from '../hooks/useToast.jsx';
import { PRIORITIES, CATEGORIES } from '../utils/constants.js';
import { formatDate, getDueDateLabel } from '../utils/helpers.js';
import { ArrowLeft, Save, Trash2, Calendar, Tag, Flag, AlertCircle } from 'lucide-react';

export function TodoDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit fields state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('work');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('No task ID specified');
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/todos/${id}`);
        const data = response.data;
        setTodo(data);
        setTitle(data.title || '');
        setDescription(data.description || '');
        setPriority(data.priority || 'medium');
        setCategory(data.category || 'work');
        setCompleted(data.completed || false);
        setDueDate(data.dueDate ? new Date(data.dueDate).toISOString().slice(0, 16) : '');
      } catch (err) {
        setError(err.message || 'Task not found');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() || title.trim().length < 3) {
      addToast({ message: 'Title must be at least 3 characters', type: 'error' });
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        title: title.trim(),
        description: description.trim(),
        priority,
        category,
        completed,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      };

      const response = await apiClient.put(`/todos/${id}`, payload);
      setTodo(response.data);
      addToast({ message: '✨ Task updated successfully!', type: 'success' });
    } catch (err) {
      addToast({ message: err.message || 'Failed to update task', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/todos/${id}`);
      addToast({ message: 'Task deleted successfully', type: 'info' });
      navigate('/todos');
    } catch (err) {
      addToast({ message: err.message || 'Failed to delete task', type: 'error' });
    }
  };

  const dueDateLabel = getDueDateLabel(todo?.dueDate, completed);

  if (loading) return <LoadingSpinner label="Loading task details..." />;

  if (error || !todo) {
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
              {error || 'The requested task could not be found or has been removed.'}
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
            <button onClick={() => setShowDeleteConfirm(true)} className="btn btn-secondary" style={{ color: 'var(--color-danger)' }}>
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
            <button onClick={handleSave} disabled={isSaving} className="btn btn-primary">
              <Save size={16} />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

        {/* Task Detail Form */}
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
              backgroundColor: completed ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-primary)',
              border: `1px solid ${completed ? 'var(--color-success)' : 'var(--border-color)'}`,
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="checkbox-indicator checked"
                aria-label="Toggle completed status"
                style={{ width: '1.35rem', height: '1.35rem', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 600, fontSize: '0.95rem', color: completed ? 'var(--color-success)' : 'var(--text-primary)' }}>
                {completed ? '🎉 Task Completed' : '⏳ Task Pending'}
              </span>
            </div>

            {dueDateLabel && (
              <span className="badge" style={{ color: dueDateLabel.color, backgroundColor: dueDateLabel.bgColor }}>
                <Calendar size={12} />
                {dueDateLabel.text}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                fontSize: '1.25rem',
                fontWeight: 700,
                padding: '0.625rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add detailed notes..."
              style={{
                width: '100%',
                padding: '0.75rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                lineHeight: 1.6,
              }}
            />
          </div>

          {/* Priority & Category Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                }}
              >
                {PRIORITIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Category Tag
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date Picker */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Due Date & Time
            </label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '320px',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Timestamps */}
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
            <span>Last Updated: {formatDate(todo.updatedAt)}</span>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmDelete
          isOpen={showDeleteConfirm}
          todoTitle={todo.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      </main>
    </div>
  );
}
