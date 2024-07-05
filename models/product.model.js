const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  productID: { type: Schema.Types.ObjectId, required: true, unique: true },
  productName: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  categoryID: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  imageUrl: { type: String, required: false },
  costPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  isFeatured: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
