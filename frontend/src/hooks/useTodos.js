import { useState, useCallback, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import { useToast } from './useToast';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const { addToast } = useToast();

  /**
   * Fetch todos with current active query filters
   */
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory;
      if (selectedPriority && selectedPriority !== 'all') params.priority = selectedPriority;
      if (sortBy) params.sortBy = sortBy;

      const response = await apiClient.get('/todos', { params });
      setTodos(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, selectedPriority, sortBy]);

  /**
   * Fetch aggregated statistics dashboard data
   */
  const fetchStats = useCallback(async () => {
    try {
      const response = await apiClient.get('/todos/stats');
      setStats(response.data || null);
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, [fetchTodos, fetchStats]);

  /**
   * Add a new todo
   */
  const createTodo = async (todoData) => {
    try {
      const response = await apiClient.post('/todos', todoData);
      setTodos((prev) => [response.data, ...prev]);
      fetchStats();
      addToast({ message: '✨ Todo created successfully!', type: 'success' });
      return response.data;
    } catch (err) {
      addToast({ message: err.message || 'Failed to create todo', type: 'error' });
      throw err;
    }
  };

  /**
   * Update an existing todo (Optimistic update)
   */
  const updateTodo = async (id, updateFields) => {
    const previousTodos = [...todos];

    // Optimistic update local state
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updateFields } : item))
    );

    try {
      const response = await apiClient.put(`/todos/${id}`, updateFields);
      fetchStats();
      return response.data;
    } catch (err) {
      // Rollback on failure
      setTodos(previousTodos);
      addToast({ message: err.message || 'Failed to update todo', type: 'error' });
      throw err;
    }
  };

  /**
   * Toggle completion status
   */
  const toggleComplete = async (id) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;

    const newCompleted = !target.completed;
    await updateTodo(id, { completed: newCompleted });
    
    if (newCompleted) {
      addToast({ message: '🎉 Todo marked as completed!', type: 'success' });
    }
  };

  /**
   * Delete todo with 5-Second Grace Period for Undo
   */
  const deleteTodoWithUndo = async (id) => {
    const targetTodo = todos.find((t) => t.id === id);
    if (!targetTodo) return;

    // Immediately hide from UI
    setTodos((prev) => prev.filter((t) => t.id !== id));

    let undone = false;

    // Set up 5-second timer before sending DELETE request to server
    const timeoutId = setTimeout(async () => {
      if (!undone) {
        try {
          await apiClient.delete(`/todos/${id}`);
          fetchStats();
        } catch (err) {
          // Restore if server delete fails
          setTodos((prev) => [...prev, targetTodo]);
          addToast({ message: 'Failed to delete todo on server', type: 'error' });
        }
      }
    }, 5000);

    // Show Toast with Undo Button
    addToast({
      message: `Deleted "${targetTodo.title.slice(0, 25)}${targetTodo.title.length > 25 ? '...' : ''}"`,
      type: 'warning',
      duration: 5000,
      action: {
        label: 'Undo (5s)',
        onClick: () => {
          undone = true;
          clearTimeout(timeoutId);
          setTodos((prev) => [targetTodo, ...prev]);
          addToast({ message: 'Deletion cancelled', type: 'info' });
        },
      },
    });
  };

  return {
    todos,
    stats,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriority,
    setSelectedPriority,
    sortBy,
    setSortBy,
    fetchTodos,
    fetchStats,
    createTodo,
    updateTodo,
    toggleComplete,
    deleteTodoWithUndo,
  };
}
