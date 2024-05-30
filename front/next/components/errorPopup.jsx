import React, { useEffect, useState } from "react";

const ErrorPopup = ({ type, message, clearMessage }) => {
  let popupColor = "";
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

  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    if (message) {
      setDisplayMessage(message);
      const timer = setTimeout(() => {
        setDisplayMessage("");
        if (clearMessage) {
          clearMessage();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  return (
    <div className="fixed top-0 inset-x-0 flex justify-center items-center z-50 mt-10 pointer-events-none">
      {displayMessage && (
        <div className={`p-4 rounded-md shadow-lg ${popupColor} pointer-events-auto`}>
          <p className={`${popupTextColor}`}>
            {displayMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default ErrorPopup;
