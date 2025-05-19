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
    <div>
       <h1> login Form  </h1>

       <form onSubmit={submitHandler}
        className='flex '
        >
            <label htmlFor="email">Email</label>
            <input type="email" 
                id="email" 
                name="email"
                placeholder='Enter Your Email ' 
                required
                value={formData.email}
                onChange={changeHandler}
            />

            <label htmlFor='password'>Password</label>
            <input type='password'
                id='password' 
                name='password'
                required
                placeholder='Enter Your Password '
                value={formData.password}
                onChange={changeHandler}

            />

            <button type='submit'>Login</button>
       </form>

        <span>
         <p> Don't have Account </p>
         <Link to='/signup'> Register </Link>
        </span>
    </div>
  )
}

export default Login