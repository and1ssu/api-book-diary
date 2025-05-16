const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    enum: [
      'Ficção',
      'Não Ficção',
      'Romance',
      'Mistério',
      'Fantasia',
      'Ciência',
      'História',
      'Biografia',
      'Autoajuda',
      'Outro'
    ]
  },
  status: {
    type: String,
    required: true,
    enum: ['Não Lido', 'Lendo', 'Lido', 'Abandonado']
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);