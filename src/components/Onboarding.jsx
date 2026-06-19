import { useState } from 'react';
import { createPlayer } from '../lib/gameApi';
import AvatarPicker from './AvatarPicker';

function Onboarding({ onCreated, onBack }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    groupCode: 'IRMAOS2026',
    avatarId: 'peregrino',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Informe seu nome para iniciar a jornada.');
      return;
    }

    if (!form.age || Number(form.age) <= 0) {
      setError('Informe uma idade válida.');
      return;
    }

    setLoading(true);
    try {
      const session = await createPlayer(form);
      onCreated(session);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flow-screen">
      <section className="game-panel character-panel">
        <button className="text-button" type="button" onClick={onBack}>
          Voltar
        </button>
        <p className="eyebrow">Criação de personagem</p>
        <h2>Escolha seu caminho</h2>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Seu nome"
            />
          </label>

          <label>
            Idade
            <input
              min="1"
              type="number"
              value={form.age}
              onChange={(event) => updateField('age', event.target.value)}
              placeholder="Ex: 28"
            />
          </label>

          <label>
            Código do grupo
            <input
              value={form.groupCode}
              onChange={(event) => updateField('groupCode', event.target.value.toUpperCase())}
            />
          </label>

          <AvatarPicker
            selectedAvatarId={form.avatarId}
            onSelect={(avatarId) => updateField('avatarId', avatarId)}
          />

          {error ? <p className="feedback-error">{error}</p> : null}

          <button className="game-button primary-button" type="submit" disabled={loading}>
            {loading ? 'Preparando jornada...' : 'Criar jogador'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Onboarding;
