import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

// Immutable way to update state
// Lifting up state
// Two-Way-Binding
// Avoid merging states

// Reduce States as much as possible
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleActivePlayer(rowIndex, itemIndex) {
    setActivePlayer((currActivePlayer) =>
      currActivePlayer === "X" ? "O" : "X"
    );
    setGameTurns((prevTurns) => {
      let current = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        current = "O";
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: itemIndex }, player: current },
        ...prevTurns,
      ];
      return updatedTurns;
    });
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
        <GameBoard endTurn={handleActivePlayer} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
