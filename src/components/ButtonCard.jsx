function ButtonCard({ card, handleCardClick, gameState }) {
  return (
    <div className="card-slot">
      <div
        className={
          gameState === "play" ? "rotate-card" : "rotate-card game-over"
        }
      >
        <button
          key={card.id}
          onClick={() => handleCardClick(card.id)}
          disabled={gameState !== "play"}
          className="card-face"
        >
          <img src={card.imgUrl} alt="" />
          <p>{card.name}</p>
        </button>
        <div className="card-back"></div>
      </div>
    </div>
  );
}

export { ButtonCard };
