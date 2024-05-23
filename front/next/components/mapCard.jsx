import React from 'react';

const MapCard = ({ map }) => {
    const URL = 'http://localhost:8000';

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{map.name}</h2>
            <p className="text-gray-500">{map.description}</p>
            <img src={URL + map.image} alt={map.name} className="mt-4 rounded-lg h-40 w-160 mx-auto" />
            <div className="flex justify-between mt-4">
                <span className="text-gray-600">{map.location}</span>
                <span className="text-gray-600">{map.date}</span>
            </div>
            <div className="flex justify-between mt-4">
                <button className="flex items-center bg-blue-500 text-white rounded-lg px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 172 172" style=" fill:#26e07f;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#1fb141"><path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path></g></g></svg>
                    Like
                </button>
                <button className="flex items-center bg-red-500 text-white rounded-lg px-4 py-2">
                    
                    Report
                </button>
            </div>
        </div>
    );
};

export default MapCard;