const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderID: { type: Number, required: true, unique: true },
  customerName: { type: String, required: true },
  subTotal: { type: Schema.Types.Decimal128, required: true },
  vat: { type: Schema.Types.Decimal128, required: true },
  purchaseDate: { type: Date, required: true },
  createdBy: { type: Number, required: true },
  modifiedBy: { type: Number, required: false },
  shippingAddress: { type: String, required: true },
  contact: { type: String, required: true },
  zipCode: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
