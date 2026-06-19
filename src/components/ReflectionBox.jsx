function ReflectionBox({ value, onChange }) {
  return (
    <label className="reflection-box">
      Reflexão da missão
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="O que essa leitura falou com você hoje?"
      />
    </label>
  );
}

export default ReflectionBox;
