import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../components/header';

const IndexPage = () => {
  const [isIframeVisible, setIsIframeVisible] = useState(false);

  const toggleIframeVisibility = () => {
    setIsIframeVisible(!isIframeVisible);
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen flex flex-col justify-center items-center">
      <Header />
      <div className='flex flex-col justify-center items-center'>
        <h1 className="text-6xl font-bold text-white text-center mb-5">CHROMATIC BOND</h1>
        <Link href="/rooms">
          <button className="text-2xl text-white font-bold py-2 px-4 rounded bg-indigo-500 hover:bg-indigo-700">JUGAR</button>
        </Link>
        <div className='absolute bottom-5 left-5 flex flex-col items-start'>
          {isIframeVisible && (
            <iframe
              src="https://discord.com/widget?id=1241064242988322896&theme=dark"
              width="350"
              height="500"
              allowtransparency="true"
              frameborder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="mb-2"
            ></iframe>
          )}
          <svg 
            onClick={toggleIframeVisibility} 
            xmlns="http://www.w3.org/2000/svg" 
            width="60" 
            height="60" 
            viewBox="0 0 40 40" 
            style={{ cursor: 'pointer' }} // This adds a pointer cursor to indicate the SVG is clickable
          >
            <path fill="#98ccfd" d="M10,37.5c-4.136,0-7.5-3.364-7.5-7.5V10c0-4.136,3.364-7.5,7.5-7.5h20c4.136,0,7.5,3.364,7.5,7.5v20 c0,4.136-3.364,7.5-7.5,7.5H10z"></path>
            <path fill="#4788c7" d="M30,3c3.86,0,7,3.14,7,7v20c0,3.86-3.14,7-7,7H10c-3.86,0-7-3.14-7-7V10c0-3.86,3.14-7,7-7H30 M30,2H10c-4.418,0-8,3.582-8,8v20c0,4.418,3.582,8,8,8h20c4.418,0,8-3.582,8-8V10C38,5.582,34.418,2,30,2L30,2z"></path>
            <g>
              <path fill="#fff" d="M30.909,11.909c0,0-3.126-2.446-6.818-2.727l-0.333,0.665c3.338,0.817,4.87,1.987,6.469,3.425 C27.469,11.865,24.746,11,20,11s-7.469,0.865-10.227,2.273c1.6-1.438,3.421-2.737,6.469-3.425l-0.333-0.665 c-3.873,0.366-6.818,2.727-6.818,2.727s-3.492,5.062-4.091,15C8.52,30.968,13.864,31,13.864,31l1.118-1.49 c-1.897-0.659-4.039-1.837-5.89-3.965C11.299,27.216,14.631,29,20,29s8.701-1.784,10.909-3.455 c-1.851,2.128-3.993,3.305-5.89,3.965L26.136,31c0,0,5.344-0.032,8.864-4.091C34.401,16.972,30.909,11.909,30.909,11.909z M15.541,24.3c-1.318,0-2.432-1.118-2.432-2.624s1.114-2.838,2.432-2.838s2.432,1.332,2.432,2.838S16.858,24.3,15.541,24.3z M24.459,24.3c-1.318,0-2.432-1.118-2.432-2.624s1.114-2.838,2.432-2.838c1.318,0,2.432,1.332,2.432,2.838S25.777,24.3,24.459,24.3 z"></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
