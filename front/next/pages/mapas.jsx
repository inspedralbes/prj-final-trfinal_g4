import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import { createMap } from '../services/communicationManager';
import { useRouter } from 'next/router';
import ErrorPopup from '../components/errorPopup';

function Mapas() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [img, setImg] = useState(null);
    const [map, setmap] = useState(null);
    const [loading, setLoading] = useState(true);
    const [popupMessage, setPopupMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !difficulty || !img || !map) {
            setPopupMessage('Por favor, completa todos los campos.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Usuario no autenticado');
            return;
        }
        const { id, token } = user;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('difficulty', difficulty);
        formData.append('img', img);
        formData.append('map', map);
        formData.append('user_id', id);

        try {
            console.log('Form Data:', formData);
            await createMap(formData, token);
            setSuccessMessage('Mapa creado exitosamente');
            router.push('/');
        } catch (error) {
            alert('Error al crear el mapa: ' + error.message);
        }

        setName('');
        setDescription('');
        setDifficulty('');
        setImg(null);
        setmap(null);
        setPopupMessage(null);
    };

    if (loading) {
        return null;
    }

    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-r from-purple-500 from-5% via-blue-500 via-50% to-red-600">
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen">
            {popupMessage && <ErrorPopup type="incomplete" message={popupMessage} clearMessage={() => setPopupMessage(null)} />}
            {successMessage && <ErrorPopup type="success" message={successMessage} clearMessage={() => setSuccessMessage(null)} />}
                <div className="w-full sm:w-1/2 bg-white rounded-lg p-8 mx-auto">
                    <h1 className="text-3xl font-bold mb-4">Enviar mapa</h1>
                    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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
                            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Descripció:</label>
                            <textarea
                                id="description"
                                name="description"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                            <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Miniatura del mapa (.png):</label>
                            <input
                                id="image"
                                name="img"
                                type="file"
                                accept=".png"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                onChange={(e) => setImg(e.target.files[0])}
                            />
                        </div>
                        <div>
                            <label htmlFor="mapRoute" className="block text-gray-700 font-semibold mb-2">Archiu del mapa (.json):</label>
                            <input
                                id="map"
                                name="map"
                                type="file"
                                accept=".json"
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
