function App() {
  return (
    <main className="game-shell">
      <section className="hero-screen" aria-labelledby="app-title">
        <div className="sky-glow" aria-hidden="true" />

        <div className="adventure-map" aria-hidden="true">
          <span className="map-path path-one" />
          <span className="map-path path-two" />
          <span className="map-node node-start" />
          <span className="map-node node-mid" />
          <span className="map-node node-peak" />
          <span className="mountain mountain-left" />
          <span className="mountain mountain-right" />
        </div>

        <div className="hero-content">
          <div className="crest" aria-hidden="true">
            <span className="crest-spark" />
          </div>

          <p className="kicker">TRAVESSIA NT</p>
          <h1 id="app-title">TRAVESSIA</h1>
          <p className="subtitle">Uma jornada pelo Novo Testamento em irmandade</p>

          <div className="hero-actions" aria-label="Ações iniciais">
            <button className="game-button primary-button" type="button">
              Começar minha jornada
            </button>
            <button className="game-button secondary-button" type="button">
              Já tenho código
            </button>
          </div>
        </div>

        <div className="ground" aria-hidden="true">
          <span className="grass grass-one" />
          <span className="grass grass-two" />
          <span className="grass grass-three" />
        </div>
      </section>
    </main>
  );
}

export default App;
