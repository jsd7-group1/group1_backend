require("dotenv").config();

// Set up mongoose connection to MongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB 🥭");
});

// Use the mongoose models
const User = require("./models/user.model");
const Product = require("./models/product.model");
const Order = require("./models/order.model");
const OrderDetails = require("./models/orderDetails.model");
const Category = require("./models/category.model");

// test adding instance of the user model and save to the db
// let test = new User({
//   userID: "60d73b3f6a2b3c002d9e5c9f",
//   email: "whiskers.the.cat@example.com",
//   fullName: "Whiskers The Cat",
//   password: "hashed_password_here",
//   imageUrl: "https://media.tenor.com/dimT0JAAMb4AAAAM/cat-cute.gif",
//   status: 1,
//   isDelete: false,
//   createdByUserID: "60d73b3f6a2b3c002d9e5c9e",
//   dateCreated: "2023-06-15T08:00:00Z",
//   modifiedByUserID: "60d73b3f6a2b3c002d9e5c9e",
//   dateModified: "2024-07-04T12:00:00Z",
//   companyID: 101,
//   isActive: true,
//   userType: 2,
// });

// test.save().then((doc) => {
//   console.log(doc);
// })
// .catch((err) => {
//   console.error(err);
// })

// User.find({
//   userID : "60d73b3f6a2b3c002d9e5c9f"
// }).then((doc) => {
//   console.log(doc);
// })

// set up express app and cors
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 8081;
const app = express();

// use jwt and token to authenticate access to protected routes
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ☕️`);
});

// server connection test
app.get("/", (req, res) => {
  res.json({ data: "respond received from the server!" });
});

// API EndPoint
app.post("/register", async (req, res) => {});
app.post("/login", async (req, res) => {});
app.get("/users", async (req, res) => {});
app.get("/products", authenticateToken, async (req, res) => {
  const { user } = req.user;
  try {
    const products = await Product.find({ userId: user._id });
    return res.json({
      error: false,
      products,
      message: "Get Products successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});
app.get("/products?sort_by=categories", authenticateToken, async (req, res) => {
  const { user } = req.user;
  try {
  } catch (error) {}
});
app.post("/add-product-to-order", authenticateToken, async (req, res) => {
  const { productId, productName, quantity, price, ImgUrl } = req.body;
  const { user } = req.user;
  try {
    const orders = new Order({
      productId,
      productName,
      quantity,
      price,
      ImgUrl,
    });
    await orders.save();
    return res.json({ error: false, message: "Add to cart successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});
app.get("/orders", authenticateToken, async (req, res) => {
  const { user } = req.user;
  try {
    const orders = await Order.find({ userId: user._id });
    return res.json({
      error: false,
      orders,
      message: "Get Order successfully",
    });
  } catch (error) {
    return res.json({ error: true, message: "Internal Server Error" });
  }
});
app.delete(
  "/delete-product-from-order/:productId",
  authenticateToken,
  async (req, res) => {
    const productId = req.params.productId;
    const { user } = req.user;
    try {
      const product = await Product.findOne({
        _id: productId,
        userId: user.id,
      });
      if (!product) {
        return res
          .status(404)
          .json({ error: true, message: "Product not found" });
      }
      await Product.deleteOne({ _id: productId, userId: user._id });
      return res.json({ error: false, message: "Deleted Successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  }
);
module.exports = app;
