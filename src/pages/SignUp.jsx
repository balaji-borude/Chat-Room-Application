import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signup } from '../Redux/Slices/authSlice';
//import { toast } from 'react-toastify';

const SignUp = () => {
    const dispatch = useDispatch();

    const[formData,setFormData] = useState({
        name:"",
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
        dispatch(signup())

    };

  return (

    <div>
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor='name'> UserName</label>
                <input 
                    type='text'
                    name='name'
                    id='name'
                    required
                    placeholder='Enter userName'
                    value={formData.name}
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