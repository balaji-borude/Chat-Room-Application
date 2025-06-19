import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import profileReducer from'./Slices/profileSlice';
import chatRoomReducer from './Slices/chatRoomSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    profile:profileReducer,
    chatRoom: chatRoomReducer,
  },
})