import express from 'express';
import * as userController from '../controller/user-controller.js';

const router = express.Router();

// Routes for creating a book and fetching all books
router.route('/')
    .post(userController.addUser)
    .get(userController.getAllUsers);


// Routes for updating and deleting a specific book by ID
router.route('/:id')
    .put(userController.updateUser)
    .get(userController.getUser)
    .delete(userController.deleteUser);

export default router;