import React, { useState } from 'react';
import { Header } from '../components/Header.jsx';
import { TodoCard } from '../components/TodoCard.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { LoadingSkeleton } from '../components/LoadingSkeleton.jsx';
import { TodoModal } from '../components/TodoModal.jsx';
import { TodoForm } from '../components/TodoForm.jsx';
import { ConfirmDelete } from '../components/ConfirmDelete.jsx';
import { FloatingActionButton } from '../components/FloatingActionButton.jsx';
import { useTodos } from '../hooks/useTodos.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { CATEGORIES } from '../utils/constants.js';
import { Search, Plus, Filter } from 'lucide-react';

export function TodoList() {
  const {
    todos,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriority,
    createTodo,
    updateTodo,
    toggleComplete,
    deleteTodoWithUndo,
  } = useTodos();

  const [searchInput, setSearchInput] = useState('');
  const debouncedQuery = useDebounce(searchInput, 350);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deletingTodoId, setDeletingTodoId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync debounced search input to useTodos hook
  React.useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  const handleCreateSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await createTodo(formData);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (formData) => {
    if (!editingTodo) return;
    try {
      setIsSubmitting(true);
      await updateTodo(editingTodo.id, formData);
      setEditingTodo(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingTodoId) {
      deleteTodoWithUndo(deletingTodoId);
      setDeletingTodoId(null);
    }
  };

  const targetDeleteTodo = todos.find((t) => t.id === deletingTodoId);

  return (
    <div>
      <Header />

      <main className="container page-wrapper">
        {/* Page Title & Action Header */}
        <div style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>Task Master</h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Manage your tasks, set priorities, and track your daily progress.
            </p>
          </div>

          <button onClick={() => setIsCreateModalOpen(true)} className="btn btn-primary" aria-label="Add new task">
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              className="search-bar"
              placeholder="Search tasks by title or description..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search tasks"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="filter-bar">
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Filter size={14} /> Category:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`btn btn-secondary ${selectedCategory === 'all' ? 'active' : ''}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', minHeight: 'auto' }}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-secondary ${selectedCategory === cat.id ? 'active' : ''}`}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  minHeight: 'auto',
                  borderColor: selectedCategory === cat.id ? cat.color : 'var(--border-color)',
                  color: selectedCategory === cat.id ? cat.color : 'var(--text-secondary)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live API Todo Content */}
        {loading ? (
          <LoadingSkeleton count={4} />
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-danger)' }}>
            <p>{error}</p>
          </div>
        ) : todos.length === 0 ? (
          <EmptyState
            title={searchQuery ? 'No matching tasks found' : 'No tasks created yet'}
            message={
              searchQuery
                ? `No tasks matched "${searchQuery}". Try clearing search or filters.`
                : 'Create your first task and keep your day moving.'
            }
            onAction={() => setIsCreateModalOpen(true)}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onToggleComplete={toggleComplete}
                onEdit={(t) => setEditingTodo(t)}
                onDelete={(id) => setDeletingTodoId(id)}
              />
            ))}
          </div>
        )}

        {/* Quick Add Floating Action Button */}
        <FloatingActionButton onClick={() => setIsCreateModalOpen(true)} />

        {/* Modal for Creating Task */}
        <TodoModal
          isOpen={isCreateModalOpen}
          title="Create New Task"
          onClose={() => setIsCreateModalOpen(false)}
        >
          <TodoForm
            onSubmit={handleCreateSubmit}
            onCancel={() => setIsCreateModalOpen(false)}
            isSubmitting={isSubmitting}
          />
        </TodoModal>

        {/* Modal for Editing Task */}
        <TodoModal
          isOpen={Boolean(editingTodo)}
          title="Edit Task Details"
          onClose={() => setEditingTodo(null)}
        >
          <TodoForm
            initialData={editingTodo}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingTodo(null)}
            isSubmitting={isSubmitting}
          />
        </TodoModal>

        {/* Confirmation Modal for Delete */}
        <ConfirmDelete
          isOpen={Boolean(deletingTodoId)}
          todoTitle={targetDeleteTodo?.title || ''}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingTodoId(null)}
        />
      </main>
    </div>
  );
}
