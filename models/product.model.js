const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productID: {
    type: Number,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true
  },
  categoryID: {
    type: Number,
    required: true,
    ref: 'Category'
  },
  imageUrl: {
    type: String,
    maxlength: 255
  },
  costPrice: {
    type: Number,
    required: true
  },
  salePrice: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
