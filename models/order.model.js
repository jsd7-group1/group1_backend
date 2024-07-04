const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    ref: "User",
  },
  orderID: {
    type: Number,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  vat: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: Number,
    required: true,
  },
  modifiedBy: {
    type: Number,
  },
  shippingAddress: {
    type: String,
    maxlength: 255,
  },
  contact: {
    type: String,
    maxlength: 255,
  },
  zipCode: {
    type: Number,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
