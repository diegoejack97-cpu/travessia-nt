import { getStageProgress } from '../lib/gameRules';

function StageCard({ stage, progress, active, onSelect }) {
  const stageProgress = getStageProgress(stage, progress);

  return (
    <button
      className={`stage-card ${stage.themeClass} ${active ? 'is-active' : ''}`}
      style={{ '--stage-color': stage.color }}
      type="button"
      onClick={() => onSelect(stage.id)}
    >
      <span className="stage-number">{stage.numeral}</span>
      <span className="stage-illustration" aria-hidden="true" />
      <strong>{stage.name}</strong>
      <small>{stage.subtitle}</small>
      <span className="progress-track">
        <span style={{ width: `${stageProgress.percent}%` }} />
      </span>
      <em>{stageProgress.percent}%</em>
    </button>
  );
}

export default StageCard;
