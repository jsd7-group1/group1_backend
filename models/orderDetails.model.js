const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderDetailSchema = new Schema({
  orderID: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  productID: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  vat: { type: Number, required: true },
});

module.exports = mongoose.model("OrderDetail", orderDetailSchema);
