import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
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
  const [sessionIncomplete, setSessionIncomplete] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const session = useSession();

  useEffect(() => {
    if (session?.data) {
      if (session.data.user.admin) {
        router.push('/admin');
      } else {
        router.push('/rooms');
      }
    }
  }, [session, router]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setSessionIncomplete('El formulari està incomplet, si us plau, omple tots els camps.');
      return;
    }

    if (!validateEmail(email)) {
      setSessionError('El correu introduit no es valid! Torna-ho a intentar.');
      return;
    }

    setSessionError(null);
    setSessionIncomplete(null);

    const user = {
      email: email,
      password: password
    };

    try {
      const data = await login(user);

      localStorage.setItem('user', JSON.stringify({
        name: data.user,
        email: data.email,
        id: data.id,
        admin: data.admin,
        image: data.image,
        token: data.token
      }));

      useStore.setState({
        user: {
          name: data.user,
          email: data.email,
          id: data.id,
          admin: data.admin,
          image: data.image,
          token: data.token
        }
      });

      router.push('/rooms');
    } catch (error) {
      setSessionError('Dades de inici de sessió incorrectes! Torna a provar.');
    }
  };

  const loginGoogle = async () => {
    await signIn('google');
  }

  const clearIncompleteMessage = () => setSessionIncomplete(null);
  const clearErrorMessage = () => setSessionError(null);

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="bg-gradient-to-r from-blue-600 from-5% via-purple-500 via-50% to-red-600 to-90% min-h-screen flex flex-col justify-center items-center p-4">
        {sessionIncomplete && <ErrorPopup type="incomplete" message={sessionIncomplete} clearMessage={clearIncompleteMessage} />}
        {sessionError && <ErrorPopup type="error" message={sessionError} clearMessage={clearErrorMessage} />}
        <form className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold text-center mb-4">Iniciar Sessió</h2>
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
              Inicia Sessió
            </button>
            <Link href="/register">
              <p className="text-blue-500 hover:text-blue-700 font-semibold text-sm mt-4">Registra't</p>
            </Link>
          </div>
        </form>
        {/* <button onClick={loginGoogle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out hover:scale-110 mt-4">
          Iniciar Sessió amb Google
        </button> */}
      </div>
    </div>
  );
}

export default Login;
