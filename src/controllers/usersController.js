import user from "../../models/user.model.js";
import NotFoundError from "../error/NotFoundError.js";

// Register Contrller
const registerController = async (req, res) => {
  console.log(req.body.email);
  if (!req.body.email)
    return res.status(400).json({ message: "email is required" });
  if (!req.body.email.includes("@"))
    return res.status(400).json({ message: "invalid email" });
  if (!req.body.fullName)
    return res.status(400).json({ meesage: "fullName is required" });
  if (!req.body.password || !req.body.confirmPassword)
    return res
      .status(400)
      .json({ message: "password or confirmPassword is required" });
  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json({ message: "confirmPassword Not Match" });
  if (!req.body.imageUrl)
    return res.status(400).json({ message: "ImageUrl is required" });

  // res.send('Register Success')
  res.json({
    message: "register success",
    data: req.body,
  });
};

// Login
const loginController = async (req, res) => {
  console.log(req.body.email);
  if (!req.body.email)
    return res.status(400).json({ message: "email is required" });
  if (!req.body.email.includes("@"))
    return res.status(400).json({ message: "invalid email" });
  if (!req.body.password)
    return res.status(400).json({ message: "password is required" });

  // res.send('login Success')
  res.json({
    message: "login success",
    data: req.body,
  });
};

// GetUser
const getUserController = async (req, res, next) => {
  res.send("Hi");
};

export { registerController, loginController, getUserController };
