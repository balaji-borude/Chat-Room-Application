import { Schema, model } from "mongoose";

const roomSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId, // which stores the Object id of User , who created this room
        ref:"User",
        required:true
    },
    // This is an Array of those User who were Present in Room 
    participants:[{
        type:Schema.Types.ObjectId, // which store object id of all user present in room
        ref:"User"
    }],
    createdAt:{
        type:Date(),
        default:Date.now() // on which time and which date this rooom is created 
    }
});

export default model("Rooms",roomSchema)