import { useState } from "react";
import GameBoard from "./components/Gameboard.jsx";
import PlayerInfo from "./components/PlayerInfo.jsx";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";


const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";
  if ( gameTurns.length> 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;

}






function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);


  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);


  const hasDraw = gameTurns.length === 9 && !winner;
  



  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer(curActivePlayer => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns(prevTurns => {
      let currPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square :{row: rowIndex, col : colIndex}, player : currPlayer},
         ...prevTurns
      ];
      return updatedTurns;
    });
  
  }

  function handleRematch() {
    setGameTurns([]);
  }
  
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayes => {
      return {
        ...prevPlayes,
        [symbol]: newName
      }
    })
  }

  return (
   <main>
    <div id="game-container">
    <ol id="players" className="highlight-player">
        <PlayerInfo initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
        <PlayerInfo initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
    </ol>
    {(winner || hasDraw)  && <GameOver winner={winner} onRestart={handleRematch} />}
      <GameBoard onSelectSquare={handleSelectSquare} 
       board = {gameBoard}
       />
    </div>
      <Log turns={gameTurns}/>
   </main>
  )
}

export default App
