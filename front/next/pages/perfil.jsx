import React, { useState } from 'react';
import Header from '../components/header';

const Perfil = () => {
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

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

    const handleSubmit = (event) => {
        event.preventDefault();

        // Aquí puedes manejar los datos del formulario, como enviarlos al servidor
        console.log('Nuevo nombre:', newName);
        console.log('Nuevo email:', newEmail);
        console.log('Nueva contraseña:', newPassword);
        console.log('Confirmar nueva contraseña:', confirmNewPassword);

        // Limpia el formulario después de enviar
        setNewName('');
        setNewEmail('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <div>
            <Header />
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500 p-8">
                <div className="w-full max-w-4xl flex justify-between">
                    {/* Información del perfil */}
                    <div className="w-1/3 pr-4 flex flex-col justify-center items-start">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-white">Información del perfil</h2>
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
                    <div className="w-2/3 pl-4 flex justify-center items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-white">Editar perfil</h2>
                            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8">
                                <div className="mb-4">
                                    <label htmlFor="newName" className="block text-gray-700 font-semibold mb-2">Nuevo nombre:</label>
                                    <input
                                        id="newName"
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                        value={newName}
                                        onChange={handleNameChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="newEmail" className="block text-gray-700 font-semibold mb-2">Nuevo correo:</label>
                                    <input
                                        id="newEmail"
                                        type="email"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                        value={newEmail}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">Nueva contraseña:</label>
                                    <input
                                        id="newPassword"
                                        type="password"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="confirmNewPassword" className="block text-gray-700 font-semibold mb-2">Confirmar nueva contraseña:</label>
                                    <input
                                        id="confirmNewPassword"
                                        type="password"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                        value={confirmNewPassword}
                                        onChange={handleConfirmNewPasswordChange}
                                    />
                                </div>
                                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-6 py-2 focus:outline-none">
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
