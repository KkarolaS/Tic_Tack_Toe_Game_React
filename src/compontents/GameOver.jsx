const GameOver = ({ winner, restartGame }) => {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      <p>{winner ? ` ${winner} wins!` : "It's a draw!"}</p>
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default GameOver;
