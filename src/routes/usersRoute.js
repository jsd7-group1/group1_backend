import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send("Hi");
});
router.post("/login", async (req, res) => {
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
});

router.post("/register", async (req, res) => {
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
});

export default router;
