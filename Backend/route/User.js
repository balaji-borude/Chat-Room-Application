const express = require("express");

const router = express.Router();

console.log("entering in Route ")
// import the controller
const {signUp,login} = require("../controller/Auth");

// route add keli 
router.post("/signup",signUp);
router.post("/login",login);
// console.log("entering in Route ")

module.exports = router;