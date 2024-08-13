import axios from "axios";
import { IUser } from "../models/IUser";

const baseURL = "http://localhost:3000/users"; 

// Create an instance of axios with the base URL
export const api = axios.create({
  baseURL: baseURL,
});

// Function to retrieve user profile by ID
export const getUserProfile = (id: string) =>
  api.get(`${baseURL}/${id}`).then((response) => response.data);

// Function to update user profile
export const updateUserProfile = (id: string, user: IUser) =>
  api.put(`${baseURL}/${id}`, user).then((response) => response.data);
