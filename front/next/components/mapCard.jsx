import React from 'react';
import { BiSolidLike } from "react-icons/bi";
import { MdReport } from "react-icons/md";

const MapCard = ({ map }) => {
    const URL = 'http://localhost:8000';

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{map.name}</h2>
            <p className="text-gray-500">{map.description}</p>
            <img src={URL + map.image} alt={map.name} className="mt-4 rounded-lg h-40 w-160 mx-auto" />
            <div className="flex justify-between mt-4">
                <span className="text-gray-600">{map.date}</span>
            </div>
            <div className="flex justify-between mt-4">
                <button className="flex items-center bg-blue-500 text-white rounded-lg px-4 py-2">
                    <BiSolidLike className='mr-2' />
                    M'agrada
                </button>
                <button className="flex items-center bg-red-500 text-white rounded-lg px-4 py-2">
                    <MdReport className='mr-2' />
                    Reportar
                </button>
            </div>
        </div>
    );
};

export default MapCard;