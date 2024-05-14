import React, { useState } from 'react';
import { PiNumberCircleOne, PiNumberCircleTwo, PiNumberCircleThree } from 'react-icons/pi';
import { TbLetterX } from "react-icons/tb";

const Fases = ({ fases }) => {
    const [currentPhaseIndex1, setCurrentPhaseIndex1] = useState(0);
    const [currentPhaseIndex2, setCurrentPhaseIndex2] = useState(0);
    const [currentPhaseIndex3, setCurrentPhaseIndex3] = useState(0);
    const [selectedImages, setSelectedImages] = useState(['/images/random-game.png', '/images/random-game.png', '/images/random-game.png']);

    const handlePrev1 = () => {
        setCurrentPhaseIndex1((prevIndex) => (prevIndex === 0 ? fases.length - 1 : prevIndex - 1));
    };

    const handleNext1 = () => {
        setCurrentPhaseIndex1((prevIndex) => (prevIndex + 1) % fases.length);
    };

    const handlePrev2 = () => {
        setCurrentPhaseIndex2((prevIndex) => (prevIndex === 0 ? fases.length - 1 : prevIndex - 1));
    };

    const handleNext2 = () => {
        setCurrentPhaseIndex2((prevIndex) => (prevIndex + 1) % fases.length);
    };

    const handlePrev3 = () => {
        setCurrentPhaseIndex3((prevIndex) => (prevIndex === 0 ? fases.length - 1 : prevIndex - 1));
    };

    const handleNext3 = () => {
        setCurrentPhaseIndex3((prevIndex) => (prevIndex + 1) % fases.length);
    };

    const handleImageClick = (imageSrc, phaseIndex) => {
        setSelectedImages(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages[phaseIndex] = imageSrc;
            return updatedImages;
        });
    };

    const handleResetImage = (index) => {
        setSelectedImages(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages[index] = '/images/random-game.png';
            return updatedImages;
        });
    };

    return (
        <div>
            <div className="w-full sm:w-4/4 flex flex-col sm:flex-row items-center justify-center">
                {selectedImages.map((imageSrc, index) => (
                    <CustomImageWithOverlay
                        key={index}
                        imageSrc={imageSrc}
                        altText={`Imagen ${index + 1}`}
                        isSelected={imageSrc !== '/images/random-game.png'}
                        icon={index === 0 ? <PiNumberCircleOne className="text-black text-4xl absolute top-4 left-1 m-2" /> : index === 1 ? <PiNumberCircleTwo className="text-black text-4xl absolute top-4 left-1 m-2" /> : <PiNumberCircleThree className="text-black text-4xl absolute top-4 left-1 m-2" />}
                        onReset={() => handleResetImage(index)}
                    >
                        <TbLetterX className="text-black text-2xl absolute top-4 right-1 m-2 cursor-pointer" />
                    </CustomImageWithOverlay>
                ))}
            </div>
            <div className="w-full sm:w-4/4 flex flex-col sm:flex-row items-center justify-center">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:flex-wrap gap-x-4">
                    {fases.map((_, index) => (
                        <div key={index} className={`flex flex-col items-center relative my-4 sm:my-0 sm:mx-3.5 ${index === currentPhaseIndex1 ? '' : 'hidden'}`}>
                            <div className="inline-block relative">
                                <img src={`/images/mapa${index + 1}.png`} alt={`Fase ${index + 1}`} className="h-60 w-96 my-4 bg-zinc-400" onClick={() => handleImageClick(`/images/mapa${index + 1}.png`, 0)}/>
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l focus:outline-none absolute top-1/2 left-0 transform -translate-y-1/2 opacity-50"
                                    onClick={handlePrev1}
                                >
                                    {'<'}
                                </button>
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r focus:outline-none absolute top-1/2 right-0 transform -translate-y-1/2 opacity-50"
                                    onClick={handleNext1}
                                >
                                    {'>'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:flex-wrap gap-x-4">
                    {fases.map((_, index) => (
                        <div key={index} className={`flex flex-col items-center relative my-4 sm:my-0 sm:mx-3.5 ${index === currentPhaseIndex2 ? '' : 'hidden'}`}>
                            <div className="inline-block relative">
                                <img src={`/images/mapa${index + 1}.png`} alt={`Fase ${index + 1}`} className="h-60 w-96 my-4 bg-zinc-400" onClick={() => handleImageClick(`/images/mapa${index + 1}.png`, 1)} />
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l focus:outline-none absolute top-1/2 left-0 transform -translate-y-1/2 opacity-50"
                                    onClick={handlePrev2}
                                >
                                    {'<'}
                                </button>
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r focus:outline-none absolute top-1/2 right-0 transform -translate-y-1/2 opacity-50"
                                    onClick={handleNext2}
                                >
                                    {'>'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:flex-wrap gap-x-4">
                    {fases.map((_, index) => (
                        <div key={index} className={`flex flex-col items-center relative my-4 sm:my-0 sm:mx-3.5 ${index === currentPhaseIndex3 ? '' : 'hidden'}`}>
                            <div className="inline-block relative">
                                <img src={`/images/mapa${index + 1}.png`} alt={`Fase ${index + 1}`} className="h-60 w-96 my-4 bg-zinc-400" onClick={() => handleImageClick(`/images/mapa${index + 1}.png`, 2)}/>
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l focus:outline-none absolute top-1/2 left-0 transform -translate-y-1/2 opacity-50"
                                    onClick={handlePrev3}
                                >
                                    {'<'}
                                </button>
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r focus:outline-none absolute top-1/2 right-0 transform -translate-y-1/2 opacity-50"
                                    onClick={handleNext3}
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
