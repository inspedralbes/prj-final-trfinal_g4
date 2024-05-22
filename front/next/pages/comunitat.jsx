import React from 'react';
import Header from '../components/header';



const Comunidad = () => {
    return (
        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen flex flex-col justify-center items-center">
            <Header />
            <h1 className='text-6xl font-bold text-white text-center'>Comunitat</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-9'>
                <div className="flex justify-center mt-8">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                        Button 1
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                        Button 2
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                        Button 3
                    </button>
                </div>
                <div className="flex justify-center mt-8">
                    <input type="text" placeholder="Search" className="border border-gray-300 rounded-l-full py-2 px-4 pl-8 focus:outline-none focus:border-blue-500" />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-full">
                        Search
                    </button>
                </div>
            </div>
            <div>
                {maps.map((map) => (
                    <MapCard map={map} />
                ))}
            </div>
        </div>
    );
};

export default Comunidad;