import { toast } from "react-toastify"

import {setLoading,setToken} from '../../Redux/Slices/authSlice'
import { endpoints } from "../ApiEndPoints"  ; //  endPoints  la import kele ahe 
import{apiConnector} from '../ApiConnector';


// import Endpoints of auth controller 
const{
    LOGIN_API,
    SIGNUP_API
} = endpoints



// login api call 
export const login =(formData,navigate)=>{
    return async(dispatch)=>{
        console.log("entering in the login function ")
        const {email,password}= formData;

      //By default, toast.loading() creates a persistent loader — it doesn’t auto-dismiss --> we have to manually dissmiss it 

        // Show loading toast and store its ID
        const toastId = toast.loading("Logging in...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password
            });
            console.log("Login Api Response --> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            };

          
            dispatch(setToken(response.data.token));
            // isAuthenticated(true); // it is not a function 

            // set token to localStorage 
            localStorage.setItem("token", JSON.stringify(response.data.token));

            toast.dismiss(toastId)
            dispatch(setLoading(false)); 
            navigate("/home")
            toast.success("Login succesfully")

        } catch (error) {
            console.log("LOGIN API ERROR............", error);
            toast.error("Login Failed")
        }

        // what ever happen in uppe code lastly closed the loading toast 
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        
    }
};

//signup api calll 
export const signUp=(formData,navigate)=>{

    return async(dispatch)=>{
        const{firstName,lastName,email,password,confirmPassword} = formData;

        const toastId = toast.loading("loading....")
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST",SIGNUP_API,{
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            });
            console.log("signUp API response -->  ", response);
            
            navigate("/"); // navigate to login page 
            toast.success("User created Succesfuly ");

        } catch (error) {
            console.log("Signup API Error--->", error);
            toast.error("Signup Failed")
        };

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}
