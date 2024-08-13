import express from 'express';
import * as bookController from '../controller/book-controller.js';

const router = express.Router();

// Routes for creating a book and fetching all books
router.route('/')
    .post(bookController.addBook)
    .get(bookController.getAllBooks);

// Routes for updating and deleting a specific book by ID
router.route('/:id')
    .put(bookController.updateBook)
    .get(bookController.getBook)
    .delete(bookController.deleteBook);

export default router;