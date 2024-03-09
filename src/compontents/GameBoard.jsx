import { useState } from "react";

// const initalBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];

const GameBoard = ({ onSelectSquare, board }) => {
  //   let gameBoard = initalBoard;

  //   for (const turn of turns) {
  //     const { square, player } = turn;
  //     const { row, coll } = square;

  //     gameBoard[row][coll] = player;
  //   }
  //   const [gameBoard, setGameBoard] = useState(initalBoard);

  //   const handleSelectSquare = (rowIndex, cellIndex) => {
  //     setGameBoard((prevState) => {
  //       const updatedBoard = [...prevState.map((innerArr) => [...innerArr])];
  //       updatedBoard[rowIndex][cellIndex] = activePlayerSymbol;
  //       return updatedBoard;
  //     });

  //     onSelectSquare();
  //   };

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, collIndex) => (
              <li key={collIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, collIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
