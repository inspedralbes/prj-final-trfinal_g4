import React, { useState, useEffect } from 'react';
import { Game as GameType } from 'phaser';
import socket from '../services/sockets';
import { useRouter } from 'next/router';
import useStore from '../src/store';

const Game = () => {
    const router = useRouter();
    const [game, setGame] = useState<GameType>();
    const dialogMessages = useState([]);
    const gameTexts = useState([]);
    const [messages, setMessages] = useState({});
    const [room, setRoom] = useState(null);
    

    useEffect(() => {
        async function initPhaser() {
            const Phaser = await import('phaser');
            const { default: Preloader } = await import('../scenes/Preloader');
            const {default: VideoScene} = await import('../scenes/VideoScene');
            const phaserGame = new Phaser.Game({
                type: Phaser.WEBGL,
                parent: 'game-content',
                width: window.innerWidth,
                height: window.innerHeight,
                scene: [
                    VideoScene, Preloader
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
            if ( useStore.getState().room==null) {
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

    return (
        <>
            <div id="game-content" key="game-content">
                {/* canvas game */}
            </div>
        </>
    )
}

export default Game;
