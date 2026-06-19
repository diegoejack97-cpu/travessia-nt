function RecoverySuccess({ session, onContinue }) {
  return (
    <main className="flow-screen">
      <section className="game-panel success-panel">
        <p className="eyebrow">Jogador criado</p>
        <h2>Sua jornada começou</h2>
        <p className="quiet-copy">
          Guarde este código. Ele permite recuperar sua jornada em outro celular.
        </p>
        <div className="recovery-code">{session.recovery_code}</div>
        <button className="game-button primary-button" type="button" onClick={onContinue}>
          Ir para o mapa
        </button>
      </section>
    </main>
  );
}

export default RecoverySuccess;
