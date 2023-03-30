import React from "react";

import Timer from "./Timer";

const ScoreBoard = ({
  playerBlueScore,
  playerRedScore,
  redTimeLeft,
  setRedTimeLeft,
  blueTimeLeft,
  setBlueTimeLeft,
  currentTurn,
  onTimerComplete,
}) => {
  return (
    <div className="h-[450px] w-[500px] bg-[#e6bb99] shadow-md rounded p-6 ">
      <div className="flex flex-col justify-evenly gap-20">
        <div className="flex justify-around">
          <div>
            <Timer
              className="font-semibold text-center text-3xl mb-2"
              timeLeft={blueTimeLeft}
              setTimeLeft={setBlueTimeLeft}
              runOnStart
              onComplete={onTimerComplete}
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
              className="font-semibold text-center text-3xl mb-2"
              timeLeft={redTimeLeft}
              setTimeLeft={setRedTimeLeft}
              runOnStart
              onComplete={onTimerComplete}
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
        <div className="text-center text-gray-900 text-3xl font-semibold">
          {currentTurn ? (
            <h1 className="">
              Current Turn Is {""}
              <span className="text-blue-600 font-bold">Blue</span>
            </h1>
          ) : (
            <h1 className="">
              Current Turn Is {""}
              <span className="text-red-600 font-bold">Red</span>
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
