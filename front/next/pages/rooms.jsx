import React, { useRef } from 'react';

function Rooms() {
    // Generamos un array de 20 salas con nombres genéricos
    const rooms = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `Sala ${index + 1}`
    }));

    // Refs para los inputs
    const inputRefs = Array.from({ length: 6 }, () => useRef(null));

    // Función para manejar el cambio de input
    const handleChange = (index, e) => {
        const input = e.target;
        let value = input.value;

        // Convertir el valor a mayúsculas
        value = value.toUpperCase();

        // Asignar el valor convertido al input
        input.value = value;

        // Enfocar el siguiente input si existe
        if (index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    // Función para manejar el evento de tecla presionada
    const handleKeyDown = (index, e) => {
        const { key } = e;

        if (key === 'ArrowLeft' || key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = key === 'ArrowLeft' ? index - 1 : index + 1;

            if (nextIndex >= 0 && nextIndex < inputRefs.length) {
                inputRefs[nextIndex].current.focus();
            }
        } else if (key === 'Backspace') {
            // Si el input no está vacío, borrar el último carácter
            if (inputRefs[index].current.value !== '') {
                return;
            }

            // Enfocar el input anterior si no está en el primer input
            if (index > 0) {
                // Limpiar el valor del input actual
                inputRefs[index].current.value = '';
                // Enfocar el input anterior
                inputRefs[index - 1].current.focus();
            }
        } else if (key === 'Delete') {
            // Si el input no está vacío, borrar el primer carácter
            if (inputRefs[index].current.value !== '') {
                return;
            }

            // Enfocar el siguiente input si no está en el último input
            if (index < inputRefs.length - 1) {
                // Limpiar el valor del input actual
                inputRefs[index].current.value = '';
                // Enfocar el input siguiente
                inputRefs[index + 1].current.focus();
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
            <div className="flex w-4/12"> {/* Ajuste el ancho aquí */}
                {/* Columna de las salas */}
                <div className="bg-white shadow-md rounded-lg p-4 flex-grow"> {/* Ajuste el ancho aquí */}
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
            </div>

            {/* Espacio entre las salas y los botones */}
            <div className="w-32"></div> {/* Reduce el ancho del espacio entre las salas y los botones */}

            {/* Columna de los botones */}
            <div className="rounded-lg p-4 flex flex-col w-3/12"> {/* Ajuste el padding y el ancho aquí */}
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold rounded my-16 h-12 focus:outline-none">CREAR SALA</button> {/* Ajuste el tamaño aquí */}
                <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            ref={inputRefs[index]}
                            className="bg-white border border-gray-300 rounded-lg px-1 py-1 focus:outline-none focus:border-blue-400 h-12 text-gray-800 placeholder-gray-500 text-base text-center caret-transparent"
                            onChange={e => handleChange(index, e)}
                            onKeyDown={e => handleKeyDown(index, e)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Rooms;
