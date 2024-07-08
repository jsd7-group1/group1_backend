import NotFoundError from "../error/NotFoundError.js";
import User from "../../models/user.model.js";
import { hashPassword } from "../utils/hash.js";
import { sign } from "../utils/token.js";

// Register Contrller
const registerController = async (req, res, next) => {
  try {
    const {
      email,
      fullName,
      password,
      confirmPassword,
      imageUrl,
      companyID,
      status,
      userType,
      createdByUserID,
    } = req.body;

    // Validation
    if (!email) {
      // return res.status(400).json({ message: "email is required" });
      throw Error("email is requrired!");
    }
    if (!email.includes("@"))
      return res.status(400).json({ message: "invalid email" });
    if (!fullName)
      return res.status(400).json({ meesage: "fullName is required" });
    if (!password || !confirmPassword)
      return res
        .status(400)
        .json({ message: "password or confirmPassword is required" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "confirmPassword Not Match" });
    if (!imageUrl)
      return res.status(400).json({ message: "ImageUrl is required" });

    // 2.เช็ค user ซ้ำ (Mongoose)
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      return res.status(400).json({ message: "email already in use" });
    }

    // 3.Hashed
    const hashedPassword = await hashPassword(password);

    // 4.สร้าง User
    const user = await User.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      imageUrl: imageUrl,
      createdByUserID: createdByUserID,
      companyID: companyID,
      status: status,
      userType: userType,
      isDelete: false,
      isActive: true,
    });

    const returnedUser = {
      id: user.id,
      email: user.email,
    };

    // 5.ออก token
    const accessToken = sign(returnedUser);

    // 6.ส่งข้อมูลกลับ
    res.json({
      message: "register success",
      data: returnedUser,
      access_token: accessToken,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send(error.meesage);
  }
};

// Login
const loginController = async (req, res) => {
  try {
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
  } catch (error) {
    console.log("Error", error);
  }
};

// GetUser
const getUserController = async (req, res, next) => {
  res.send("Hi");
};

export { registerController, loginController, getUserController };
