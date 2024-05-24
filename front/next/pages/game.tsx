import React, { useState, useEffect } from 'react';
import useStore from '../src/store';
import { Game as GameType } from 'phaser';
import socket from '../services/sockets';
import { useRouter } from 'next/router';

import { useRouter } from 'next/router';
const Game = () => {
    const router = useRouter();
    const isDevelopment = process?.env?.NODE_ENV !== 'production';
    const [game, setGame] = useState<GameType>();
    const [room, setRoom] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function initPhaser() {
            const Phaser = await import('phaser');
            const { default: GameHome } = await import('../scenes/GameHome');
            const { default: Preloader } = await import('../scenes/Preloader');
            const phaserGame = new Phaser.Game({
                type: Phaser.WEBGL,
                parent: 'game-content',
                width: window.innerWidth,
                height: window.innerHeight,
                scene: [
                    Preloader
                ],
                physics: {
                    default: 'arcade',
                    arcade: {
                        debug: true,
                        gravity: { y: 500, x: 0},
                        // debug: isDevelopment,

                    },

                },
                backgroundColor: '#B6B4B4',
            });

            setGame(phaserGame);
        }
        initPhaser();
    }, []);

    useEffect(() => {
        const handleRoomChange = () => {
            if (room == null) {
                router.push('/rooms');
            }
        };

        const unsubscribe = useStore.subscribe(
            (state) => {
                setRoom(state.room);
            }
        );

        handleRoomChange();

        return () => {
            unsubscribe();
        };
    }, [router.pathname]);

    return (
        <>
            <div id="game-content" key="game-content">
                {/* canvas game */}
            </div>
        </>
    )
}


socket.on('finishGame', (data) => {
    const router = useRouter();
    router.push('/rooms');
});
export default Game;