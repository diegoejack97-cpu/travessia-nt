function ReadingCompleteModal({ day, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <section className="modal-card reward-modal">
        <p className="eyebrow">Leitura concluída</p>
        <h2>Dia {day.n} vencido</h2>
        <p>{day.ref}</p>
        <button className="game-button primary-button" type="button" onClick={onClose}>
          Voltar ao mapa
        </button>
      </section>
    </div>
  );
}

export default ReadingCompleteModal;
