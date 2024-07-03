require("dotenv").config();

<<<<<<< HEAD
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB 🔌😎')
});

const Products = require('./models/product.model.js');
const Users = require('./models/user.model.js')
=======
// set up mongoose connection to MongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB 🥭");
});

// use the mongoose models
const User = require("./models/user.model");

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

module.exports = app;
>>>>>>> 0bf91408269047fb838d9be8485cbae6a3c8ece3
