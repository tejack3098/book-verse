import express from 'express';
import * as reviewController from '../controller/review-controller.js';

const router = express.Router();

// Route for saving a review
router.route('/')
    .post(reviewController.saveReview); 

export default router;