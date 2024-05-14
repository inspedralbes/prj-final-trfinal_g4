import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { login } from '../services/communicationManager';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import Header from '../components/header';
import useStore from '../src/store';
import ErrorPopup from '../components/errorPopup';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [setSession] = useState(null);
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const [sessionIncomplete, setSessionIncomplete] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  // const [sessionSuccess, setSessionSuccess] = useState(null);

  const session = useSession();
  // console.log(session);
  useEffect(() => {
    // Si hay una sesión activa, redirige al usuario a la página de /rooms
    if (session?.data) {
      if (session.data.user.admin) {
        console.log("admin", session.data.user.admin);
        router.push('/admin');
      } else {
        router.push('/rooms');
      }
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setSessionIncomplete('El formulario está incompleto. Por favor, completa todos los campos.');
      return;
    }

    const user = {
      email: email,
      password: password
    };

    login(user).then((data) => {
      console.log("data login", data);
      console.log("data admin", data.admin);
      localStorage.setItem('user', JSON.stringify({ name: JSON.stringify(data.user) }));
      localStorage.setItem('token', JSON.stringify(data.token));
      useStore.setState({ user: { name: JSON.stringify(data.user) }});
      useStore.setState({ token: JSON.stringify(data.token) });
      if (data.admin == 1) {
        useStore.setState({ admin: true });
        console.log("admin", data.admin);
        console.log("admin", data.admin);
        router.push('/admin');
      } else {
        console.log("admin", data.admin);
        router.push('/rooms');
      }
    }).catch(() => {
        alert('Error logging in');
      });
  };

  const loginGoogle = async () => {
    await signIn('google');
  }

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen flex flex-col justify-center items-center p-4">
        {sessionIncomplete && <ErrorPopup type="incomplete" message={sessionIncomplete} />}
        {sessionError && <ErrorPopup type="error" message={sessionError} />}
        {/* {sessionSuccess && <ErrorPopup type="success" message={sessionSuccess} />} */}
        <form className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full" onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out hover:scale-110"
            >
              Iniciar Sessió
            </button>
            <Link href="/register">
              <p className="text-blue-500 hover:text-blue-700 font-semibold text-sm mt-4">Registra't</p>
            </Link>
          </div>
        </form>
        <button onClick={loginGoogle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out hover:scale-110 mt-4">
          Iniciar Sessió amb Google
        </button>
      </div>
    </div>
  );
}

export default Login;
