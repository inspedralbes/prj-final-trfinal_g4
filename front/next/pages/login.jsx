import Link from 'next/link';
import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const username = localStorage.getItem('username');

  const handleEmailChange = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    };

    }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-4">Inicia Sessió</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correu electrònic</label>
          <input type="email" id="email" name="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contrasenya</label>
          <input type="password" id="password" name="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Link href="/">
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out hover:scale-110"
          >
            </button>
          </Link>
            Iniciar Sessió
          
          {/* Enlace para registro */}
          <p className="text-gray-700 text-sm mt-4">Si no estàs registrat, <a href="#" className="text-blue-500">registrat ara</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
