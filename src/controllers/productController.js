import NotFoundError from '../error/NotFoundError.js';
import Product from '../../models/product.model.js';
import Order from '../../models/order.model.js';
import OrderDetail from '../../models/orderDetails.model.js';
import mongoose from 'mongoose';
import Category from '../../models/category.model.js';

// api Get all products
const getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find().populate('categoryID', 'categoryName');
        res.status(200).json({message: "success", data: products});
    } catch (error) {
        next(error);
    }
};

// api Get product by categories
const getProductByCategory = async (req, res, next) => {
    try {
        const categoryID = req.params.categoryID;
        if (!categoryID) {
            return next(new NotFoundError("No Category"));
        }
        const products = await Product.find({categoryID: categoryID}).populate('categoryID', 'categoryName');
        res.status(200).json({message: "success", data: products});
    } catch (error) {
        next(error);
    }
};

// api Add product to cart
const addToCart = async (req, res, next) => {
    try {
        const {productID} = req.body; // ORDERID
        const userID = req.user._id;
        const product = await Product.findById(productID);
        if (!product) {
            return next(new NotFoundError('Product not found'));
        }
        let order = await Order.findOne({userID: userID, status: "Pending"}); // filter status
        if (!order) {
            order = new Order({
                userID: userID,
                orderID: new mongoose.Types.ObjectId(),
                customerName: `User ${userID}`,
                subTotal: 0,
                vat: 0,
                purchaseDate: Date.now(),
                createdBy: 1,
                shippingAddress: 'Default',
                contact: '0000000000',
                zipCode: '00000',
                status: 'Pending',
            });
            await order.save();
        }
        let orderDetail = await OrderDetail.findOneAndUpdate(
            {
                orderID: order.orderID,
                productID: product._id,
                productName: product.productName,
                price: product.price,
                vat: 0,
                imgUrl: product.imgUrl
            },
            {$inc: {quantity: 1}},
            {new: true, upsert: true}
        ).populate('productID');
        if (!orderDetail) {
            throw new Error('Failed to update or create order detail');
        }

        const orderDetails = await OrderDetail.find({orderID: order.orderID}).populate({
            path: 'productID',
            populate: {
                path: 'categoryID'
            }
        });
        if (!order.orderDetails.includes(orderDetail._id)) {
            order.orderDetails.push(orderDetail._id);
            await order.save();
        }
        res.status(201).json({
            order,
            orderDetails: orderDetails.map(detail => ({
                productID: productID,
                productName: detail.productName,
                price: detail.price,
                quantity: detail.quantity,
                imgUrl: detail.productID.imgUrl,
                type: detail.productID.categoryID ? detail.productID.categoryID.categoryName : 'Uncategorized'
            }))
        });
    } catch (error) {
        next(error);
    }
};

// api Add new product
const addProduct = async (req, res, next) => {
    try {
        const { productName, description, price,categoryName, categoryID, imgUrl, costPrice, salePrice } = req.body;
        const newProduct = new Product({
            productID: new mongoose.Types.ObjectId(),
            productName,
            description,
            price,
            categoryName,
            categoryID,
            imgUrl,
            costPrice,
            salePrice,
        });
        await newProduct.save();
        res.status(201).json({message: "Product added successfully", data: newProduct});
    } catch (error) {
        next(error);
    }
};

// api Delete product by ID
const deleteProductById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return next(new NotFoundError('Product not found'));
        }
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        next(error);
    }
};

// api Get all categories
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({message: "success", data: categories});
    } catch (error) {
        next(error);
    }
};

export { getAllProduct, getProductByCategory, addToCart, addProduct, deleteProductById, getAllCategories };
