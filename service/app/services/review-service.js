import Review from '../models/review.js';

// Save a review
export const saveReview = async (reviewData) => {
    try {
        // Create a new review instance with the provided data
        const review = new Review(reviewData);
        
        // Save the review to the database
        const savedReview = await review.save();
        
        // Return the saved review
        return savedReview;
    } catch (error) {
        // Handle any errors that occur during saving
        throw new Error('Failed to save review: ' + error.message);
    }
};