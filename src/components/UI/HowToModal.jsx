import Modal from "./Modal";

const HowToModal = ({ isOpen, toggleModal }) => {
  return (
    <>
      {isOpen && (
        <Modal toggleModal={toggleModal}>
          <div className="bg-white rounded shadow-lg overflow-y-auto">
            <div className=" px-6 py-4">
              <h2 className="text-2xl font-bold mb-4">Game Mechanics:</h2>
              <p className="mb-4">
                - Each player has a 10-minute playtime to play out their game
                <br />
                <br />
                - After capture, check if the unsay value nga na capture, for
                instance a number 6 piece captured a number 9 piece on an
                addition square, then dapat naay mo pop up na equation for them
                to solve like 6+9=?
                <br />
                <br />
                - Give them a 30-second/1-minute interval to solve
                <br />
                <br />
                - Then check if the answer is correct. If the answer is correct,
                they get a point. However, if they do not get the answer
                correct, they get a penalty of their time, a 30-seconds (or
                depends) minus to their overall playing time
                <br />
                <br />- Scoring system: highest points to win until either;
                mahurot ang playtime or no pieces left on the board
              </p>

              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-2xl font-bold cursor-pointer"
                onClick={toggleModal}
              >
                &times;
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default HowToModal;
