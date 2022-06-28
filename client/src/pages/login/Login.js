import React, { useContext, useRef } from 'react'
import './login.css'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios'

const Login = () => {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch,isFetching} = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      const res = await axios.post("/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({type:"LOGIN_SUCCESS",payload: res.data});
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"});
    }
  };

   return  (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleLogin}>
            <label>UserName</label>
            <input 
                type="text" 
                className='loginInput' 
                placeholder='Enter your UserName...'
                ref={userRef}
             />
            <label>Password</label>
            <input 
              type="password" 
              className='loginInput' 
              placeholder='Enter your password...'
              ref={passwordRef}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </form>
            <button className="loginRegisterButton">
              <Link className="link" to="/register">Register</Link>
            </button>
    </div>
  )

}

export default Login