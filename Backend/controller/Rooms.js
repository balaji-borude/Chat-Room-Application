/* eslint-disable no-undef */
// import room modal;
const Room = require("../model/Rooms").default;

const Message = require("../model/Message").default; 


//Fetch available chatrooms.
exports.allChatRoom = async(req,res)=>{
    try {
        // fetch all room present in DB 
        const response = await Room.find().populate("createdAt", "createdBy");
        console.log("Getting all available Chatroom ",response);

        // success res
        res.status(200).json({
            success:true,
            message:"All Rooms are Fetched Succesfully",
            response
        });

    } catch (error) {
        console.log(error);  
        res.status(500).json({
            success:false,
            message:"Issue Occured in Fetching all available rooms "
        })
    
    }
};

//Create a new chatroom.
exports.createChatroom=async(req,res)=>{
    try {
        // create chatroom 
        const{name} = req.body;
        if(!name){
            res.status(401).json({
                success:false,
                message:"All field is requierd ! Name of room is missng "
            });
            
        }
        // get userId from auth middleware 
        const id = req.user.id;    // we dont need to destructure here , when we do destructure when id is already an object
    //###########################################################################################################################################################################################################   IMP ###################################

        const newRoom = new Room({
            name,
            createdBy: id, // Store the creator's ID
            participants: [id] // Auto-join the creator
        });

        //is an object created from the Room model using Mongoose (MongoDB ORM).
        //new Room({...}) → This creates a new Mongoose document (an object) based on the Room schema.
        // ✅ Mongoose does not have a built-in "Room" model, but you can create one yourself.
        // ✅ The Room schema stores chatroom details, the creator, and participants.
        // ✅ You must define a custom Mongoose schema and use it in your API.

        await newRoom.save(); // make entry of newroom in Mongo DB 

        return res.status(201).json({ 
            success: true,
            message: "Chatroom created Succesfully ",
            room: newRoom
        });


    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error occured in Creating New ChatRoom",
            error:error
        })
    }
};

//Add a user to a chatroom
exports.joinChatRoom = async(req,res)=>{
    try{
        
        //POST /api/rooms/:roomId/join: Add a user to a chatroom.
        //The :roomId part is a route parameter. It allows the client to pass a specific roomId in the URL when calling the API.
        const {roomId} = req.params; //
        // get user id 
        const userId = req.user.id;

        // validation 
             //1. Find the room 
        const room = await Room.findById(roomId);
        if(!room){
            res.status(404).json({
                success:false,
                message:"Chat Room is Not Found "
            })
        };
        //2. check user is already present in the participant array or not 
        if(room.participants.includes(userId)){
            res.status(400).json({
                success:false,
                message:"user is Already Present in This Chatroom "
            })
        };

        // if user is not present then add user to Participant array 
        room.participants.push(userId);
        await room.save(); // save in DB 

        // success response 
        res.status(200).json({
            success:true,
            message:"User Added to chatroom ",
            room
        })

        
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured while Adding User In ChatRoom ",
            error:error
        })
    }
};

//Fetch messages for a specific chatroom.
exports.getMessageForRoom= async(req,res)=>{
    try {
        //room id lagel 
        const {roomId} = req.params;

        if(!roomId){
            res.status(403).json({
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
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:`Error occured while Fetching all messages from given roomId `,
            error:error
        })
    }
}