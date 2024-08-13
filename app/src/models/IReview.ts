// models/IReview.ts
export interface IReview {
    id: string; // Unique identifier for the review
    user_id: string; // ID of the user who wrote the review
    book_id: string; // ID of the book being reviewed
    rating: number; // Rating out of 5
    review_text: string; // Text of the review
    date_added: string; // Date when the review was added
}
