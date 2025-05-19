import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { login } from '../services/operations/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        email:"",
        password:""
    });

    // change Handler
    const changeHandler=(event)=>{
        setFormData(prevData =>({
            ...prevData,
            [event.target.name]: event.target.value
        }))
        
    }

    // form submit handler 
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Printing Form Data " , formData);
        // service/ operation madhe api call keleli ahe 
        dispatch(login(formData,navigate));

        navigate("/home")
    };


  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
            </label>
            <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
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
            id="password"
            name="password"
            placeholder="Enter Your Password"
            required
            value={formData.password}
            onChange={changeHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
            Login
        </button>
        </form>

        <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Register
            </Link>
        </p>
        </div>
    </div>
</div>

  )
}

export default Login