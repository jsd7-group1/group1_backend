const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderDetailSchema = new Schema({
  orderID: { type: Number, ref: "Order", required: true },
  productID: { type: Number, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Schema.Types.Decimal128, required: true },
  vat: { type: Schema.Types.Decimal128, required: true },
});

module.exports = mongoose.model("OrderDetail", orderDetailSchema);
