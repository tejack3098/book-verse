import { request, response } from 'express';
import * as userService from '../services/user-service.js';
import { setError, setResponse } from './response-handler.js';

// Controller to get all users 
export const getAllUsers = async(request, response) => {
    try {
        const payload = {...request.query};
        const users = await userService.getAllUsers(payload);
        setResponse(users, response);
    } catch(error) {
        setError(error, response);
    } 
}

// Controller to get user by id
export const getUser = async(request, response) => {
    try {
        const id = request.params.id;
        const users = await userService.getUser(id);
        setResponse(users, response);
    } catch(error) {
        setError(error, response);
    } 
}

// Controller to create a new user
export const addUser = async(request, response) => {

    try {
        const payload = {...request.body};
        const user = await userService.addUser(payload);
        setResponse(user, response);
    } catch(error) {
        setError(user, response);
    }
}

// Controller to update an existing user
export const updateUser = async(request, response) => {
    try {
        const id = request.params.id;
        const payload = {...request.body};
        const user = await userService.updateUser(id, payload);
        setResponse(user, response);
    } catch(error) {
        setError(error, response);
    }
}

// Controller to delete a user
export const deleteUser = async(request, response) => {
    try{
        const id = request.params.id;
        const user = await userService.deleteUser(id);
        setResponse(user, response);
    } catch(error) {
        setError(error, response);
    }
}