import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderID: { type: Schema.Types.ObjectId, required: true, unique: true },
  customerName: { type: String, required: true },
  subTotal: { type: Number, required: true },
  vat: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
  createdBy: { type: Number, required: true },
  modifiedBy: { type: Number, required: false },
  shippingAddress: { type: String, required: true },
  contact: { type: String, required: true },
  zipCode: { type: Number, required: true },
  status: { type: String, required: true }, 
  orderDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetails' }]
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
