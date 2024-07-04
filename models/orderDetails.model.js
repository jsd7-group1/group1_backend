const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema({
  orderID: {
    type: Number,
    required: true,
    ref: 'Order'
  },
  productID: {
    type: Number,
    required: true,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  vat: {
    type: Number,
    required: true
  }
});

const OrderDetails = mongoose.model('OrderDetails', orderDetailsSchema);
module.exports = OrderDetails;
