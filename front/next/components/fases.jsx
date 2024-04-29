import React, { useState } from 'react';
import mapa from '../public/images/mapa.png';

const Fases = ({ fases }) => {
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

    const handlePrev = () => {
        setCurrentPhaseIndex((prevIndex) => (prevIndex === 0 ? fases.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentPhaseIndex((prevIndex) => (prevIndex + 1) % fases.length);
    };

    return (
        <div className="flex justify-center items-center">
            <div key={currentPhaseIndex} className="flex flex-col items-center mx-4">
                <div className="flex relative">
                    {/* Fase 1 */}
                    <div className="flex flex-col items-center relative">
                        <div className="inline-block relative">
                            <img src='/images/mapa.png' alt={`Fase 1`} className="h-60 w-96 my-4 mx-3" />
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
                    {/* Fase 2 */}
                    <div className="flex flex-col items-center relative mx-2">
                        <div className="inline-block relative">
                            <img src='/images/mapa.png' alt={`Fase 2`} className="h-60 w-96 my-4 mx-2" />
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
                    {/* Fase 3 */}
                    <div className="flex flex-col items-center relative">
                        <div className="inline-block relative">
                            <img src='/images/mapa.png' alt={`Fase 3`} className="h-60 w-96 my-4 mx-3" />
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
                </div>
            </div>
        </div>
    );
};

const fases = [1, 2, 3];

export default () => <Fases fases={fases} />;
