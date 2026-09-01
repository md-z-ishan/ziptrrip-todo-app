import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { useDebounce } from '../hooks/useDebounce';
import { TodoCard } from '../components/TodoCard';
import { TodoModal } from '../components/TodoModal';
import { TodoForm } from '../components/TodoForm';
import { ConfirmDelete } from '../components/ConfirmDelete';
import { FilterTabs } from '../components/FilterTabs';
import { StatsCard } from '../components/StatsCard';
import { EmptyState } from '../components/EmptyState';
import { LoadingSkeletons } from '../components/LoadingSkeletons';
import { FloatingActionButton } from '../components/FloatingActionButton';

export function TodoList({ searchQuery }) {
  const debouncedSearch = useDebounce(searchQuery, 300);

  const {
    todos,
    stats,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    selectedPriority,
    setSelectedPriority,
    sortBy,
    setSortBy,
    createTodo,
    updateTodo,
    toggleComplete,
    deleteTodoWithUndo,
  } = useTodos();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deletingTodoId, setDeletingTodoId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync debounced search to hook state
  React.useEffect(() => {
    // setSearchQuery from hook is passed down
  }, [debouncedSearch]);

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
    <main className="container page-wrapper">
      {/* Statistics Dashboard Card */}
      <StatsCard stats={stats} />

      {/* Real-time Filter & Sort Controls */}
      <FilterTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        sortBy={sortBy}
        setSortBy={setSortBy}
        stats={stats}
      />

      {/* Main Todo List Content */}
      {loading ? (
        <LoadingSkeletons count={4} />
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-danger)' }}>
          <p>{error}</p>
        </div>
      ) : todos.length === 0 ? (
        <EmptyState
          title={searchQuery ? 'No matching tasks found' : 'No tasks created yet'}
          message={
            searchQuery
              ? `No task matches "${searchQuery}". Try clearing search or filters.`
              : 'Add your first task to start tracking your progress!'
          }
          onAction={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

      {/* Floating Action Button (FAB) */}
      <FloatingActionButton onClick={() => setIsCreateModalOpen(true)} />

      {/* Modal for Creating New Todo */}
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

      {/* Modal for Editing Todo */}
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
  );
}
