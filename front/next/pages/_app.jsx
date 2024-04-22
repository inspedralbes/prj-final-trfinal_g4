// _app.js o _app.jsx

import tailwind from 'tailwindcss/tailwind.css';
import React from 'react';
import App from 'next/app';
import { socket } from '../services/sockets';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;
