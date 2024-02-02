import React, { useEffect } from 'react';
import Phaser from 'phaser';

import Scene1 from '../scenes/Scene1';
import Preloader from '../scenes/Preloader';

const gameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#d6d3e0',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [Preloader,  Scene1],
    scale: {
        zoom: 1,
    }
    
};

function Game() {
    useEffect(() => {
        const game = new Phaser.Game({
            ...gameConfig,
            parent: 'phaser-game',
        });

        return () => {
            game.destroy(); // Destruir el juego cuando el componente se desmonta
        };
    }, []);

    return (
        <div id="phaser-game" />
    );
}

export default Game;