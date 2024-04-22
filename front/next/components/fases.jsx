import React, { useState } from 'react';

const Fases = ({ fases }) => {
    const [currentImageIndexes, setCurrentImageIndexes] = useState(Array(fases.length).fill(0));

    const handlePrev = (phaseIndex) => {
        setCurrentImageIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[phaseIndex] = newIndexes[phaseIndex] === 0 ? fases[phaseIndex].length - 1 : newIndexes[phaseIndex] - 1;
            return newIndexes;
        });
    };

    const handleNext = (phaseIndex) => {
        setCurrentImageIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[phaseIndex] = newIndexes[phaseIndex] === fases[phaseIndex].length - 1 ? 0 : newIndexes[phaseIndex] + 1;
            return newIndexes;
        });
    };

    return (
        <div className="flex justify-center items-center">
            {fases.map((phase, phaseIndex) => (
                <div key={phaseIndex} className="flex flex-col items-center mx-4">
                    <h3 className="mb-2">Fase {phaseIndex + 1}</h3>
                    <img
                        src={phase[currentImageIndexes[phaseIndex]]}
                        alt={`Fase ${phaseIndex + 1}`}
                        className="w-32 h-32 my-2"
                    />
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l focus:outline-none"
                            onClick={() => handlePrev(phaseIndex)}
                        >
                            {'<'}
                        </button>
                        <button
                            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r focus:outline-none"
                            onClick={() => handleNext(phaseIndex)}
                        >
                            {'>'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};