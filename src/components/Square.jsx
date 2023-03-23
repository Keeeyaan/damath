import React from "react";

const Square = ({ isBlack, children, onClick }) => {
  return (
    <div
      className={`${
        isBlack ? "bg-[#b58863]" : " bg-[#f0d9b5]"
      } relative w-[70px] h-[70px]`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Square;
