import jwt from "jsonwebtoken";

<<<<<<< HEAD
const sign = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  } catch (error) {
    console.error("Signing Token Error", error);
    throw new Error("Token creation failed");
  }
};

const verify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Verifying Error", error);
    throw new Error("Token verification failed");
  }
};
=======
const sign = (password) => {
    try {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: "1d"
        });
    } catch (error) {
        console.error("Signing Token Error",error);
        throw new Error("Token creation failed");
    }
};

const verify = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        console.error("Verifying Error", error);
        throw new Error("Token verification failed")
    }
}
>>>>>>> develop

export { sign, verify };
