import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

const Animacion = () => {
    const videoRef = useRef(null);
    const router = useRouter();


        const videoElement = videoRef.current;

        useEffect(() => {
            const videoElement = videoRef.current;
            const handleVideoEnd = () => {
                // Redirige al usuario a otra pantalla cuando el video termina
                router.push('/game');
            };
            videoElement.addEventListener('ended', handleVideoEnd);
    
            // Limpia el evento cuando el componente se desmonta
            return () => {
                videoElement.removeEventListener('ended', handleVideoEnd);
            };
        }, [router]);

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
        return (
            <div>
                <video ref={videoRef} src="/video/animacion.mp4" autoPlay>
                    Tu navegador no soporta la reproducción de video.
                </video>
            </div>
        );
    
    };

    

export default Animacion;
