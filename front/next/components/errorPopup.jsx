import React from "react";

const ErrorPopup = ({ type, message }) => {
  let popupColor = "";
  let popupPosition = "";


   const bgError = () => {
    if(type === "error"){
      <div className={`fixed left-0 w-full ${popupPosition} flex justify-center z-50`}>
        <div className={`bg-white p-4 rounded-md shadow-lg bg-red-500`}>
          <p className="text-black">{message}</p>
        </div>
      </div>
      console.log("error");
    } else if(type === "incomplete"){
      <div className={`fixed left-0 w-full ${popupPosition} flex justify-center z-50`}>
        <div className={`bg-white p-4 rounded-md shadow-lg bg-orange-500`}>
          <p className="text-black">{message}</p>
        </div>
      </div>
      console.log("incomplete");
    } else if(type === "success"){
      <div className={`fixed left-0 w-full ${popupPosition} flex justify-center z-50`}>
        <div className={`bg-white p-4 rounded-md shadow-lg bg-green-500`}>
          <p className="text-black">{message}</p>
        </div>
      </div>
      console.log("success");
    } else {
      <div className={`fixed left-0 w-full ${popupPosition} flex justify-center z-50`}>
        <div className={`bg-white p-4 rounded-md shadow-lg bg-gray-500`}>
          <p className="text-black">{message}</p>
        </div>
      </div>
      console.log("default");
    }
   }

  console.log(popupColor);
  console.log(type);
  console.log(message);
  // switch (type) {
  //   case "error":
  //     popupColor = "bg-red-500";
  //     break;
  //   case "incomplete":
  //     popupColor = "bg-orange-500";
  //     break;
  //   case "success":
  //     popupColor = "bg-green-500";
  //     break;
  //   default:
  //     popupColor = "bg-gray-500";
  // }
  
  popupPosition = "top-36";

  return (
    <div className={`fixed left-0 w-full ${popupPosition} flex justify-center z-50`}>
      <div className={`bg-white p-4 rounded-md shadow-lg ${popupColor }`}>
        <p className="text-black">{message}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;
