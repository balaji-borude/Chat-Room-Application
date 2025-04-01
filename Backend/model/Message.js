import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true  // If messages must belong to a room
    },
    content: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

export default model("Message", messageSchema);
