import express from 'express';
import * as recommendationController from '../controller/recommendation-controller.js';

const router = express.Router();

// route for getting all the book recommendations for a user
router.route('/users/:id')
    .get(recommendationController.getUserRecommendations);

// route for getting the recommendations for a specific book
router.route('/books/:id')
    .get(recommendationController.getBookRecommendations);

export default router;