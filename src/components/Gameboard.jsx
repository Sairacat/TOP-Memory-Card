import "../styles/gameboard.css";
import { ResetArea } from "./ResetArea.jsx";
import { ButtonCard } from "./ButtonCard.jsx";

function Gameboard({ cards, score, round, gameState, handleCardClick }) {
  return (
    <div className="game">
      <header>
        <h1>Pokemon Memory Cards</h1>
      </header>
      <section aria-label="score-section" className="score-area">
        <div className="score-unit">
          <span>Score: </span>
          {score.score}
        </div>
        <div className="score-unit">
          <span>Record: </span>
          {score.record}
        </div>
        <div className="score-unit">
          <span>Round: </span>
          {round}
        </div>
      </section>
      <main className="gameboard" key={crypto.randomUUID()}>
        {cards.map((card) => (
          <ButtonCard
            key={card.id}
            card={card}
            handleCardClick={handleCardClick}
            gameState={gameState}
          />
        ))}
      </main>
      {gameState !== "play" ? <ResetArea gameState={gameState} /> : null}
    </div>
  );
}

export { Gameboard };
