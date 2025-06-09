/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

// import middleware
const {auth} = require("../middleware/auth");
// import controoler of room
const {createChatroom,joinChatRoom,allChatRoom,usersRoom} = require("../controller/Rooms");


// add the Route for Rooms 
router.post("/createroom",auth ,createChatroom);
router.post("/joinchatroom/:roomId", auth, joinChatRoom);
router.get("/allchatroom",allChatRoom);
router.get("/usersRoom",auth ,usersRoom); // get userid



// export
module.exports = router