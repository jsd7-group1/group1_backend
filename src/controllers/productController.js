import NotFoundError from '../error/NotFoundError.js';
import Product from '../../models/product.model.js';
import Order from '../../models/order.model.js';
import OrderDetail from '../../models/orderDetails.model.js';
import mongoose from 'mongoose';
// api Get all product

const getAllProduct = async (req,res,next)=>{
    try {
        const products = await Product.find();
        res.status(200).json({message:"success",data: products});
    } catch (error) {
        next(error)
    }
};

//api Get product by Categories
const getProductByCategory = async (req,res,next)=>{
    try {
        const catagoryID = req.params.catagoryID
        if(!catagoryID){
            return next(new NotFoundError("No Category"))
        }
        const products = await Product.find({ catagoryID : catagoryID})
        res.status(200).json({products})

    } catch (error) {
        next(error)
    }
};

// api Add Product to order
const addToCart = async (req,res,next)=>{
    try {
        const productID = req.body;
        const userID = req.user._id
        const product = await Product.findById(productID);
        if(!product){
            return next (new NotFoundError('Product not found'))
        }
        const order = await Order.findOne({ userID });
        if(!order){
            order = new Order({
                userID: userID,
                orderID: new mongoose.Types.ObjectId(),
                customerName:'',
                subTotal: 0,
                vat: 0,
                purchaseDate: null,
                createdBy: userID,
                shippingAddress: '',
                contact: '',
                zipcode: '',
            })
        };
        await order.save();
        let orderDetail = OrderDetail.find({ orderID: order._id}).populate('productID');
        if(orderDetail){
            orderDetail.quantity += quantity;
        } else {
            orderDetail = new OrderDetail({
                orderID: order.orderID,
                productID: product._id,
                quantity:1,
                price: product.price,
                vat: 0
            })
        }
        await orderDetail.save();

        const orderDetails = await OrderDetail.find({ orderID: order._id}).populate('productID');
        res.status(201).json({ order, 
            orderDetails: orderDetails.map(detail =>({
                productID: detail.productID._id,
                productName: detail.productID.productName,
                price: detail.price,
                quantity: detail.quantity,
                imageUrl:detail.productID.imageUrl,
            }))
        })
        
    } catch (error) {
        next(error)
    }
}

export { getAllProduct, getProductByCategory,  addToCart };