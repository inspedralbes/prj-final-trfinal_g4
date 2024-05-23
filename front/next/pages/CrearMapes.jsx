import React from 'react';
import Header from '../components/header';
import { FaDownload, FaFileAlt, FaLayerGroup, FaSave, FaUpload } from 'react-icons/fa';

const steps = [
    {
        icon: FaDownload,
        title: "Descarrega l'editor de mapes",
        description: (
            <>
                Descarrega l'editor de mapes 
                <a href="https://www.mapeditor.org/download.html" target="_blank" rel="noopener noreferrer" className="underline ml-1">Tiled</a>.
            </>
        ),
    },
    {
        icon: FaFileAlt,
        title: "Crea un projecte nou",
        description: "Obre l'editor Tiled i crea un projecte nou (la grandaria de el sprite ha de ser de 16x16), pots seleccionar l'opció d'infinit.",
    },
    {
        icon: FaLayerGroup,
        title: "Utilitza aquesta imatge com Tileset i crea totes les capes, tenint en compte que el conjunt de patrons ha de ser de 16x16 pixels i seleccionar l'opció d'empotrar en el mapa.",
        description: (
            <>
                <p>
                    Utilitza aquesta imatge com 
                    <a href="/assets/White-terrain.png" download className="underline ml-1">Tileset</a>.
                </p>
                <p className="mt-4">Crea totes les capes que vulguis que tingui el teu mapa, tenint en compte el següent:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Si el mapa és de dificultat 1, les capes obligatòries són: Red, Blue i Purple.</li>
                    <li>Si el mapa és de dificultat 2, les capes obligatòries són: Red, Blue, Purple, Orange, Green i Yellow.</li>
                    <li>Si el mapa és de dificultat 3, les capes obligatòries són: Red, Blue, Purple, Orange, Green, Yellow, White, Black i Gray.</li>
                </ul>
            </>
        ),
    },
    {
        icon: FaLayerGroup,
        title: "Noms i tipus d'objectes i variables dels objectes",
        description: (
            <>
                <p>Noms i tipus d'objectes:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Tots han d'estar a la capa d'objectes, que es diu "objects".</li>
                    <li>Si vols crear una plataforma, el seu nom ha de ser "platform".</li>
                    <li>Si es vol crear un botó, el seu nom ha de ser "button".</li>
                    <li>El jugador 1 apareixerà d'un objecte que es diu "spawn-1" i el jugador 2 d'un objecte que es diu "spawn-2".</li>
                    <li>Les banderes de final de partida es diuen "endGame".</li>
                    <li>Les zones de mort s'han de dir "death".</li>
                </ul>
                <p className="mt-4">Variables dels objectes:</p>
                <ul className="list-disc list-inside ml-4">
                    <li><strong>button:</strong> affected (a quina plataforma afecta), color (Red, Bla, Pur, Gre, Gra, Yel, Blu, Ora, Whi).</li>
                    <li><strong>platform:</strong> affected, color, direction (up, down, left, right), movement (quant es mou), velocity (Fast, Normal).</li>
                    <li><strong>endGame:</strong> player (1 o 2).</li>
                </ul>
            </>
        ),
    },
    {
        icon: FaSave,
        title: "Guarda el mapa",
        description: "Guarda el mapa amb el nom que vulguis en format .json.",
    },
    {
        icon: FaUpload,
        title: "Puja el mapa",
        description: (
            <>
                Puja el mapa <a href="/mapas" className="underline">aquí</a> i a jugar!
            </>
        ),
    },
];

const HowToPlay = () => {
    return (
        <div>
            <Header />
            <div className="min-h-screen w-full flex flex-col bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                <div className="mt-9 pt-9 text-center">
                    <h1 className="text-6xl mb-4 mt-10 font-bold">COM CREAR MAPES?</h1>
                </div>
                <div className="flex flex-col items-center justify-center">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-start bg-blue-950 bg-opacity-30 p-5 m-4 rounded-lg w-4/5 lg:w-3/5">
                            <div className="flex items-center mb-2">
                                <step.icon className="text-2xl mr-2" />
                                <h2 className="text-2xl font-bold">{step.title}</h2>
                            </div>
                            <div className="text-lg text-justify">{step.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowToPlay;
