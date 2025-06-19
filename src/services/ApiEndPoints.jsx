const BASE_URL = import.meta.env.VITE_BASE_URL; // this is how import base URL from VITE Project .env file 

export const endpoints = {
    LOGIN_API:"http://localhost:4000/api/v1/login",
    SIGNUP_API:"http://localhost:4000/api/v1/signup",
    CREATEROOM_API:"http://localhost:4000/api/v1/rooms/createroom",

    //JOINCHATROOM_API:"http://localhost:4000/api/v1/rooms/joinchatroom/:roomId"
     // ✅ Convert to function --> when ever we have to join new chatroom then we have to pass the Roomm_Id  htat is why here is we convert it into the function 
   JOINCHATROOM_API: (roomId) => `http://localhost:4000/api/v1/rooms/joinchatroom/${roomId}`,

   // FETCH ALL CHATROOM 
   FETCHROOM_API:"http://localhost:4000/api/v1/rooms/allchatroom"
};


// create chatroom api 
