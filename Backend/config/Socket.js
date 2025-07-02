/* eslint-disable no-undef */

// Import Socket.IO Server
const { Server } = require("socket.io");

// Import Message model for saving messages to DB
const Message = require("../model/Message");

let io; // Global variable to hold socket server instance

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Frontend origin
      credentials: true,               // Allow cookies, sessions, etc.
      methods: ["GET", "POST"]         // Allowed HTTP methods
    },
  });

  // Listen for new socket connections
  io.on("connection", (socket) => {
    console.log("✅ New client connected:", socket.id);

    // Join a specific chat room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`👥 User ${socket.id} joined room: ${roomId}`);
      
      // Notify others in the room that someone joined
      socket.to(roomId).emit("userJoined", {
        message: `User ${socket.id} joined the room`,
        roomId: roomId
      });
    });

    // Listen for a new message and broadcast to others in the same room
    socket.on("newMessage", async (data) => {
      try {
        const { roomId, content, userId } = data;
        console.log("📨 Message received:", { roomId, content, userId });

        // Validate data
        if (!roomId || !content || !userId) {
          socket.emit("error", { message: "Missing required fields" });
          return;
        }

        // Save message to database
        const newMessage = new Message({
          userID: userId,
          roomId: roomId,
          content: content,
          timeStamp: new Date()
        });

        const savedMessage = await newMessage.save();
        
        // Populate user info if you have user reference
        // await savedMessage.populate('userID', 'name email');

        // Broadcast message to all clients in the room (including sender)
        io.to(roomId).emit("messageReceived", {
          _id: savedMessage._id,
          userID: savedMessage.userID,
          roomId: savedMessage.roomId,
          content: savedMessage.content,
          timeStamp: savedMessage.timeStamp
        });

        console.log("✅ Message saved and broadcasted successfully");

      } catch (error) {
        console.error("❌ Error handling message:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    // Handle leaving a room
    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`👋 User ${socket.id} left room: ${roomId}`);
      
      // Notify others in the room
      socket.to(roomId).emit("userLeft", {
        message: `User ${socket.id} left the room`,
        roomId: roomId
      });
    });

    // Handle typing indicators
    socket.on("typing", (data) => {
      const { roomId, isTyping, userId } = data;
      socket.to(roomId).emit("userTyping", {
        userId: userId,
        isTyping: isTyping
      });
    });

    // Handle client disconnect
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  console.log("🚀 Socket.IO server initialized successfully");
}

/**
 * Returns the initialized socket.io instance.
 * Throws an error if accessed before initialization.
 */
function getIo() {
  if (!io) {
    throw new Error("❌ Socket.io is not initialized. Call initSocket first.");
  }
  return io;
}

// Export functions for use in other parts of your app
module.exports = {
  initSocket,
  getIo,
};