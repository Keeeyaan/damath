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
                - When a player captures a piece, an equation pops up for them
                to solve based on the values of the captured piece, the piece
                they moved, and the operator on which the piece landed. For
                example, if a number 6 piece captures a number 9 piece on an
                addition square, the equation displayed is 6 + 9 = ?
                <br />
                <br />
                - The player has 30-second to solve
                <br />
                <br />
                - If the player correctly solves the equation, they receive a
                point. However, if they provide an incorrect answer, a penalty
                is imposed by deducting 30 seconds (or a duration that depends)
                from their overall playing time.
                <br />
                <br />- Scoring system: The player with the highest points wins
                until either their playtime is over or there are no pieces left
                on the board.
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
