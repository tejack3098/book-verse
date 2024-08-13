import mongoose from "mongoose";
import config from './schema-config.js';

const bookSchema = mongoose.Schema(
    {
        isbn: { type: String, required: false },
        title: { type: String, required: true },
        description: { type: String, required: false },
        averageRating: { type: Number },
        authors: { type: String, required: false },
        numberOfPages: { type: String },
        language: { type: String, required: false},
        publisher: { type: String, required: false },
        format: { type: String, required: false },
        link: { type: String, required: false },
        price: { type: Number, required: true },
        book_id: {type: Number, required: true},
        similarity: {type: Number, required: false}
    }, 
    config
);

const Book = mongoose.model('Book', bookSchema);  

export default Book;