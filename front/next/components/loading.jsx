import React from 'react';

const Loading = () => {
    return (
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-pulse"></div>
        </div>
    );
};

export default Loading;
