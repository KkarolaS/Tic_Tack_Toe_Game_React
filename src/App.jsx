import { useState } from "react";
import GameBoard from "./compontents/GameBoard";
import Player from "./compontents/Player";
import Log from "./compontents/Log";
import { WINNING_COMBINATIONS } from "./compontents/winning-combinations";
import GameOver from "./compontents/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const initalBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (turns) => {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const deriveGameBoard = (turns) => {
  let gameBoard = [...initalBoard.map((innerArr) => [...innerArr])];

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, coll } = square;

    gameBoard[row][coll] = player;
  }
  return gameBoard;
};

const derveWinner = (gameBoard, players) => {
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [turns, setTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(turns);

  const gameBoard = deriveGameBoard(turns);

  const winner = derveWinner(gameBoard, players);
  const hasDrawn = turns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, collIndex) => {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            coll: collIndex,
          },
          player: activePlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handleResetGame = () => {
    setTurns([]);
  };

  const handlePlayerNameChange = (playerSymbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [playerSymbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDrawn) && (
          <GameOver winner={winner} restartGame={handleResetGame} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
