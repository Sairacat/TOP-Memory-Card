import { useState } from "react";
import "../styles/levelSelection.css";

function LevelSelection({handleNewRound, level}) {
  const [selected, setSelected] = useState(level);

  function handleRestart() {
    if(!selected) return;
    handleNewRound(selected);
  }

  return (
    <section aria-labelledby="level-heading" className="level-select">
      <h2 id="level-heading">Level</h2>
      <div className="level-set">
        <button className={selected === "easy" ? "easy isSelected" : "easy"} onClick={() => {setSelected('easy')}}>
          Easy
        </button>
        <button
          className={selected === "normal" ? "normal isSelected" : "normal"} onClick={() => {setSelected('normal')}}
        >
          Normal
        </button>
        <button className={selected === "hard" ? "hard isSelected" : "hard"} onClick={() => {setSelected('hard')}}>
          Hard
        </button>
      </div>
      <button className="restart-btn" onClick={handleRestart}>
        START NEW ROUND
      </button>
    </section>
  );
}


export {LevelSelection}
