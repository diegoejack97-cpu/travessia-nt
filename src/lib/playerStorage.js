const DEVICE_TOKEN_KEY = 'travessia_device_token';
const PLAYER_SESSION_KEY = 'travessia_player_session';

function readStorage(key) {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(key);
}

function writeStorage(key, value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, value);
}

export function getDeviceToken() {
  const existingToken = readStorage(DEVICE_TOKEN_KEY);
  if (existingToken) return existingToken;

  const token =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  writeStorage(DEVICE_TOKEN_KEY, token);
  return token;
}

export function savePlayerSession(session) {
  writeStorage(PLAYER_SESSION_KEY, JSON.stringify(session));
}

export function getPlayerSession() {
  const rawSession = readStorage(PLAYER_SESSION_KEY);
  if (!rawSession) return null;

  try {
    return JSON.parse(rawSession);
  } catch {
    return null;
  }
}

export function clearPlayerSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(PLAYER_SESSION_KEY);
}
