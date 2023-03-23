import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Menu from "./components/Menu";
import Board from "./components/Board";
import Modal from "./components/Modal";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu toggleModal={toggleModal} />} />
          <Route path="/play" element={<Board rows={8} cols={8} />} />
        </Routes>
        <Modal isOpen={isOpen} toggleModal={toggleModal} />
      </BrowserRouter>
    </>
  );
};

export default App;
