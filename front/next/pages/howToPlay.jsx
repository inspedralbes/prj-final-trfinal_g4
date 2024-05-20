import React from 'react';
import Header from '../components/header';

const HowToPlay = () => {
    return (
        <div className="h-screen overflow-hidden">
            <Header />
            <div className="min-h-screen w-full flex h-screen bg-gradient-to-r from-blue-400 to-indigo-500 flex flex-col items-center justify-center text-white">
                <div className="mt-9 pt-9">
                    <h1 className="text-6xl font-serif font-bold tracking-widest mb-4 text-center mt-9">
                        COM JUGAR?
                    </h1>
                </div>
                <div className="min-h-1/2 w-full mt-6 mb-4">
                    <div className="flex flex-col items-center justify-center m-4">
                        <p className="text-lg tracking-widest mb-4 text-center bg-blue-950 bg-opacity-30 p-5 rounded-lg">
                            Amb la flecha esquerra et mous cap a l'esquerra, amb la flecha dreta et mous cap a la dreta, amb la flecha amunt saltes i amb l'espai cambies de color'.
                        </p>
                    </div>
                    <div className="lg:flex lg:items-center lg:justify-center mt-9">
                        <div className="lg:w-1/4 mx-4 my-4 flex items-center justify-center">
                            <img src="/assets/howToPlay/keyboard.png" alt="Teclat" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToPlay;
