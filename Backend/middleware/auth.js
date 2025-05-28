/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Auth middleware
exports.auth = async (req, res, next) => {
  try {
    console.log("##### Entering Auth Middleware");

    // Safely extract Authorization header
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No or invalid token format",
      });
    }

    // Extract and clean the token
    let rawToken = authHeader.replace("Bearer ", "").trim();

    // Remove wrapping quotes if any
    const token = rawToken.replace(/^"|"$/g, "");
    console.log("Token in middleware ==>", token);

    // Sanity check for empty token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token is empty after formatting",
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    console.log("Printing JWT_SECRET ==> ", JWT_SECRET);

    // Token verification
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token -->", decoded);

    // Attach user to request
    req.user = decoded;

    // Proceed to next middleware or controller
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(401).json({
      success: false,
      message: "Token verification failed",
      error: error.message || error,
    });
  }
};
