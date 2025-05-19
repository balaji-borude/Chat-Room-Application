import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Retrieve user from localStorage if present
  // this is used for persisitent the sate of user even in user trying or refresehing the WHole UI 
  // it does not change the it state and storeed in it 
  
  user: localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user")) 
    : null,
    
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

// Export actions
export const { setUser, setLoading } = profileSlice.actions;

// Export reducer
export default profileSlice.reducer;
