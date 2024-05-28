import React, { useState, useEffect } from 'react';
import { PiNumberCircleOne, PiNumberCircleTwo, PiNumberCircleThree } from 'react-icons/pi';
import { TbLetterX } from 'react-icons/tb';
import { getMapByDifficulty } from '../services/communicationManager';

const Fases = ({ selectedImages, setSelectedImages }) => {
    const [mapsDifficulty1, setMapsDifficulty1] = useState([]);
    const [mapsDifficulty2, setMapsDifficulty2] = useState([]);
    const [mapsDifficulty3, setMapsDifficulty3] = useState([]);
    const [currentPhaseIndex1, setCurrentPhaseIndex1] = useState(0);
    const [currentPhaseIndex2, setCurrentPhaseIndex2] = useState(0);
    const [currentPhaseIndex3, setCurrentPhaseIndex3] = useState(0);

    useEffect(() => {
        const fetchMaps = async () => {
            try {
                const maps1 = await getMapByDifficulty(1);
                setMapsDifficulty1(maps1.filter(map => map.default=== 0).map(map => ({ id: map.id, imageUrl: `http://localhost:8000${map.image}` })));
                const maps2 = await getMapByDifficulty(2);
                setMapsDifficulty2(maps2.filter(map => map.default === 0).map(map => ({ id: map.id, imageUrl: `http://localhost:8000${map.image}` })));
                const maps3 = await getMapByDifficulty(3);
                setMapsDifficulty3(maps3.filter(map => map.default === 0).map(map => ({ id: map.id, imageUrl: `http://localhost:8000${map.image}` })));
            } catch (error) {
                console.error(error);
            }
        };

        fetchMaps();
    }, []);

    const handlePrev = (setCurrentPhaseIndex, maps) => {
        setCurrentPhaseIndex(prevIndex => (prevIndex === 0 ? maps.length - 1 : prevIndex - 1));
    };

    const handleNext = (setCurrentPhaseIndex, maps) => {
        setCurrentPhaseIndex(prevIndex => (prevIndex + 1) % maps.length);
    };
    const showInfo = () =>{
        console.log(document.getElementById("gameMode"));
    }
    const handleImageClick = (map, phaseIndex) => {
        setSelectedImages(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages[phaseIndex] = map;
            return updatedImages;
        });
    };

    const handleResetImage = index => {
        setSelectedImages(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages[index] = { id: null, imageUrl: '/images/random-game.png' };
            return updatedImages;
        });
    };

    return (
        <div>
            <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                {selectedImages.map((imageObj, index) => (
                    <CustomImageWithOverlay
                        key={index}
                        imageSrc={imageObj.imageUrl}
                        altText={`Imagen ${index + 1}`}
                        isSelected={imageObj.imageUrl !== '/images/random-game.png'}
                        icon={index === 0 ? <PiNumberCircleOne className="text-black text-4xl absolute top-4 left-1 m-2" /> : index === 1 ? <PiNumberCircleTwo className="text-black text-4xl absolute top-4 left-1 m-2" /> : <PiNumberCircleThree className="text-black text-4xl absolute top-4 left-1 m-2" />}
                        onReset={() => handleResetImage(index)}
                    >
                        <TbLetterX className="text-black text-2xl absolute top-4 right-1 m-2 cursor-pointer" />
                    </CustomImageWithOverlay>
                ))}
            </div>
            <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:flex-wrap gap-x-4">
                    {mapsDifficulty1.map((map, index) => (
                        <div key={map.id} className={`flex flex-col items-center relative my-4 sm:my-0 sm:mx-3.5 ${index === currentPhaseIndex1 ? '' : 'hidden'}`}>
                            <div className="inline-block relative">
                                <img src={map.imageUrl} alt={`Fase ${index + 1}`} className="h-60 w-96 my-4 bg-zinc-400" onClick={() => handleImageClick(map, 0)} />
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l focus:outline-none absolute top-1/2 left-0 transform -translate-y-1/2 opacity-50"
                                    onClick={() => handlePrev(setCurrentPhaseIndex1, mapsDifficulty1)}
                                >
                                    {'<'}
                                </button>
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r focus:outline-none absolute top-1/2 right-0 transform -translate-y-1/2 opacity-50"
                                    onClick={() => handleNext(setCurrentPhaseIndex1, mapsDifficulty1)}
                                >
                                    {'>'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:flex-wrap gap-x-4">
                    {mapsDifficulty2.map((map, index) => (
                        <div key={map.id} className={`flex flex-col items-center relative my-4 sm:my-0 sm:mx-3.5 ${index === currentPhaseIndex2 ? '' : 'hidden'}`}>
                            <div className="inline-block relative">
                                <img src={map.imageUrl} alt={`Fase ${index + 1}`} className="h-60 w-96 my-4 bg-zinc-400" onClick={() => handleImageClick(map, 1)} />
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l focus:outline-none absolute top-1/2 left-0 transform -translate-y-1/2 opacity-50"
                                    onClick={() => handlePrev(setCurrentPhaseIndex2, mapsDifficulty2)}
                                >
                                    {'<'}
                                </button>
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r focus:outline-none absolute top-1/2 right-0 transform -translate-y-1/2 opacity-50"
                                    onClick={() => handleNext(setCurrentPhaseIndex2, mapsDifficulty2)}
                                >
                                    {'>'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:flex-wrap gap-x-4">
                    {mapsDifficulty3.map((map, index) => (
                        <div key={map.id} className={`flex flex-col items-center relative my-4 sm:my-0 sm:mx-3.5 ${index === currentPhaseIndex3 ? '' : 'hidden'}`}>
                            <div className="inline-block relative">
                                <img src={map.imageUrl} alt={`Fase ${index + 1}`} className="h-60 w-96 my-4 bg-zinc-400" onClick={() => handleImageClick(map, 2)} />
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l focus:outline-none absolute top-1/2 left-0 transform -translate-y-1/2 opacity-50"
                                    onClick={() => handlePrev(setCurrentPhaseIndex3, mapsDifficulty3)}
                                >
                                    {'<'}
                                </button>
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r focus:outline-none absolute top-1/2 right-0 transform -translate-y-1/2 opacity-50"
                                    onClick={() => handleNext(setCurrentPhaseIndex3, mapsDifficulty3)}
                                >
                                    {'>'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CustomImageWithOverlay = ({ imageSrc, altText, isSelected, children, icon, onReset }) => {
    return (
        <div className="relative flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 sm:mx-3">
            <img src={imageSrc} alt={altText} className={`h-60 sm:h-72 w-80 sm:w-96 my-4 bg-zinc-400 ${isSelected ? 'border-4 border-blue-500' : ''}`} />
            {icon}
            <div onClick={onReset}>
                {children}
            </div>
        </div>
    );
};

export default Fases;
