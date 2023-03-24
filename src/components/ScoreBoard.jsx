import React from "react";

const ScoreBoard = ({}) => {
  return (
    <div className="h-[450px] w-[500px] bg-[#e6bb99] shadow-md rounded p-6 ">
      <div className="flex justify-around">
        <div className="bg-[#f0d9b5] p-4 rounded text-center">
          <h1 className=" font-bold text-blue-500 mb-2 text-xl ">
            Player Blue
          </h1>
          <span className=" font-bold text-3xl text-gray-900">0</span>
        </div>
        <div className="bg-[#f0d9b5] p-4 rounded text-center">
          <h1 className=" font-bold text-red-500 mb-2 text-xl ">Player Red</h1>
          <span className=" font-bold text-3xl text-gray-900">0</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
