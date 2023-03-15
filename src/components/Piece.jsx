import React from "react";

const Piece = ({ isBlack }) => {
  return (
    <div
      className={`${
        isBlack ? "bg-black" : "bg-white"
      } rounded-full absolute w-4/5 h-4/5 inset-[10%] cursor-pointer`}
    ></div>
  );
};

export default Piece;
