import express from 'express';
import * as OrderController from '../controllers/orderControler.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

// API Get order
router.get('/order?sortby_id', authenticateMiddleware, OrderController.getOrderByUserID);

//API add product to orders
router.delete('/delete-from-order', authenticateMiddleware, OrderController.deleteProductFromOrder);

export default router;
