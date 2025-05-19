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

    <div>
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor='firstName'> firstName</label>
                <input 
                    type='text'
                    name='firstName'
                    id='firstName'
                    required
                    placeholder='Enter FirstName'
                    value={formData.firstName}
                    onChange={changeHandler}

                />
                <label htmlFor='lastName'> lastName</label>
                <input 
                    type='text'
                    name='lastName'
                    id='lastName'
                    required
                    placeholder='Enter lastName'
                    value={formData.lastName}
                    onChange={changeHandler}

                />

                <label htmlFor='email'> Email </label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter your Email here !!'
                    required
                    value={formData.email}
                    onChange={changeHandler}

                />

                {/*Password  */}
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        name='password'
                        placeholder='Enter your Password'
                        id='password'
                        required
                        value={formData.password}
                        onChange={changeHandler}
                    />

                    {/* confirm Passwoord */}
                    <label htmlFor='Confirm-password'>Confirm Password</label>
                    <input 
                        type='password' 
                        name='confirmPassword'
                        id='Confirm-password'
                        placeholder='Re-enter your Password'
                        required
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                    />


                </div>
            </div>

                <button type='submit'>SignUp</button>
        </form>
    </div>
  )
}

export default SignUp