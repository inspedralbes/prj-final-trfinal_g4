import React, { useState } from 'react';
import Link from 'next/link';
import { register } from '../services/communicationManager';
import { useRouter } from 'next/router';
import ErrorPopup from '../components/errorPopup';
import Header from '../components/header';

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setRegistrationError('Les contrasenyes no coincideixen.');
      return;
    } else if (password.length < 8) {
      setRegistrationError('La contrasenya ha de tenir com a mínim 8 caràcters.');
      return;
    }

    const user = {
      name: name,
      email: email,
      username: username,
      password: password,
      password_confirmation: confirmPassword
    };

    try {
      register(user).then(() => {
        router.push('/login');
      });
    } catch (error) {
      setRegistrationError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center p-[9.05rem]">
        {registrationError && <ErrorPopup type="error" message={registrationError} />}
        <form className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold text-center mb-4">Registre</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
            <input type="text" id="name" name="name"
              value={name} onChange={(e) => setName(e.target.value)} required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Nom d'usuari</label>
            <input type="text" id="username" name="username"
              value={username} onChange={(e) => setUsername(e.target.value)} required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correu electrònic</label>
            <input type="email" id="email" name="email"
              value={email} onChange={(e) => setEmail(e.target.value)} required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contrasenya</label>
            <input type="password" id="password" name="password" min={8}
              value={password} onChange={(e) => setPassword(e.target.value)} required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirmar Contrasenya</label>
            <input type="password" id="confirmPassword" name="confirmPassword" min={8}
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out hover:scale-110"
            >
              Register
            </button>
            <Link href="/login">
              <p className="text-gray-700 text-sm mt-4">Ja tens compte? Inicia sessió</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
