import { PRIORITIES, CATEGORIES } from './constants.js';

/**
 * Format ISO date string into readable text (e.g. "5 Sep 2026, 6:00 PM")
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

/**
 * Get priority object info by ID
 */
export const getPriorityInfo = (priorityId) => {
  return (
    PRIORITIES.find((p) => p.id === (priorityId || '').toLowerCase()) || {
      id: 'medium',
      label: 'Medium',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.12)',
    }
  );
};

/**
 * Get category object info by ID
 */
export const getCategoryInfo = (categoryId) => {
  return (
    CATEGORIES.find((c) => c.id === (categoryId || '').toLowerCase()) || {
      id: 'other',
      label: 'Other',
      color: '#6B7280',
      bgColor: 'rgba(107, 114, 128, 0.12)',
    }
  );
};

/**
 * Calculate due status text & color ('overdue', 'today', 'upcoming')
 */
export const getDueDateLabel = (dueDateString, completed = false) => {
  if (!dueDateString) return null;
  if (completed) return { text: 'Completed', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' };

  const now = new Date();
  const dueDate = new Date(dueDateString);
  const diffTime = dueDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffTime < 0) {
    const overdueDays = Math.abs(diffDays) || 1;
    return {
      text: overdueDays === 1 ? 'Overdue by 1 day' : `Overdue by ${overdueDays} days`,
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.12)',
    };
  }

  if (diffDays === 0 || (diffTime > 0 && diffTime < 24 * 60 * 60 * 1000)) {
    return {
      text: 'Due today',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.12)',
    };
  }

  return {
    text: `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}`,
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.12)',
  };
};
