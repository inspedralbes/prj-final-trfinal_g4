import React, { useState } from 'react';

const Fases = ({ fases }) => {
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

    const handlePrev = () => {
        setCurrentPhaseIndex((prevIndex) => (prevIndex === 0 ? fases.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentPhaseIndex((prevIndex) => (prevIndex + 1) % fases.length);
    };

    return (
        <div className="w-full sm:w-3/4 flex flex-col sm:flex-row items-center justify-center">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:flex-wrap gap-x-4">
                {fases.map((_, index) => (
                    <div key={index} className={`flex flex-col items-center relative my-4 sm:my-0 sm:mx-3.5 ${index === currentPhaseIndex ? '' : 'hidden'}`}>
                        <div className="inline-block relative">
                            <img src={`/images/mapa${index + 1}.png`} alt={`Fase ${index + 1}`} className="h-60 w-96 my-4 bg-zinc-400" />
                            <button
                                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l focus:outline-none absolute top-1/2 left-0 transform -translate-y-1/2 opacity-50"
                                onClick={handlePrev}
                            >
                                {'<'}
                            </button>
                            <button
                                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r focus:outline-none absolute top-1/2 right-0 transform -translate-y-1/2 opacity-50"
                                onClick={handleNext}
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
