import React from "react";

const Piece = ({ isBlack, value }) => {
  return (
    <div
      className={`${
        isBlack ? " bg-red-500" : "bg-blue-500"
      } rounded-full absolute w-4/5 h-4/5 inset-[10%] cursor-pointer flex items-center justify-center`}
    >
      <span className=" text-white font-bold text-2xl">{value}</span>
    </div>
  );
};

export default Piece;
