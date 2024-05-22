import React from 'react';

const MapCard = ({ map }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{map.name}</h2>
            <p className="text-gray-500">{map.description}</p>
            <img src={map.image} alt={map.name} className="mt-4 rounded-lg" />
            <div className="flex justify-between mt-4">
                <span className="text-gray-600">{map.location}</span>
                <span className="text-gray-600">{map.date}</span>
            </div>
            <div className="flex justify-between mt-4">
                <button className="flex items-center bg-blue-500 text-white rounded-lg px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a.5.5 0 01.39.19l2.5 3a.5.5 0 01.11.55l-1.5 4.5a.5.5 0 01-.77.27L10 10.77l-3.23 2.74a.5.5 0 01-.77-.27l-1.5-4.5a.5.5 0 01.11-.55l2.5-3A.5.5 0 016 3h4zm0 2.5L8.5 7.5h3L10 5.5zm0 9l-2.5-1.5h5L10 14.5zm-5-4.5h10a.5.5 0 01.39.19l1.5 2.5a.5.5 0 01-.39.81H4a.5.5 0 01-.39-.81l1.5-2.5a.5.5 0 01.39-.19zm1 1.69L10 13.33l3.61-2.34L11 9.19l1.11-3.41L10 6.33 8.89 2.78 11 4.19l-3.61 1.78L10 9.19l-1.11 3.41z" clipRule="evenodd" />
                    </svg>
                    Like
                </button>
                <button className="flex items-center bg-red-500 text-white rounded-lg px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a.5.5 0 01.5.5v5a.5.5 0 01-1 0v-5A.5.5 0 0110 3zm0 7a.5.5 0 01.5.5v.5a.5.5 0 01-1 0v-.5a.5.5 0 01.5-.5zm0 3a.5.5 0 01.5.5v.5a.5.5 0 01-1 0v-.5a.5.5 0 01.5-.5z" clipRule="evenodd" />
                        <path d="M10 14a2 2 0 100-4 2 2 0 000 4zm0 1a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                    Report
                </button>
            </div>
        </div>
    );
};

export default MapCard;