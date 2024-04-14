export default function GameBoard({ endTurn, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((item, itemIndex) => (
              <li key={itemIndex}>
                <button
                  onClick={() => {
                    endTurn(rowIndex, itemIndex);
                  }}
                  disabled={item}
                >
                  {item}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
