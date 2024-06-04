import React, { useRef, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import useStore from '../src/store';
import socket from '../services/sockets';

const Animacion = () => {
    const videoRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        socket.on('gameStarted', (data) => {
            if (useStore.getState().room != null && useStore.getState().room.status === 'Playing') {
                router.push('/game');
            }
        });
    }, [router]);

    useEffect(() => {
        const videoElement = videoRef.current;
        const handleVideoEnd = () => {
            console.log('Video ended');
            if ( socket.id == useStore.getState().room.users[0].id ) {
                console.log('Emit startGame');
                socket.emit('startGame' );
            }
        };
        videoElement.addEventListener('ended', handleVideoEnd);
        // Limpia el evento cuando el componente se desmonta
        return () => {
            videoElement.removeEventListener('ended', handleVideoEnd);
        };
    }, [router]);

    const handleSkip = () => {
        console.log('Skip video');
        if ( socket.id == useStore.getState().room.users[0].id ) {
            console.log('Emit startGame');
            socket.emit('startGame');
        }
    };

    // useEffect(() => {
    //     const videoElement = videoRef.current;
    //     (async () => {
    //         try {
    //             await videoElement.play();
    //             if (videoElement.requestFullscreen) {
    //                 await videoElement.requestFullscreen();
    //             } else if (videoElement.mozRequestFullScreen) { // Firefox
    //                 await videoElement.mozRequestFullScreen();
    //             } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
    //                 await videoElement.webkitRequestFullscreen();
    //             } else if (videoElement.msRequestFullscreen) { // IE/Edge
    //                 await videoElement.msRequestFullscreen();
    //             }
    //         } catch (error) {
    //             console.error('Error al reproducir el video:', error);
    //         }
    //     })();
    // }, []);

    return (
        <div className="relative w-full h-full">
            <video ref={videoRef} src="/video/animacion.mp4" autoPlay muted >
                El teu navegador no soporta la reproducció de vídeos.
            </video>
            <button
                onClick={handleSkip}
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg z-10 hover:bg-red-700"
            >
                Omitir
            </button>
        </div>
    );
};

export default Animacion;
