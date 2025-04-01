/* eslint-disable no-undef */

const Message = require("../models/Message");
const Room = require("../models/Room");

exports.sendMessage = async (req, res) => {
    try {
        // get room id 
        const {roomId} = req.params;

        // get message  from body 
        const {content} = req.body ;

        const userId = req.user.id; // Extract user ID from JWT token

        // Validate input
        if (!roomId || !content) {
            return res.status(400).json({
                success: false,
                message: "Room ID and content are required."
            });
        }

        // Check if the room exists
        const roomExists = await Room.findById(roomId);
        if (!roomExists) {
            return res.status(404).json({
                success: false,
                message: "Chatroom not found."
            });
        }

        // Create and save message--> yehte new msg navache object tyar kele tyat kahlil gohti taklya 
        const newMessage = new Message({
            userID: userId,
            roomId,
            content,
            timeStamp: new Date()
        });

        await newMessage.save();

        return res.status(201).json({
            success: true,
            message: "Message sent successfully.",
            newMessage
        });

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({
            success: false,
            message: "Error sending message.",
            error: error.message
        });
    }
};
