import { setLoading } from "../../Redux/Slices/authSlice";
import { toast } from "react-toastify";
import { apiConnector } from "../ApiConnector";
import { endpoints } from "../ApiEndPoints";

// importing the endpoints here 
const { 
  CREATEROOM_API,
  JOINCHATROOM_API 
} = endpoints;

export const createChatRoom = (roomTitle) => {
  return async (dispatch) => {
    console.log("Inside createChatRoom action");
    console.log("Room Title:", roomTitle);

    dispatch(setLoading(true));

    try {
      const token = localStorage.getItem("token");
      console.log("printing token from createchat Room api----> ", token);

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

export const joinChatRoom = ()=>{
  return async(dispatch)=>{
    console.log("entering in Join chat room  funcion ");

    dispatch(setLoading(true));

    // actual api call \
    try {
      const token = localStorage.getItem("token");
      console.log("printing token from JOIN chatroom api----> ", token);

      const response = await apiConnector("POST",JOINCHATROOM_API,{}, {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
      });

      console.log("Printing response of Join chatroom ", response);
      dispatch(setLoading(false));
      toast.success("Chat Room joined Successfully");

    } catch (error) {
      console.log("JOIN CHAT ROOM API ERROR............", error);
      dispatch(setLoading(false));
      toast.error("Failed to Create Chat Room");
    }

  }
}
