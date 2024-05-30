import React, { use, useEffect, useState } from 'react';
import Header from '../components/header';
import { updateUser } from '../services/communicationManager';
import { useRouter } from 'next/router';
import ErrorPopup from '../components/errorPopup';
import useStore from '../src/store';

const Perfil = () => {
    const URL = 'https://chromaticbond.cat:8000';
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    const [popupMessage, setPopupMessage] = useState(null);
    const router = useRouter();

    const [userFromLocalStorage, setUserFromLocalStorage] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserFromLocalStorage(user);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name == '' && username == '' && email == '' && password == '' && password_confirmation == '' && image == null) {
            setPopupMessage('No s\'ha modificat res.');
            return;
        }

        if (password != password_confirmation && password != '' && password_confirmation != '') {
            setPopupMessage('Les contrasenyes no coincideixen.');
            return;
        } else if (password.length < 8 && password != '') {
            setPopupMessage('La contrasenya ha de tenir com a mínim 8 caràcters.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const userId = user.id;

        const formData = new FormData();
        formData.append('user_id', userId);
        if (name != '') formData.append('name', name);
        if (username != '') formData.append('username', username);
        if (email != '') formData.append('email', email);
        if (password != '') formData.append('password', password);
        if (password_confirmation != '') formData.append('password_confirmation', password_confirmation);
        if (image != null) formData.append('image', image);

        try {
            await updateUser(formData, token).then(data => {
                localStorage.setItem('user', 
                    JSON.stringify({
                        name: data.user,
                        email: data.email,
                        id: data.id,
                        admin: data.admin,
                        image: data.image,
                        token: token
                    })
                );
                useStore.setState({
                    user: {
                        name: data.user,
                        email: data.email,
                        id: data.id,
                        admin: data.admin,
                        image: data.image,
                        token: token
                    }
                });
            });
        } catch (error) {
            setPopupMessage('Error al modificar el perfil.');
            return;
        }

        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setImage(null);
        setPopupMessage(null); 
        router.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-800 from-20% via-green-400 via-5% to-yellow-500">
            <Header />
            <div className='grid grid-cols-4'>
            {popupMessage && <ErrorPopup type="error" message={popupMessage} clearMessage={() => setPopupMessage(null)} />}
                <div className="bg-gray-700 text-white min-h-screen">
                    <div className="flex flex-col justify-center items-center text-center min-h-screen p-4">
                        <div className="text-xl mx-auto mb-3">
                            <img
                                src={userFromLocalStorage && userFromLocalStorage.image ? `${URL}` + userFromLocalStorage.image : '/images/profiles/default.png'}
                                alt="User"
                                className="w-24 h-24 md:w-36 md:h-36 rounded-full"
                            />
                        </div>
                        <div className="mx-auto text-lg md:text-xl mb-3 text-center w-full max-w-xs md:max-w-md">
                            <label className="font-semibold block truncate">Nom d'usuari:</label>
                            <p className="truncate">{userFromLocalStorage ? userFromLocalStorage.name : "Username"}</p>
                        </div>
                        <div className="mx-auto text-lg md:text-xl text-center w-full max-w-xs md:max-w-md">
                            <label className="font-semibold block truncate">Correu:</label>
                            <p className="truncate">{userFromLocalStorage ? userFromLocalStorage.email : "Email"}</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col items-center justify-center mt-9 pt-9">
                    <div className="w-4/6 max-w-xl bg-gray-100 rounded-lg shadow-lg p-8 mr-10 mt-9 mb-9">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800 truncate">Editar perfil</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mb-6">
                                <label htmlFor="newName" className="block text-gray-700 font-semibold mb-2 truncate">Nou nom:</label>
                                <input
                                    id="Name"
                                    name="name"
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="newUsername" className="block text-gray-700 font-semibold mb-2 truncate">Nou nom d'usuari:</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="newEmail" className="block text-gray-700 font-semibold mb-2 truncate">Nou correu:</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2 truncate">Nova contrasenya:</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    min={8}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirmNewPassword" className="block text-gray-700 font-semibold mb-2 truncate">Confirmar nova contrasenya:</label>
                                <input
                                    id="confirmNewPassword"
                                    type="password"
                                    min={8}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-lg"
                                    value={password_confirmation}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="newImage" className="block text-gray-700 font-semibold mb-2 truncate">Nova imatge:</label>
                                <input
                                    id="image"
                                    name="img"
                                    type="file"
                                    accept=".png, .PNG"
                                    onChange={(e) => setImage(e.target.files[0])}
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
