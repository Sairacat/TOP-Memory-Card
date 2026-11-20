import { useState, useEffect } from "react";
import { Gameboard } from "./Gameboard.jsx";

function App() {
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState({ score: 0, record: 0 });
  const [round, setRound] = useState(1);
  const [gameState, setGameState] = useState("play");

  useEffect(() => {
    let ignore = false;
    const selectedId = new Set();

    const apiUrls = Array.from({ length: 8 }, () => {
      let id;
      do {
        id = generateRandomId();
      } while (selectedId.has(id));
      selectedId.add(id);
      return `https://pokeapi.co/api/v2/pokemon-form/${id}`;
    });

    async function fetchAllData() {
      try {
        const requestedPromises = apiUrls.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`${url} has failed, please check!`);
          }

          const data = await response.json();
          const imgUrl =
            data.sprites.other["official-artwork"]["front_default"];

          return {
            id: data.id,
            name: data.name,
            imgUrl: imgUrl,
            isClicked: false,
          };
        });

        const results = await Promise.all(requestedPromises);

        if (ignore) return;
        setCards(results);
        setLoading(false);
        console.log(results);
      } catch {
        console.log("Error occured");
      }
    }

    fetchAllData();

    return () => {
      ignore = true;
    };
  }, [round]);

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
    setScore((prev) => ({ ...prev, score: prev.score + 1 }));
  }

  function updateRecord() {
    setScore((prev) => ({
      ...prev,
      score: 0,
      record: prev.score > prev.record ? prev.score : prev.record,
    }));
  }

  function handleCardClick(id) {
    const targetCard = cards.find((card) => card.id === id);
    console.log(targetCard);
    if (!targetCard) return;

    if (targetCard.isClicked) {
      setGameState("lost");
      updateRecord();
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
      updateRecord();
      setCards(nextCards);
      setGameState("won");
    } else {
      updateScore();
      setCards(shuffleCards(nextCards));
    }
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Gameboard
          cards={cards}
          score={score}
          round={round}
          gameState={gameState}
          handleCardClick={handleCardClick}
        />
      )}
    </div>
  );
}

function generateRandomId() {
  return Math.floor(Math.random() * 99) + 1;
}

export default App;
