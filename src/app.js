const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/books.routes');
const authRoutes = require('./routes/auth.routes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: '*', // Em produção, você deve especificar as origens permitidas
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Book Diary API' });
});

// 404 Not Found handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

module.exports = app;

