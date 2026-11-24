import "../styles/gameboard.css";
import { Result } from "./Result.jsx";
import { ButtonCard } from "./ButtonCard.jsx";
import { LevelSelection } from "./LevelSelection.jsx";

function Gameboard({
  cards,
  score,
  round,
  gameState,
  handleCardClick,
  failedCard,
  handleNewRound,
  level,
}) {
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
      <main
        className="gameboard"
        key={
          crypto.randomUUID() // To make sure every card in this gameboard will be animated again, which is not efficient.
        }
      >
        {cards.map((card) => (
          <ButtonCard
            key={card.id}
            card={card}
            handleCardClick={handleCardClick}
            gameState={gameState}
          />
        ))}
      </main>
      {gameState !== "play" ? (
        <Result gameState={gameState} failedCard={failedCard} />
      ) : null}
      <LevelSelection handleNewRound={handleNewRound} level={level} />
    </div>
  );
}


export { Gameboard };
