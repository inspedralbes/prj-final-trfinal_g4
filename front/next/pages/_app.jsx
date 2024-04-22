// _app.js o _app.jsx

import tailwind from 'tailwindcss/tailwind.css';
import React from 'react';
import App from 'next/app';
import {Providers} from 'app/Providers';


function MyApp({ Component, pageProps }) {

  return <Providers>
    <Component {...pageProps} />
  </Providers>
}

export default MyApp;
