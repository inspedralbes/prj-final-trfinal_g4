import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="bg-black bg-opacity-70 p-4 flex justify-between items-center">
            <Link href="/">
                <span className="text-white">Chromatic Bond</span>
            </Link>
            <div className="flex items-center">
                <Link href="/login">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mr-4 mt-4 md:mt-0">LOGIN</button>
                </Link>
                <div className="profile relative text-white">
                    <FaUserCircle className="mx-4 text-3xl cursor-pointer" onClick={toggleDropdown} />
                    {dropdownOpen && (
                        <div className="dropdown absolute right-0 mt-2 bg-black bg-opacity-50 rounded-md shadow-lg">
                            {/* Dropdown content */}
                            <a href="#" className="block px-4 py-2 hover:bg-gray-800">Perfil</a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-800">Mapas</a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-800">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
