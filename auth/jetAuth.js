const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    if (!process.env.Jwt_key) {
        throw new Error("JWT secret not set ");
    }

    try {
        const secret = process.env.Jwt_key ;
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = auth;
