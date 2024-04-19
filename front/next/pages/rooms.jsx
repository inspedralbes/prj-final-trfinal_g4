import React, { useRef } from 'react';
import Link from 'next/link';

function Rooms() {
    const rooms = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `Sala ${index + 1}`
    }));

    const inputRefs = Array.from({ length: 6 }, () => useRef(null));

    const handleChange = (index, e) => {
        const { value } = e.target;
        const newValue = value.toUpperCase();

        e.target.value = newValue;

        if (index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        const { key } = e;

        if (key === 'ArrowLeft' || key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = key === 'ArrowLeft' ? index - 1 : index + 1;

            if (nextIndex >= 0 && nextIndex < inputRefs.length) {
                inputRefs[nextIndex].current.focus();
            }
        } else if (key === 'Backspace') {
            if (index > 0) {
                if (inputRefs[index].current.value === '') {
                    inputRefs[index - 1].current.focus();
                } else {
                    inputRefs[index].current.value = '';
                }
            }
        } else if (key === 'Delete') {
            if (inputRefs[index].current.value === '') {
                if (index < inputRefs.length - 1) {
                    inputRefs[index + 1].current.focus();
                }
            } else {
                for (let i = index; i < inputRefs.length - 1; i++) {
                    inputRefs[i].current.value = inputRefs[i + 1].current.value;
                }
                inputRefs[inputRefs.length - 1].current.value = '';
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
            <div className="flex w-4/12">
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
            </div>

            <div className="w-32"></div>

            <div className="rounded-lg p-4 flex flex-col w-3/12">
                <Link href="/create">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded my-14 h-12 w-32 mx-40 focus:outline-none">CREAR SALA</button>
                </Link>
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            ref={inputRefs[index]}
                            className="bg-white border border-gray-300 rounded-lg px-1 py-1 focus:outline-none h-12 text-gray-800 placeholder-gray-500 text-base text-center caret-transparent"
                            onChange={e => handleChange(index, e)}
                            onKeyDown={e => handleKeyDown(index, e)}
                        />
                    ))}
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded mb-14 h-12 focus:outline-none flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="40" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Rooms;
