import { useState } from 'react';
import GameDashboard from './components/GameDashboard';
import Landing from './components/Landing';
import Onboarding from './components/Onboarding';
import RecoveryAccess from './components/RecoveryAccess';
import RecoverySuccess from './components/RecoverySuccess';
import { getPlayerSession } from './lib/playerStorage';

function App() {
  const [screen, setScreen] = useState('landing');
  const [session, setSession] = useState(() => getPlayerSession());
  const [newSession, setNewSession] = useState(null);

  if (session) {
    return <GameDashboard onSessionChange={setSession} session={session} />;
  }

  if (screen === 'start') {
    return (
      <Onboarding
        onBack={() => setScreen('landing')}
        onCreated={(createdSession) => {
          setNewSession(createdSession);
          setScreen('success');
        }}
      />
    );
  }

  if (screen === 'recover') {
    return (
      <RecoveryAccess
        onBack={() => setScreen('landing')}
        onRecovered={(recoveredSession) => setSession(recoveredSession)}
      />
    );
  }

  if (screen === 'success') {
    return (
      <RecoverySuccess
        onContinue={() => setSession(newSession)}
        session={newSession}
      />
    );
  }

  return <Landing onRecover={() => setScreen('recover')} onStart={() => setScreen('start')} />;
}

export default App;
