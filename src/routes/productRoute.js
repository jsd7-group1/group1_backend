import express from 'express';
import * as ProductController from '../controllers/productController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

// API Get all products
router.get('/', ProductController.getAllProduct);

//API Get product by category
router.get('/:categoryID', ProductController.getProductByCategory);

//API add product to orders
router.post('/:add-to-cart',authenticateMiddleware , ProductController.addToCart);

export default router;
