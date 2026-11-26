import "../styles/gameboard.css";
import { Result } from "./Result.jsx";
import { ButtonCard } from "./ButtonCard.jsx";

function Gameboard({
  cards,
  gameInfo,
  gameState,
  failedCard,
  level,
  handleCardClick,
  handleStartNewGame,
  handleOneMoreRound,
  handleResetThisRound,
  handleBackToHome,
}) {
  return (
    <div className="game">
      <header>
        <h1>Pokemon Memory Cards</h1>
      </header>
      <section aria-label="score-section" className="score-area">
        <div className="score-unit">
          <span>Score: </span>
          {gameInfo[level].currentScore}
        </div>
        <div className="score-unit">
          <span>Record: </span>
          {gameInfo[level].record}
        </div>
        <div className="score-unit">
          <span>Round: </span>
          {gameInfo[level].rounds.length}
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
      <aside aria-labelledby="button-panel" className="button-panel">
        <div className="button-set">
          <button className="back-btn" onClick={handleBackToHome}>
            BACK TO HOME
          </button>
          <button
            className="restart-btn"
            onClick={() => {
              handleStartNewGame(level);
            }}
          >
            START NEW GAME
          </button>
          {gameState === "won" && (
            <button
              className="oneMore-btn"
              onClick={() => {
                handleOneMoreRound(level);
              }}
            >
              ONE MORE ROUND
            </button>
          )}
          {gameState === "play" && (
            <button
              className="reset-btn"
              onClick={() => {
                handleResetThisRound(level);
              }}
            >
              RESET THIS ROUND
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

export { Gameboard };
