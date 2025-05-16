const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  publishedYear: {
    type: Number,
    min: 1000,
    max: new Date().getFullYear()
  },
  genre: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  status: {
    type: String,
    enum: ['to-read', 'reading', 'completed'],
    default: 'to-read'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

