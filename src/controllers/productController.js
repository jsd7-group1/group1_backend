import NotFoundError from '../error/NotFoundError';
import BadRequestError from '../error/BadRequestError';
import Product from './models/product.model';

// api Get all product

const getAllProduct = async (req,res,next)=>{
    try {
        const products = await Product.find();
        res.status(200).json({ message: "Get all product ",products});
    } catch (error) {
        next(error)
    }
};

//api Get product by Categories

const getProductByCategory = async (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
};

// api Add Product to order

const addToCart = async (req,res,next)=>{
    try {
        
        
    } catch (error) {
        next(error)
    }
}

