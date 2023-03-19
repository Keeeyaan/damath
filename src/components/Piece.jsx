import React from "react";

const Piece = ({ isBlack, value }) => {
  return (
    <div
      className={`${
        isBlack ? " bg-red-500" : "bg-blue-500"
      } rounded-full absolute w-4/5 h-4/5 inset-[10%] cursor-pointer`}
    >
      <span className="text-center text-white flex justify-center items-center">
        {value}
      </span>
    </div>
  );
};

export default Piece;
