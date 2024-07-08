import jwt from "jsonwebtoken";

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

export { sign, verify };