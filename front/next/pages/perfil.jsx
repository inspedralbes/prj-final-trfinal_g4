import React, { useState, useEffect } from 'react';
import Header from '../components/header';

const Perfil = () => {
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        // Al montar el componente, aplicamos el estilo para eliminar el scroll
        document.body.style.overflow = 'hidden';

        // Al desmontar el componente, eliminamos el estilo para restaurar el scroll
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []); // Se ejecuta solo una vez al montar/desmontar el componente

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setNewEmail(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmNewPasswordChange = (event) => {
        setConfirmNewPassword(event.target.value);
    };

    const handleImageChange = (event) => {
        setNewImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Aquí puedes manejar los datos del formulario, como enviarlos al servidor
        console.log('Nuevo nombre:', newName);
        console.log('Nuevo email:', newEmail);
        console.log('Nueva contraseña:', newPassword);
        console.log('Confirmar nueva contraseña:', confirmNewPassword);
        console.log('Nueva imagen:', newImage);

        // Limpia el formulario después de enviar
        setNewName('');
        setNewEmail('');
        setNewPassword('');
        setConfirmNewPassword('');
        setNewImage(null);
    };

    return (
        <div>
            <Header />
            <div className="flex h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
                {/* Información del perfil */}
                <div className="bg-white flex justify-center items-center w-1/4">
                    <div className="max-w-md">
                        <div className="bg-white rounded-lg p-4 mb-4">
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 font-semibold w-1/3">Nombre:</label>
                                <p className="text-gray-700">Nombre de usuario</p>
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 font-semibold w-1/3">Imagen:</label>
                                <img src="/path/to/user/image" alt="User" className="w-24 h-24 rounded-full" />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 font-semibold w-1/3">Correo:</label>
                                <p className="text-gray-700">correo@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario de editar perfil */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-xl bg-gray-100 rounded-lg shadow-lg p-8 mr-10">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800">Editar perfil</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="newName" className="block text-gray-700 font-semibold mb-2">Nuevo nombre:</label>
                                <input
                                    id="newName"
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={newName}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="newEmail" className="block text-gray-700 font-semibold mb-2">Nuevo correo:</label>
                                <input
                                    id="newEmail"
                                    type="email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={newEmail}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">Nueva contraseña:</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmNewPassword" className="block text-gray-700 font-semibold mb-2">Confirmar nueva contraseña:</label>
                                <input
                                    id="confirmNewPassword"
                                    type="password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={confirmNewPassword}
                                    onChange={handleConfirmNewPasswordChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="newImage" className="block text-gray-700 font-semibold mb-2">Nueva imagen:</label>
                                <input
                                    id="newImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className="w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold rounded px-8 py-4 focus:outline-none">
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
