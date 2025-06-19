import {createSlice} from '@reduxjs/toolkit';

// Initial state
const initialState = {
  chatrooms: [],
  loading: false,
};

// Reducer
const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  
  reducers: {
    setChatRooms: (state, action) => {
      state.chatrooms = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setChatRooms, setLoading } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
