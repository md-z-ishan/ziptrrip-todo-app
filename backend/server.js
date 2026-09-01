import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todos.js';
import { requestLogger } from './middleware/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// CORS Middleware
app.use(
  cors({
    origin: [FRONTEND_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use(requestLogger);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Ziptrip Todo API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/todos', todoRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found.`,
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Ziptrip Todo Server running on http://localhost:${PORT}`);
  console.log(`📋 API Docs & Health check: http://localhost:${PORT}/api/health`);
});
