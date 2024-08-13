import express from 'express';
import * as authorController from '../controller/author-controller.js';

const router = express.Router();

router.route('/')
    .get(authorController.getAllAuthors);

// Routes for an author based on id
router.route('/:id')
    .get(authorController.getAuthor);

export default router;