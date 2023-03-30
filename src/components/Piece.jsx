import React from "react";

const Piece = ({ isBlue, value, isSelected }) => {
  const pieceStyle = isSelected ? "outline outline-3 outline-slate-700" : "";

  return (
    <div
      className={`${
        isBlue ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600"
      } rounded-full absolute w-4/5 h-4/5 inset-[10%] cursor-pointer flex items-center justify-center transition ease-in-out ${pieceStyle}`}
    >
      <span className=" text-white font-bold text-2xl">{value}</span>
    </div>
  );
};

export default Piece;
