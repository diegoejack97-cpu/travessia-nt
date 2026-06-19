import { AVATAR_BY_ID } from '../data/avatars';
import { ALL_DAYS, BOOK_BY_ID } from '../data/readingPlan';
import { getPatent, sortRanking } from './gameRules';
import { getDeviceToken, savePlayerSession } from './playerStorage';
import { isSupabaseConfigured, supabase } from './supabase';

const MOCK_PLAYERS_KEY = 'travessia_mock_players';
const MOCK_PROGRESS_KEY = 'travessia_mock_progress';
const MOCK_SEALS_KEY = 'travessia_mock_seals';

function normalizeError(error) {
  if (!error) return 'Algo não saiu como esperado. Tente novamente.';
  return error.message || error.details || String(error);
}

function readJson(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function makeRecoveryCode(name) {
  const prefix = String(name || 'IRMAO')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 6)
    .toUpperCase() || 'IRMAO';

  return `${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function getMockPlayerProgress(playerId) {
  return readJson(MOCK_PROGRESS_KEY, []).filter((item) => item.player_id === playerId);
}

function getMockPlayerSeals(playerId) {
  return readJson(MOCK_SEALS_KEY, []).filter((item) => item.player_id === playerId);
}

function getPlayerStats(player) {
  const progress = getMockPlayerProgress(player.id);
  const seals = getMockPlayerSeals(player.id);
  const completedDays = progress.length;
  const currentStreak = Math.min(completedDays, Number(player.current_streak ?? completedDays));

  return {
    ...player,
    completed_days: completedDays,
    sealed_books: seals.length,
    current_streak: currentStreak,
    best_streak: Math.max(currentStreak, Number(player.best_streak ?? 0)),
    total_points: completedDays * 10 + seals.length * 25,
    patent: getPatent({ completed_days: completedDays }),
  };
}

async function callRpc(name, payload) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase não configurado') };
  return supabase.rpc(name, payload);
}

export async function createPlayer({ name, age, groupCode, avatarId }) {
  const deviceToken = getDeviceToken();

  if (isSupabaseConfigured) {
    const { data, error } = await callRpc('create_player', {
      p_name: name,
      p_age: Number(age),
      p_avatar_id: avatarId,
      p_avatar_color: AVATAR_BY_ID[avatarId]?.color ?? '#f3a53f',
      p_group_code: groupCode,
      p_device_token: deviceToken,
    });

    if (error) throw new Error(normalizeError(error));

    const result = Array.isArray(data) ? data[0] : data;
    const session = {
      player_id: result.player_id ?? result.id,
      recovery_code: result.recovery_code,
      device_token: deviceToken,
      name,
      age: Number(age),
      avatar_id: avatarId,
      group_code: groupCode,
    };
    savePlayerSession(session);
    return session;
  }

  const players = readJson(MOCK_PLAYERS_KEY, []);
  const player = {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `player-${Date.now()}`,
    name,
    age: Number(age),
    avatar_id: avatarId,
    group_code: groupCode,
    recovery_code: makeRecoveryCode(name),
    created_at: new Date().toISOString(),
  };

  writeJson(MOCK_PLAYERS_KEY, [...players, player]);

  const session = {
    player_id: player.id,
    recovery_code: player.recovery_code,
    device_token: deviceToken,
    name: player.name,
    age: player.age,
    avatar_id: player.avatar_id,
    group_code: groupCode,
  };
  savePlayerSession(session);
  return session;
}

export async function claimPlayer({ recoveryCode }) {
  const deviceToken = getDeviceToken();

  if (isSupabaseConfigured) {
    const { data, error } = await callRpc('claim_player', {
      p_recovery_code: recoveryCode,
      p_device_token: deviceToken,
    });

    if (error) throw new Error(normalizeError(error));

    const result = Array.isArray(data) ? data[0] : data;
    const session = {
      player_id: result.player_id ?? result.id,
      recovery_code: recoveryCode,
      device_token: deviceToken,
      name: result.name,
      age: result.age,
      avatar_id: result.avatar_id,
      group_code: result.group_code,
    };
    savePlayerSession(session);
    return session;
  }

  const players = readJson(MOCK_PLAYERS_KEY, []);
  const player = players.find(
    (item) => item.recovery_code.toUpperCase() === recoveryCode.trim().toUpperCase(),
  );
  if (!player) throw new Error('Código não encontrado neste navegador de testes.');

  const session = {
    player_id: player.id,
    recovery_code: player.recovery_code,
    device_token: deviceToken,
    name: player.name,
    age: player.age,
    avatar_id: player.avatar_id,
    group_code: player.group_code,
  };
  savePlayerSession(session);
  return session;
}

export async function getPlayerState(session) {
  if (!session?.player_id) return { progress: [], seals: [], stats: null };

  if (isSupabaseConfigured) {
    const [{ data: ranking }, { data: progress }, { data: seals }] = await Promise.all([
      supabase.from('ranking_view').select('*').eq('id', session.player_id),
      supabase.from('reading_progress').select('*').eq('player_id', session.player_id),
      supabase.from('seals').select('*').eq('player_id', session.player_id),
    ]);

    const stats = Array.isArray(ranking) ? ranking[0] : null;
    return {
      progress: progress ?? [],
      seals: seals ?? [],
      stats: stats ?? {
        name: session.name,
        avatar_id: session.avatar_id,
        completed_days: 0,
        current_streak: 0,
        sealed_books: 0,
        total_points: 0,
      },
    };
  }

  const players = readJson(MOCK_PLAYERS_KEY, []);
  const player = players.find((item) => item.id === session.player_id) ?? {
    id: session.player_id,
    name: session.name,
    age: session.age,
    avatar_id: session.avatar_id,
    group_code: session.group_code,
  };

  return {
    progress: getMockPlayerProgress(session.player_id),
    seals: getMockPlayerSeals(session.player_id),
    stats: getPlayerStats(player),
  };
}

export async function markReading({ session, day }) {
  if (isSupabaseConfigured) {
    const { data, error } = await callRpc('mark_reading', {
      p_player_id: session.player_id,
      p_device_token: session.device_token,
      p_day_number: day.n,
      p_book_id: day.bookId,
      p_phase_id: day.phaseId,
    });

    if (error) throw new Error(normalizeError(error));
    return data;
  }

  const progress = readJson(MOCK_PROGRESS_KEY, []);
  const exists = progress.some(
    (item) => item.player_id === session.player_id && Number(item.day_number) === Number(day.n),
  );

  if (exists) return { warning: 'Leitura já concluída.' };

  writeJson(MOCK_PROGRESS_KEY, [
    ...progress,
    {
      player_id: session.player_id,
      day_number: day.n,
      book_id: day.bookId,
      phase_id: day.phaseId,
      created_at: new Date().toISOString(),
    },
  ]);

  return { ok: true };
}

export async function unmarkReading({ session, day }) {
  if (isSupabaseConfigured) {
    const { data, error } = await callRpc('unmark_reading', {
      p_player_id: session.player_id,
      p_device_token: session.device_token,
      p_day_number: day.n,
    });

    if (error) throw new Error(normalizeError(error));
    return data;
  }

  const nextProgress = readJson(MOCK_PROGRESS_KEY, []).filter(
    (item) => !(item.player_id === session.player_id && Number(item.day_number) === Number(day.n)),
  );
  writeJson(MOCK_PROGRESS_KEY, nextProgress);
  return { ok: true };
}

export async function sealBook({ session, bookId, verse, note, shared }) {
  const book = BOOK_BY_ID[bookId];
  const requiredDays = book?.days.map((day) => day.n) ?? [];

  if (isSupabaseConfigured) {
    const { data, error } = await callRpc('seal_book', {
      p_player_id: session.player_id,
      p_device_token: session.device_token,
      p_book_id: bookId,
      p_required_days: requiredDays,
      p_verse: verse,
      p_note: note,
      p_shared: shared,
    });

    if (error) throw new Error(normalizeError(error));
    return data;
  }

  const seals = readJson(MOCK_SEALS_KEY, []);
  const exists = seals.some((item) => item.player_id === session.player_id && item.book_id === bookId);
  if (exists) throw new Error('Este livro já foi selado.');

  const seal = {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `seal-${Date.now()}`,
    player_id: session.player_id,
    player_name: session.name,
    avatar_id: session.avatar_id,
    book_id: bookId,
    book_name: book?.name ?? bookId,
    verse,
    note,
    shared,
    created_at: new Date().toISOString(),
  };

  writeJson(MOCK_SEALS_KEY, [...seals, seal]);
  return seal;
}

export async function getRanking() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('ranking_view').select('*');
    if (error) throw new Error(normalizeError(error));
    return sortRanking(data ?? []);
  }

  const players = readJson(MOCK_PLAYERS_KEY, []);
  return sortRanking(players.map(getPlayerStats));
}

export async function getMural() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('mural_view').select('*');
    if (error) throw new Error(normalizeError(error));
    return data ?? [];
  }

  return readJson(MOCK_SEALS_KEY, []).filter((item) => item.shared);
}

export function getAvatarForPlayer(player) {
  return AVATAR_BY_ID[player?.avatar_id] ?? AVATAR_BY_ID.peregrino;
}
