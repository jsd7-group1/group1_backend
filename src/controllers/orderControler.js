import Order from '../../models/order.model.js';
import OrderDetails from '../../models/orderDetails.model.js';
import NotFoundError from '../error/NotFoundError.js';
import Category from '../../models/category.model.js';

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
const getOrderByID = async (req, res, next) => {
    try {
        const userID = req.user._id;

        const orders = await Order.find({ userID:userID, status:"Pending" }).populate({
            path: 'orderDetails',
            populate: {
                path: 'productID',
                model: 'Product' ,
                populate:{
                    path: 'categoryID',
                    model: 'Category'
                }
            },
        });
        if (!orders) {
            return next(new NotFoundError('No orders found'));
        }
        const formattedOrders = orders.map(order => ({
            _id: order._id,
            userID: order.userID,
            orderID: order.orderID,
            customerName: order.customerName,
            subTotal: order.subTotal,
            vat: order.vat,
            purchaseDate: order.purchaseDate,
            createdBy: order.createdBy,
            shippingAddress: order.shippingAddress,
            contact: order.contact,
            zipCode: order.zipCode,
            status: order.status,
            orderDetails: order.orderDetails.map(detail => ({
                productID: detail.productID._id,
                productName: detail.productID.productName,
                price: detail.price,
                quantity: detail.quantity,
                imgUrl: detail.productID.imgUrl,
                type: detail.productID.categoryID.categoryName 
            })),
        }));

        res.status(200).json(formattedOrders);

    } catch (error) {
        next(error);
    }
};

// Delete Product from order
const deleteProductFromOrder = async(req,res,next)=>{
    try {
        const {orderID, productID} = req.body;
        if(!orderID){
            return next(new NotFoundError('Order not found!'))
        }
        console.log("Received orderID and productID:", orderID, productID);
        const orderDetail = await OrderDetails.findOne({ orderID: orderID, productID: productID});
        if(!orderDetail){
            return next(new NotFoundError('Product not found!'))
        }
        console.log(orderDetail);
        await OrderDetails.findByIdAndDelete(orderDetail._id)

        res.status(201).json({ message: "Delete Success!" });

    } catch (error) {
        next(error)
    }
};

const checkoutOrder = async (req,res,next)=>{
    try {
        const { vat, orderTotal, customerName, contact, zipcode, address } = req.body;
        const userID = req.user._id;
        const order = await Order.findOne({ userID: userID, status: "Pending"});
        if(!order){
            return next(new NotFoundError("No order on pending"));
        }
        order.status = "Success";
        order.vat = vat;
        order.subTotal = orderTotal;
        order.customerName = customerName;
        order.contact = contact;
        order.zipCode = zipcode
        order.shippingAddress = address;

        await order.save();
        const orderDetail = await OrderDetails.findOne({ orderID: order.orderID}).populate({
            path: "productID",
            populate:{
                path: "categoryID"
            }
        });
        if(!orderDetail){
            return next(new NotFoundError("No product in this order"))
        }
        res.status(200).json({
            order,
            orderDetail
        })

    } catch (error) {
        next(error);
    }
};

const increaseProductQuantity = async (req, res, next) => {
    try {
        const { orderID, productID } = req.body;
        const order = await Order.findById(orderID).populate({
            path: 'orderDetails',
            populate: {
                path: 'productID',
                model: 'Product'
            }
        });
        const orderDetail = order.orderDetails.find(detail => detail.productID._id.toString() === productID);
        if (!orderDetail) {
            throw new NotFoundError('Product not found in order');
        }
        orderDetail.quantity += 1;
        await orderDetail.save();

        res.status(200).json({ message: 'Product quantity increased'});
    } catch (error) {
        next(error);
    }
};

const decreaseProductQuantity = async (req, res, next) => {
    try {
        const { orderID, productID } = req.body;
        const order = await Order.findById(orderID).populate({
            path: 'orderDetails',
            populate: {
                path: 'productID',
                model: 'Product'
            }
        });
        const orderDetail = order.orderDetails.find(detail => detail.productID._id.toString() === productID);
        if (!orderDetail) {
            throw new NotFoundError('Product not found in order');
        }
        if (orderDetail.quantity > 1) {
                orderDetail.quantity -= 1;
                await orderDetail.save();
                res.status(200).json({ message: 'Product quantity decreased', order });
        } else {
            res.status(400).json({ message: 'Product quantity cannot be less than 1' });
        }
    } catch (error) {
        next(error);
    }
};

export {getOrder, getOrderByID, deleteProductFromOrder, checkoutOrder, increaseProductQuantity, decreaseProductQuantity};