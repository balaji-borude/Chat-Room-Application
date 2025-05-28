import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import {createChatRoom} from '../services/operations/chatRoomApi';

const NewChatModal = ({ placeholder,btntext,heading,onClose }) => {
  
  const [inputValue,setInputValue ] = useState("");

  // dispatch hook instance 
  const dispatch = useDispatch();

  // function handling 
  const createRoomHandler=()=>{
    // console.log("function of create room is called ");
    // yethe title  he ===> useStae ahe tyala aplyala extract karave lagel jevha frontend la call katrave lagel tevha \

    console.log("Printing title ,", inputValue);
    dispatch(createChatRoom(inputValue))
  };

  return (
    <div>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-500 opacity-85 z-40" onClick={onClose} />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

          {/* Close Icon */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:cursor-pointer transition-colors"
          >
            <IoClose size={30} />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {heading}
          </h2>

          {/* Input Field */}
          <input
            type="text"
            placeholder={placeholder}
            name='title'
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
          />

          {/* Create Button */}
          <button
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all"
            onClick={()=>createRoomHandler()}
          >
            {btntext}
          </button>

        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
