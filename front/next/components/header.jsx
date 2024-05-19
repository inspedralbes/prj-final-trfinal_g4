import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useStore from '../src/store';
import { logout } from '../services/communicationManager';
import ErrorPopup from '../components/errorPopup';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);

    const url = 'http://localhost:8000';

    useEffect(() => {
        const userStore = useStore.getState().user;

        if ( userStore != null ) {
            setToken(userStore.name);
            setUser(userStore.token);
            setImage(userStore.image);
        } else {
            try {
                const userLocalStorage = JSON.parse(localStorage.getItem('user'));

                if (userLocalStorage != null) {
                    var userName = userLocalStorage.name;
                    var userToken = userLocalStorage.token;
                    var userImage = userLocalStorage.image;

                    console.log('User:', userName);
                    console.log('Token:', userToken);
                    console.log('All data User:', userLocalStorage);
                }

                useStore.setState({ user: userLocalStorage });

                setToken(userToken);
                setUser(userName);
                setImage(userImage);
            } catch (e) {
                // console.log('Error retrieving token and user from localStorage:', e);
            }
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const logoutHandler = () => {
        let tokenClean = token.replace(/['"]+/g, '');
        
        if (tokenClean) {
            logout(tokenClean).then(() => {
                localStorage.removeItem('user');
                useStore.setState({ user: null });
                setToken(null);
                setUser(null);
            }).catch(() => {
                setErrorMessage('Error tancant la sessió.');
            });
        }
        setDropdownOpen(false);
    };
    
    let content;
    if (token && user) {
        content = (
            <div className="profile relative text-white">
                <a href="/howToPlay" className="mr-4">
                    Tutorial
                </a>
                <img src={`${url}${image}`} className="w-10 h-10 mx-4 text-3xl cursor-pointer rounded-full" onClick={toggleDropdown} />
                {dropdownOpen && (
                    <div className="dropdown absolute right-0 mt-2 bg-black bg-opacity-50 rounded-md shadow-lg">
                        <a href="/perfil" className="block px-4 py-2 hover:bg-gray-800 hover:rounded-md">Perfil</a>
                        <a href="/mapas" className="block px-4 py-2 hover:bg-gray-800 hover:rounded-md">Mapas</a>
                        <button onClick={logoutHandler} className="block px-4 py-2 hover:bg-gray-800 hover:rounded-md">Logout</button>
                    </div>
                )}
            </div>
        );
    } else {
        content = (
            <div className="flex items-center">
            <a href="/howToPlay" className="mr-4 text-white mr-6 hover:text-yellow-500">
                Tutorial
            </a>
            <Link href="/login">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mr-4 mt-4 md:mt-0">LOGIN</button>
            </Link>
            </div>
        );
    }

    return (
        <header className="bg-slate-900 p-4 flex justify-between items-center absolute top-0 w-full">
            <Link href="/">
                <span className="text-white">Chromatic Bond</span>
            </Link>
            <div className="flex items-center">
                {content}
                {errorMessage && <ErrorPopup message={errorMessage} />} {/* Mostrar el popup de error si hay un mensaje de error */}
            </div>
        </header>
    );
};

export default Header;
