import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    //user: null, 
    loading:false,

    error: null,  // when there is error in user login and signup

    // // jr token localstorage madhe bhetle tr te use kr nahi 
    //token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
   // token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  token: localStorage.getItem("token") || null,
    // localStorage.setItem("user", JSON.stringify(response.data.user));
//      token: localStorage.getItem("token") || null,
 user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
 };

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,

    // nothing but functios--> i have to make the reducer funtion below 
    reducers:{
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setToken(state,value){
            state.token = value.payload;
        },

   
    
    }
});

export const { setLoading,setToken,} = authSlice.actions;
export default authSlice.reducer;