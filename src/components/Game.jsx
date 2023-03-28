import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import RestartAlt from "@mui/icons-material/RestartAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Board from "./Board";
import ScoreBoard from "./ScoreBoard";

const Game = () => {
  const [playerBlueScore, setPlayerBlueScore] = useState(0);
  const [playerRedScore, setPlayerRedScore] = useState(0);
  const [redTimeLeft, setRedTimeLeft] = useState(600);
  const [blueTimeLeft, setBlueTimeLeft] = useState(600);

  const minusRedCountdown = () => {
    setRedTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 30, 0));
  };
  const minusBlueCountdown = () => {
    setBlueTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 30, 0));
  };

  const addPlayerBlueScoreHandler = () => {
    setPlayerBlueScore(playerBlueScore + 1);
  };
  const addPlayerRedScoreHandler = () => {
    setPlayerRedScore(playerRedScore + 1);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex items-center justify-evenly gap-40">
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex gap-4">
            <Link to="/">
              <button className="bg-slate-600 hover:bg-slate-700 text-white font-bold border py-2 px-2 rounded transition ease-in-out">
                <ArrowBackIcon />
              </button>
            </Link>
            <button className=" bg-lime-600 hover:bg-lime-700 text-white font-bold border py-2 px-2 rounded transition ease-in-out ">
              <RestartAlt onClick={() => window.location.reload(false)} />
            </button>
          </div>
          <Board
            rows={8}
            cols={8}
            onAddPlayerRedScore={addPlayerRedScoreHandler}
            onAddPlayerBlueScore={addPlayerBlueScoreHandler}
            minusRedCountdown={minusRedCountdown}
            minusBlueCountdown={minusBlueCountdown}
          />
        </div>
        {/* <ScoreBoard
          redTimeLeft={redTimeLeft}
          blueTimeLeft={blueTimeLeft}
          setRedTimeLeft={setRedTimeLeft}
          setBlueTimeLeft={setBlueTimeLeft}
          playerBlueScore={playerBlueScore}
          playerRedScore={playerRedScore}
        /> */}
      </div>
    </div>
  );
};

export default Game;
