import dotenv from "dotenv";
dotenv.config();
// set up express app and cors
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

// import routes
import useRoute from "./src/routes/usersRoute.js";
import orderRoute from "./src/routes/orderRoute.js";
import productRoute from "./src/routes/productRoute.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

// Set up mongoose connection to MongoDB
import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB 🥭");
});


const PORT = process.env.PORT || 8081;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
// server connection test
app.get("/", (req, res) => {
  res.json({ data: "respond received from the server!" });
});

app.use('/products', productRoute);
app.use('/orders', orderRoute);

app.use(errorMiddleware);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ☕️`);
});

export default app;
