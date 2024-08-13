import axios from "axios";
// import { IBookInfo } from "../models/IBookInfo";

const baseURL = "http://localhost:3000/recommendations";

export const api = axios.create({
  baseURL: baseURL,
});

// export const getRecommendationsByBook = (book_id: number): Promise<IBookInfo[]> => 
//     api.get(`${baseURL}/books/${book_id}`).then((response) => response.data);

export const getRecommendationsByBook = (book_id: number): Promise<[]> => {
    // Log the book_id value
    console.log('Fetching recommendations for book_id:', book_id);

    // Call the API to get the recommendations
    return api.get(`${baseURL}/books/${book_id}`).then((response) => response.data);
};
