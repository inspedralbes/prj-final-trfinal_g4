import React, { useState, useEffect } from 'react';
import useStore from '../src/store';
import { Game as GameType } from 'phaser';
import socket from '../services/sockets';
import { useRouter } from 'next/router';

const Game: React.FC = () => {
    const router = useRouter();
    const isDevelopment = process?.env?.NODE_ENV !== 'production';
    const [game, setGame] = useState<GameType | undefined>();
    const [room, setRoom] = useState(useStore.getState().room);

    useEffect(() => {
        async function initPhaser() {
            const Phaser = await import('phaser');
            const { default: Preloader } = await import('../scenes/Preloader');
            const phaserGame = new Phaser.Game({
                type: Phaser.WEBGL,
                parent: 'game-content',
                width: window.innerWidth,
                height: window.innerHeight,
                scene: [Preloader],
                physics: {
                    default: 'arcade',
                    arcade: {
                        debug: isDevelopment,
                        gravity: { y: 500, x: 0 },
                    },
                },
                backgroundColor: '#B6B4B4',
            });

            setGame(phaserGame);
        }
        initPhaser();
    }, [isDevelopment]);

    useEffect(() => {
        const handleRoomChange = () => {
            if (!room) {
                router.push('/rooms');
            }
        };

        const unsubscribe = useStore.subscribe((state) => {
            setRoom(state.room);
            console.log('room', state.room);
            handleRoomChange();
        });

        handleRoomChange();

        return () => {
            unsubscribe();
        };
    }, [room, router]);

    useEffect(() => {
        const handleFinishGame = () => {
            router.push('/rooms');
        };

        socket.on('finishGame', handleFinishGame);

        return () => {
            socket.off('finishGame', handleFinishGame);
        };
    }, [router]);

    return (
        <>
            <div id="game-content" key="game-content">
                {/* canvas game */}
            </div>
        </>
    );
};

export default Game;
