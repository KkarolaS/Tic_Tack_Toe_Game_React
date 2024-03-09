const Log = ({ turns }) => {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row} ${turn.square.coll}`}>
          {turn.player} selected {turn.square.row}, {turn.square.coll}
        </li>
      ))}
    </ol>
  );
};

export default Log;
