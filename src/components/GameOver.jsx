function GameOver({winner, onRestart}) {
    
    
    return(
            <div id="game-over">
                <h2>Game Over!</h2>
                {winner ? <p>{winner} won</p> :<p>It&apos;s Draw!</p> }
                
                <button onClick={onRestart}>Rematch!</button>
            </div>
    )
}

export default GameOver;