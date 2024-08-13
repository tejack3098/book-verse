import axios from 'axios';

// Base URL for your authentication API
const baseURL = "http://localhost:3000/auth";

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: baseURL,
});

// Define types for the response and request
interface AuthResponse {
  token: string;
  role: string;
  userId: string;
  message?: string;
  error?: string;
}

// Helper function for storing tokens
const storeUserData = (data: AuthResponse) => {
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('role', data.role);
  }
};

// Helper function for error handling
const handleError = (error: any): AuthResponse => {
  console.error('Authentication error:', error);
  return { message: 'Authentication failed. Please try again.', token: '', userId: '', role: '', error: error.message || '' };
};

// Sign-up function
export const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dateOfBirth: string,
  role: string
): Promise<AuthResponse> => {
  return api.post<AuthResponse>(`${baseURL}/signup`, {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    role,
  }).then((response) => {
    storeUserData(response.data);
    return response.data;
  }).catch(handleError);
};

// Sign-in function
export const signIn = (email: string, password: string): Promise<AuthResponse> =>
  api.post<AuthResponse>(`${baseURL}/signin`, { email, password }).then((response) => {
    storeUserData(response.data);
    return response.data;
  }).catch(handleError);

// Sign-out function
export const signOut = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
};

// Get current user function 
export const getCurrentUser = (): { token: string | null; role: string | null } => {
  return {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
  };
};
