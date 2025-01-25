import React, { useState, useEffect } from 'react'

const WorkTimer = () => {
  const [time, setTime] = useState(1500); 
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  useEffect(() => {
    if (!isRunning) return;

    if (time === 0) {
      alert(isWorkTime ? "Work session over!" : "Break is over!");
      setIsWorkTime(!isWorkTime);
      setTime((isWorkTime ? breakTime : workTime) * 60);
      return;
    }

    const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning, time, isWorkTime, workTime, breakTime]);

  const formatTime = (sec) => {
    const mins = String(Math.floor(sec / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div style={{ textAlign: "start"}}>
      <h1 className='text-[40px]' >{formatTime(time)}</h1>
      <h2 className='py-[10px]' >{isWorkTime ? "Work Time" : "Break Time"}</h2>

      <button onClick={() => setIsRunning(true)} disabled={isRunning} className='border-[1px] border-[black] rounded-sm px-1 bg-gray-200'>
        Start
      </button>
      <button onClick={() => setIsRunning(false)} disabled={!isRunning} className='border-[1px] border-[black] rounded-sm px-1 bg-gray-200'>
        Stop
      </button>
      <button onClick={() => { setIsRunning(false); setTime(workTime * 60); setIsWorkTime(true); }} className='border-[1px] border-[black] rounded-sm px-1 bg-gray-200'>
        Reset
      </button>

      <div style={{ marginTop: "10px" }}>
        <input
          type="number"
          value={workTime}
          onChange={(e) => setWorkTime(Number(e.target.value))}
          disabled={isRunning}
          placeholder="Work (min)"
          className='border-[1px] border-[black] rounded-sm px-1'
        />
        <input
          type="number"
          value={breakTime}
          onChange={(e) => setBreakTime(Number(e.target.value))}
          disabled={isRunning}
          placeholder="Break (min)"
          className='border-[1px] border-[black] rounded-sm px-1'
        />
        <button onClick={() => setTime(workTime * 60)} disabled={isRunning} className='border-[1px] border-[black] rounded-sm px-2 bg-gray-200'>
          Set
        </button>
      </div>
    </div>
  )
}

export default WorkTimer