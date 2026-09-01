import express from 'express';
import {
  getAllTodos,
  getStats,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController.js';
import { validateTodoInput } from '../middleware/validation.js';

const router = express.Router();

// Stats Endpoint (must come before :id route)
router.get('/stats', getStats);

// List & Create Endpoints
router.get('/', getAllTodos);
router.post('/', validateTodoInput, createTodo);

// Single Item Operations
router.get('/:id', getTodoById);
router.put('/:id', validateTodoInput, updateTodo);
router.delete('/:id', deleteTodo);

export default router;
