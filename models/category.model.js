const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  catagoryID: { type: Number, required: true, unique: true },
  catagoryName: { type: String, required: true },
});

module.exports = mongoose.model("Category", categorySchema);
