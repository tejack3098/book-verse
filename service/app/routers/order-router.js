import express from 'express';
import * as orderController from '../controller/order-controller.js';

const router = express.Router();

// Routes for creating a book and fetching all books
router.route('/')
    .post(orderController.addOrder)
    .get(orderController.getAllOrders);

// Routes for updating and deleting a specific book by ID
router.route('/:id')
    .put(orderController.updateOrder)
    .get(orderController.getOrder)
    .delete(orderController.deleteOrder);

// Route for fetching orders by userId
router.route('/user/:userId')
    .get(orderController.getOrdersByUserId);

export default router;