import React from "react";

const Square = ({ isBlack, children, onClick }) => {
  return (
    <div
      className={`${
        isBlack ? "bg-[#b58863]" : " bg-[#f0d9b5]"
      } relative w-full h-0 pb-[100%]`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Square;
