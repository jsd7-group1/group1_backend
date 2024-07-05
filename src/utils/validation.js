import Joi from 'joi';

const userIDSchema = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);

const registerSchema = Joi.object({
  userID: userIDSchema.required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  imageUrl: Joi.string().uri().optional(),
  status: Joi.number().integer().required(),
  isDelete: Joi.boolean().required(),
  createdByUserID: userIDSchema.required(),
  dateCreated: Joi.date().optional(),
  modifiedByUserID: userIDSchema.optional(),
  dateModified: Joi.date().optional(),
  companyID: Joi.number().required(),
  isActive: Joi.boolean().required(),
  userType: Joi.number().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const productSchema = Joi.object({
  productID: userIDSchema.required(),
  productName: Joi.string().min(3).max(50).required(),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  categoryID: userIDSchema.required(),
  imageUrl: Joi.string().uri().optional(),
  costPrice: Joi.number().required(),
  salePrice: Joi.number().required(),
  isFeatured: Joi.boolean().required(),
});

const orderDetailsSchema = Joi.object({
  orderID: userIDSchema.required(),
  productID: userIDSchema.required(),
  productName: Joi.string().min(3).max(50).required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().required(),
  vat: Joi.number().required(),
});

export { registerSchema, loginSchema, productSchema, orderDetailsSchema };
