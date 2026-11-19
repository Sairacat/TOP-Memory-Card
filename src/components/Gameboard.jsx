import '../styles/gameboard.css';

function Gameboard({cards, handleShuffle, score, handleScore, handleRecord}) {
    return(
        <div>
            <header>
                <h1>Memory Game</h1>
            </header>
            <section aria-label="score-section" className="score-area">
                <div className="score-unit">
                    <span>Score: </span>{score.score}
                </div>
                <div className="score-unit">
                    <span>Record: </span>{score.record}
                </div>
            </section>
            <main className="gameboard">
                {cards.map(card => {
                    return(
                        <div key={card.id} className="card" onClick={() => {
                            if(card.isClicked) {
                                console.log('card has been clicked');
                                handleRecord();
                                return;
                            }
                            handleScore();
                            handleShuffle(card.id);
                        }}>
                            <img src={card.imgUrl} alt="" />
                            <p>{card.name}</p>
                        </div>
                    )
                })}
            </main>
        </div>

    )
}


export {Gameboard};