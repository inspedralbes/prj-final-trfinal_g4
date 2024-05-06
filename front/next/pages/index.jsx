import React from 'react';
import Link from 'next/link';
import Header from '../components/header';


const IndexPage = () => {
  return (
    <div>
      <Header />
      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen flex flex-col justify-between p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white mb-8">CHROMATIC BOND</h1>
          <Link href="/rooms">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">JUGAR</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
