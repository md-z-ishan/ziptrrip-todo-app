import { useState, useCallback, useEffect } from 'react';
import apiClient from '../utils/apiClient.js';
import { useToast } from './useToast.jsx';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const { addToast } = useToast();

  /**
   * Fetch todos from Express backend with active query filters
   */
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory;
      if (selectedPriority && selectedPriority !== 'all') params.priority = selectedPriority;

      const response = await apiClient.get('/todos', { params });
      setTodos(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks from server');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, selectedPriority]);

  /**
   * Fetch aggregated statistics for productivity dashboard
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
   * Create a new task
   */
  const createTodo = async (todoData) => {
    try {
      const response = await apiClient.post('/todos', todoData);
      setTodos((prev) => [response.data, ...prev]);
      fetchStats();
      addToast({ message: '✨ Task created successfully!', type: 'success' });
      return response.data;
    } catch (err) {
      addToast({ message: err.message || 'Failed to create task', type: 'error' });
      throw err;
    }
  };

  /**
   * Update an existing task (Optimistic update)
   */
  const updateTodo = async (id, updateFields) => {
    const previousTodos = [...todos];

    // Optimistic UI update
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updateFields } : item))
    );

    try {
      const response = await apiClient.put(`/todos/${id}`, updateFields);
      fetchStats();
      return response.data;
    } catch (err) {
      // Rollback state if server request fails
      setTodos(previousTodos);
      addToast({ message: err.message || 'Failed to update task', type: 'error' });
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
      addToast({ message: '🎉 Task marked as completed!', type: 'success' });
    }
  };

  /**
   * Delete task with 5-Second Grace Period for Undo
   */
  const deleteTodoWithUndo = async (id) => {
    const targetTodo = todos.find((t) => t.id === id);
    if (!targetTodo) return;

    // Hide immediately from UI list
    setTodos((prev) => prev.filter((t) => t.id !== id));

    let undone = false;

    // Delay server DELETE call by 5 seconds
    const timeoutId = setTimeout(async () => {
      if (!undone) {
        try {
          await apiClient.delete(`/todos/${id}`);
          fetchStats();
        } catch (err) {
          // Restore task if server request fails
          setTodos((prev) => [...prev, targetTodo]);
          addToast({ message: 'Failed to delete task on server', type: 'error' });
        }
      }
    }, 5000);

    // Show Toast Notification with Undo Action
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
    fetchTodos,
    fetchStats,
    createTodo,
    updateTodo,
    toggleComplete,
    deleteTodoWithUndo,
  };
}
