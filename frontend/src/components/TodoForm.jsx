import React, { useState, useEffect } from 'react';
import { PRIORITIES, CATEGORIES } from '../utils/constants.js';
import { Plus, X, CheckSquare } from 'lucide-react';

export function TodoForm({ initialData = null, onSubmit, onCancel, isSubmitting = false }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState(initialData?.priority || 'medium');
  const [category, setCategory] = useState(initialData?.category || 'work');
  const [subtasks, setSubtasks] = useState(initialData?.subtasks || []);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

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
      setSubtasks(initialData.subtasks || []);
    }
  }, [initialData]);

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    setSubtasks((prev) => [
      ...prev,
      { id: `sub-${Date.now()}`, title: newSubtaskTitle.trim(), completed: false },
    ]);
    setNewSubtaskTitle('');
  };

  const handleRemoveSubtask = (subId) => {
    setSubtasks((prev) => prev.filter((s) => s.id !== subId));
  };

  const handleToggleSubtask = (subId) => {
    setSubtasks((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, completed: !s.completed } : s))
    );
  };

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
      subtasks,
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

      {/* Subtasks / Checklist Items */}
      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>
          Subtasks Checklist ({subtasks.filter((s) => s.completed).length}/{subtasks.length})
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder="Add subtask item..."
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSubtask();
              }
            }}
            style={{
              flex: 1,
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
            }}
          />
          <button type="button" onClick={handleAddSubtask} className="btn btn-secondary" style={{ padding: '0.45rem 0.75rem', minHeight: 'auto' }}>
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>

        {subtasks.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '140px', overflowY: 'auto' }}>
            {subtasks.map((st) => (
              <div
                key={st.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                }}
              >
                <input
                  type="checkbox"
                  checked={st.completed}
                  onChange={() => handleToggleSubtask(st.id)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ flex: 1, textDecoration: st.completed ? 'line-through' : 'none', color: st.completed ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                  {st.title}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveSubtask(st.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '0.1rem' }}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
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
