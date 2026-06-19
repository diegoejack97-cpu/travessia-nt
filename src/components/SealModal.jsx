import { useState } from 'react';

function SealModal({ book, onClose, onConfirm }) {
  const [verse, setVerse] = useState('');
  const [note, setNote] = useState('');
  const [shared, setShared] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onConfirm({ bookId: book.id, verse, note, shared });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <section className="modal-card seal-modal">
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <p className="eyebrow">Livro completo</p>
        <h2>Selar {book.name}</h2>
        <p className="quiet-copy">Registre o versículo e a reflexão que marcaram sua caminhada.</p>

        <form className="seal-form" onSubmit={handleSubmit}>
          <label>
            Versículo que marcou
            <input value={verse} onChange={(event) => setVerse(event.target.value)} placeholder="Ex: João 15:5" />
          </label>
          <label>
            Reflexão curta
            <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Compartilhe uma frase da jornada." />
          </label>
          <label className="toggle-row">
            <input checked={shared} type="checkbox" onChange={(event) => setShared(event.target.checked)} />
            Compartilhar no mural
          </label>

          {error ? <p className="feedback-error">{error}</p> : null}

          <button className="game-button primary-button" type="submit" disabled={loading}>
            {loading ? 'Selando...' : 'Confirmar selo'}
          </button>
        </form>
      </section>
    </div>
  );
}

export default SealModal;
