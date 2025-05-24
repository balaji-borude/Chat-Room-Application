import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import{setToken} from '../Redux/Slices/authSlice'
import {setUser} from '../Redux/Slices/profileSlice'
import NewChatModal from '../components/NewChatModal';

const Home = () => {

  // if there is  message present in input box then only show arrow button otherwise show 'send' button

  const [msgPresent,setMsgPresent] = useState(false)


  const { user } = useSelector((state) => state.profile)
  const [showLogout, setShowLogout] = useState(false);

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

  return (
    // main div
    <div>

      <div className="flex h-screen bg-gray-100">

        {/* Sidebar  main section */}
        <section className="w-72  bg-white border-r flex flex-col">

          {/* dp and username div */}
          <div className="p-4 h-16 border-b flex items-center space-x-4">
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
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* create a button for create new Chatroom  */}
            {/* Create buttons for chatroom actions */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 p-4  rounded-2xl ">

                <button className="w-full sm:w-auto px-6 py-2 bg-white font-semibold rounded-xl hover:bg-indigo-100 transition-all duration-300 shadow-md hover:cursor-pointer"
                onClick={<NewChatModal/>}
                >
                  New Chatroom
                </button>

                <button className="w-full sm:w-auto px-6 py-2 bg-white font-semibold rounded-xl hover:bg-indigo-100 transition-all duration-300 shadow-md hover:cursor-pointer">
                  Join Chatroom
                </button>

            </div>



          </div>
        </section>


        {/* $$$$$$$$$$   Chat Window section  $$$$$$$$$$$$ */}

        <section className="flex flex-col flex-1">
          {/* Header */}
          <div className="h-16 p-4 border-b flex items-center justify-between bg-white">
            <h2 className="text-xl font-semibold">Contact Name</h2>
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
          <form className="p-4 border-t bg-white flex space-x-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />


            {/* send button  */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              <span> {msgPresent? 'Send' : <IoSend />}</span>

            </button>

          </form>

        </section>
        
      </div>

    </div>
  )
}

export default Home