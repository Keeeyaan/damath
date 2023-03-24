import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Game from "./components/Game";

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
          <Route path="/play" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
