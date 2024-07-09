import NotFoundError from "../error/NotFoundError.js";
import User from "../../models/user.model.js";
import { hashPassword } from "../utils/hash.js";
import { sign } from "../utils/token.js";
import BadRequestError from "../error/BadRequestError.js";
import { comparePassword } from "../utils/hash.js";

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
    if (!email) throw new BadRequestError("Email is required!!!");
    if (!email.includes("@")) throw new BadRequestError("Invalid email");
    if (!fullName) throw new BadRequestError("fullName is required");
    if (!password || !confirmPassword)
      throw new BadRequestError("password or confirmPassword is required");
    if (password !== confirmPassword)
      throw new BadRequestError("confirmPassword Not Match");
    if (!imageUrl) throw new BadRequestError("ImageUrl is required");
    if (!companyID) throw new BadRequestError("CompanyID is requred");
    if (!status) throw new BadRequestError("Status is required");
    if (!userType) throw new BadRequestError("UserType is required");
    if (!createdByUserID)
      throw new BadRequestError("createdByUserID is required");

    // 2.เช็ค user ซ้ำ (Mongoose)
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      return res.status(400).json({ message: "email already in use" });
    }

    // 3.Hashed
    const hashedPassword = await hashPassword(password);

    // 4.สร้าง User
    // isActive = true  หมายถึง เปิดใช้งานไปแล้ว (Q : สมัครแล้วถือว่าเปิดใช้งาน ?)
    // isActive = false หมายถึง account ถูก deactivate (ต้องสมัครใหม่)

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
    next(error);
  }
};

// Login
const loginController = async (req, res, next) => {
  // ถ้า isActive = false จะไม่ให้ login
  try {
    console.log(req.body.email);
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "email is required" });
    if (!email.includes("@"))
      return res.status(400).json({ message: "invalid email" });
    if (!password)
      return res.status(400).json({ message: "password is required" });

    const user = await User.findOne({ email: email });
    if (!user) throw new BadRequestError("Invalid credentials");

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new BadRequestError("Invalid credentials");

    const accessToken = sign({ id: user._id, email: user.email });

    // res.send('login Success')
    res.json({
      message: "login success",
      data: req.body,
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// GetUser
const getUserController = async (req, res, next) => {
  res.json({
    message: "get me",
    data: req.user,
  });
};

export { registerController, loginController, getUserController };
