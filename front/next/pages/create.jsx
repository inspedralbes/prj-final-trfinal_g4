import React, { useState } from 'react';
import Fases from '../components/fases';
import Header from '../components/header';
import { PiNumberCircleOne, PiNumberCircleTwo, PiNumberCircleThree } from 'react-icons/pi';
import { TbLetterX } from "react-icons/tb";
import Link from 'next/link';

const Create = () => {
    // State para los valores de la sala
    const [roomName, setRoomName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [gameMode, setGameMode] = useState('');

    const handleCreateRoom = () => {
        console.log('Creando sala con los siguientes valores:');
        console.log('Nombre de la sala:', roomName);
        console.log('Pública:', isPublic);
        console.log('Modo de juego:', gameMode);
    };

    return (
        <div>
            <Header />
            <div className="flex items-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500 flex-col p-8">
                {/* Parte izquierda para crear la sala */}
                <div className="flex flex-col justify-center items-center w-1/3">
                    <h2 className="text-white text-2xl mb-2">Crear Sala</h2>
                    <div className="w-full bg-white rounded-lg p-4 mb-3">
                        <label htmlFor="roomName" className="block text-gray-700 font-semibold mb-2">Nombre de la Sala:</label>
                        <input
                            id="roomName"
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                        <div className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {isPublic ? 'Sala Privada' : 'Sala Pública'}
                                </span>
                            </label>
                        </div>
                        <label htmlFor="gameMode" className="block text-gray-700 font-semibold mb-2">Modo de Juego:</label>
                        <select
                            id="gameMode"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={gameMode}
                            onChange={(e) => setGameMode(e.target.value)}
                        >
                            <option value="">Seleccionar modo de juego...</option>
                            <option value="Modo 1">Mapas Originales</option>
                            <option value="Modo 2">Mapas de la Comunidad</option>
                            <option value="Modo 3">Random</option>
                        </select>
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-6 py-2 focus:outline-none"
                        onClick={handleCreateRoom}
                    >
                        Crear Sala
                    </button>
                </div>
                <Link href="/lobby">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-6 py-2 focus:outline-none" onClick={handleCreateRoom}>
                        Crear Sala
                    </button>
                </Link>
            </div>
            {/* Parte derecha con las imágenes */}
            <div className="w-3/4 mx-8 overflow-y-auto">
                <div className="flex flex-row justify-center items-center">
                    <ImageWithOverlay imageSrc="/images/random-game.png" altText="Imagen 1">
                        <PiNumberCircleOne className="text-black text-4xl absolute top-3 left-2 m-2" />
                        <TbLetterX className="text-black text-2xl absolute top-3 right-2 m-2" />
                    </ImageWithOverlay>
                    <ImageWithOverlay imageSrc="/images/random-game.png" altText="Imagen 2">
                        <PiNumberCircleTwo className="text-black text-4xl absolute top-3 left-2 m-2" />
                        <TbLetterX className="text-black text-2xl absolute top-3 right-2 m-2" />
                    </ImageWithOverlay>
                    <ImageWithOverlay imageSrc="/images/random-game.png" altText="Imagen 3">
                        <PiNumberCircleThree className="text-black text-4xl absolute top-3 left-2 m-2" />
                        <TbLetterX className="text-black text-2xl absolute top-3 right-2 m-2" />
                    </ImageWithOverlay>
                </div>
            </div>
            <Fases fases={[1, 2, 3]} />
        </div>
    );
};

const ImageWithOverlay = ({ imageSrc, altText, children }) => {
    return (
        <div className="relative">
            <img src={imageSrc} alt={altText} className="h-60 w-96 my-4 mx-3 bg-zinc-400" />
            {children}
        </div>
    );
};

export default Create;