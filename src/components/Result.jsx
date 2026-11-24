import { useRef, useEffect } from "react";
import closeBtn from '../assets/icons/close-btn.svg';
import pikachu from '../assets/pikachu.png';
import "../styles/result.css";

function Result({ gameState, failedCard }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  function handleCloseDialog() {
    dialogRef.current.close();
  }

  return (
    <dialog className="reset-area" aria-label="reset area" ref={dialogRef}>
      <h2>{gameState === "won" ? "You Win!" : "You Lost!"}</h2>
      {gameState === "lost" ? (
        <div className="lost-scene">
          <p>You have forgot:</p>
          <img src={failedCard.imgUrl} alt="" />
          <p>
            <em>{failedCard.name}</em>
          </p>
        </div>
      ) : (
        <div className="won-scene">
            <p>Congrats! You've remembered all the pokemons!</p>
            <img src={pikachu} alt="" />
        </div>
      )}
      <button className="close-btn" aria-label="close the dialog" onClick={handleCloseDialog}>
        <img src={closeBtn} alt="" width={24}/>
      </button>
    </dialog>
  );
}

export { Result };
