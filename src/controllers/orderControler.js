import Order from '../../models/order.model.js';
import orderDetail from '../../models/orderDetails.model.js';
import Product from '../../models/product.model.js'
import NotFoundError from '../error/NotFoundError.js';


// Get order
const getOrder = async(req,res,next)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
};

// Get Order by UserID
const getOrderByID = async(req,res,next)=>{
    try {
        const { userID } = req.user._id;
        const orders = await Order.findOne({ userID: userID });
        if(!orders){
            return next(new NotFoundError('No orders found'));
        }
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
};

// Delete Product from order
const deleteProductFromOrder = async(req,res,next)=>{
    try {
        const {orderID, productID} = req.body;
        if(!orderID){
            return next(new NotFoundError('Order not found!'))
        }
        const OrderDetail = await orderDetail.findOne({ orderID: orderID, productID: productID});
        if(!OrderDetail){
            return next(new NotFoundError('Product not found!'))
        }
        await OrderDetail.findByIdAndDelete(orderDetail.productID)
        const updateOrder = await Order.findById(orderID).populate({
            path: 'orderDetails',
            populate: { path: 'productID'}
        });
        res.status(201).json(updateOrder);

    } catch (error) {
        next(error)
    }
};

export {getOrder, getOrderByID, deleteProductFromOrder};