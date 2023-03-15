import React from "react";

import Board from "./components/Board";

const App = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <h1 className=" font-bold text-4xl text-slate-800">DaMath</h1>
        <Board rows={8} cols={8} />
      </div>
    </>
  );
};

export default App;
