/* eslint-disable no-undef */
const { Server } = require("socket.io");

let io; // Global Socket.IO instance

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    console.log("✅ Socket.io initialized");

    io.on("connection", (socket) => {
        console.log(`🔗 New user connected: ${socket.id}`);

        // Handle user joining a room
        console.log("Before joinng the Room");

        socket.on("joinRoom", (data) => {
            console.log("📥 Received joinRoom event:", data);
            
            const { roomId, userId } = data;
        
            if (!roomId || !userId) {
                console.log("⚠️ joinRoom Error: Missing roomId or userId");
                return; // Stop execution if data is missing
            }
        
            console.log("after joining the room");
        
            socket.join(roomId);
            console.log(`👤 User ${userId} joined room ${roomId}`);
        
            // Notify other users in the room
            socket.to(roomId).emit("userJoined", { userId, message: `User ${userId} joined the room.` });
        });
        

        // Handle sending messages
        socket.on("sendMessage", ({ roomId, message, userId }) => {
            if (!roomId || !message || !userId) {
                console.log("⚠️ sendMessage Error: Missing data");
                return;
            }

            console.log(`💬 Message from ${userId} in room ${roomId}: ${message}`);

            // Broadcast message to all users in the room **except sender**
            socket.to(roomId).emit("receiveMessage", { message, userId });
        });

        // Handle user disconnect
        socket.on("disconnect", () => {
            console.log(`❌ User disconnected: ${socket.id}`);
        });
    });

    return io;
};

// Function to access the Socket.IO instance anywhere in the project
const getIo = () => {
    if (!io) {
        throw new Error("❌ Socket.io is not initialized!");
    }
    return io;
};

module.exports = { initializeSocket, getIo };
