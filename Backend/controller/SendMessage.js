/* eslint-disable no-undef */

const Message = require("../model/Message"); // Message model is in Used 

const Room = require("../model/Rooms");
const { getIo } = require("../config/Socket"); 


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

        // Create and save message--> in DB 
        const newMessage = new Message({
            userID: userId,
            roomId,
            content,
            timeStamp:new Date()
        }); 

        const savedMessage = await newMessage.save();

        // messae saved in DB 

                // OR else -->  i can do Create Method -->  like below 
            // const newMessage = await Message.create({
            //     userID: userId,
            //     roomId,
            //     content,
            //     timeStamp: new Date()
            // });
                     
            
            // Emit the message Via Socket.io to all the users in the room 
            try {
                const io = getIo();
                io.to(roomId).emit("messageRecived",{
                    _id:savedMessage._id,
                    userId:savedMessage.userID,
                    roomId:savedMessage.roomId,
                    content:savedMessage.content,
                    timeStamp:savedMessage.timeStamp
                });

                console.log("MessageBroadcast Via Socket.io")

            } catch (SocketError) {
                console.log("Socket.io Broadcast failed",SocketError.message);
            }
      

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


         // Check if room exists
        const roomExists = await Room.findById(roomId);
        if (!roomExists) {
            return res.status(404).json({
                success: false,
                message: "Chatroom not found."
            });
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
};


// Get recent message 
// Get recent messages with pagination
exports.getRecentMessages = async (req, res) => {
    try {
        const { roomId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        if (!roomId) {
            return res.status(400).json({
                success: false,
                message: "Room ID is required"
            });
        }

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Fetch messages with pagination
        const messages = await Message.find({ roomId })
            .sort({ timeStamp: -1 }) // Most recent first
            .skip(skip)
            .limit(limit);

        // Get total count for pagination info
        const totalMessages = await Message.countDocuments({ roomId });

        res.status(200).json({
            success: true,
            data: messages.reverse(), // Reverse to show oldest first in UI
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalMessages / limit),
                totalMessages,
                hasNextPage: page < Math.ceil(totalMessages / limit),
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        console.error("❌ Error fetching recent messages:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching recent messages",
            error: error.message
        });
    }
};