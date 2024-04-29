import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import useStore from '../src/store';
import { logout } from '../services/communicationManager';



const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    var token = localStorage.getItem('token');
    var user = localStorage.getItem('user');

    let content;
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    console.log(token);

   const tancarSessio = () => {
        console.log(token);
        let tokenClean = token.replace(/^"|"$/g, '');
        logout(tokenClean).then((data) => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            useStore.setState({ user: null });
            useStore.setState({ token: null });
            console.log('Sessió tancada');
        }).catch(() => {
            alert('Error logging out');
        });
    };

    console.log('me cago en la puta madre de Fabio')
    
    if (token) {
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
    } else {
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
