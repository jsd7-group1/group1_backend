import express from 'express';
import * as OrderController from '../controllers/orderControler.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

// API Get order
router.get('/orders', authenticateMiddleware, OrderController.getOrder);

// API Get order by ID
router.get('/orders/:userID', authenticateMiddleware, OrderController.getOrderByID);

//API add product to orders
router.delete('/orders/:productID', authenticateMiddleware, OrderController.deleteProductFromOrder);

export default router;
