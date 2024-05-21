import React, { useEffect, useState } from "react";

const ErrorPopup = ({ type, message }) => {
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

  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    if (message) {
      setDisplayMessage(message);
      const timer = setTimeout(() => {
        setDisplayMessage("");
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [message]);

  return (
    <div className={`fixed left-0 w-full ${popupPosition} flex justify-center z-50`}>
      {displayMessage && (
        <div className={`p-4 rounded-md shadow-lg ${popupColor}`}>
          <p className={`${popupTextColor}`}>
            {displayMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default ErrorPopup;
