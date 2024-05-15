import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import useStore from '../src/store';
import { logout } from '../services/communicationManager';
import ErrorPopup from '../components/errorPopup';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const tokenStore = useStore.getState().token;
        const userStore = useStore.getState().user;

        if (tokenStore !== null && userStore !== null) {
            setToken(tokenStore);
            setUser(userStore);
        } else {
            try {
                const storedToken = localStorage.getItem('token');
                var storedUser = localStorage.getItem('user');
                if (storedUser != null ) {
                    const parsedUser = JSON.parse(storedUser);
                    storedUser = parsedUser.name;
                }
                storedUser.replace(/['"]+/g, '');
                setToken(storedToken);
                setUser(storedUser);
                useStore.setState({ token: storedToken });
                useStore.setState({ user: storedUser });
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
                localStorage.removeItem('token');
                useStore.setState({ user: null });
                useStore.setState({ token: null });
                setToken(null);
                setUser(null);
            }).catch(() => {
                alert('Error tancant la sessió.');
            });
        }
        setDropdownOpen(false);
    };
    
    let content;
    if (token && user) {
        content = (
            <div className="profile relative text-white">
                <FaUserCircle className="mx-4 text-3xl cursor-pointer" onClick={toggleDropdown} />
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
            <Link href="/login">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mr-4 mt-4 md:mt-0">LOGIN</button>
            </Link>
        );
    }

    return (
        <header className="bg-black bg-opacity-70 p-4 flex justify-between items-center">
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
