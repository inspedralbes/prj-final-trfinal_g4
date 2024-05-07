import React, { useState } from 'react';
import Header from '../components/header';

const Perfil = () => {
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newImage, setNewImage] = useState(null);

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
                <div className="bg-gray-700 text-white flex flex-col justify-center items-center w-1/5 pt-20">
                    <div className="mb-8 flex flex-col items-center text-xl w-full">
                        <img src="/images/random.jpg" alt="User" className="w-36 h-36 rounded-full" />
                    </div>
                    <div className="mb-8 flex items-center text-xl w-full">
                        <label className="block font-semibold w-1/3 -mr-16 ml-16">Nom: </label>
                        <p className="inline-block whitespace-nowrap">Nom</p>
                    </div>
                    <div className="mb-8 flex items-center text-xl w-full">
                        <label className="block font-semibold w-1/3 -mr-3 ml-16">Username: </label>
                        <p className="inline-block whitespace-nowrap">Nom d'usuari</p>
                    </div>
                    <div className="mb-8 flex items-center text-xl w-full">
                        <label className="block font-semibold w-1/3 -mr-16 ml-16">Correu: </label>
                        <p className="inline-block whitespace-nowrap ml-4">correu@example.com</p>
                    </div>
                </div>

                {/* Formulario de editar perfil */}
                <div className="flex-1 pt-20 flex items-center justify-center"> {/* Ajuste de clases para centrar */}
                    <div className="w-4/6 max-w-xl bg-gray-100 rounded-lg shadow-lg p-8 mr-10"> {/* Ajuste de clases para hacerlo más ancho y agregar margen */}
                        <h2 className="text-3xl font-bold mb-8 text-gray-800">Editar perfil</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mb-6">
                                <label htmlFor="newName" className="block text-gray-700 font-semibold mb-2">Nuevo username:</label>
                                <input
                                    id="newName"
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={newName}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="newEmail" className="block text-gray-700 font-semibold mb-2">Nuevo correo:</label>
                                <input
                                    id="newEmail"
                                    type="email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={newEmail}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">Nueva contraseña:</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirmNewPassword" className="block text-gray-700 font-semibold mb-2">Confirmar nueva contraseña:</label>
                                <input
                                    id="confirmNewPassword"
                                    type="password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={confirmNewPassword}
                                    onChange={handleConfirmNewPasswordChange}
                                />
                            </div>
                            <div className="mb-6">
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
