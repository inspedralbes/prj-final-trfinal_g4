import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { updateUser } from '../services/communicationManager';

const Perfil = () => {
    const [newName, setNewName] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newImage, setNewImage] = useState(null);

    const [userFromLocalStorage, setUserFromLocalStorage] = useState(null); 

    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('User:', user);
        setUserFromLocalStorage(user);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newName);
        formData.append('username', newUsername);
        formData.append('email', newEmail);
        formData.append('password', newPassword);
        formData.append('image', newImage);


        try{
            console.log('Form Data:', formData);
            await updateUser(formData).then(data => {
                console.log('Usuario actualizado:', data);
            });
        }catch(error){
            console.log('Error al actualizar el usuario:', error);
        }

        setNewName('');
        setNewUsername('');
        setNewEmail('');
        setNewPassword('');
        setConfirmNewPassword('');
        setNewImage(null);

    };

    return (
        <div className="h-screen overflow-hidden">
            <Header />
            <div className="flex h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
                {/* Información del perfil */}
                <div className="bg-gray-700 text-white flex flex-col justify-center items-center w-1/5 pt-20">
                    <div className="mb-8 flex flex-col items-center text-xl w-full">
                    <img src={userFromLocalStorage && userFromLocalStorage.image ? 'http://localhost:8000'+userFromLocalStorage.image : '/images/profiles/default.png'} alt="User" className="w-36 h-36 rounded-full" />

                    </div>
                    <div className="mb-8 flex items-center text-xl w-full">
                        <label className="block font-semibold w-1/3 -mr-3 ml-16">Nom d'usuari: </label>
                        <p className="inline-block whitespace-nowrap">{userFromLocalStorage ? userFromLocalStorage.name : "Username"}</p>
                    </div>
                    <div className="mb-8 flex items-center text-xl w-full">
                        <label className="block font-semibold w-1/3 -mr-16 ml-16">Correu: </label>
                        <p className="inline-block whitespace-nowrap ml-4">{userFromLocalStorage ? userFromLocalStorage.email : "Email"}</p>
                    </div>
                </div>

                {/* Formulario de editar perfil */}
                <div className="flex-1 flex items-center justify-center mb-16"> {/* Ajuste de clases para centrar */}
                    <div className="w-4/6 max-w-xl bg-gray-100 rounded-lg shadow-lg p-8 mr-10"> {/* Ajuste de clases para hacerlo más ancho y agregar margen */}
                        <h2 className="text-3xl font-bold mb-8 text-gray-800">Editar perfil</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mb-6">
                                <label htmlFor="newName" className="block text-gray-700 font-semibold mb-2">Nou nom:</label>
                                <input
                                    id="Name"
                                    name="name"
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="newUsername" className="block text-gray-700 font-semibold mb-2">Nou nom d'usuari:</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="newEmail" className="block text-gray-700 font-semibold mb-2">Nou correu:</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">Nova contrasenya:</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirmNewPassword" className="block text-gray-700 font-semibold mb-2">Confirmar nova contrasenya:</label>
                                <input
                                    id="confirmNewPassword"
                                    type="password_confirmation"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="newImage" className="block text-gray-700 font-semibold mb-2">Nova imatge:</label>
                                <input
                                    id="image"
                                    name="img"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(e) => setNewImage(e.target.files[0])}
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
