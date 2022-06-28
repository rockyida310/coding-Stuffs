import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import OTPInput from "otp-input-react";
// import  { ResendOTP } from "otp-input-react";
import axios from "axios";

//we can use ContextAPI for registration
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [register, setRegisterPage] = useState(true);
  const [OTP, setOTP] = useState("");

  const submitOTP = async (e) => {
    e.preventDefault();
    try {
      console.log(email,OTP);
      const res = await axios.post("/auth/verify",{
        email,
        OTP
      })
      console.log(res);
      window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && setRegisterPage(false);
      // res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return register ? (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleRegister}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton">Register</button>
      </form>
      <button className="registerLoginButton" type="submit">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && (
        <span className="errorMessage">
          <b>Something went Wrong!</b>
        </span>
      )}
    </div>
  ) : (
    <div className="otpBox">
      <OTPInput
        value={OTP}
        onChange={setOTP}
        autoFocus
        OTPLength={5}
        otpType="number"
        disabled={false}
        secure
        style={{
          marginBottom: "10px",
        }}
      />
      {/* <ResendOTP 
        onResendClick={() => console.log("Resend clicked")} 
      /> */}
      <button className="submitOtpButton" onClick={submitOTP}>
        Submit
      </button>
      {error && (
        <span className="errorMessage">
          <b>Something went Wrong!</b>
        </span>
      )}
    </div>
  );
};

export default Register;
