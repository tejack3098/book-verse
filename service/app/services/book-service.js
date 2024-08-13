import axios from 'axios';
import Book from '../models/book.js';
import pLimit from 'p-limit';

// limit to 5 concurrent requests
const limit = pLimit(5);

export const getAllBooks = async(query = {}) => {
    // const { keyword } = query;
    
    // const filter = {};

    // if(keyword){
    //     filter.$or = [
    //         { title: new RegExp(keyword, 'i') },
    //         { description: new RegExp(keyword, 'i') }
    //     ];
    // }
    const books = await Book.find(query).exec();
    
    // Iterate over each book to fetch author details
    const booksWithAuthors = await Promise.all(books.map(async (book) => {
        // Parse the authors array from the book
        // const authorsArray = JSON.parse(book.authors);
        const authorsArray = JSON.parse(book.authors.replace(/'/g, '"'));

        // Fetch author details for each author ID
        const authorNames = await Promise.all(authorsArray.map( author => limit(async () => {
            const response = await axios.get(`http://localhost:3000/authors/?author_id=${author.author_id}`);
            
            return response.data[0].name;  // Assuming the API returns a `name` field
        })));

        // Replace the authors field with the array of author names
        book.authors = authorNames.join(', ');
        return book;
    }));

    return booksWithAuthors;
};

// Get Book by ID
export const getBook = async(id) => {
    const book = await Book.findById(id).exec();
    const authorsArray = JSON.parse(book.authors.replace(/'/g, '"'));

    // Fetch author details for each author ID
    const authorNames = await Promise.all(authorsArray.map( author => limit(async () => {
        const response = await axios.get(`http://localhost:3000/authors/?author_id=${author.author_id}`);
        
        return response.data[0].name;  // Assuming the API returns a `name` field
    })));

    // Replace the authors field with the array of author names
    book.authors = authorNames.join(', ');
    return await book;
};

// Add a new Book
export const addBook = async(newBook) => {
    const book = new Book(newBook);
    return await book.save();
};

// Update an existing book
export const updateBook = async(id, updatedBook) => {
    return await Book.findByIdAndUpdate(id, updatedBook, {new: true}).exec();
};

// Delete a book
export const deleteBook = async(id) => {
    return await Book.findByIdAndDelete(id).exec();
}
