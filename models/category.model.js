import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryID: { type: Schema.Types.ObjectId, required: true, unique: true },
  categoryName: { type: String, required: true },
});

// module.exports = mongoose.model("Category", categorySchema);
const Category = mongoose.model('Category', categorySchema);
export default Category;