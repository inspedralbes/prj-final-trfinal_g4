import tailwind from 'tailwindcss/tailwind.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Providers } from '../app/Providers';
import socket from '../services/sockets';
import useStore from '../src/store';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      const { room } = useStore.getState();
      if (room && url !== '/lobby' && url !== '/game') {
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
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
