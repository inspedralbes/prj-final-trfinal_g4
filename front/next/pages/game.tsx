import React, { useState, useEffect } from 'react';
import useStore from '../src/store';
import { Game as GameType } from 'phaser';
import socket from '../services/sockets';

import { useRouter } from 'next/router';
const Game = () => {
    const router = useRouter();
    const isDevelopment = process?.env?.NODE_ENV !== 'production';
    const [game, setGame] = useState<GameType>();
    const dialogMessages = useState([]);
    const gameTexts = useState([]);
    const [messages, setMessages] = useState({});

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