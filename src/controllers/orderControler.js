import Order from '../../models/order.model.js';
import OrderDetails from '../../models/orderDetails.model.js';
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
const getOrderByID = async (req, res, next) => {
    try {
        const userID = req.user._id;

        const orders = await Order.find({ userID }).populate({
            path: 'orderDetails',
            populate: { path: 'productID', model: 'Product' },
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
                imageUrl: detail.productID.imageUrl,
                type: detail.productID.description // ขอใส่ประเภทสินค้าไว้ใน description ด้วยได้มั้ยครับ เพราะจะส่งให้ frontEnd ใช้ง่ายกว่า 
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

export {getOrder, getOrderByID, deleteProductFromOrder};