import express from 'express';
import * as paymentController from '../controller/payment-controller.js';

const router = express.Router();

// Routes for creating a book and fetching all books
router.route('/')
    .post(paymentController.createPaymentIntent)

export default router;