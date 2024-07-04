const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
  fullName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    maxlength: 255,
  },
  imageUrl: {
    type: String,
    maxlength: 255,
  },
  status: {
    type: Number,
    required: true,
  },
  isDelete: {
    type: Boolean,
    required: true,
  },
  createdByUserID: {
    type: String,
    maxlength: 128,
  },
  dateCreated: {
    type: Date,
  },
  modifiedByUserID: {
    type: String,
    maxlength: 50,
  },
  dateModified: {
    type: Date,
  },
  companyID: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  userType: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
