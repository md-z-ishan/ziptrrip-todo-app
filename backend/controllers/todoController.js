import { readTodos, writeTodos } from '../utils/fileStorage.js';

/**
 * Generates a unique string ID for a todo
 */
const generateId = () => `todo-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

/**
 * GET /api/todos
 * Retrieves list of todos with combinable filters (search, priority, category, completed)
 */
export const getAllTodos = async (req, res, next) => {
  try {
    let todos = await readTodos();
    const { search, priority, category, completed } = req.query;

    // Filter by search term (checks title and description)
    if (search && search.trim() !== '') {
      const term = search.trim().toLowerCase();
      todos = todos.filter(
        (t) =>
          t.title.toLowerCase().includes(term) ||
          (t.description && t.description.toLowerCase().includes(term))
      );
    }

    // Filter by priority
    if (priority && priority !== 'all') {
      todos = todos.filter((t) => t.priority?.toLowerCase() === priority.toLowerCase());
    }

    // Filter by category
    if (category && category !== 'all') {
      todos = todos.filter((t) => t.category?.toLowerCase() === category.toLowerCase());
    }

    // Filter by completed status
    if (completed !== undefined) {
      const isCompleted = completed === 'true';
      todos = todos.filter((t) => t.completed === isCompleted);
    }

    // Sort newest created first by default
    todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/todos/stats
 * Aggregates productivity metrics
 */
export const getStats = async (req, res, next) => {
  try {
    const todos = await readTodos();
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const byPriority = {
      high: todos.filter((t) => t.priority === 'high').length,
      medium: todos.filter((t) => t.priority === 'medium').length,
      low: todos.filter((t) => t.priority === 'low').length,
    };

    const categories = ['work', 'personal', 'shopping', 'health', 'learning', 'other'];
    const byCategory = {};
    categories.forEach((cat) => {
      byCategory[cat] = todos.filter((t) => (t.category || 'other').toLowerCase() === cat).length;
    });

    return res.status(200).json({
      success: true,
      data: {
        total,
        completed,
        pending,
        completionPercentage,
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
 * Retrieves single todo item by ID
 */
export const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await readTodos();
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found.',
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
 * Creates a new todo item
 */
export const createTodo = async (req, res, next) => {
  try {
    const { title, description = '', priority = 'medium', category = 'other', dueDate = null } = req.body;

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
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found.',
      });
    }

    const existing = todos[index];
    const { title, description, priority, category, dueDate, completed } = req.body;

    const updatedTodo = {
      ...existing,
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
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/todos/:id
 * Deletes a todo item by ID
 */
export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await readTodos();
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found.',
      });
    }

    todos.splice(index, 1);
    await writeTodos(todos);

    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
