import badgeStar from '../assets/icons/badge-star.svg';
import bookOpen from '../assets/icons/book-open.svg';
import completedStage from '../assets/icons/completed-stage.svg';
import currentStage from '../assets/icons/current-stage.svg';
import groupShield from '../assets/icons/group-shield.svg';
import lockedGate from '../assets/icons/locked-gate.svg';
import muralScroll from '../assets/icons/mural-scroll.svg';
import rankingCrown from '../assets/icons/ranking-crown.svg';
import readingComplete from '../assets/icons/reading-complete.svg';
import recoveryCode from '../assets/icons/recovery-code.svg';
import sealedBook from '../assets/icons/sealed-book.svg';
import streakFlame from '../assets/icons/streak-flame.svg';

const ICONS = {
  'badge-star': badgeStar,
  'book-open': bookOpen,
  'completed-stage': completedStage,
  'current-stage': currentStage,
  'group-shield': groupShield,
  'locked-gate': lockedGate,
  'mural-scroll': muralScroll,
  'ranking-crown': rankingCrown,
  'reading-complete': readingComplete,
  'recovery-code': recoveryCode,
  'sealed-book': sealedBook,
  'streak-flame': streakFlame,
};

function GameIcon({ name, size = 32, className = '' }) {
  const src = ICONS[name] ?? badgeStar;

  return (
    <img
      alt=""
      aria-hidden="true"
      className={`game-icon ${className}`}
      height={size}
      src={src}
      width={size}
    />
  );
}

export default GameIcon;
