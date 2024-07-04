const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  productID: { type: Number, required: true, unique: true },
  productName: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Schema.Types.Decimal128, required: true },
  catagoryID: { type: Number, ref: "Category", required: true },
  imageUrl: { type: String, required: false },
  costPrice: { type: Schema.Types.Decimal128, required: true },
  salePrice: { type: Schema.Types.Decimal128, required: true },
});

module.exports = mongoose.model("Product", productSchema);
