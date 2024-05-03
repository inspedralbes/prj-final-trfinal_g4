import React, { useState } from 'react';
import { FiUsers } from "react-icons/fi";
import { FaRegMap } from "react-icons/fa";
import { TbMapExclamation } from "react-icons/tb";
import { GoGraph } from "react-icons/go";

const AdminPanel = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-teal-900">
            <div className="flex flex-col w-48 h-screen bg-teal-700 items-center justify-center">
                <div className="flex flex-col items-center justify-center pb-[25px]">
                    <button className=''>
                        <FiUsers style={{ color: 'white', fontSize: '3.5em', display: 'flex' }} />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center pb-[25px]">
                    <FaRegMap style={{ color: 'white', fontSize: '3.5em', display: 'flex' }} />
                </div>
                <div className="flex flex-col items-center justify-center pb-[25px]">
                    <TbMapExclamation style={{ color: 'white', fontSize: '3.5em', display: 'flex' }} />
                </div><div className="flex flex-col items-center justify-center pb-[25px]">
                    <GoGraph style={{ color: 'white', fontSize: '3.5em', display: 'flex' }} />
                </div>

            </div>
            <div className="flex-grow">
            </div>


        </div>
    )
};

export default AdminPanel;