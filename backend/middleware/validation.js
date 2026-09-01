const VALID_PRIORITIES = ['high', 'medium', 'low'];
const VALID_CATEGORIES = ['work', 'personal', 'shopping', 'health', 'learning', 'other'];

/**
 * Validates Todo input body for create and update operations
 */
export const validateTodoInput = (req, res, next) => {
  const { title, priority, category, dueDate } = req.body;

  // Title validation
  if (req.method === 'POST' || (req.method === 'PUT' && title !== undefined)) {
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Title must be at least 3 characters.',
      });
    }
  }

  // Priority validation
  if (priority !== undefined && priority !== null) {
    if (typeof priority !== 'string' || !VALID_PRIORITIES.includes(priority.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Priority must be one of: ${VALID_PRIORITIES.join(', ')}`,
      });
    }
  }

  // Category validation
  if (category !== undefined && category !== null) {
    if (typeof category !== 'string' || !VALID_CATEGORIES.includes(category.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`,
      });
    }
  }

  // Due date validation
  if (dueDate !== undefined && dueDate !== null && dueDate !== '') {
    const dateObj = new Date(dueDate);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'dueDate must be a valid date format.',
      });
    }
  }

  next();
};
