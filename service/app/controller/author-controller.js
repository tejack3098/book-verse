import {request, response} from 'express';
import * as authorService from '../services/author-service.js';
import { setError, setResponse } from './response-handler.js';


export const getAllAuthors = async (request, response) => {
    try {
        const payload = {...request.query};
        const authors = await authorService.getAllAuthors(payload);
        setResponse(authors, response);
    } catch (error) {
        setError(error, response);
    }
}

// controller to get an author
export const getAuthor = async (request, response) => {
    try {
        const id = request.params.id;
        const author = await authorService.getAuthor(id);
        setResponse(author, response);
    } catch (error) {
        setError(error, response);
    }
};