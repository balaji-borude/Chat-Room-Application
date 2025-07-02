// hooks/useSocket.js

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const SOCKET_URL ='http://localhost:4000';

export const useSocket = (user) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState(null);
    
    const reconnectTimeoutRef = useRef(null);
    const reconnectAttemptsRef = useRef(0);
    const maxReconnectAttempts = 5;

    useEffect(() => {
        if (!user) {
            // Disconnect socket if user is not available
            if (socket) {
                socket.disconnect();
                setSocket(null);
                setIsConnected(false);
            }
            return;
        }

        // Create socket connection
        const newSocket = io(SOCKET_URL, {
            withCredentials: true,
            transports: ['websocket', 'polling'], // Fallback to polling if websocket fails
            timeout: 20000,
            forceNew: true,
        });

        // Connection event handlers
        newSocket.on('connect', () => {
            console.log('✅ Socket connected:', newSocket.id);
            setIsConnected(true);
            setConnectionError(null);
            reconnectAttemptsRef.current = 0;
        });

        newSocket.on('disconnect', (reason) => {
            console.log('❌ Socket disconnected:', reason);
            setIsConnected(false);
            
            // Handle different disconnect reasons
            if (reason === 'io server disconnect') {
                // Server disconnected, try to reconnect manually
                handleReconnect(newSocket);
            }
        });

        newSocket.on('connect_error', (error) => {
            console.error('❌ Socket connection error:', error);
            setConnectionError(error.message);
            setIsConnected(false);
            handleReconnect(newSocket);
        });

        newSocket.on('reconnect', (attemptNumber) => {
            console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
            setIsConnected(true);
            setConnectionError(null);
        });

        newSocket.on('reconnect_error', (error) => {
            console.error('❌ Socket reconnection error:', error);
            setConnectionError(error.message);
        });

        newSocket.on('reconnect_failed', () => {
            console.error('❌ Socket reconnection failed');
            setConnectionError('Failed to reconnect to server');
        });

        setSocket(newSocket);

        // Cleanup function
        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            
            if (newSocket) {
                newSocket.removeAllListeners();
                newSocket.disconnect();
            }
        };
    }, [user]);

    const handleReconnect = (socketInstance) => {
        if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
            console.error('❌ Max reconnection attempts reached');
            setConnectionError('Connection failed. Please refresh the page.');
            return;
        }

        reconnectAttemptsRef.current += 1;
        const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000); // Exponential backoff

        reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`🔄 Attempting to reconnect... (${reconnectAttemptsRef.current}/${maxReconnectAttempts})`);
            socketInstance.connect();
        }, delay);
    };

    // Socket helper functions
    const joinRoom = (roomId) => {
        if (socket && isConnected) {
            socket.emit('joinRoom', roomId);
        }
    };

    const leaveRoom = (roomId) => {
        if (socket && isConnected) {
            socket.emit('leaveRoom', roomId);
        }
    };

    const sendMessage = (messageData) => {
        if (socket && isConnected) {
            socket.emit('newMessage', messageData);
            return true;
        }
        return false;
    };

    const sendTyping = (typingData) => {
        if (socket && isConnected) {
            socket.emit('typing', typingData);
        }
    };

    const manualReconnect = () => {
        if (socket) {
            reconnectAttemptsRef.current = 0;
            socket.connect();
        }
    };

    return {
        socket,
        isConnected,
        connectionError,
        joinRoom,
        leaveRoom,
        sendMessage,
        sendTyping,
        manualReconnect,
    };
};