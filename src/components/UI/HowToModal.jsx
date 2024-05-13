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
                <span className="font-semibold">1. Playtime Limit:</span> Each
                player has a maximum of 10 minutes to complete their game.
                <br />
                <br />
                <span className="font-semibold">2. Equation Prompt:</span> When
                a player captures a piece, an equation will appear based on the
                values of the captured piece, the moving piece, and the operator
                square on which the piece lands. For example, if a piece with a
                value of 6 captures a piece with a value of 9 on an addition
                square, the equation displayed will be "6 + 9 = ?".
                <br />
                <br />
                <span className="font-semibold">3. Time Limit to Solve: </span>
                Players have 30 seconds to solve each equation.
                <br />
                <br />
                <span className="font-semibold">4. Scoring System:</span>
                <br />
                <br />
                <span className="font-semibold">- Correct Answer:</span> If the
                player correctly solves the equation, they earn one point.
                <br />
                <span className="font-semibold">- Incorrect Answer:</span>{" "}
                Providing an incorrect answer results in a penalty. In addition
                to the loss of the point, 30 seconds will be deducted from the
                player's remaining playtime.
                <br />
                <br />
                <span className="font-semibold">5. Winning Condition:</span> The
                player with the highest score wins. If either player's playtime
                expires or there are no more pieces left on the board, the game
                ends.
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
