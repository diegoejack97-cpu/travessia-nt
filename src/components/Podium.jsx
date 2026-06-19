import { getAvatarForPlayer } from '../lib/gameApi';
import AvatarToken from './AvatarToken';

function Podium({ players }) {
  const podium = [players[1], players[0], players[2]];

  return (
    <div className="podium">
      {podium.map((player, index) => {
        const place = index === 1 ? 1 : index === 0 ? 2 : 3;
        if (!player) {
          return <div className={`podium-place place-${place} is-empty`} key={place} />;
        }

        const avatar = getAvatarForPlayer(player);
        return (
          <article className={`podium-place place-${place}`} key={player.id ?? player.player_id ?? place}>
            <span className="podium-rank">#{place}</span>
            <AvatarToken avatarId={avatar.id} size="md" />
            <strong>{player.name}</strong>
            <small>{Number(player.total_points ?? 0)} pts</small>
          </article>
        );
      })}
    </div>
  );
}

export default Podium;
