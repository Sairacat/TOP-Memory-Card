import { useState } from "react";
import { Gameboard } from "./Gameboard.jsx";
import { Homepgae } from "./Homepage.jsx";
import { Loading } from "./Loading.jsx";

function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [cards, setCards] = useState(null);
  const [gameInfo, setGameInfo] = useState({
    easy: { currentScore: 0, record: 0, rounds: [0] },
    normal: { currentScore: 0, record: 0, rounds: [0] },
    hard: { currentScore: 0, record: 0, rounds: [0] },
  });
  const [level, setLevel] = useState("normal");
  const [gameState, setGameState] = useState("play");
  const [failedCard, setFailedCard] = useState(null);

  function startGame(selectedLevel) {
    setTimeout(() => {
      setPageIndex(1);
      setLevel(selectedLevel);
      setGameInfo((prev) => {
        const prevLevel = prev[level];
        return {
          ...prev,
          [level]: {
            ...prevLevel,
            currentScore: 0,
            rounds: [0],
          },
        };
      });
      setGameState("play");
    }, 350);
  }

  function completeLoading(cards) {
    setCards(cards);
    setPageIndex(2);
  }

  function shuffleCards(cards) {
    const newCards = cards.map((card) => {
      return { ...card };
    });
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }

    return newCards;
  }

  function updateScore() {
    setGameInfo((prev) => {
      const currentLevel = prev[level];
      const updatedRounds = currentLevel.rounds.slice();
      updatedRounds[updatedRounds.length - 1] += 1;

      const updatedScore = calculateCurrentScore(updatedRounds);

      return {
        ...prev,
        [level]: {
          ...currentLevel,
          currentScore: updatedScore,
          rounds: updatedRounds,
        },
      };
    });
  }

  function updateRecord() {
    setGameInfo((prev) => {
      const currentLevel = prev[level];
      const updatedRecord = Math.max(
        currentLevel.currentScore,
        currentLevel.record,
      );

      return {
        ...prev,
        [level]: {
          ...currentLevel,
          currentScore: 0,
          record: updatedRecord,
        },
      };
    });
  }

  function handleCardClick(id) {
    const targetCard = cards.find((card) => card.id === id);
    console.log(targetCard);
    if (!targetCard) return;

    if (targetCard.isClicked) {
      setGameState("lost");
      updateRecord();
      setFailedCard({ name: targetCard.name, imgUrl: targetCard.imgUrl });
      console.log("this card was clicked before");
      return;
    }

    const nextCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, isClicked: true };
      } else {
        return card;
      }
    });

    const isWon = nextCards.every((card) => card.isClicked);
    if (isWon) {
      updateScore();
      setCards(nextCards);
      setGameState("won");
    } else {
      updateScore();
      setCards(shuffleCards(nextCards));
    }
  }

  function handleStartNewGame(level) {
    setGameInfo((prev) => {
      const currentLevel = prev[level];
      const updatedRecord = Math.max(
        currentLevel.currentScore,
        currentLevel.record,
      );

      return {
        ...prev,
        [level]: {
          ...currentLevel,
          currentScore: 0,
          rounds: [0],
          record: updatedRecord,
        },
      };
    });

    setGameState("play");
    setPageIndex(1);
  }

  function handleOneMoreRound(level) {
    setGameInfo((prev) => {
      const currentLevel = prev[level];
      const updatedRounds = currentLevel.rounds.slice();
      updatedRounds.push(0);

      return {
        ...prev,
        [level]: {
          ...currentLevel,
          rounds: updatedRounds,
        },
      };
    });

    setGameState("play");
    setPageIndex(1);
  }

  function handleResetThisRound(level) {
    setGameInfo((prev) => {
      const currentLevel = prev[level];
      const updatedRounds = currentLevel.rounds.slice();
      updatedRounds[updatedRounds.length - 1] = 0;

      const updatedScore = calculateCurrentScore(updatedRounds);

      return {
        ...prev,
        [level]: {
          ...currentLevel,
          currentScore: updatedScore,
          rounds: updatedRounds,
        },
      };
    });

    const newCards = resetCards(cards);

    setCards(shuffleCards(newCards));
  }

  function resetCards() {
    const newCards = cards.map((card) => {
      if (card.isClicked) {
        return {
          ...card,
          isClicked: false,
        };
      } else {
        return {
          ...card,
        };
      }
    });

    return newCards;
  }

  function handleBackToHome() {
    setPageIndex(0);
  }

  return (
    <div>
      {pageIndex === 0 && (
        <Homepgae handleStartGame={startGame} level={level} gameInfo={gameInfo}/>
      )}
      {pageIndex === 1 && (
        <Loading level={level} handleCompleteLoading={completeLoading} />
      )}
      {pageIndex === 2 && (
        <Gameboard
          cards={cards}
          gameInfo={gameInfo}
          level={level}
          gameState={gameState}
          handleCardClick={handleCardClick}
          failedCard={failedCard}
          handleStartNewGame={handleStartNewGame}
          handleOneMoreRound={handleOneMoreRound}
          handleResetThisRound={handleResetThisRound}
          handleBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}

function calculateCurrentScore(arr) {
  return arr.reduce((prev, cur) => prev + cur, 0);
}

export default App;
