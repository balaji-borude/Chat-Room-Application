/* eslint-disable no-undef */
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    // Confusion ==> senderId and Recivers ID can i make this or not ???????
    
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

module.exports = mongoose.model("Message", messageSchema);
