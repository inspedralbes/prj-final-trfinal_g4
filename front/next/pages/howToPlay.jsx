import React from 'react';
import Header from '../components/header';

const HowToPlay = () => {
    return (
        <div className="h-screen overflow-hidden">
            <Header />
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-widest -mb-24 mt-44 text-center">
                    COM JUGAR?
                </h1>
                <div className="w-full flex-grow flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center m-4 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/4">
                        <p className="text-lg tracking-widest mb-4 text-center bg-blue-950 bg-opacity-30 p-5 rounded-lg text-justify my-12">
                            Amb la flecha esquerra et mous cap a l'esquerra, amb la flecha dreta et mous cap a la dreta, amb la flecha amunt saltes i amb l'espai cambies de color. <br /><br />
                            Hi ha 2 jugadors, el primer jugador controla a un jugador d'un color i el segon jugador controla a un jugador de l'altre color, amb cada un dels colors pots activar i utilitzar coses diferents i has d'arribar al final cooperant amb l'altre jugadors i jugant amb els colors que te cadascun d'ells. <br /><br />
                            Hi han 3 fases, per a cada fase tens mes colors i has de fer servir els colors per avançar en el joc. <br />
                        </p>
                    </div>
                    <div className="flex items-center justify-center mt-9">
                        <div className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 mx-4 my-4 flex items-center justify-center">
                            <img src="/assets/howToPlay/keyboard.png" alt="Teclat" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToPlay;
