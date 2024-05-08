import React from "react";

const ErrorPopup = ({ type, message }) => {
  let popupColor = "";
  let popupPosition = "";
  let popupTextColor = "";

  console.log(popupColor);
  console.log(type);
  console.log(message);

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
  }
  
  popupPosition = "top-36";

  console.log(popupColor);
  console.log(popupPosition);

  return (
    <div className={`fixed left-0 w-full ${popupPosition} flex justify-center z-50`}>
      <div className={`p-4 rounded-md shadow-lg ${popupColor}`}>
        <p className={`${popupTextColor}`}>{message}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;