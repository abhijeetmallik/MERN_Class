import React, { useState, useRef } from "react";

const Timer = () => {
  const [time, setTime] = useState(25 * 60); 
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5); 
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(workTime * 60);
  };

  const handleSet = () => {
    resetTimer();
    setTime(workTime * 60);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{formatTime(time)}</h1>
      <h2>Work - Time</h2>
      <div>
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          value={workTime}
          onChange={(e) => setWorkTime(e.target.value)}
        />
        <input
          type="number"
          value={breakTime}
          onChange={(e) => setBreakTime(e.target.value)}
        />
        <button onClick={handleSet}>Set</button>
      </div>
    </div>
  );
};

export default Timer;
