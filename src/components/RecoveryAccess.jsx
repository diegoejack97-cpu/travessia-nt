import { useState } from 'react';
import { claimPlayer } from '../lib/gameApi';

function RecoveryAccess({ onRecovered, onBack }) {
  const [recoveryCode, setRecoveryCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!recoveryCode.trim()) {
      setError('Informe seu código de recuperação.');
      return;
    }

    setLoading(true);
    try {
      const session = await claimPlayer({ recoveryCode });
      onRecovered(session);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flow-screen">
      <section className="game-panel recovery-panel">
        <button className="text-button" type="button" onClick={onBack}>
          Voltar
        </button>
        <p className="eyebrow">Retomar jornada</p>
        <h2>Digite seu código</h2>
        <p className="quiet-copy">
          Use o código recebido ao criar seu jogador para voltar à Travessia neste aparelho.
        </p>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          <label>
            Código de recuperação
            <input
              value={recoveryCode}
              onChange={(event) => setRecoveryCode(event.target.value.toUpperCase())}
              placeholder="DIEGO-7K92"
            />
          </label>

          {error ? <p className="feedback-error">{error}</p> : null}

          <button className="game-button primary-button" type="submit" disabled={loading}>
            {loading ? 'Buscando...' : 'Entrar na jornada'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default RecoveryAccess;
