import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import useStore from '../src/store';
import { logout } from '../services/communicationManager';
import ErrorPopup from '../components/errorPopup'; // Importa el componente de popup de error

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); // Variable de estado para el mensaje de error
    const tokenStore = useStore(state => state.token);
    const userStore = useStore(state => state.user);

    // Lógica para obtener token y usuario
    let token, user;
    if (tokenStore == null && userStore == null) {
        token = tokenStore;
        user = userStore;
    } else if (typeof localStorage != 'undefined') {    
        token = localStorage.getItem('token');
        user = localStorage.getItem('user');
    }

    useEffect(() => {
        useStore.setState({ token: token });
        useStore.setState({ user: user });
    }, [token, user]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        let tokenClean = token.replace(/^"|"$/g, '');
        logout(tokenClean)
            .then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                useStore.setState({ user: null });
                useStore.setState({ token: null });
                console.log('Sesión cerrada');
            })
            .catch(() => {
                setErrorMessage('Error al cerrar sesión');
            });
    };
    
    let content;
    if (token) {
        content = (
            <div className="profile relative text-white">
                <FaUserCircle className="mx-4 text-3xl cursor-pointer" onClick={toggleDropdown} />
                {dropdownOpen && (
                    <div className="dropdown absolute right-0 mt-2 bg-black bg-opacity-50 rounded-md shadow-lg">
                        {/* Dropdown content */}
                        <a href="#" className="block px-4 py-2 hover:bg-gray-800">Perfil</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-800">Mapas</a>
                        <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-800">Cerrar sesión</button>
                    </div>
                )}
            </div>
        );
    } else {
        content = (
            <Link href="/login">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Iniciar sesión</button>
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
