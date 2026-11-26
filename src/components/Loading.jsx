import { useEffect } from "react";
import '../styles/loading.css';

const levelMap = {
    easy: 4,
    normal: 8,
    hard: 12,
}

function Loading({level, handleCompleteLoading}) {
  useEffect(() => {
    let ignore = false;
    const selectedId = new Set();

    const apiUrls = Array.from({ length: levelMap[level] }, () => {
      let id;
      do {
        id = generateRandomId();
      } while (selectedId.has(id));// To prevent same cards in a same round.
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
        setTimeout(() => {
          handleCompleteLoading(results);
        }, 1500);
        console.log(results);
      } catch {
        console.log("Error occured");
      }
    }

    fetchAllData();

    return () => {
      ignore = true;
    };
  }, [level, handleCompleteLoading]);

    return(
        <div className="loading-background">
          <h1 className="loading">Loading...</h1>
        </div>
    )
}

function generateRandomId() {
  return Math.floor(Math.random() * 199) + 1;
}

export {Loading}