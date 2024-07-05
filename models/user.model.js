import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true, unique: true },
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { type: Number, required: true },
  isDelete: { type: Boolean, required: true },
  createdByUserID: { type: Schema.Types.ObjectId, required: true },
  dateCreated: { type: Date, required: false },
  modifiedByUserID: { type: Schema.Types.ObjectId, required: false },
  dateModified: { type: Date, required: false },
  companyID: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  userType: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);
export default User;
