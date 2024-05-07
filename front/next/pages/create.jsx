import React, { useState, useEffect } from 'react';
import Fases from '../components/fases';
import Header from '../components/header';
import { PiNumberCircleOne, PiNumberCircleTwo, PiNumberCircleThree } from 'react-icons/pi';
import { TbLetterX } from "react-icons/tb";
import Link from 'next/link';

const Create = () => {
    const [roomName, setRoomName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [gameMode, setGameMode] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        console.log('Información de la sala guardada:', selectedImages);
    }, [selectedImages]);

    const generateRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        return randomNumber;
    };

    const handleCreateRoom = () => {
        let code = generateRandomNumber();

        const roomInfo = {
            name: roomName,
            public: isPublic,
            mode: getGameModeName(gameMode),
            code: code,
            images: selectedImages
        };

        console.log('Creando sala con la siguiente información:');
        console.log('Información de la sala:', roomInfo);

        // Aquí puedes realizar alguna acción con la información de la sala, como enviarla al servidor

        // Limpiar el estado después de crear la sala
        setRoomName('');
        setIsPublic(false);
        setGameMode('');
        setSelectedImages([]);
    };

    const toggleImageSelection = (imageSrc) => {
        // Verificar si la imagen ya está seleccionada
        if (selectedImages.includes(imageSrc)) {
            // Si la imagen está seleccionada, removerla del estado
            setSelectedImages(selectedImages.filter(img => img !== imageSrc));
        } else {
            // Si la imagen no está seleccionada, añadirla al estado
            setSelectedImages([...selectedImages, imageSrc]);
        }
    };

    // Función para obtener el nombre del modo de juego
    const getGameModeName = (mode) => {
        switch (mode) {
            case 'Modo 1':
                return 'Mapas Originales';
            case 'Modo 2':
                return 'Mapas de la Comunidad';
            case 'Modo 3':
                return 'Random';
            default:
                return '';
        }
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500 p-8">
                {/* Parte izquierda para crear la sala */}
                <div className="flex flex-col justify-center items-center w-full sm:w-1/3 mb-8">
                    <h1 className="text-white text-4xl font-bold mb-4">Crear Sala</h1>
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
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-6 py-2 focus:outline-none" onClick={handleCreateRoom}>
                        Crear Sala
                    </button>
                </div>
                {/* Parte derecha con las imágenes */}
                <div className="w-full sm:w-3/4 flex flex-col sm:flex-row items-center justify-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:flex-wrap gap-x-4">
                        <CustomImageWithOverlay
                            imageSrc="/images/random-game.png"
                            altText="Imagen 1"
                            onClick={() => toggleImageSelection("/images/random-game.png")}
                            isSelected={selectedImages.includes("/images/random-game.png")}
                        >
                            <PiNumberCircleOne className="text-black text-4xl absolute top-4 left-1 m-2" />
                            <TbLetterX className="text-black text-2xl absolute top-4 right-1 m-2" />
                        </CustomImageWithOverlay>
                        <CustomImageWithOverlay
                            imageSrc="/images/random-game.png"
                            altText="Imagen 2"
                            onClick={() => toggleImageSelection("/images/random-game2.png")}
                            isSelected={selectedImages.includes("/images/random-game2.png")}
                        >
                            <PiNumberCircleTwo className="text-black text-4xl absolute top-4 left-1 m-2" />
                            <TbLetterX className="text-black text-2xl absolute top-4 right-1 m-2" />
                        </CustomImageWithOverlay>
                        <CustomImageWithOverlay
                            imageSrc="/images/random-game.png"
                            altText="Imagen 3"
                            onClick={() => toggleImageSelection("/images/random-game3.png")}
                            isSelected={selectedImages.includes("/images/random-game3.png")}
                        >
                            <PiNumberCircleThree className="text-black text-4xl absolute top-4 left-1 m-2" />
                            <TbLetterX className="text-black text-2xl absolute top-4 right-1 m-2" />
                        </CustomImageWithOverlay>
                    </div>
                </div>
                <Fases fases={[1, 2, 3]} />
            </div>
        </div>
    );
};

const CustomImageWithOverlay = ({ imageSrc, altText, onClick, isSelected, children }) => {
    return (
        <div className="relative flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 sm:mx-3">
            <img src={imageSrc} alt={altText} className={`h-60 sm:h-72 w-80 sm:w-96 my-4 bg-zinc-400 ${isSelected ? 'border-4 border-blue-500' : ''}`} onClick={onClick} />
            {children}
        </div>
    );
};

export default Create;
