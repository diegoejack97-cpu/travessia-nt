import { useEffect, useState } from 'react';
import { getAvatarForPlayer, getRanking } from '../lib/gameApi';
import { getPatent } from '../lib/gameRules';
import AvatarToken from './AvatarToken';
import Podium from './Podium';

function RankingView() {
  const [ranking, setRanking] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getRanking()
      .then(setRanking)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="game-section">
      <div className="section-heading">
        <p className="eyebrow">Ranking</p>
        <h2>Irmandade em marcha</h2>
      </div>

      {error ? <p className="feedback-error">{error}</p> : null}
      <Podium players={ranking.slice(0, 3)} />

      <div className="ranking-list">
        {ranking.map((player, index) => {
          const avatar = getAvatarForPlayer(player);
          return (
            <article className="ranking-row" key={player.id ?? player.player_id ?? player.name}>
              <span className="rank-number">#{index + 1}</span>
              <AvatarToken avatarId={avatar.id} size="sm" />
              <div>
                <strong>{player.name}</strong>
                <small>{player.patent ?? getPatent(player)}</small>
              </div>
              <span>{Number(player.completed_days ?? 0)} dias</span>
              <span>{Number(player.current_streak ?? 0)}🔥</span>
              <span>{Number(player.sealed_books ?? 0)} selos</span>
              <strong>{Number(player.total_points ?? 0)} pts</strong>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RankingView;
