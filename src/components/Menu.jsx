import { Link } from "react-router-dom";

const Menu = ({ toggleModal }) => {

  return (
    <div className="m-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="mb-5 font-bold text-5xl text-slate-800">DaMath</h1>
      <div className="flex flex-col gap-2 items-center">
        <Link to="/play">
          <button className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-600 rounded">
            Play
          </button>
        </Link>
        <button className="bg-slate-500 hover:bg-slate-600 text-white font-bold border py-2 px-4 border-slate-600 rounded" onClick={toggleModal}>
          How to play?
        </button>
      </div>
    </div>
  );
};

export default Menu;
