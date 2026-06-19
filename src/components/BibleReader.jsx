import { useEffect, useState } from 'react';
import { getInternalBibleText } from '../lib/bibleApi';
import { getReflection, saveReflection } from '../lib/reflectionStorage';
import ChapterView from './ChapterView';
import ReadingCompleteModal from './ReadingCompleteModal';
import ReadingMission from './ReadingMission';
import ReflectionBox from './ReflectionBox';

function BibleReader({ day, session, onBack, onComplete }) {
  const [bibleText, setBibleText] = useState({ available: false, chapters: [] });
  const [reflection, setReflection] = useState(() => getReflection(session.player_id, day.n));
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getInternalBibleText(day).then(setBibleText);
  }, [day]);

  async function handleComplete() {
    setLoading(true);
    setError('');
    try {
      saveReflection({
        playerId: session.player_id,
        dayNumber: day.n,
        bookId: day.bookId,
        note: reflection,
      });
      await onComplete(day);
      setCompleted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="reader-screen">
      <section className="reader-shell">
        <button className="text-button" type="button" onClick={onBack}>
          Voltar ao mapa
        </button>
        <div className="section-heading">
          <p className="eyebrow">{day.phaseName}</p>
          <h1>Missão de leitura</h1>
        </div>

        <ReadingMission bibleText={bibleText} day={day} />
        <ChapterView chapters={bibleText.chapters} />
        <ReflectionBox value={reflection} onChange={setReflection} />

        {error ? <p className="feedback-error">{error}</p> : null}

        <button className="game-button primary-button" type="button" onClick={handleComplete} disabled={loading}>
          {loading ? 'Concluindo...' : 'Concluir leitura'}
        </button>
      </section>
      {completed ? <ReadingCompleteModal day={day} onClose={onBack} /> : null}
    </main>
  );
}

export default BibleReader;
