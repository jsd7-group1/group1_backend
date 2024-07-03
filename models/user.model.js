const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  userID: { type: String, required: true },
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String },
  status: { type: Number, required: true },
  isDelete: { type: Boolean, required: true },
  createByUserID: { type: String, required: true },
  dateCreate: { type: Date },
  modifyByUserID: { type: String },
  dateModified: { type: Date, required: true },
  companyID: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  userType: { type: Number, required: true }
});
module.exports = mongoose.model('User', userSchema);