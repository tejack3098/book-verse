import { request, response } from 'express';
import * as bookService from '../services/book-service.js';
import { setError, setResponse } from './response-handler.js';

// Controller to get all books with optional filters
export const getAllBooks = async(request, response) => {
    try {
        const payload = {...request.query};
        const books = await bookService.getAllBooks(payload);
        setResponse(books, response);
    } catch(error) {
        setError(error, response);
    } 
}

// Controller to get a book
export const getBook = async(request, response) => {
    try {
        const id = request.params.id;
        const book = await bookService.getBook(id);
        setResponse(book, response);
    } catch(error) {
        setError(error, response);
    }
}

// Controller to create a new book
export const addBook = async(request, response) => {

    try {
        const payload = {...request.body};
        const book = await bookService.addBook(payload);
        setResponse(book, response);
    } catch(error) {
        setError(error, response);
    }
}

// Controller to update an existing book
export const updateBook = async(request, response) => {
    try {
        const id = request.params.id;
        const payload = {...request.body};
        const book = await bookService.updateBook(id, payload);
        setResponse(book, response);
    } catch(error) {
        setError(error, response);
    }
}

// Controller to delete a book
export const deleteBook = async(request, response) => {
    try{
        const id = request.params.id;
        const book = await bookService.deleteBook(id);
        setResponse(book, response);
    } catch(error) {
        setError(error, response);
    }
}