/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

// call the controler ==> getResetmessage are Pendiong ???
const {sendMessage,getMessageFormRoom} = require("../controller/SendMessage");

// call the Middleware
const{auth} = require("../middleware/auth")

// create Route
router.post("/sendmessage/:roomId", auth,sendMessage);
router.get("/messages/:roomId", auth, getMessageFormRoom);

// Get recent messages with pagination
// router.get("/:roomId/recent", auth, getRecentMessages);

module.exports = router