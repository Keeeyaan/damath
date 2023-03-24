import { Link } from "react-router-dom";

import RestartAlt from "@mui/icons-material/RestartAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Board from "./Board";
import ScoreBoard from "./ScoreBoard";

const Game = () => {
  return (
    <div className="grid grid-flow-col grid-cols-2 place-items-center h-screen">
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
        <Board rows={8} cols={8} />
      </div>
      <ScoreBoard />
    </div>
  );
};

export default Game;
