import React, { useState } from 'react';

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
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500 p-16">
            {/* Parte izquierda para crear la sala */}
            <div className="flex flex-col justify-center items-center w-1/3 mx-52">
                <h2 className="text-white text-2xl mb-6">Crear Sala</h2>
                <div className="w-full bg-white rounded-lg p-4 mb-4">
                    <label htmlFor="roomName" className="block text-gray-700 font-semibold mb-2">Nombre de la Sala:</label>
                    <input
                        id="roomName"
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                    <div className="flex items-center mb-2">
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
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

            {/* Parte derecha con las imágenes */}
            <div className="w-1/3 mx-8 overflow-y-auto">
                <div className="flex flex-col items-center">
                    <img src="/images/random.jpg" alt="Imagen 1" className="w-5/12 my-1" />
                    <img src="/images/random.jpg" alt="Imagen 2" className="w-5/12 my-1" />
                    <img src="/images/random.jpg" alt="Imagen 3" className="w-5/12 my-1" />
                </div>
            </div>
        </div>
    );
};

export default Create;
