/* eslint-disable no-undef */

// Import Socket.IO Server
const { Server } = require("socket.io");

// Optional: Importing Message model if you want to save messages to DB in the future
const Message = require("../model/Message");

let io; // Global variable to hold socket server instance


function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Frontend origin
      credentials: true,               // Allow cookies, sessions, etc.
    },
  });

  // Listen for new socket connections
  io.on("connection", (socket) => {
    console.log("✅ New client connected:", socket.id);

    // Join a specific chat room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(` User ${socket.id} joined room: ${roomId}`);
    });

    // Listen for a new message and broadcast to others in the same room
    socket.on("newMessage", (data) => {
      const { roomId, message } = data;
      console.log("📨 Message received:", message);

      // Broadcast message to all clients in the room (including sender if needed)
      io.to(roomId).emit("messageReceived", data);

      // Optional: Save the message to the database here using the `Message` model
    });

    // Handle client disconnect
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}

/**
 * Returns the initialized socket.io instance.
 * Throws an error if accessed before initialization.
 */
function getIo() {
  if (!io) throw new Error("❌ socket.io is not initialized");
  return io;
}

// Export functions for use in other parts of your app
module.exports = {
  initSocket,
  getIo,
};
