const BASE_URL = import.meta.env.VITE_BASE_URL; // this is how import base URL from VITE Project .env file 

export const endpoints = {
    LOGIN_API:"http://localhost:4000/api/v1/login",
    SIGNUP_API:"http://localhost:4000/api/v1/signup",
    CREATEROOM_API:"http://localhost:4000/api/v1/rooms/createroom",
    JOINCHATROOM_API:"http://localhost:4000/api/v1/rooms/joinchatroom/:roomId"
};


// create chatroom api 
