import express from 'express';
import * as authController from '../controller/auth-controller.js';
import { protect, adminProtect } from '../services/auth-service.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/admin', protect, adminProtect, authController.adminRoute); 

export default router;