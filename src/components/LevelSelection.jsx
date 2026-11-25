import "../styles/levelSelection.css";

function LevelSelection() {
  return (
    <section aria-labelledby="level-heading" className="level-select">
      <div className="button-set">
        <button className="restart-btn">
          START NEW GAME
        </button>
        <button className="oneMore-btn">
          ONE MORE ROUND
        </button>
        <button className="reset-btn">
          RESET THIS ROUND
        </button>
      </div>
    </section>
  );
}


export {LevelSelection}
