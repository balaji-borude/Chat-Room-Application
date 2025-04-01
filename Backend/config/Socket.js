/* eslint-disable no-undef */
const { Server } = require("socket.io");
//This imports the Server class from socket.io.
//We use it to create a WebSocket server that listens for real-time connections.

let io; //This variable will store our Socket.IO server instance so that we can use it later

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins (or specify your frontend URL)
            methods: ["GET", "POST"]
        }
    });

    console.log("Socket.io initialized");
    //Whenever a new user connects to the WebSocket, this function runs.
    //socket.id is a unique ID assigned to every connected client.
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        // Listen for "joinRoom" event
        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        });

        // Listen for new messages
        socket.on("sendMessage", (data) => {
            // this will extract roomId,message,and UserId from receiving Data / message
            const { roomId, message, userId } = data;

            console.log(`New message in room ${roomId}:, message`);

            // Broadcast message to other users in the room
            io.to(roomId).emit("receiveMessage", { message, userId });
        });

        // Handle user disconnect
        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
        });
    });

    return io;
};

//Sometimes, we need to access io in other files (e.g., controllers).

//This function ensures that Socket.IO is initialized before using it.

const getIo = () => {
    if (!io) {
        throw new Error("Socket.io has not been initialized!");
    }
    return io;
};

module.exports = { initializeSocket, getIo };