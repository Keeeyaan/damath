import React from "react";

const Piece = ({ isBlue, value }) => {
  return (
    <div
      className={`${
        isBlue ? "bg-blue-500" : "bg-red-500"
      } rounded-full absolute w-4/5 h-4/5 inset-[10%] cursor-pointer flex items-center justify-center`}
    >
      <span className=" text-white font-bold text-2xl">{value}</span>
    </div>
  );
};

export default Piece;
