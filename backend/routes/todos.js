import express from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getStats,
} from '../controllers/todoController.js';
import { validateTodoInput, validateTodoId } from '../middleware/validation.js';

const router = express.Router();

// Stats Endpoint (Must come before :id route)
router.get('/stats', getStats);

// List & Create Endpoints
router.get('/', getAllTodos);
router.post('/', validateTodoInput, createTodo);

// Single Resource Operations
router.get('/:id', getTodoById);
router.put('/:id', validateTodoId, validateTodoInput, updateTodo);
router.delete('/:id', validateTodoId, deleteTodo);

export default router;
