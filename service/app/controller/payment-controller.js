import { request, response } from 'express';
import * as paymentService from '../services/payment-service.js';
import { setError, setResponse } from './response-handler.js';

// Controller to mkae  payment Intent
export const createPaymentIntent = async(request, response) => {
    try {
        const payload = {...request.body};
        const payment = await paymentService.initiatePayment(payload);
        setResponse(payment, response);
    } catch(error) {
        setError(error, response);
    }
}   

