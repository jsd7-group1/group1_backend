import express from "express";
import * as UserController from "../controllers/usersController.js";
import authenticateMiddleware from "../middleware/authenticateMiddleware.js";

const router = express.Router();

router.post("/register", UserController.registerController);
router.post("/login", UserController.loginController);
router.get("/", authenticateMiddleware, UserController.getUserController);

export default router;
