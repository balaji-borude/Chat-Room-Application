import {createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    user: null, 
    loading:false,
    isAuthenticated: false, // this is for Private route

    error: null,  // when there is error in user login and signup

    // // jr token localstorage madhe bhetle tr te use kr nahi 
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,

    // nothing but functios--> i have to make the reducer funtion below 
    reducers:{
        loginStart:(state)=>{
            state.loading= true;
            state.error= null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            toast.success("Login Successful");
        },
        loginFailure(state,action){
            state.isAuthenticated=false;
            state.loading=false;
            state.error=action.payload;
            toast.dismiss("Login Failed");
        },
        
        signup:()=>{
            toast.success("SignUP Succesfully")
        },
        logout:()=>{

        }
    }
});

export const {  login,signup,logout } = authSlice.actions;
export default authSlice.reducer;