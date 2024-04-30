import React, { useState, useEffect } from "react";

const Timer = ({
  className,
  timeLeft,
  setTimeLeft,
  runOnStart,
  onComplete,
}) => {
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
    if (runOnStart && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      onComplete();
    }
  }, [timeLeft, runOnStart]);

  return (
    <div className="">
      <h2 className={className}>{formatTime(timeLeft)}</h2>
    </div>
  );
};

export default Timer;
