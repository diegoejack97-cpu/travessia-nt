import { STAGES } from '../data/readingPlan';
import StageCard from './StageCard';

function GameMap({ progress, selectedStageId, onSelectStage }) {
  return (
    <section className="map-section" aria-labelledby="map-title">
      <div className="section-heading">
        <p className="eyebrow">Mapa da jornada</p>
        <h2 id="map-title">Escolha a fase</h2>
      </div>

      <div className="stage-map">
        {STAGES.map((stage) => (
          <StageCard
            active={selectedStageId === stage.id}
            key={stage.id}
            onSelect={onSelectStage}
            progress={progress}
            stage={stage}
          />
        ))}
      </div>
    </section>
  );
}

export default GameMap;
