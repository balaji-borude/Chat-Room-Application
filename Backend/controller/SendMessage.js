/* eslint-disable no-undef */

const Message = require("../model/Message"); // Message model is in Used 

const Room = require("../model/Rooms");

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
            timeStamp:new Date()
        }); 

        await newMessage.save();

                // OR else -->  i can do Create Method -->  like below 
            // const newMessage = await Message.create({
            //     userID: userId,
            //     roomId,
            //     content,
            //     timeStamp: new Date()
            // });
                      
      

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

//Fetch messages for a specific chatroom.
exports.getMessageFormRoom= async(req,res)=>{
    try {
        //room id lagel 
        const {roomId} = req.params;

        if(!roomId){
            return res.status(403).json({
                success:false,
                message:"Room Id is not present is Required "
            })
        };

        // fetche message for given room 
        const messages = await Message.find({roomId}).sort({timeStamp:1});
        // succes resp
        res.status(200).json({
            success:true,
            message:`all Messages of${roomId} is succesfully Fetched`,
            messages
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:`Error occured while Fetching all messages from given roomId `,
            error:error
        })
    }
}