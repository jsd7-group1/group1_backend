import express from 'express';
import * as ProductController from '../controllers/productController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

// API Get all products
router.get('/products', ProductController.getAllProduct);

//API Get product by category
router.get('/products/category/:categoryID', ProductController.getProductByCategory);

//API add product to orders
router.post('/products/:productID', authenticateMiddleware, ProductController.addToCart);

export default router;
