import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import useStore from '../src/store';
import { logout } from '../services/communicationManager';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
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
                const storedUser = localStorage.getItem('user');
                setToken(storedToken);
                setUser(storedUser);
            } catch (e) {
                console.log('Error retrieving token and user from localStorage:', e);
            }
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const logoutHandler = () => {
        if (token) {
            console.log('Cerrando sesión');
            console.log('Token:', token);
            logout(token).then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                useStore.setState({ user: null });
                useStore.setState({ token: null });
        setToken(null);
        setUser(null);
                console.log('Sesión cerrada');
            }).catch(() => {
                alert('Error cerrando sesión');
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
                        <a href="#" className="block px-4 py-2 hover:bg-gray-800">Perfil</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-800">Mapas</a>
                        <button onClick={logoutHandler} className="block px-4 py-2 hover:bg-gray-800">Logout</button>
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
            </div>
        </header>
    );
};

export default Header;
