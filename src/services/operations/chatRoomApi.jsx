import { setLoading } from '../../Redux/Slices/authSlice';
import { toast } from 'react-toastify';
import { apiConnector } from "../ApiConnector";
import { endpoints } from '../ApiEndPoints';

const { CREATEROOM_API } = endpoints;

export const createChatRoom = (roomTitle) => {
  return async (dispatch) => {
    console.log("Inside createChatRoom action");
    console.log("Room Title:", roomTitle);

    dispatch(setLoading(true));

    try {
      const token = localStorage.getItem("token");
      console.log("printing token from createchat Room api----> ", token );
      
      const response = await apiConnector(
        "POST",
        CREATEROOM_API,
        { name: roomTitle }, 
 {
    headers: {
      Authorization: token
    }
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
