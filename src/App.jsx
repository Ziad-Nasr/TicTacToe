import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

// Immutable way to update state
// Lifting up state
// Two-Way-Binding
// Avoid merging states

// Reduce Number of States as much as possible and derive them from old ones

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") currentPlayer = "O";
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const squareOne = gameBoard[combination[0].row][combination[0].column];
    const squareTwo = gameBoard[combination[1].row][combination[1].column];
    const squareThree = gameBoard[combination[2].row][combination[2].column];
    if (squareOne && squareOne === squareTwo && squareOne === squareThree) {
      winner = squareOne;
    }
  }

  const draw = gameTurns.length === 9 && !winner;

  function handleActivePlayer(rowIndex, itemIndex) {
    setGameTurns((prevTurns) => {
      let current = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: itemIndex }, player: current },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard endTurn={handleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
