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
                            Es juga utilitzant el teclat. Amb la tecla "A" per moure's a l'esquerra, la tecla "D" per moure's a la dreta, <br /> i si prems "Shift" pots canviar l'acció del personatge de caminar a córrer. <br /> La barra espaiadora serveix per saltar, amb la tecla "E" interactuem amb els objectes del videojoc, <br /> mentre que amb la tecla "Q" invoquem la germana i ens agachem amb el control, <br /> també volem implementar un controlador d'Xbox.
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
