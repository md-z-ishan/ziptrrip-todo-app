import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todos.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

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
  })
);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lightweight Request Logger Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

// API Routes
app.use('/api/todos', todoRoutes);

// 404 Unknown Route Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

// Start Express Server with EADDRINUSE Fallback Handling
const server = app.listen(PORT, () => {
  console.log(`🚀 Ziptrrip Todo Backend running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = Number(PORT) + 1;
    console.warn(`⚠️ Port ${PORT} is occupied. Starting on fallback port ${fallbackPort}...`);
    app.listen(fallbackPort, () => {
      console.log(`🚀 Ziptrrip Todo Backend running on http://localhost:${fallbackPort}`);
      console.log(`📡 Health Check: http://localhost:${fallbackPort}/api/health`);
    });
  } else {
    console.error('Server launch error:', err);
  }
});
