import React from 'react';
import Header from '../components/header';

const HowToPlay = () => {
    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
            <Header />
            <div className='flex flex-col items-center justify-center mt-9 pt-9'>
                <h1 className="text-6xl font-bold tracking-widest text-center mt-9 pt-9 truncate">
                    COM JUGAR?
                </h1>
                <div className='pt-9 mt-9'>
                    <p className="text-lg max-w-[800px] bg-blue-950 bg-opacity-30 p-4 text-center rounded-lg m-3">
                        Amb la flecha esquerra et mous cap a l'esquerra, amb la flecha dreta et mous cap a la dreta, amb la flecha amunt saltes i amb l'espai cambies de color.
                        Hi ha 2 jugadors, el primer jugador controla a un jugador d'un color i el segon jugador controla a un jugador de l'altre color, amb cada un dels colors
                        pots activar i utilitzar coses diferents i has d'arribar al final cooperant amb l'altre jugadors i jugant amb els colors que te cadascun d'ells.
                        Hi han 3 fases, per a cada fase tens mes colors i has de fer servir els colors per avançar en el joc.
                    </p>
                </div>
                <img className='lg:max-w-[800px]' src="/images/teclado.png" alt="Teclat" />
            </div>
        </div>
    );
};

export default HowToPlay;
