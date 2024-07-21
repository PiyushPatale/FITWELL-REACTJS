import React, { useState, useRef } from "react";

const Timer = () => {
  const [time, setTime] = useState({ min: 0, sec: 0 });
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.min === 0 && prevTime.sec === 0) {
          clearInterval(intervalRef.current);
          setIsActive(false);
          return { min: 0, sec: 0 };
        } else if (prevTime.sec === 0) {
          return { min: prevTime.min - 1, sec: 59 };
        } else {
          return { ...prevTime, sec: prevTime.sec - 1 };
        }
      });
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTime({ min: 0, sec: 0 });
  };

  const handleSetTime = () => {
    // You can implement validation here to ensure the input is valid
    // For simplicity, I'm assuming valid inputs
    const newTime = {
      min: parseInt(prompt("Enter minutes:")),
      sec: parseInt(prompt("Enter seconds:")),
    };
    setTime(newTime);
  };

  return (
    <div
      class="timer"
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "55%",
      }}
    >
    
      <div class="timerCustomizer" style={{ display: "flex" }}>
        <button
          onClick={handleSetTime}
          disabled={isActive}
          class="timerBtnClass"
          style={{
            backgroundColor: "orange",
            fontSize: "larger",
            border: "none",
            margin: "0px 5px",
          }}
        >
          Set Time
        </button>
        <button
          onClick={handleStart}
          disabled={isActive}
          class="timerBtnClass startBtn"
          style={{
            backgroundColor: "rgb(0, 248, 0)",
          }}
        >
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isActive}
          class="timerBtnClass stopBtn"
          style={{
            backgroundColor: "rgb(255, 0, 0)",
          }}
        >
          Stop
        </button>
        <input
          type="number"
          class="timerInputClass"
          style={{
            borderRadius: " 5px",
            fontSize: "larger",
            width: "50px",
            textAlign: "center",
            padding: "0%",
            border: "none",
          }}
          value={time.min}
          placeholder="min"
          onChange={(e) => setTime({ ...time, min: parseInt(e.target.value) })}
          disabled={isActive}
        />
        <span style={{fontSize : '30px', margin : '0'}}> :</span>
        <input
          class="timerInputClass"
          style={{
            borderRadius: " 5px",
            fontSize: "larger",
            width: "50px",
            textAlign: "center",
            padding: "0%",
            border: "none",
          }}
          type="number"
          value={time.sec}
          placeholder="sec"
          onChange={(e) => setTime({ ...time, sec: parseInt(e.target.value) })}
          disabled={isActive}
        />
        {/* <span> sec</span> */}
        <button onClick={handleReset}>Reset</button>
      </div>
      <h3 id="timerValue" style={{ color: "orangered" }}>
        Time Left - {time.min < 10 ? `0${time.min}` : time.min}:
        {time.sec < 10 ? `0${time.sec}` : time.sec}
      </h3>
    </div>
  );
};

export default Timer;
