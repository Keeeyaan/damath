import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Board from "./components/Board";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/play" element={<Board rows={8} cols={8} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
