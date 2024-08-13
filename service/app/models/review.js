// models/review.ts
import mongoose, { Document, Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
    id: { type: String, required: false, unique: true }, // Ensure unique identifier
    user_id: { type: String, required: true },
    book_id: { type: String, required: true },
    rating: { type: Number, required: true },
    review_text: { type: String, required: true },
    date_added: { type: Date, default: Date.now }
});

// Create a Mongoose model using the schema
const Review = mongoose.model('Review', reviewSchema);

export default Review;
