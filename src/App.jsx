import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Board from "./components/Board";
import HowToModal from "./components/UI/HowToModal";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <BrowserRouter>
        <HowToModal isOpen={isOpen} toggleModal={toggleModal} />
        <Routes>
          <Route path="/" element={<Menu toggleModal={toggleModal} />} />
          <Route path="/play" element={<Board rows={8} cols={8} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
