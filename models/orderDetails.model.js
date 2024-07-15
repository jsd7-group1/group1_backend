import mongoose from "mongoose";

const { Schema } = mongoose;

const orderDetailsSchema = new Schema(
  {
    orderID: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    productID: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    imgUrl: { type: String },
    vat: { type: Number, required: true },
  },
  // Specify collection name
  { collection: "orderDetails" }
);

const OrderDetails = mongoose.model("OrderDetails", orderDetailsSchema);
export default OrderDetails;
