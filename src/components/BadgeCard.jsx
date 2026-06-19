import GameIcon from './GameIcon';

function BadgeCard({ badge, unlocked }) {
  return (
    <article className={`badge-card ${unlocked ? 'is-unlocked' : ''}`} style={{ '--badge-color': badge.color }}>
      <span className="badge-medal">
        {unlocked ? <GameIcon name={badge.icon} size={38} /> : '◇'}
      </span>
      <strong>{badge.name}</strong>
      <p>{unlocked ? badge.description : badge.lockedLabel}</p>
    </article>
  );
}

export default BadgeCard;
