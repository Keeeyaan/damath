import { Link } from "react-router-dom";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import Modal from "./Modal";

const GameOverModal = ({ winner }) => {
  return (
    <Modal>
      <div className=" bg-[#f8d7bc] rounded shadow-lg max-h-[500px] h-[200px] max-w-[500px] w-[450px] ">
        <div className="text-center flex justify-evenly items-center flex-col h-full">
          <h1 className="text-3xl font-bold text-gray-900 ">Game Result</h1>
          {winner === "Blue" ? (
            <h1 className="text-3xl font-bold text-gray-800">
              Player <span className="text-blue-500">Blue</span> Wins!
            </h1>
          ) : winner === "Red" ? (
            <h1 className="text-3xl font-bold text-gray-800">
              Player <span className="text-red-500">Red</span> Wins!
            </h1>
          ) : winner === "Draw" ? (
            <h1 className="text-3xl font-bold text-green-600">Draw!</h1>
          ) : (
            ""
          )}
          <div className="flex gap-4">
            <Link to="/">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded transition ease-in-out">
                <CancelIcon /> Exit
              </button>
            </Link>

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded transition ease-in-out"
              onClick={() => window.location.reload(false)}
            >
              <PlayCircleIcon /> Play Again
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GameOverModal;
