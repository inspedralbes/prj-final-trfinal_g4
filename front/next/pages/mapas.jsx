import React, { useState } from 'react';
import Header from '../components/header';
import { createMap } from '../services/communicationManager';

function Mapas() {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [img, setImg] = useState(null);
    const [map, setmap] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            difficulty: difficulty,
            img: img,
            map: map,
            token: localStorage.getItem('token'),
        };

        try {
            const response = await createMap(formData);
            alert('Mapa creado exitosamente');
        } catch (error) {
            alert('Error al crear el mapa: ' + error.message);
        }

        // Limpia el formulario después de enviar
        setName('');
        setDifficulty('');
        setImg();
        setmap();
    };

    return (
        <div className="h-screen overflow-hidden">
            <Header />
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-r from-blue-400 to-indigo-500">
                <div className="w-full sm:w-1/2 bg-white rounded-lg p-8 mx-auto mb-8">
                    <h1 className="text-3xl font-bold mb-4">Enviar mapa</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-2">Nom:</label>
                            <input
                                id="nombre"
                                name="name"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="fase" className="block text-gray-700 font-semibold mb-2">Fase:</label>
                            <select
                                id="fase"
                                name="difficulty"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option value="">Seleccionar fase...</option>
                                <option value="1">Fase 1</option>
                                <option value="2">Fase 2</option>
                                <option value="3">Fase 3</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Miniatura del mapa:</label>
                            <input
                                id="image"
                                name="img"
                                type="file"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                onChange={(e) => setImg(e.target.files[0])}
                            />
                        </div>
                        <div>
                            <label htmlFor="mapRoute" className="block text-gray-700 font-semibold mb-2">Archiu del mapa:</label>
                            <input
                                id="map"
                                name="map"
                                type="file"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                onChange={(e) => setmap(e.target.files[0])}
                            />
                        </div>
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-6 py-2 focus:outline-none">
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Mapas;
