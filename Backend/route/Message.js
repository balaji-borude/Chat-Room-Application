/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

// call the controler 
const {sendMessage,getMessageFormRoom} = require("../controller/SendMessage");

// call the Middleware
const{auth} = require("../middleware/auth")

// create Route
router.post("/sendmessage/:roomId", auth,sendMessage);
router.get("/messages/:roomId", auth, getMessageFormRoom);


module.exports = router