import React, { useState } from "react";
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
  const [currentTurn, setCurrentTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameIsStart, setGameIsStart] = useState(false);

  const minusRedCountdown = () => {
    setRedTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 30, 0));
  };
  const minusBlueCountdown = () => {
    setBlueTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 30, 0));
  };

  const addPlayerBlueScoreHandler = () => {
    setPlayerBlueScore((playerBlueScore) => playerBlueScore + 1);
  };
  const addPlayerRedScoreHandler = () => {
    setPlayerRedScore((playerRedScore) => playerRedScore + 1);
  };

  const playerTimerCompleteHandler = () => {
    if (playerBlueScore < playerRedScore) {
      setWinner("Red");
    } else if (playerBlueScore > playerRedScore) {
      setWinner("Blue");
    } else {
      setWinner("Draw");
    }
    setGameOver(true);
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
            playerBlueScore={playerBlueScore}
            playerRedScore={playerRedScore}
            setCurrentTurn={setCurrentTurn}
            setGameIsStart={setGameIsStart}
            winner={winner}
            setWinner={setWinner}
            gameOver={gameOver}
            setGameOver={setGameOver}
          />
        </div>
        <ScoreBoard
          currentTurn={currentTurn}
          redTimeLeft={redTimeLeft}
          blueTimeLeft={blueTimeLeft}
          setRedTimeLeft={setRedTimeLeft}
          setBlueTimeLeft={setBlueTimeLeft}
          playerBlueScore={playerBlueScore}
          playerRedScore={playerRedScore}
          onTimerComplete={playerTimerCompleteHandler}
          gameIsStart={gameIsStart}
        />
      </div>
    </div>
  );
};

export default Game;
