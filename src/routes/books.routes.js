const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');
const { validateSchema } = require('../middlewares/validate.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
const { bookSchema } = require('../validations/book.validation');

// Protege todas as rotas com autenticação
router.use(authenticate);

// Get book options (genres and statuses)
router.get('/options', booksController.getBookOptions);

// Get all books
router.get('/', booksController.getAllBooks);

// Get book by ID
router.get('/:id', booksController.getBookById);

// Create new book
router.post('/', validateSchema(bookSchema), booksController.createBook);

// Update book
router.put('/:id', validateSchema(bookSchema), booksController.updateBook);

// Delete book
router.delete('/:id', booksController.deleteBook);

module.exports = router;

