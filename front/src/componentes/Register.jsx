import React, { useState } from 'react';

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email, // Assumption: Strapi uses 'username' for email in registration
          email: email,
          password: pass,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usuario registrado exitosamente en Strapi', data);
        
        // Puedes redirigir o realizar otras acciones después del registro exitoso
      } else {
        console.error('Error al registrar el usuario en Strapi');
        // Manejo de errores - puedes mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Puedes mostrar mensajes de error más específicos en la interfaz de usuario
    }
  };

  return (
    <div className="auth-from-container">
      <form className="form-register" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder="Full Name"/>
        <label htmlFor="email" >Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        <button type="submit">Register</button>
      </form>

      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
  );
};