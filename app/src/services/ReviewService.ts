import axios from "axios";
import { IReview } from "../models/IReview";

const baseURL = "http://localhost:3000/reviews";

export const api = axios.create({
  baseURL: baseURL,
});

export const submitReview = async (review: IReview) => {
  try {

    const reviewData: IReview = {
      ...review,
      id: '', 
      user_id: localStorage.getItem('userId') || '', 
      date_added: new Date().toISOString(), 
    };

    // Send POST request with review data
    const response = await api.post('/', reviewData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to submit review.');
  }
};
