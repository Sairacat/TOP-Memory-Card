

function ResetArea({gameState}) {
    return(
        <section className="reset-area">
            <p>{gameState === 'won' ? 'You Win!' : 'You Lost!'}</p>
        </section>
    )
}

export {ResetArea};