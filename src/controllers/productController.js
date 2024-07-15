import NotFoundError from '../error/NotFoundError.js';
import Product from '../../models/product.model.js';
import Order from '../../models/order.model.js';
import OrderDetail from '../../models/orderDetails.model.js';
import mongoose from 'mongoose';
import Category from '../../models/category.model.js';


// api Get all product
const getAllProduct = async (req,res,next)=>{
    try {
        const products = await Product.find().populate('categoryID', 'categoryName');
        res.status(200).json({message:"success",data: products});
    } catch (error) {
        next(error)
    }
};

//api Get product by Categories
const getProductByCategory = async (req,res,next)=>{
    try {
        const categoryID = req.params.categoryID
        if(!categoryID){
            return next(new NotFoundError("No Category"))
        }
        const products = await Product.find({ categoryID : categoryID}).populate('categoryID', 'categoryName');
        res.status(200).json({message: "success", data: products})

    } catch (error) {
        next(error)
    }
};

// api Add Product to order
const addToCart = async (req,res,next)=>{
    try {
        const {productID} = req.body; //ORDERID
        const userID = req.user._id
        const product = await Product.findById(productID);
        if(!product){
            return next (new NotFoundError('Product not found'))
        }
        let order = await Order.findOne({ userID: userID, status: "Pending"}); //filter status
        if(!order){
            order = new Order({
                userID: userID,
                orderID: new mongoose.Types.ObjectId(),
                customerName:`User ${userID}`,
                subTotal: 0,
                vat: 0,
                purchaseDate: Date.now(),
                createdBy: 1,
                shippingAddress: 'Default',
                contact: '0000000000',
                zipCode: '00000',
                status: 'Pending',
            })
            await order.save();
        };
        let orderDetail = await OrderDetail.findOneAndUpdate(
            { 
                orderID: order.orderID,
                productID: product._id, 
                productName: product.productName,
                price: product.price,
                vat:0,
                imgUrl: product.imgUrl
            },
            { $inc: { quantity: 1 } },
            { new: true, upsert: true }
        ).populate('productID');
        if (!orderDetail) {
            throw new Error('Failed to update or create order detail');
        }

        const orderDetails = await OrderDetail.find({ orderID: order.orderID}).populate({
            path: 'productID',
            populate:{
                path: 'categoryID'
            }
        });
           if(!order.orderDetails.includes(orderDetail._id)){
                order.orderDetails.push(orderDetail._id);
                await order.save();
            }
        res.status(201).json({ order, 
            orderDetails: orderDetails.map(detail =>({
                productID: productID,
                productName: detail.productName,
                price: detail.price,
                quantity: detail.quantity,
                imgUrl: detail.productID.imgUrl,
                type: detail.productID.categoryID ? detail.productID.categoryID.categoryName : 'Uncategorized'
            }))
        })
        
    } catch (error) {
        next(error)
    }
}

export { getAllProduct, getProductByCategory,  addToCart };