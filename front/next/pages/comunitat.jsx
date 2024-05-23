import React from 'react';
import Header from '../components/header';



const Comunidad = () => {
    return (
        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen flex flex-col justify-center items-center">
            <Header />
            <h1 className='text-6xl font-bold text-white text-center'>Comunitat</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-9'>
                <div className="flex justify-center mt-8">
                    <button className="bg-gradient-to-r from-red-700 to-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                        Nivell 1
                    </button>
                    <button className="bg-gradient-to-r from-green-700 to-orange-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                        Nivell 2
                    </button>
                    <button className="bg-gradient-to-r from-black to-white text-white font-bold py-2 px-4 rounded-full">
                        Nivell 3
                    </button>
                </div>
                <div className="flex justify-center mt-8">
                    <input type="text" placeholder="Nom o descripció del mapa..." className="border border-gray-300 rounded-l-full py-2 px-4 pl-8 focus:outline-none focus:border-blue-500" />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-full">
                        Cercar
                    </button>
                </div>
            </div>
            <div>
                {/* {maps.map((map) => (
                    <MapCard map={map} />
                ))} */}
            </div>
        </div>
    );
};

export default Comunidad;