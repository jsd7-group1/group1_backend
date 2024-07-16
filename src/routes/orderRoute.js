import express from 'express';
import * as OrderController from '../controllers/orderControler.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

// API Get order
router.get('/',  OrderController.getOrder);

// API Get order by ID
router.get('/user',authenticateMiddleware, OrderController.getOrderByID);

//API add product to orders
router.delete('/deleteProduct',authenticateMiddleware , OrderController.deleteProductFromOrder);

//API checkout
router.post('/checkout',authenticateMiddleware, OrderController.checkoutOrder);

//API increase quantity
router.patch('/increase',authenticateMiddleware, OrderController.increaseProductQuantity);

//aAPI decrease quantity
router.patch('/decrease',authenticateMiddleware, OrderController.decreaseProductQuantity);
export default router;
