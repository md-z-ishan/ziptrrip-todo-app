import React, { useState, useEffect } from 'react';
import { PRIORITIES, CATEGORIES } from '../utils/constants.js';

export function TodoForm({ initialData = null, onSubmit, onCancel, isSubmitting = false }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState(initialData?.priority || 'medium');
  const [category, setCategory] = useState(initialData?.category || 'work');

  // Format ISO date to datetime-local string
  const getFormattedDueDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().slice(0, 16);
  };

  const [dueDate, setDueDate] = useState(getFormattedDueDate(initialData?.dueDate));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPriority(initialData.priority || 'medium');
      setCategory(initialData.category || 'work');
      setDueDate(getFormattedDueDate(initialData.dueDate));
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Title Input */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>
            Task Title <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {title.length}/100
          </span>
        </div>
        <input
          type="text"
          maxLength={100}
          placeholder="e.g. Complete Ziptrip Frontend Architecture"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${errors.title ? 'var(--color-danger)' : 'var(--border-color)'}`,
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
          }}
          autoFocus
        />
        {errors.title && (
          <p style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
            {errors.title}
          </p>
        )}
      </div>

      {/* Description Area */}
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>
          Description
        </label>
        <textarea
          rows={3}
          placeholder="Add details, notes, or subtasks..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Priority Selector */}
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Priority Level
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem' }}>
          {PRIORITIES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPriority(p.id)}
              style={{
                padding: '0.625rem',
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${priority === p.id ? p.color : 'var(--border-color)'}`,
                backgroundColor: priority === p.id ? p.bgColor : 'var(--bg-primary)',
                color: priority === p.id ? p.color : 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selector */}
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Category Tag
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${category === c.id ? c.color : 'var(--border-color)'}`,
                backgroundColor: category === c.id ? c.bgColor : 'var(--bg-primary)',
                color: category === c.id ? c.color : 'var(--text-secondary)',
                fontWeight: category === c.id ? 600 : 400,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Due Date Picker */}
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>
          Due Date & Time
        </label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {/* Form Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
