import express from 'express';
import * as ProductController from '../controllers/productController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

// API Get all products
router.get('/', ProductController.getAllProduct);

//API Get product by category
router.get('/category/:categoryID', ProductController.getProductByCategory);

//API add product to orders
router.post('/add-to-cart',authenticateMiddleware , ProductController.addToCart);

// API Add new product
router.post('/add', ProductController.addProduct);

// API Delete product by ID
router.delete('/:id', ProductController.deleteProductById);

// API get all categories
router.get('/categories', ProductController.getAllCategories);

export default router;
