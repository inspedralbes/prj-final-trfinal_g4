import React, { useState, useEffect } from 'react';

import { Game as GameType } from 'phaser';

const Game = () => {
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
                type: Phaser.AUTO,
                parent: 'game-content',
                width: window.innerWidth,
                height: window.innerHeight,
                scene: [
                    Preloader, GameHome,
                ],
                physics: {
                    default: 'matter',
                    matter: {
                        // debug: isDevelopment,

                    },
                },
                backgroundColor: '#575555',
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

export default Game;