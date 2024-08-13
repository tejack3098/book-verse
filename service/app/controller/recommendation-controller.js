import { request, response } from 'express';
import * as recommendationService from '../services/recommendation-service.js';
import { setError, setResponse } from './response-handler.js';


// Controller to get all the recommendations for a user
export const getUserRecommendations = async (request, response) => {
    try {
        const id = request.params.id;
        const payload = {...request.query};
        const recommendations = await recommendationService.getUserRecommendations(id, payload);
        setResponse(recommendations, response);
    } catch (error) {
        setError(error, response);
    }
};

// Controller to get all the recommendations for a book
export const getBookRecommendations = async (request, response) => {
    try {
        const id = request.params.id;
        const payload = {...request.query};
        const recommendations = await recommendationService.getBookRecommendations(id, payload);
        setResponse(recommendations, response);
    } catch (error) {
        setError(error, response);
    }
};