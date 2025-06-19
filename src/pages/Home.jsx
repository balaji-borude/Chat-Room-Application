import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import{setToken} from '../Redux/Slices/authSlice'
import {setUser} from '../Redux/Slices/profileSlice'
import NewModal from '../components/NewModal';
import { createChatRoom,joinChatRoom,fetchAllChatRoom} from '../services/operations/chatRoomApi';




const Home = () => {

  // if there is  message present in input box then only show arrow button otherwise show 'send' button
  // useState 
  //const [msgPresent,setMsgPresent ] = useState(false)


  const { user } = useSelector((state) => state.profile);

  // for chatrroom fetching from state(redux - chatRoom)
  const { chatrooms } = useSelector((state) => state.chatRoom);

  // useState 
  const [showLogout, setShowLogout] = useState(false);

  // create new chatroom states are hear 
  const [showNewRoomModal , setshowNewRoomModal] = useState(false);
  const [showJoinRoomModal,setShowJoinRoomModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch(); // This is how you get access to dispatch

  // logout handler 
  const handleLogout = () => {
      // Clear local storage or tokens
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear Redux state
      dispatch(setUser(null));
      dispatch(setToken(null)); // if you're managing token separately

      // Redirect to login page
      navigate("/login");
  };


  // passing the fucntion to new Modal components as an argument '
  // these function is defined in paranet components and then pass them to  child means newModal components 
  const createRoomHandler = (title) => {
    //console.log("Creating room with title:", title);
    dispatch(createChatRoom(title));
};

  const joinRoomHandler = (roomId) => {
    //console.log("Joining room with ID:", roomId);
    dispatch(joinChatRoom(roomId));
  };

  // fetch all chatroom on every render 
  useEffect(()=>{
    // every render i have to fetch all chatroom 
    dispatch(fetchAllChatRoom())
  },[])
  

  // chatroom window code from here =-->
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);





  return (
    // main div
    <div>

      <div className="flex h-screen bg-gray-100">

        {/* Sidebar  main section */}
        <section className="w-72  bg-white border-r border-gray-200 flex flex-col">

          {/* dp and username div */}
          <div className="p-4 h-16 border-b  border-gray-200  flex items-center space-x-4">
            {/* use dicebear APi to show user firstName and LastName Initials for  */}
            <img
            src={user.image}
            alt={`profile-${user.firstName} `}
              className="w-12 h-12 rounded-full"
            />

              {/* This div is for dynamically changing the userName and its status (online and offline ) */}
            <div>
              <h2 className="font-semibold text-lg"
                 onClick={() => setShowLogout(prev => !prev)}
              >
                {user?.firstName} {user.lastName} 
              </h2>
              <p className="text-sm text-green-500">Online</p>
            </div>

              {/* Conditional Logout Button */}
              {showLogout && (
                <button
                  onClick={handleLogout}
                  className="absolute mt-5 ml-48 bg-red-500 text-white px-3 py-1 rounded shadow-lg z-10"
                >
                  Logout
                </button>
              )}

          </div>

          {/* for searching the UserName and ChatRoom */}
          <div className="p-4">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full px-3 py-2 border border-gray-200 shadow-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* below show the contact llist of user  */}
          <div className="flex-1 overflow-y-auto">
            {/* Contacts list */}

            {/* this is for one contact change according to user Dynamically  */}

            {/* <ul>
              <li className="p-4 hover:bg-gray-200 cursor-pointer flex items-center space-x-3">
                <img src="/contact1.jpg" alt="Contact" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium">Contact Name</p>
                  <p className="text-sm text-gray-500">Last message preview...</p>
                </div>

                <span className="ml-auto bg-blue-500 text-white text-xs px-2 rounded-full">3</span>
              </li>


            </ul> */}

            {/*  BUTTONS  */}
            {/* Create buttons for chatroom actions */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 p-4  rounded-2xl ">

                <button className="w-full sm:w-auto px-6 py-2 bg-white font-semibold rounded-xl hover:bg-indigo-100 transition-all duration-300 shadow-md hover:cursor-pointer"
                onClick={()=>setshowNewRoomModal(true)}
                >
                  New Chatroom
                </button>

                <button className="w-full sm:w-auto px-6 py-2 bg-white font-semibold rounded-xl hover:bg-indigo-100 transition-all duration-300 shadow-md hover:cursor-pointer"
                onClick={()=>setShowJoinRoomModal(true)}
                >
                  Join Chatroom
                </button>

            </div>

            {/* Modal  rendering  are here */}

            {/* if chatmodel is true then show the create new chatroom model. */}
            {/* create New chatroom */}
            {
              showNewRoomModal ? 
              (
                <NewModal  
                  heading={"Create new Chatroom "}
                  placeholder={"Enter your chat Room name...."}
                  btntext={"Create Room"}
                  onClose={()=>setshowNewRoomModal(false)}
                  onSubmit={createRoomHandler}
                />
              ) 

              :"" 
            }


            {/* Join new Chatroom  */}
            {
              showJoinRoomModal ? 
              (
              <NewModal  
                heading={"Join Chatroom"}
                placeholder={"Enter Room Id"}
                btntext={"Join Room"}
                onClose={()=>setShowJoinRoomModal(false)}
                onSubmit={joinRoomHandler}
                />
              )
                :""
            }


            {/* SHOWING ALL ROOM which is created by user and user joined  */}

            <div className='w-full h-full'> 
              {/* what we have to show in this section --> is the only the name of chatroom 
              name is present in  ==> data.response[] */}

                <h2 className=' text-xl font-semibold m-5'>Available Chat Rooms:</h2>
                {
                  chatrooms.length > 0 ? (
                    chatrooms.map((room) => (
                      <div 
                        key={room._id} 
                        onClick={() => setSelectedChatRoom(room)}
                        className='text-white bg-gray-800 rounded p-2 mb-2'
                      >
                        {room.name}
                      </div>
                    ))
                  ) : (
                    <p className='text-white'>No chat rooms available</p>
                  )
                }

            </div>



          </div>
        </section>


        {/* $$$$$$$$$$   Chat Window section  $$$$$$$$$$$$ */}

        <section className="flex flex-col flex-1">
          
          {/* Header */}
          <div className="h-16 p-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <h2 className="text-xl font-semibold">
              {selectedChatRoom ? selectedChatRoom.name : "Select a Chat Room"}
            </h2>
            <div>
              {/* Action icons e.g. call, settings */}
            </div>
          </div>


          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {/* Messages are look like this -----> how should i do this ?????????? */}

            {/* Sender Message div ahe here   */}
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-lg shadow max-w-xs">
                <p> -- Here msg send by sender is Shown and below timestamp of that msg is shown  </p>
                <span className="text-xs text-gray-400">10:30 AM </span>
              </div>
            </div>

            {/* Receivers message  */}
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white p-3 rounded-lg shadow max-w-xs">
                <p>in this area msg send by recevier is shown on both side </p>
                <span className="text-xs text-gray-200">10:31 AM</span>
              </div>
            </div>
          </div>


          {/* Message Input */}
          <form className="p-4 border-t border-gray-200 bg-white flex space-x-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />


            {/* send button  */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              {/* <span> {msgPresent? 'Send' : <IoSend />}</span> */}
                <span> <IoSend /></span>
            </button>

          </form>

        </section>
        
      </div>

    </div>
  )
}

export default Home