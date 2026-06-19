import { useEffect, useMemo, useState } from 'react';
import { STAGES } from '../data/readingPlan';
import { getPlayerState, markReading, sealBook, unmarkReading } from '../lib/gameApi';
import { clearPlayerSession } from '../lib/playerStorage';
import BadgesView from './BadgesView';
import BibleReader from './BibleReader';
import GameMap from './GameMap';
import MuralView from './MuralView';
import PlayerHeader from './PlayerHeader';
import RankingView from './RankingView';
import ReadingStage from './ReadingStage';
import SealModal from './SealModal';

function GameDashboard({ session, onSessionChange }) {
  const [activeTab, setActiveTab] = useState('mapa');
  const [selectedStageId, setSelectedStageId] = useState(STAGES[0].id);
  const [playerState, setPlayerState] = useState({ progress: [], seals: [], stats: null });
  const [selectedDay, setSelectedDay] = useState(null);
  const [sealBookTarget, setSealBookTarget] = useState(null);
  const [message, setMessage] = useState('');

  const progress = useMemo(() => playerState.progress ?? [], [playerState.progress]);
  const seals = useMemo(() => playerState.seals ?? [], [playerState.seals]);

  async function refreshPlayer() {
    const nextState = await getPlayerState(session);
    setPlayerState(nextState);
  }

  useEffect(() => {
    refreshPlayer();
  }, [session.player_id]);

  async function handleCompleteReading(day) {
    const result = await markReading({ session, day });
    if (result?.warning) setMessage(result.warning);
    await refreshPlayer();
  }

  async function handleQuickToggle(day, completed) {
    setMessage('');
    if (completed) {
      await unmarkReading({ session, day });
    } else {
      await markReading({ session, day });
    }
    await refreshPlayer();
  }

  async function handleSealBook(payload) {
    await sealBook({ session, ...payload });
    await refreshPlayer();
  }

  function handleExit() {
    clearPlayerSession();
    onSessionChange(null);
  }

  if (selectedDay) {
    return (
      <BibleReader
        day={selectedDay}
        onBack={() => setSelectedDay(null)}
        onComplete={handleCompleteReading}
        session={session}
      />
    );
  }

  return (
    <main className="app-world">
      <PlayerHeader
        onClear={handleExit}
        progress={progress}
        session={session}
        stats={playerState.stats}
      />

      <nav className="bottom-tabs" aria-label="Navegação principal">
        {[
          ['mapa', 'Mapa'],
          ['ranking', 'Ranking'],
          ['mural', 'Mural'],
          ['selos', 'Selos'],
        ].map(([id, label]) => (
          <button
            className={activeTab === id ? 'is-active' : ''}
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {message ? <p className="floating-message">{message}</p> : null}

      {activeTab === 'mapa' ? (
        <>
          <GameMap
            onSelectStage={setSelectedStageId}
            progress={progress}
            selectedStageId={selectedStageId}
          />
          <ReadingStage
            onOpenReading={setSelectedDay}
            onQuickToggle={handleQuickToggle}
            onSealBook={setSealBookTarget}
            progress={progress}
            seals={seals}
            selectedStageId={selectedStageId}
          />
        </>
      ) : null}

      {activeTab === 'ranking' ? <RankingView /> : null}
      {activeTab === 'mural' ? <MuralView /> : null}
      {activeTab === 'selos' ? (
        <BadgesView progress={progress} seals={seals} stats={playerState.stats} />
      ) : null}

      {sealBookTarget ? (
        <SealModal
          book={sealBookTarget}
          onClose={() => setSealBookTarget(null)}
          onConfirm={handleSealBook}
        />
      ) : null}
    </main>
  );
}

export default GameDashboard;
