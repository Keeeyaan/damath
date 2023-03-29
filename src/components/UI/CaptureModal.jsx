import React, { useRef, useState } from "react";

import Modal from "./Modal";
import Timer from "../Timer";

const CaptureModal = ({
  onSubmit,
  onComplete,
  captureValue,
  currentPlayer,
  capturedProgress,
}) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const answerRef = useRef();

  const submitHandler = () => {
    onSubmit(answerRef);
  };

  return (
    <Modal>
      <div className="mb-4 p-5 bg-white rounded">
        {currentPlayer && capturedProgress ? (
          <h1 className="font-medium text-blue-400 text-center text-2xl mb-2">
            Player Blue
          </h1>
        ) : !currentPlayer && capturedProgress ? (
          <h1 className="font-medium text-red-400 text-center text-2xl mb-2">
            Player Red
          </h1>
        ) : currentPlayer ? (
          <h1 className="font-medium text-red-400 text-center text-2xl mb-2">
            Player Red
          </h1>
        ) : !currentPlayer ? (
          <h1 className="font-medium text-blue-400 text-center text-2xl mb-2">
            Player Blue
          </h1>
        ) : (
          ""
        )}

        <hr />
        <Timer
          className="my-4 font-semibold text-gray-600 text-center text-3xl"
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          runOnStart
          onComplete={onComplete}
        />
        <hr />
        <div className="mt-4">
          <label
            className="block text-gray-700 text-4xl font-bold mb-2 text-center"
            htmlFor="useranswer"
          >
            {`${captureValue.capturer} ${captureValue.operator} ${captureValue.captured}`}
          </label>
          <input
            ref={answerRef}
            autoFocus
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="useranswer"
            type="text"
            placeholder="Input answer"
            autoComplete="off"
          />
        </div>
        <div className=" flex justify-center">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition ease-in-out mt-5 text-center"
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CaptureModal;
