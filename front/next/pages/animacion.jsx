import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

const Animacion = () => {
    const videoRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const videoElement = videoRef.current;

        const handleVideoEnd = () => {
            // Redirige al usuario a otra pantalla cuando el video termina
            router.push('game');
        };

        videoElement.addEventListener('ended', handleVideoEnd);

        // Limpia el evento cuando el componente se desmonta
        return () => {
            videoElement.removeEventListener('ended', handleVideoEnd);
        };
    }, [router]);

    const handleSkip = () => {
        router.push('game');
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        (async () => {
            try {
                await videoElement.play();
                if (videoElement.requestFullscreen) {
                    await videoElement.requestFullscreen();
                } else if (videoElement.mozRequestFullScreen) { // Firefox
                    await videoElement.mozRequestFullScreen();
                } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
                    await videoElement.webkitRequestFullscreen();
                } else if (videoElement.msRequestFullscreen) { // IE/Edge
                    await videoElement.msRequestFullscreen();
                }
            } catch (error) {
                console.error('Error al reproducir el video:', error);
            }
        })();
    }, []);

    return (
        <div className="relative w-full h-full">
            <video ref={videoRef} src="/video/animacion.mp4" autoPlay muted >
                Tu navegador no soporta la reproducción de video.
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
