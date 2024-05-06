import React, { useState } from 'react';
import Header from '../components/header';

function Mapas() {
    const [nombre, setNombre] = useState('');
    const [fase, setFase] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [miniatura, setMiniatura] = useState(null);

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleFaseChange = (event) => {
        setFase(event.target.value);
    };

    const handleArchivoChange = (event) => {
        setArchivo(event.target.files[0]);
    };

    const handleMiniaturaChange = (event) => {
        setMiniatura(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Aquí puedes manejar los datos del formulario, como enviarlos al servidor
        console.log('Nombre:', nombre);
        console.log('Fase:', fase);
        console.log('Archivo:', archivo);
        console.log('Miniatura:', miniatura);

        // Limpia el formulario después de enviar
        setNombre('');
        setFase('');
        setArchivo(null);
        setMiniatura(null);
    };

    return (
        <div className="h-screen overflow-hidden">
            <Header />
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-r from-blue-400 to-indigo-500">
                <div className="w-full sm:w-1/2 bg-white rounded-lg p-8 mx-auto mb-8">
                    <h1 className="text-3xl font-bold mb-4">Enviar mapa</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-2">Nombre:</label>
                            <input
                                id="nombre"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={nombre}
                                onChange={handleNombreChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="fase" className="block text-gray-700 font-semibold mb-2">Fase:</label>
                            <select
                                id="fase"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={fase}
                                onChange={handleFaseChange}
                            >
                                <option value="">Seleccionar fase...</option>
                                <option value="1">Fase 1</option>
                                <option value="2">Fase 2</option>
                                <option value="3">Fase 3</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="miniatura" className="block text-gray-700 font-semibold mb-2">Miniatura del mapa:</label>
                            <input
                                id="miniatura"
                                type="file"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                onChange={handleMiniaturaChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="archivo" className="block text-gray-700 font-semibold mb-2">Archivo de mapa:</label>
                            <input
                                id="archivo"
                                type="file"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                onChange={handleArchivoChange}
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
