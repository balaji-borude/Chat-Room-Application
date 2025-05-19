import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signUp } from '../services/operations/authApi'
import {  useNavigate } from 'react-router-dom';
//import { toast } from 'react-toastify';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    //changeHandler
    function changeHandler(event){
        setFormData(prevData=>({
            ...prevData,
            [event.target.name]:event.target.value
        }))
    };
    function submitHandler(e){
        e.preventDefault();
        console.log("Printing the Registration Form -->", formData)
        dispatch(signUp(formData,navigate))


    };

  return (

 <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">

            <div className='flex gap-x-2'>
                {/* firstName */}
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        onChange={changeHandler}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Last aname */}
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        placeholder="Enter Last Name"
                        value={formData.lastName}
                        onChange={changeHandler}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your Email"
                    required
                    value={formData.email}
                    onChange={changeHandler}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                    required
                    value={formData.password}
                    onChange={changeHandler}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="Confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="Confirm-password"
                    placeholder="Re-enter your Password"
                    required
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Sign Up
            </button>
        </form>
    </div>
</div>

  )
}

export default SignUp