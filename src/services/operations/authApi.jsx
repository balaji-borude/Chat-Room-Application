import { toast } from "react-toastify"

import {setLoading,setToken} from '../../Redux/Slices/authSlice'
import { endpoints } from "../ApiEndPoints"  ; //  endPoints  la import kele ahe 
import{apiConnector} from '../ApiConnector';
import {setUser} from '../../Redux/Slices/profileSlice';


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

            
            console.log("Priting login user name for Dicebear api ", response.data.user.firstName)
            // dicebear api call here 
            const userImage = response.data?.user?.image
                    ? response.data.user.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;


            // Create updated user object--> yamadhe Image chi navin field add keli ahe 
            const updatedUser = { ...response.data.user, image: userImage };

            // Update Redux store--> redux store la update kele 
            dispatch(setUser(updatedUser));

            // Save to localStorage for persistence --> locaStoreage amdhe img store karun thevli 
            localStorage.setItem("user", JSON.stringify(updatedUser));


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

        //  destruct the field from formData hook 
        const{firstName,lastName,email,password,confirmPassword} = formData;

        // console.log("Signup request payload:", {
        //             firstName,
        //             lastName,
        //             email,
        //             password,
        //             confirmPassword
        // });

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
