import { request, response } from 'express';
import * as reviewService from '../services/review-service.js'; 
import { setError, setResponse } from './response-handler.js';


// Controller to save a review
export const saveReview = async (request, response) => {
    try {
        const reviewData = { ...request.body };
        const savedReview = await reviewService.saveReview(reviewData);
        setResponse(savedReview, response);
    } catch (error) {
        setError(error, response);
    }
}