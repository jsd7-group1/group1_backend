require("dotenv").config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB 🔌😎')
});

const Products = require('./models/product.model.js');
const Users = require('./models/user.model.js')