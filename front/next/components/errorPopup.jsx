import React from "react";

const ErrorPopup = ({ message }) => {

    

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-lg">
                <p className="text-red-500">{message}</p>
            </div>
        </div>
    );
};

export default ErrorPopup;