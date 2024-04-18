import React from 'react';

function Rooms() {
    // Generamos un array de 20 salas con nombres genéricos
    const rooms = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `Sala ${index + 1}`
    }));

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
            <div className="flex w-3/6"> {/* Ajuste el ancho aquí */}
                {/* Columna de las salas */}
                <div className="bg-white shadow-md rounded-lg p-4 flex-grow w-2/5"> {/* Ajuste el ancho aquí */}
                    <div className="bg-gray-100 rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">Salas Disponibles</h2>
                        <div className="max-h-52 overflow-y-auto">
                            <ul>
                                {rooms.map(room => (
                                    <li key={room.id} className="mb-2 text-gray-800">{room.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Espacio entre las salas y los botones */}
                <div className="w-8"></div> {/* Reduce el ancho del espacio entre las salas y los botones */}

                {/* Columna de los botones */}
                <div className="rounded-lg p-4 flex flex-col">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold rounded my-12 h-16 w-46">CREAR SALA</button>
                    <div className="grid grid-cols-6 gap-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder="#"
                                maxLength="1"
                                className="bg-white border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-400 h-16 text-gray-800 placeholder-gray-500 text-base text-center"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rooms;
