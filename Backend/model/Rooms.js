const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, // which stores the Object id of User , who created this room
        ref:"User",
        required:true
    },
    // This is an Array of those User who were Present in Room 
    participants:[{
        type:mongoose.Schema.Types.ObjectId, // which store object id of all user present in room
        ref:"User"
    }],
    createdAt:{
        type:Date(),
        default:Date.now() // on which time and which date this rooom is created 
    }
});

module.exports = mongoose.model("Rooms",roomSchema)