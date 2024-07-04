const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryID: {
    type: Number,
    required: true,
    unique: true,
  },
  categoryName: {
    type: String,
    required: true,
    maxlength: 500,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
