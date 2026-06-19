function ReadingChip({ day, completed, onOpen }) {
  return (
    <button
      className={`reading-chip ${completed ? 'is-complete' : ''}`}
      type="button"
      onClick={() => onOpen(day)}
    >
      <span>Dia {day.n}</span>
      <strong>{day.ref}</strong>
    </button>
  );
}

export default ReadingChip;
