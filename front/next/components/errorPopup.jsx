import React, { useState, useEffect } from "react";

const ErrorPopup = ({ type, message }) => {
  const [isOpen, setIsOpen] = useState(false);

  let popupColor = "";
  let popupPosition = "";
  let popupTextColor = "";

  switch (type) {
    case "error":
      popupColor = "bg-red-500";
      popupTextColor = "text-white";
      break;
    case "incomplete":
      popupColor = "bg-orange-500";
      popupTextColor = "text-white";
      break;
    case "success":
      popupColor = "bg-green-500";
      popupTextColor = "text-white";
      break;
    case "info":
      popupColor = "bg-yellow-500";
      popupTextColor = "text-black";
      break;
    default:
      popupColor = "bg-gray-500"; 

  }
  
  popupPosition = "top-36";


  useEffect(() => {
    if (message) {
      setIsOpen(true); 
      const timer = setTimeout(() => {
        setIsOpen(false); 
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }
  , [message]);

  if (!isOpen) {
    return null; 
  }

  return (
    <div className={`fixed left-0 w-full ${popupPosition} flex justify-center z-50`}>
      <div className={`p-4 rounded-md shadow-lg ${popupColor}`}>
        <p className={`${popupTextColor}`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default ErrorPopup;
