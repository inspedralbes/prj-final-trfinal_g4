import React, { useState } from 'react';
import { FiUsers } from "react-icons/fi";
import { FaRegMap } from "react-icons/fa";

const AdminPanel = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-teal-900">
            <div className="flex flex-col w-48 h-screen bg-teal-700">
                <div className="flex flex-col items-center justify-center">
                    <FiUsers style={{ color: 'white', fontSize: '2.5em', display: 'flex' }} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <FaRegMap style={{ color: 'white', fontSize: '2.5em', display: 'flex' }} />
                </div>

            </div>
            <div className="flex-grow">
            </div>


        </div>
    )
};

export default AdminPanel;