import { request, response } from 'express';
import * as orderService from '../services/order-service.js';
import { setError, setResponse } from './response-handler.js';

// Controller to get all orders with optional daterange filters
export const getAllOrders = async(request, response) => {
    try {
        const payload = {...request.query};
        const orders = await orderService.getAllOrders(payload);
        setResponse(orders, response);
    } catch(error) {
        setError(error, response);
    } 
}    

// Controller to get an order
export const getOrder = async(request, response) => {
    try {
        const id = request.params.id;
        const order = await orderService.getOrder(id);
        setResponse(order, response);
    } catch(error) {
        setError(error, response);
    }
}


// Controller to create a new order
export const addOrder = async(request, response) => {

    try {
        const payload = {...request.body};
        const order = await orderService.addOrder(payload);
        setResponse(order, response);
    } catch(error) {
        setError(error, response);
    }
}

// Controller to update an existing order
export const updateOrder = async(request, response) => {
    try {
        const id = request.params.id;
        const payload = {...request.body};
        const order = await orderService.updateOrder(id, payload);
        setResponse(order, response);
    } catch(error) {
        setError(error, response);
    }
}

// Controller to delete a order
export const deleteOrder = async(request, response) => {
    try{
        const id = request.params.id;
        const order = await orderService.deleteOrder(id);
        setResponse(order, response);
    } catch(error) {
        setError(error, response);
    }
}

// Controller to get orders by userId
export const getOrdersByUserId = async(request, response) => {
    try {
        const userId = request.params.userId;
        const orders = await orderService.getOrdersByUserId(userId);
        setResponse(orders, response);
    } catch(error) {
        setError(error, response);
    }
}
