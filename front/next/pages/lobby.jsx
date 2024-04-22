import React, { useState, useEffect } from 'react';
import Loading from '../components/loading';

const Lobby = () => {
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
        setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen flex flex-col justify-center items-center p-4  text-white'>
            <div className='min-h-[600px] min-w-[650px] bg-black flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-bold tracking-wider'>ESPERANT ACOMPANYANT</h1>
                
            </div>
            
            {/* {loading ? <Loading /> : <h1>Data Loaded!</h1>} */}
        </div>
    );
};
export default Lobby;