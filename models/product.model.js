const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: { type: String, required: true},
    productName: { type: String, required: true},
    description: { type: String },
    price: { type: Number, required: true},
    categoryId: { type: Number, required: true},
    imageUrl: { type: String },
    costPrice: { type: String, required: true},
    salePrice: { type: String, required: true},
})