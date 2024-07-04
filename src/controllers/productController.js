import NotFoundError from '../error/NotFoundError';
import Product from '../../models/product.model.js';
import Order from '../../models/order.model.js';
import OrderDetail from '../../models/orderDetails.model.js';
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
        const products = await Product.find({ catagoryID : catagoryID})
        return products;

    } catch (error) {
        next(error)
    }
};

// api Add Product to order
const addToCart = async (req,res,next)=>{
    try {
        const { userID , productID} = req.body;
        const product = await Product.findById(productID);
        if(!product){
            return next (new NotFoundError('Product bot found'))
        }

        let order = await Order.findOne({ userID: userID});
        if(!order){
            order = new Order({
                userID: userID,
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
                orderID: order._id,
                productID: product._id,
                quantity:quantity,
                price: product.price,
                vat: 0
            })
        }
        await orderDetail.save();

        const orderDetails = await OrderDetail.find({ orderID: order._id}).populate('productID');
        res.json({ order, 
            orderDetails: orderDetails.map(detail =>({
                productID: detail.productID._id,
                productName: detail.productID.productName,
                description: detail.productID.description,
                price: detail.price,
                quantity: detail.quantity,
                imageUrl:detail.productID.categoryID
            }))
        })
        
    } catch (error) {
        next(error)
    }
}

export { addToCart, getAllProduct, getProductByCategory };