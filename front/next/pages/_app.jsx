// _app.jsx
import 'tailwindcss/tailwind.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Providers } from '../app/Providers';
import socket from '../services/sockets';
import useStore from '../src/store';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      const { room } = useStore.getState();
      if (room && url !== '/lobby' && url !== '/game' && url !== '/animacion' && url !== '/agraiments') {
        socket.emit('exitRoom');
        useStore.setState({ room: null });
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup the event listener on component unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet" />
        <style jsx global>{`
          html {
            font-family: 'Pixelify Sans', Arial, sans-serif;
          }
        `}</style>
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  );
}

export default MyApp;