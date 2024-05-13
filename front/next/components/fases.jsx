import React, { useState } from 'react';

const Fases = ({ fases, onImageClick }) => {
    const [currentPhaseIndex1, setCurrentPhaseIndex1] = useState(0);
    const [currentPhaseIndex2, setCurrentPhaseIndex2] = useState(0);
    const [currentPhaseIndex3, setCurrentPhaseIndex3] = useState(0);

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
        if (onImageClick) {
            onImageClick(imageSrc, phaseIndex); // Pasar el índice de la fase seleccionada
        }
    };

    return (
        <div className="w-full sm:w-3/4 flex flex-col sm:flex-row items-center justify-center">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:flex-wrap gap-x-4">
                {fases.map((_, index) => (
                    <div key={index} className={`flex flex-col items-center relative my-4 sm:my-0 sm:mx-3.5 ${index === currentPhaseIndex1 ? '' : 'hidden'}`}>
                        <div className="inline-block relative" onClick={() => handleImageClick(`/images/mapa${index + 1}.png`, 0)}>
                            <img src={`/images/mapa${index + 1}.png`} alt={`Fase ${index + 1}`} className="h-60 w-96 my-4 bg-zinc-400" />
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
                        <div className="inline-block relative" onClick={() => handleImageClick(`/images/mapa${index + 1}.png`, 1)}>
                            <img src={`/images/mapa${index + 1}.png`} alt={`Fase ${index + 1}`} className="h-60 w-96 my-4 bg-zinc-400" />
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
                        <div className="inline-block relative" onClick={() => handleImageClick(`/images/mapa${index + 1}.png`, 2)}>
                            <img src={`/images/mapa${index + 1}.png`} alt={`Fase ${index + 1}`} className="h-60 w-96 my-4 bg-zinc-400" />
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
    );
};

export default Fases;
