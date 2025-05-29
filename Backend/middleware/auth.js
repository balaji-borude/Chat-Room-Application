/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        console.log("Entering Auth middleware");

        const token = req.header("Authorization")?.replace("Bearer ", "").trim();
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        console.log("JWT_SECRET:", JWT_SECRET);

        try {
            console.log("enetring in try blcok")
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log("Decoded:", decoded);
            req.user = decoded;

            
            next();
            
        } catch (error) {
            console.error("JWT verification failed:", error.name, error.message);
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
                error: error.message,
            });
        }

        
    } catch (error) {
        console.error("Unexpected error in auth middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
