import { toast } from "react-toastify"

import {loading} from '../../Redux/Slices/authSlice'
import { endpoints } from "../ApiEndPoints"  ; //  endPoints  la import kele ahe 
import{apiConnector} from '../ApiConnector'
// import Endpoints of auth controller 
const{
    LOGIN_API
} = endpoints

// login api call 
export const login =(email,password,navigate)=>{
    return async(dispatch)=>{
        toast.loading("Loading...");
        dispatch(loading(true));

        try {
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password
            });
            console.log("Login Api Response --> ", response);
            navigate("/home");

        } catch (error) {
               console.log("LOGIN API ERROR............", error)
               toast.error("Login Failed")
        }
        
    }
}