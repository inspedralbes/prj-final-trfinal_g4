import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="m-9 p-9 bg-blue-950">
      <div className="bg-blue-950 py-8">
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded-lg px-8 py-6 mt-4 max-w-md w-full mx-4">
            <h2 className="text-3xl font-semibold text-center mb-4">Inicia Sessió</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" name="email"
                value={email} onChange={handleEmailChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
              <input type="password" id="password" name="password"
                value={password} onChange={handlePasswordChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out hover:scale-110"
                onClick={handleSubmit}
              >
                Iniciar Sesión
              </button>
              {/* Enlace para registro */}
              <p className="text-gray-700 text-sm mt-4">Si no estás registrado en nuestro cine, <a href="#" className="text-blue-500">regístrate ahora</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
