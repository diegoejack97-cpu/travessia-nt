import { getOverallProgress, getPatent } from '../lib/gameRules';
import AvatarToken from './AvatarToken';

function PlayerHeader({ session, stats, progress, onClear }) {
  const overall = getOverallProgress(progress);
  const patent = getPatent(stats);

  return (
    <header className="player-header">
      <div className="player-identity">
        <AvatarToken avatarId={session.avatar_id} size="md" />
        <div>
          <strong>{session.name}</strong>
          <span>{patent}</span>
        </div>
      </div>

      <div className="player-stats">
        <span>{overall.done}/{overall.total}</span>
        <span>{Number(stats?.current_streak ?? 0)} dias</span>
      </div>

      <button className="icon-button" type="button" onClick={onClear} aria-label="Sair">
        ×
      </button>
    </header>
  );
}

export default PlayerHeader;
