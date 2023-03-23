import React from "react";

const Modal = ({ isOpen, toggleModal }) => {


  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          {/* Add a semi-transparent background behind the modal */}
          <div className="absolute w-full h-full bg-gray-800 opacity-75"></div>
          <div className="modal-container bg-white w-4/5 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content text-left px-6 py-4">
              <h2 className="text-2xl font-bold mb-4">Game Mechanics:</h2>
              <p className="mb-4">
                - Each player has a 10-minute playtime to play out their game
                <br />
                - After capture, check if the unsay value nga na capture, for instance
                a number 6 piece captured a number 9 piece on an addition square,
                then dapat naay mo pop up na equation for them to solve like 6+9=?
                <br />
                - Give them a 30-second/1-minute interval to solve
                <br />
                - Then check if the answer is correct. If the answer is correct, they
                get a point. However, if they do not get the answer correct, they get
                a penalty of their time, a 30-seconds (or depends) minus to their
                overall playing time
                <br />
                - Scoring system: highest points to win until either; mahurot ang
                playtime or no pieces left on the board
              </p>
              {/* Add an "X" button to close the modal */}
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-2xl font-bold cursor-pointer"
                onClick={toggleModal}
              >
                &times;
              </button>
              {/* Add a "Close" button to close the modal */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
