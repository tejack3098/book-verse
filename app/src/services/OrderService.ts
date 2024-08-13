import axios from "axios";
import { IOrder } from "../models/IOrder";


const baseURL = "http://localhost:3000/orders";

export const api = axios.create({
  baseURL: baseURL,
});

export const placeOrder = (request: IOrder) =>
  api.post(`${baseURL}`, request);

export const getAllOrders = (searchParams: URLSearchParams) =>
  api.get(`${baseURL}?${searchParams}`).then((response) => response.data);

export const getOrderById = (id: string) =>
  api.get(`${baseURL}/${id}`).then((response) => response.data);

export const updateOrder = (id: string, request: IOrder) =>
  api.put(`${baseURL}/${id}`, request).then((response) => response.data);

export const deleteOrder = (id: string) =>
  api.delete(`${baseURL}/${id}`).then((response) => response.data);

export const getCurrentUserOrders = async () => {
  const userId = localStorage.getItem('userId');
  
  if (!userId) {
    throw new Error('User ID not found.');
  }
  
  try {
    const response = await api.get(`${baseURL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch orders.');
  }
};