import axios from "axios";
import { IBookInfo } from "../models/IBookInfo";
import { IBookRequest } from "../models/IBookRequest";




const baseURL = "http://localhost:3000/books";

export const api = axios.create({
  baseURL: baseURL,
});

export const getBooks = (): Promise<IBookInfo[]> =>
  api.get(baseURL).then((response) => response.data);

export const searchBooks = (searchParams: URLSearchParams) =>
  api.get(`${baseURL}?${searchParams}`).then((response) => response.data);

export const getBookById = (id: string) =>
  api.get(`${baseURL}/${id}`).then((response) => response.data);

export const deleteBook = (id: string) =>
  api.delete(`${baseURL}/${id}`).then((response) => response.data);

export const createBook = (request: IBookInfo) =>
  api.post(`${baseURL}`, request);

export const updateBook = (id: string, request: IBookRequest) =>
  api.put(`${baseURL}/${id}`, request).then((response) => response.data);
