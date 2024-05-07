import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import useStore from '../src/store';
import { logout } from '../services/communicationManager';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const tokenStore = useStore(state => state.token);
    const userStore = useStore(state => state.user);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const tancarSessio = () => {
    //     window.localStorage.removeItem('user');
    //     window.localStorage.removeItem('token');
    //     useStore.setState({ user: null });
    //     useStore.setState({ token: null });
        const tokenObject = getTokenAndUser();
        const token = tokenObject ? tokenObject.token : null;
        const tokenClean = token ? token.trim() : null;
        logout(tokenClean)
            .then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                useStore.setState({ user: null });
                useStore.setState({ token: null });
                console.log('Sessió tancada');
            })
            .catch(() => {
                alert('Error logging out');
            });
    };

    const getTokenAndUser = () => {
        let token = null;
        let user = null;

        if (tokenStore != null && userStore != null) {
            token = tokenStore;
            user = userStore;
        } else {
            try {
                token = localStorage.getItem('token');
                user = localStorage.getItem('user');
            } catch (e) {
                token = null;
                user = null;
            }
        }
        return { token, user };
    };

    const renderDropdownContent = () => {
        if (dropdownOpen) {
            return (
                <div className="dropdown absolute right-0 mt-2 bg-black bg-opacity-50 rounded-md shadow-lg">
                    {/* Dropdown content */}
                    <a href="#" className="block px-4 py-2 hover:bg-gray-800">Perfil</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-800">Mapas</a>
                    <button onClick={tancarSessio} className="block px-4 py-2 hover:bg-gray-800">Logout</button>
                </div>
            );
        }
        return null;
    };

    const renderContent = () => {
        const { token, user } = getTokenAndUser();

        if (token != null && user != null) {
            useStore.setState({ token });
            useStore.setState({ user });

            return (
                <div className="profile relative text-white">
                    <FaUserCircle className="mx-4 text-3xl cursor-pointer" onClick={toggleDropdown} />
                    {renderDropdownContent()}
                </div>
            );
        }

        return (
            <Link href="/login">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mr-4 mt-4 md:mt-0">LOGIN</button>
            </Link>
        );
    };

    return (
        <header className="bg-black bg-opacity-70 p-4 flex justify-between items-center">
            <Link href="/">
                <span className="text-white">Chromatic Bond</span>
            </Link>
            <div className="flex items-center">
                {renderContent()}
            </div>
        </header>
    );
};

export default Header;
