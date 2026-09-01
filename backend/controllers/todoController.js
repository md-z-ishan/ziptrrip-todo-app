import { readTodos, writeTodos } from '../utils/fileStorage.js';

/**
 * Helper to generate simple unique ID
 */
const generateId = () => `todo-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

/**
 * GET /api/todos
 * Query params: ?search=...&priority=...&category=...&sortBy=...
 */
export const getAllTodos = async (req, res, next) => {
  try {
    let todos = await readTodos();
    const { search, priority, category, completed, sortBy } = req.query;

    // Filter by search string (title or description)
    if (search && search.trim() !== '') {
      const query = search.trim().toLowerCase();
      todos = todos.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query))
      );
    }

    // Filter by priority
    if (priority && priority !== 'all') {
      todos = todos.filter((item) => item.priority?.toLowerCase() === priority.toLowerCase());
    }

    // Filter by category
    if (category && category !== 'all') {
      todos = todos.filter((item) => item.category?.toLowerCase() === category.toLowerCase());
    }

    // Filter by completed status
    if (completed !== undefined) {
      const isCompleted = completed === 'true';
      todos = todos.filter((item) => item.completed === isCompleted);
    }

    // Sort todos
    if (sortBy === 'dueDate') {
      todos.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortBy === 'priority') {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      todos.sort((a, b) => (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0));
    } else {
      // Default: Newer created todos first
      todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/todos/stats
 * Generates aggregated metrics for dashboard
 */
export const getStats = async (req, res, next) => {
  try {
    const todos = await readTodos();
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Priority breakdown
    const byPriority = {
      high: todos.filter((t) => t.priority === 'high').length,
      medium: todos.filter((t) => t.priority === 'medium').length,
      low: todos.filter((t) => t.priority === 'low').length,
    };

    // Category breakdown
    const categories = ['work', 'personal', 'shopping', 'health', 'learning', 'other'];
    const byCategory = {};
    categories.forEach((cat) => {
      byCategory[cat] = todos.filter((t) => (t.category || 'other').toLowerCase() === cat).length;
    });

    // Overdue count
    const now = new Date();
    const overdueCount = todos.filter(
      (t) => !t.completed && t.dueDate && new Date(t.dueDate) < now
    ).length;

    return res.status(200).json({
      success: true,
      data: {
        total,
        completed,
        pending,
        completionPercentage,
        overdueCount,
        byPriority,
        byCategory,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/todos/:id
 * Retrieve a single todo by ID
 */
export const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await readTodos();
    const todo = todos.find((item) => item.id === id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo with ID '${id}' not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/todos
 * Create a new todo
 */
export const createTodo = async (req, res, next) => {
  try {
    const { title, description = '', priority = 'medium', category = 'work', dueDate = null } = req.body;

    const todos = await readTodos();
    const now = new Date().toISOString();

    const newTodo = {
      id: generateId(),
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority.toLowerCase(),
      category: category.toLowerCase(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    todos.unshift(newTodo);
    await writeTodos(todos);

    return res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/todos/:id
 * Partial or full update of an existing todo
 */
export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await readTodos();
    const index = todos.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Todo with ID '${id}' not found.`,
      });
    }

    const currentTodo = todos[index];
    const { title, description, priority, category, dueDate, completed } = req.body;

    const updatedTodo = {
      ...currentTodo,
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(priority !== undefined && { priority: priority.toLowerCase() }),
      ...(category !== undefined && { category: category.toLowerCase() }),
      ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate).toISOString() : null }),
      ...(completed !== undefined && { completed: Boolean(completed) }),
      updatedAt: new Date().toISOString(),
    };

    todos[index] = updatedTodo;
    await writeTodos(todos);

    return res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/todos/:id
 * Delete todo by ID
 */
export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await readTodos();
    const index = todos.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Todo with ID '${id}' not found.`,
      });
    }

    const [deletedTodo] = todos.splice(index, 1);
    await writeTodos(todos);

    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: deletedTodo,
    });
  } catch (error) {
    next(error);
  }
};
