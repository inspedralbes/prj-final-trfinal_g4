import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import useStore from '../src/store';
import { logout } from '../services/communicationManager';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const tokenStore = useStore.getState().token;
    const userStore = useStore.getState().user;

    console.log('tokenStore: ', tokenStore);
    console.log('userStore: ', userStore);

    function getTokenAndUser() {
        var token = null;
        var user = null;

        if (tokenStore != String && userStore != Array) {
                token = tokenStore;
                user = userStore;
                console.log('token: ', token);
                console.log('user: ', user);
            console.log(tokenStore);
            } else {
            try {
                token = localStorage.getItem('token');
                user = localStorage.getItem('user');
                console.log('token: ', token);
                console.log('user: ', user);
            } catch (e) {
                token = null;
                user = null;
                console.log('token: ', token);
                console.log('user: ', user);
            }
        }
        return { token, user };
    }
    
    const { token, user } = getTokenAndUser();

    let content;
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        console.log('Desplegar menú de usuario');
    };

    const tancarSessio = () => {
        console.log(token);
        let tokenClean = token.replace(/^"|"$/g, '');
        logout(tokenClean).then((data) => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            useStore.setState({ user: Array });
            useStore.setState({ token: String });
            console.log('Sessió tancada');
        }).catch(() => {
            alert('Error logging out');
        });
    };

    if (token != null && user != null ) {
        useStore.setState({ token: token });
        useStore.setState({ user: user });

        content = <div className="profile relative text-white">
            <FaUserCircle className="mx-4 text-3xl cursor-pointer" onClick={toggleDropdown} />
            {dropdownOpen && tancarSessio && (
                <div className="dropdown absolute right-0 mt-2 bg-black bg-opacity-50 rounded-md shadow-lg">
                    {/* Dropdown content */}
                    <a href="#" className="block px-4 py-2 hover:bg-gray-800">Perfil</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-800">Mapas</a>
                    <button onClick={tancarSessio} className="block px-4 py-2 hover:bg-gray-800">Logout</button>
                </div>
            )}
        </div>
    } else  {
        content = <Link href="/login">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mr-4 mt-4 md:mt-0">LOGIN</button>
        </Link>
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