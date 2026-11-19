import { useState, useEffect } from "react";
import { Gameboard } from "./Gameboard.jsx";

function App() {
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState({ score: 0, record: 0 });

  useEffect(() => {
    let ignore = false;
    const selectedId = new Set();

    const apiUrls = Array.from({ length: 12 }, () => {
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
  }, []);

  function shuffleCards(id) {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, isClicked: true };
      } else {
        return { ...card };
      }
    });
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }

    setCards(newCards);
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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Gameboard
          cards={cards}
          handleShuffle={shuffleCards}
          score={score}
          handleScore={updateScore}
          handleRecord={updateRecord}
        />
      )}
    </div>
  );
}

function generateRandomId() {
  return Math.floor(Math.random() * 99) + 1;
}

export default App;
