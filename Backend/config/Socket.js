/* eslint-disable no-undef */
const { Server } = require("socket.io");

// Map to store active users in each room
const activeRooms = new Map(); // roomId -> Set of userIds

let io; // Global Socket.IO instance

/**
 * Initialize Socket.IO server
 * @param {Object} server - HTTP server instance
 * @returns {Object} - Socket.IO instance
 */
const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Allow connections from any origin
            methods: ["GET", "POST", "OPTIONS"],
            credentials: true
        },
        pingTimeout: 60000, // Increase timeout for connection stability
        transports: ['websocket', 'polling'] // Enable all transport methods
    });

    console.log("✅ Socket.io initialized successfully");

    // Handle connection errors
    io.engine.on("connection_error", (err) => {
        console.error(`🔥 Connection error: ${err.code} - ${err.message}`);
    });

    // Handle client connections
    io.on("connection", (socket) => {
        console.log(`🔗 New user connected: ${socket.id}`);
        
        // Send immediate confirmation to client
        socket.emit("connectionConfirmed", { socketId: socket.id, message: "Connected to chat server" });
        
        // Store user data
        let currentRooms = [];
        let currentUserId = null;

        // Handle user joining a room
        socket.on("joinRoom", (data) => {
            try {
                console.log("📥 Received joinRoom event:", data);
                
                const { roomId, userId, username = userId } = data;
            
                // Validate required fields
                if (!roomId || !userId) {
                    socket.emit("error", { 
                        message: "Failed to join room: Missing roomId or userId",
                        type: "JOIN_ERROR"
                    });
                    console.warn("⚠️ joinRoom Error: Missing roomId or userId");
                    return;
                }
                
                // Store user information
                currentUserId = userId;
                if (!currentRooms.includes(roomId)) {
                    currentRooms.push(roomId);
                }
                
                // Join the socket.io room
                socket.join(roomId);
                
                // Track active users in room
                if (!activeRooms.has(roomId)) {
                    activeRooms.set(roomId, new Set());
                }
                activeRooms.get(roomId).add(userId);
                
                console.log(`👤 User ${userId} joined room ${roomId}`);
                
                // Get list of users in room
                const usersInRoom = Array.from(activeRooms.get(roomId));
                
                // Notify everyone in the room about the new user
                io.to(roomId).emit("userJoined", { 
                    userId, 
                    username,
                    message: `${username} joined the room.`,
                    timestamp: Date.now(),
                    usersInRoom: usersInRoom
                });
                
                // Send room info back to the user who joined
                socket.emit("roomJoined", {
                    roomId,
                    usersInRoom,
                    message: `Successfully joined room ${roomId}`
                });
            } catch (error) {
                console.error("🔥 Error in joinRoom handler:", error);
                socket.emit("error", { message: "Failed to join room due to server error" });
            }
        });
        
        // Handle sending messages
        socket.on("sendMessage", (data) => {
            try {
                const { roomId, message, userId, username = userId } = data;
                
                // Validate required fields
                if (!roomId || !message || !userId) {
                    socket.emit("error", { 
                        message: "Failed to send message: Missing required data",
                        type: "MESSAGE_ERROR"
                    });
                    console.warn("⚠️ sendMessage Error: Missing required data");
                    return;
                }
                
                // Create message object with metadata
                const messageObj = {
                    id: generateMessageId(),
                    message,
                    userId,
                    username,
                    timestamp: Date.now()
                };
                
                console.log(`💬 Message from ${userId} in room ${roomId}: ${message}`);
                
                // Confirm message receipt to sender
                socket.emit("messageSent", {
                    success: true,
                    messageId: messageObj.id
                });
                
                // Broadcast message to all users in the room (including sender)
                io.to(roomId).emit("receiveMessage", messageObj);
            } catch (error) {
                console.error("🔥 Error in sendMessage handler:", error);
                socket.emit("error", { message: "Failed to send message due to server error" });
            }
        });
        
        // Handle user leaving a room
        socket.on("leaveRoom", ({ roomId, userId }) => {
            try {
                if (!roomId || !userId) {
                    socket.emit("error", { message: "Cannot leave room: Missing roomId or userId" });
                    return;
                }
                
                handleUserLeaveRoom(socket, roomId, userId);
                
                // Confirm to the user they left the room
                socket.emit("roomLeft", { 
                    roomId, 
                    message: `You have left room ${roomId}` 
                });
            } catch (error) {
                console.error("🔥 Error in leaveRoom handler:", error);
                socket.emit("error", { message: "Failed to leave room due to server error" });
            }
        });
        
        // Handle user activity status (typing, etc.)
        socket.on("userActivity", ({ roomId, userId, activity }) => {
            if (!roomId || !userId || !activity) return;
            
            // Broadcast activity to other users in room
            socket.to(roomId).emit("userActivityUpdate", {
                userId,
                activity,
                timestamp: Date.now()
            });
        });
        
        // Handle user disconnect
        socket.on("disconnect", () => {
            console.log(`❌ User disconnected: ${socket.id}`);
            
            // Clean up all rooms this user was in
            if (currentUserId) {
                currentRooms.forEach(roomId => {
                    handleUserLeaveRoom(socket, roomId, currentUserId);
                });
            }
        });
        
        // Handle errors
        socket.on("error", (error) => {
            console.error(`🔥 Socket error for ${socket.id}:`, error);
            socket.emit("error", { message: "An error occurred on the server" });
        });
    });

    return io;
};

/**
 * Handle user leaving a room
 * @param {Object} socket - Socket instance
 * @param {String} roomId - Room ID
 * @param {String} userId - User ID
 */
function handleUserLeaveRoom(socket, roomId, userId) {
    // Remove user from room
    socket.leave(roomId);
    
    // Remove from our tracking map
    if (activeRooms.has(roomId)) {
        activeRooms.get(roomId).delete(userId);
        
        // If room is empty, remove it
        if (activeRooms.get(roomId).size === 0) {
            activeRooms.delete(roomId);
            console.log(`🚪 Room ${roomId} is now empty and removed`);
        } else {
            // Notify others that user left
            const usersInRoom = Array.from(activeRooms.get(roomId));
            socket.to(roomId).emit("userLeft", {
                userId,
                message: `User ${userId} left the room.`,
                timestamp: Date.now(),
                usersInRoom: usersInRoom
            });
        }
    }
    
    console.log(`👋 User ${userId} left room ${roomId}`);
}

/**
 * Generate a unique message ID
 * @returns {String} - Unique message ID
 */
function generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get the Socket.IO instance
 * @returns {Object} - Socket.IO instance
 */
const getIo = () => {
    if (!io) {
        throw new Error("❌ Socket.io is not initialized!");
    }
    return io;
};

/**
 * Get active users in a room
 * @param {String} roomId - Room ID
 * @returns {Array} - Array of user IDs
 */
const getUsersInRoom = (roomId) => {
    if (!activeRooms.has(roomId)) {
        return [];
    }
    return Array.from(activeRooms.get(roomId));
};

/**
 * Send a system message to a room
 * @param {String} roomId - Room ID
 * @param {String} message - Message text
 */
const sendSystemMessage = (roomId, message) => {
    if (!io) {
        throw new Error("❌ Socket.io is not initialized!");
    }
    
    io.to(roomId).emit("receiveMessage", {
        id: generateMessageId(),
        message,
        userId: "system",
        username: "System",
        isSystem: true,
        timestamp: Date.now()
    });
};

module.exports = { 
    initializeSocket, 
    getIo, 
    getUsersInRoom,
    sendSystemMessage
};