import { useState } from "react";
import "../styles/homepage.css";

function Homepgae({ handleStartGame, level, gameInfo }) {
  const [selected, setSelected] = useState(level);
  const [isStarted, setIsStarted] = useState(false);
  const [showRecord, setShowRecord] = useState(false);
  console.log(level);

  return (
    <div className="homepage">
      <div className="upper"></div>
      <div className="lower"></div>
      <div className="level-set">
        <button
          className={selected === "easy" ? "easy isSelected" : "easy"}
          onClick={() => {
            setSelected("easy");
          }}
        >
          Easy
        </button>
        <button
          className={selected === "normal" ? "normal isSelected" : "normal"}
          onClick={() => {
            setSelected("normal");
          }}
        >
          Normal
        </button>
        <button
          className={selected === "hard" ? "hard isSelected" : "hard"}
          onClick={() => {
            setSelected("hard");
          }}
        >
          Hard
        </button>
      </div>
      <button
        onClick={() => {
          handleStartGame(selected);
          setIsStarted(true);
        }}
        className={isStarted ? "start-btn expand" : "start-btn"}
      >
        {isStarted ? null : "START"}
      </button>
      <section className="record-panel">
        <div className={showRecord ? "record-content show-record" : "record-content"}>
          <div className="content-inner">
            <h2>BEST RECORD</h2>
            <p>EASY: {gameInfo.easy.record}</p>
            <p>NORMAL: {gameInfo.normal.record}</p>
            <p>HARD: {gameInfo.hard.record}</p>
          </div>
        </div>
        <button className="record-btn" onClick={() => {setShowRecord(prev => !prev)}}>RECORD</button>
      </section>
    </div>
  );
}

export { Homepgae };
