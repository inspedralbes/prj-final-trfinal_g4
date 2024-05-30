import React, { use, useState, useEffect } from 'react';
import Header from '../components/header';
import { getMapsForCommunity, getMapsForCommunityByLevel, searchMaps } from '../services/communicationManager';
import MapCard from '../components/mapCard';


const Comunidad = () => {
    const [maps, setMaps] = useState([]);
    const [fraseCerca, setFraseCerca] = useState('');

    useEffect(() => {
        if (maps.length == 0) {
            getMapsForCommunity().then((data) => {
                setMaps(data);
            });
        }
    });

    const getMaps = () => {
        getMapsForCommunity().then((data) => {
            setMaps(data);
        });
    };

    const getMapsByLevel = (level) => {
        getMapsForCommunityByLevel(level).then((data) => {
            setMaps(data);
        });
    };

    const handleSearchMaps = () => {
        if (fraseCerca !== '') {
            searchMaps(fraseCerca).then((data) => {
                setMaps(data);
            });
        }
    };

    return (
        <div className="bg-gradient-to-r  from-red-600 from-5% via-blue-400 via-50% to-pink-500 min-h-screen flex flex-col justify-center items-center">
            <Header />
            <div className='min-h-screen mt-9 pt-9'>
                <h1 className='text-6xl font-bold text-white text-center mt-9 pt-9'>Comunitat</h1>
                <p className='text-white text-center text-2xl mt-4'>Descobreix els mapes creats per la comunitat</p>

                <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-9 mt-9'>
                    <div className="flex justify-center mt-8">
                        <button className="bg-green-500 hover:animate-bounce text-white font-bold py-2 px-4 rounded-full mr-4" onClick={getMaps}>
                            Tots
                        </button>
                        <button className="bg-gradient-to-r from-red-700 to-blue-700 hover:animate-bounce text-white font-bold py-2 px-4 rounded-full mr-4" onClick={() => getMapsByLevel(1)}>
                            Nivell 1
                        </button>
                        <button className="bg-gradient-to-r from-green-700 to-orange-700 hover:animate-bounce text-white font-bold py-2 px-4 rounded-full mr-4" onClick={() => getMapsByLevel(2)}>
                            Nivell 2
                        </button>
                        <button className="bg-gradient-to-r from-black to-white hover:animate-bounce text-white font-bold py-2 px-4 rounded-full" onClick={() => getMapsByLevel(3)}>
                            Nivell 3
                        </button>
                    </div>
                    <div className="flex justify-center mt-8">
                        <input value={fraseCerca} onChange={(e) => setFraseCerca(e.target.value)} type="text" placeholder="Nom o descripció del mapa..." className="border border-gray-300 rounded-l-full py-2 px-4 pl-8 focus:outline-none focus:border-blue-500" />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-full" onClick={handleSearchMaps}>
                            Cercar
                        </button>
                    </div>
                </div>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-9 m-4 mt-9 pt-9'>
                    {maps.length > 0 ? maps.map((map) => (
                        <MapCard key={map.id} map={map} />
                    )) : (
                        <h1 className='text-2xl font-bold text-white text-center mt-9 pt-9'>No hi ha mapes per mostrar</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comunidad;