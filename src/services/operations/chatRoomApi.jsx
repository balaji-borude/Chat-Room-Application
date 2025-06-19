import { setLoading } from "../../Redux/Slices/authSlice";
import { toast } from "react-toastify";
import { apiConnector } from "../ApiConnector";
import { endpoints } from "../ApiEndPoints";

import { setChatRooms } from "../../Redux/Slices/chatRoomSlice";

// importing the endpoints here 
const { 
  CREATEROOM_API,
  JOINCHATROOM_API ,
  FETCHROOM_API
} = endpoints;

// create chat room 
export const createChatRoom = (roomTitle) => {
  return async (dispatch) => {
    console.log("Inside createChatRoom action");
    console.log("Room Title:", roomTitle);

    dispatch(setLoading(true));

    try {
      const token = localStorage.getItem("token");
      //console.log("printing token from createchat Room api----> ", token);

      // Check if token exists
      if (!token) {
        throw new Error("No token found");
      }

      const response = await apiConnector(
        "POST",
        CREATEROOM_API,
        { name: roomTitle },
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );

      console.log("Room creation successful!", response);
      dispatch(setLoading(false));
      toast.success("Chat Room Created Successfully");
    } catch (error) {
      console.log("CREATE CHAT ROOM API ERROR............", error);
      dispatch(setLoading(false));
      toast.error("Failed to Create Chat Room");
    }
  };
};


// join existing chatroom 
export const joinChatRoom = (roomId)=>{

  return async(dispatch)=>{

    ///console.log("entering in Join chat room  funcion ");

    dispatch(setLoading(true));

    // actual api call \
    try {
      const token = localStorage.getItem("token");
      //console.log("printing token from JOIN chatroom api----> ", token);

      // no body needed to join chatroom that why used null 
      const response = await apiConnector("POST",  JOINCHATROOM_API(roomId),{}, {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
      });

      console.log("Printing response of Join chatroom ", response);
      dispatch(setLoading(false));
      toast.success("Chat Room joined Successfully");

    } catch (error) {
      console.log("JOIN CHAT ROOM API ERROR............", error);
      dispatch(setLoading(false));
      toast.error("Failed to Joined Chat Room");
    }

  }
}

// show all the chatroom user has  Joined  --> In UI these all chatroom name is shown in left side of UI --> those chatroom user is joined 

export const fetchAllChatRoom = ()=>{
  return async(dispatch)=>{

      dispatch(setLoading(true));

      try {
        //make the api request to fetach all chatroom 
        const response = await apiConnector("GET",FETCHROOM_API);
        console.log("Printing response of Fetching all chatroom", response);

        // setChatroom reducer madhe all chatroom cha Array store kela ahe 
        dispatch(setChatRooms(response?.data?.response || []));

        dispatch(setLoading(false));
        toast.success("All Chat Room Fetched Successfully");

      } catch (error) {
        console.log("FETCH CHAT ROOM API ERROR............", error);
        dispatch(setLoading(false));
        toast.error("Failed to fetch all chatroom ");
      }

  }
}