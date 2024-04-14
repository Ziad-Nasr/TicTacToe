const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ endTurn, turns }) {
  let gameBoard = initialGameBoard;
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, itemIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedBoard[rowIndex][itemIndex] = turnSymbol;
  //     return updatedBoard;
  //   });
  //   endTurn();
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
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
