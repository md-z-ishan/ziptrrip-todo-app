import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { useToast } from '../hooks/useToast';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ConfirmDelete } from '../components/ConfirmDelete';
import { PRIORITIES, CATEGORIES } from '../utils/constants';
import { formatDate, getDueDateStatus } from '../utils/helpers';
import { ArrowLeft, CheckCircle, Clock, Trash2, Save, Calendar, Tag, Flag } from 'lucide-react';

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
      setError('No task ID provided');
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
      navigate('/');
    } catch (err) {
      addToast({ message: err.message || 'Failed to delete task', type: 'error' });
    }
  };

  const dueDateStatus = getDueDateStatus(todo?.dueDate, completed);

  if (loading) return <LoadingSpinner label="Loading task details..." />;

  if (error || !todo) {
    return (
      <main className="container page-wrapper" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--color-danger)' }}>{error || 'Task Not Found'}</h2>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={18} />
          <span>Back to Tasks</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="container page-wrapper">
      {/* Top Back Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={18} />
          <span>Back to Task List</span>
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => setShowDeleteConfirm(true)} className="btn btn-danger">
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
          <button onClick={handleSave} disabled={isSaving} className="btn btn-primary">
            <Save size={16} />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Main Detail Container Card */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {/* Status Toggle Header Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: completed ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-primary)',
            border: `1px solid ${completed ? 'var(--color-success)' : 'var(--border-color)'}`,
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setCompleted(!completed)}
              className="custom-checkbox"
              style={{ width: '1.75rem', height: '1.75rem' }}
              aria-label="Toggle completed"
            >
              {completed && '✓'}
            </button>
            <span style={{ fontWeight: 600, fontSize: '1rem', color: completed ? 'var(--color-success)' : 'var(--text-primary)' }}>
              {completed ? '🎉 Task Completed' : '⏳ Task Pending'}
            </span>
          </div>

          {dueDateStatus && (
            <span className="badge" style={{ color: dueDateStatus.color, backgroundColor: dueDateStatus.bgColor, fontSize: '0.85rem' }}>
              <Calendar size={14} />
              {dueDateStatus.text}
            </span>
          )}
        </div>

        {/* Title Input Field */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              fontSize: '1.35rem',
              fontWeight: 700,
              padding: '0.625rem 0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Description Field */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            Description
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add detailed notes, links, or subtasks..."
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

        {/* Priority & Category Pickers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {/* Priority */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <Flag size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Priority Level
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {PRIORITIES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPriority(p.id)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${priority === p.id ? p.color : 'var(--border-color)'}`,
                    backgroundColor: priority === p.id ? p.bgColor : 'var(--bg-primary)',
                    color: priority === p.id ? p.color : 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <Tag size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Category Tag
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Due Date Input */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
            Due Date & Time
          </label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '320px',
              padding: '0.625rem 0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Timestamps Info Footer */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1rem',
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
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
  );
}
