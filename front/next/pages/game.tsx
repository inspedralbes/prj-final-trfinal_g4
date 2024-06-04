import React, { useState, useEffect } from 'react';
import useStore from '../src/store';
import socket from '../services/sockets';
import { useRouter } from 'next/router';
import { Game as GameType } from 'phaser';


const Game = () => {
    const router = useRouter();
    const [game, setGame] = useState<GameType | undefined>();
    const [room, setRoom] = useState(useStore.getState().room);

    useEffect(() => {
        async function initPhaser() {
            const Phaser = await import('phaser');
            // const { default: Preloader } = await import('../scenes/Preloader');
            // const {default: VideoScene} = await import('../scenes/VideoScene');
            const {default: Preloader} = await import('../scenes/Preloader');
            const {default: GameHome} = await import('../scenes/GameHome');
            const {default: GameHome1} = await import('../scenes/GameHome1');
            const {default: GameHome2} = await import('../scenes/GameHome2');
            const {default: GameHome3} = await import('../scenes/GameHome3');
            // const {default: Credits} = await import('../scenes/Credits');
            const phaserGame = new Phaser.Game({
                type: Phaser.WEBGL,
                parent: 'game-content',
                width: window.innerWidth,
                height: window.innerHeight,
                scene: [
                    Preloader, GameHome, GameHome1, GameHome2, GameHome3
                ],
                physics: {
                    default: 'arcade',
                    arcade: {
                        debug: false,
                        gravity: { y: 500, x: 0},
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
            if (!room) {
                router.push('/rooms');
            }
        };

        const unsubscribe = useStore.subscribe((state) => {
            setRoom(state.room);
            handleRoomChange();
        });

        handleRoomChange();

        return () => {
            unsubscribe();
        };
    }, [room, router]);

    return (
        <>
            <div id="game-content" key="game-content">
                {/* canvas game */}
            </div>
        </>
    )
}

export default Game;
