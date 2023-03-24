import Modal from "./Modal";
import Countdown from "react-countdown";

const CaptureModal = ({ setCapturedModalToggle, onComplete, captureValue }) => {
  return (
    <Modal>
      <div className="mb-4 p-5 bg-white rounded">
        <Countdown date={Date.now() + 10000} onComplete={onComplete} />
        <div>
          <label
            className="block text-gray-700 text-3xl font-bold mb-2 text-center"
            htmlFor="useranswer"
          >
            {`${captureValue.capturer} ${captureValue.operator} ${captureValue.captured}`}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="useranswer"
            type="text"
            placeholder="Input answer"
          />
        </div>
        <div className=" flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out mt-5 text-center"
            onClick={() => setCapturedModalToggle(false)}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CaptureModal;
