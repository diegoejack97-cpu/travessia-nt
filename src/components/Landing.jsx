function Landing({ onStart, onRecover }) {
  return (
    <main className="landing-screen">
      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-map" aria-hidden="true">
          <span className="map-route" />
          <span className="map-pin pin-one" />
          <span className="map-pin pin-two" />
          <span className="map-pin pin-three" />
          <span className="map-hill hill-one" />
          <span className="map-hill hill-two" />
        </div>

        <div className="brand-crest" aria-hidden="true">
          <span />
        </div>
        <p className="eyebrow">TRAVESSIA NT</p>
        <h1 id="landing-title">TRAVESSIA</h1>
        <p className="hero-copy">Uma jornada pelo Novo Testamento em irmandade</p>

        <div className="hero-actions">
          <button className="game-button primary-button" type="button" onClick={onStart}>
            Começar minha jornada
          </button>
          <button className="game-button secondary-button" type="button" onClick={onRecover}>
            Já tenho código
          </button>
        </div>
      </section>
    </main>
  );
}

export default Landing;
