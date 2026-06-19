import { getExternalBibleLink } from '../lib/externalBibleLinks';

function ReadingMission({ day, bibleText }) {
  return (
    <div className="mission-card">
      <p className="eyebrow">Missão do dia {day.n}</p>
      <h2>{day.ref}</h2>
      <p>{bibleText.copyrightNote}</p>
      <a className="game-link" href={getExternalBibleLink(day.ref)} target="_blank" rel="noreferrer">
        Abrir leitura externa
      </a>
    </div>
  );
}

export default ReadingMission;
