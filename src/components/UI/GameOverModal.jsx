import { Link } from "react-router-dom";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import Modal from "./Modal";
const GameOverModal = () => {
  return (
    <Modal>
      <div className=" bg-[#ebd1bc] rounded shadow-lg max-h-[500px] h-[200px] max-w-[500px] w-[450px] flex justify-center items-center flex-col gap-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Player <span className="text-blue-500">Blue</span> Wins!
        </h1>
        <div className="flex gap-4">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded transition ease-in-out">
            <CancelIcon /> Exit
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded transition ease-in-out">
            <PlayCircleIcon /> Play Again
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GameOverModal;
