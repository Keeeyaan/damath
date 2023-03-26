import React from "react";

import Timer from "../hooks/Timer";

const ScoreBoard = ({
  playerBlueScore,
  playerRedScore,
  redTimeLeft,
  setRedTimeLeft,
  blueTimeLeft,
  setBlueTimeLeft,
}) => {
  return (
    <div className="h-[450px] w-[500px] bg-[#e6bb99] shadow-md rounded p-6 ">
      <div className="flex justify-around">
        <div>
          <Timer
            timeLeft={blueTimeLeft}
            setTimeLeft={setBlueTimeLeft}
            runOnStart
          />
          <div className="bg-[#f0d9b5] p-4 rounded text-center">
            <h1 className=" font-bold text-blue-500 mb-2 text-xl ">
              Player Blue
            </h1>
            <span className=" font-bold text-3xl text-gray-900">
              {playerBlueScore}
            </span>
          </div>
        </div>
        <div>
          <Timer
            timeLeft={redTimeLeft}
            setTimeLeft={setRedTimeLeft}
            runOnStart
          />
          <div className="bg-[#f0d9b5] p-4 rounded text-center">
            <h1 className=" font-bold text-red-500 mb-2 text-xl ">
              Player Red
            </h1>
            <span className=" font-bold text-3xl text-gray-900">
              {playerRedScore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
