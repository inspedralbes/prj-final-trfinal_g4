import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

export const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  // const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
 

  return (
    <div className="auth-from-container">
      <form className="form-register" onSubmit={handleSubmit}>
        <label htmlFor="username">Name</label>
        <input value={username} onChange={(e) => setName(e.target.value)} name="username" id="username" placeholder="Full Name"/>
        <label htmlFor="email" >Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        {/* <label htmlFor="confirmPass">Confirm Password</label>
        <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="********" id="confirmPass" name="confirmPass" /> */}
        <button type="submit">Register</button>

        <h1>User</h1>
        
      </form>

      <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.</button>
    </div>
  );
};
