import { readTodos } from '../utils/fileStorage.js';

const VALID_PRIORITIES = ['high', 'medium', 'low'];
const VALID_CATEGORIES = ['work', 'personal', 'shopping', 'health', 'learning', 'other'];

/**
 * Validates Todo input payload for create and update operations
 */
export const validateTodoInput = (req, res, next) => {
  const { title, priority, category, dueDate } = req.body;
  const errors = [];

  // Title validation (Required on POST, optional on partial PUT if other fields provided)
  if (req.method === 'POST' || (req.method === 'PUT' && title !== undefined)) {
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      errors.push('Title is required and must be at least 3 characters long.');
    }
  }

  // Priority validation
  if (priority !== undefined && !VALID_PRIORITIES.includes(priority.toLowerCase())) {
    errors.push(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  // Category validation
  if (category !== undefined && !VALID_CATEGORIES.includes(category.toLowerCase())) {
    errors.push(`Category must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  // Due date validation
  if (dueDate !== undefined && dueDate !== null && dueDate !== '') {
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Due date must be a valid date string (e.g. ISO 8601 format).');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

/**
 * Validates whether a todo with requested ID exists
 */
export const validateTodoId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await readTodos();
    const todoExists = todos.some((item) => item.id === id);

    if (!todoExists) {
      return res.status(404).json({
        success: false,
        message: `Todo with ID '${id}' not found.`,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during ID validation',
      error: error.message,
    });
  }
};
