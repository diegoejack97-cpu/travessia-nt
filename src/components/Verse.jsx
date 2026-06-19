function Verse({ number, text }) {
  return (
    <p className="verse">
      <sup>{number}</sup> {text}
    </p>
  );
}

export default Verse;
