import express from "express";
import * as UserController from "../controllers/usersController.js";

const router = express.Router();

router.post("/register", UserController.registerController);
router.post("/login", UserController.loginController);
router.get("/", UserController.getUserController);

export default router;
