/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

// import middleware
const {auth} = require("../middleware/auth");
// import controoler of room
const {createChatroom,joinChatRoom,allChatRoom} = require("../controller/Rooms");


// add the Route for Rooms 
router.post("/createroom",auth ,createChatroom);
router.post("/joinchatroom/:roomId", auth, joinChatRoom);
router.get("/allchatroom",allChatRoom);



// export
module.exports = router