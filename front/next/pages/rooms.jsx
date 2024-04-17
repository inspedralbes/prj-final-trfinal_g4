import React from 'react';

function Rooms() {
    // Generamos un array de 20 salas con nombres genéricos
    const rooms = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `Sala ${index + 1}`
    }));

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
            <div className="flex w-1/3"> {/* Div principal */}
                {/* Columna de las salas */}
                <div className="bg-white shadow-md rounded-lg p-4 flex-grow">
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
                <div className="w-4"></div>

                {/* Columna de los botones */}
                <div className="rounded-lg p-4 flex flex-col">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold rounded m-10 h-20 w-36">Botón 1</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold rounded m-10 h-20 w-36">Botón 2</button>
                </div>
            </div>
        </div>
    );
}

export default Rooms;
