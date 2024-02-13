import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:1337/api/auth/local', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: email,
            password: pass,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Usuario logeado exitosamente en Strapi', data);
          localStorage.setItem('username', data.user.username);
          navigate('/room')
        } else {
          console.error('Error al logear el usuario en Strapi');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }


    };
    return (
        <div className="auth-from-container">
            <form className="form-login" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                
            <button type="submit">Login</button>
            </form>
            <button className="link-btn" onClick={() => navigate('/register')}>Don't have an acconunt? Register here.</button>

            <div>
                <p>{username}</p>
            </div>
        </div>

    )
}