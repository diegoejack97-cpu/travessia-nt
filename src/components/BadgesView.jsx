import { BADGES } from '../data/badges';
import { getUnlockedBadgeIds } from '../lib/gameRules';
import BadgeCard from './BadgeCard';

function BadgesView({ progress, seals, stats }) {
  const unlocked = getUnlockedBadgeIds({
    progress,
    seals,
    streak: Number(stats?.current_streak ?? 0),
  });

  return (
    <section className="game-section">
      <div className="section-heading">
        <p className="eyebrow">Conquistas</p>
        <h2>Selos da Travessia</h2>
      </div>

      <div className="badges-grid">
        {BADGES.map((badge) => (
          <BadgeCard badge={badge} key={badge.id} unlocked={unlocked.has(badge.id)} />
        ))}
      </div>
    </section>
  );
}

export default BadgesView;
