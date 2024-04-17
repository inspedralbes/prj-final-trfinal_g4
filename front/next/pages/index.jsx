import React from 'react';

const IndexPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen flex flex-col justify-between p-4">
      <div className="flex flex-col md:flex-row md:justify-end md:items-start">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4 mt-4 md:mt-0">Login</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0">Registro</button>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-white mb-8">CHROMATIC BONDfabianTONTO</h1>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Inicio</button>
      </div>
    </div>
  );
}

export default IndexPage;
