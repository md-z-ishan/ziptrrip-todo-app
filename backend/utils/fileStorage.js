import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.join(__dirname, '../data/todos.json');

/**
 * Ensures the data directory and todos.json file exist.
 */
const ensureFileExists = async () => {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    try {
      await fs.access(DATA_FILE_PATH);
    } catch {
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error ensuring file exists:', error.message);
  }
};

/**
 * Reads all todos from JSON file.
 * @returns {Promise<Array>} List of todo items
 */
export const readTodos = async () => {
  await ensureFileExists();
  try {
    const content = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (error) {
    console.error('Failed to read todos.json:', error.message);
    return [];
  }
};

/**
 * Writes array of todos to JSON file atomically.
 * @param {Array} todos Array of todo objects to persist
 */
export const writeTodos = async (todos) => {
  await ensureFileExists();
  try {
    const tempPath = `${DATA_FILE_PATH}.tmp`;
    const jsonString = JSON.stringify(todos, null, 2);
    await fs.writeFile(tempPath, jsonString, 'utf-8');
    await fs.rename(tempPath, DATA_FILE_PATH);
    return true;
  } catch (error) {
    console.error('Failed to write todos.json:', error.message);
    throw new Error('Database write operation failed');
  }
};
