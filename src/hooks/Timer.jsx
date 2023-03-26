import React, { useState, useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft, runOnStart }) => {
  const [isRunning, setIsRunning] = useState(runOnStart);

  // const restartTimer = () => {
  //   setTimeLeft(10 * 60);
  //   setIsRunning(true);
  // };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [timeLeft, isRunning]);

  return (
    <div className="">
      <h2 className="font-semibold text-center text-3xl mb-2">
        {formatTime(timeLeft)}
      </h2>
      {/* {!isRunning && <button onClick={restartTimer}>Restart Timer</button>} */}
    </div>
  );
};

export default Timer;
