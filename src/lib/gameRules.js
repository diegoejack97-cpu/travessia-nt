import { ALL_DAYS, STAGES, TOTAL_DAYS } from '../data/readingPlan';

export function getCompletedDayNumbers(progress = []) {
  return new Set(progress.map((item) => Number(item.day_number ?? item.n)));
}

export function isDayCompleted(progress, dayNumber) {
  return getCompletedDayNumbers(progress).has(Number(dayNumber));
}

export function getBookRequiredDays(book) {
  return book.days.map((day) => day.n);
}

export function isBookComplete(book, progress) {
  const completed = getCompletedDayNumbers(progress);
  return getBookRequiredDays(book).every((dayNumber) => completed.has(dayNumber));
}

export function getStageProgress(stage, progress) {
  const completed = getCompletedDayNumbers(progress);
  const stageDays = ALL_DAYS.filter((day) => day.phaseId === stage.id).map((day) => day.n);
  const done = stageDays.filter((dayNumber) => completed.has(dayNumber)).length;

  return {
    done,
    total: stageDays.length,
    percent: stageDays.length ? Math.round((done / stageDays.length) * 100) : 0,
  };
}

export function getOverallProgress(progress) {
  const completed = getCompletedDayNumbers(progress);
  const done = ALL_DAYS.filter((day) => completed.has(day.n)).length;

  return {
    done,
    total: TOTAL_DAYS,
    percent: Math.round((done / TOTAL_DAYS) * 100),
  };
}

export function getCurrentStage(progress) {
  return STAGES.find((stage) => getStageProgress(stage, progress).percent < 100) ?? STAGES.at(-1);
}

export function getPatent(stats) {
  const completedDays = Number(stats?.completed_days ?? stats?.completedDays ?? 0);
  if (completedDays >= 75) return 'Vencedor';
  if (completedDays >= 50) return 'Veterano';
  if (completedDays >= 35) return 'Guardião';
  if (completedDays >= 23) return 'Mensageiro';
  if (completedDays >= 10) return 'Sentinela';
  return 'Peregrino';
}

export function getUnlockedBadgeIds({ progress = [], seals = [], streak = 0 } = {}) {
  const completed = getCompletedDayNumbers(progress);
  const unlocked = new Set();

  if (completed.size >= 1) unlocked.add('primeiro_passo');
  if (streak >= 7) unlocked.add('chama');
  if (streak >= 21) unlocked.add('inabalavel');
  if (seals.length >= 5) unlocked.add('escriba');
  if (completed.size >= TOTAL_DAYS) unlocked.add('coroa');

  for (const stage of STAGES) {
    if (getStageProgress(stage, progress).percent === 100) {
      if (stage.id === 'evangelhos') unlocked.add('selo_evangelhos');
      if (stage.id === 'atos') unlocked.add('selo_atos');
      if (stage.id === 'cartas-paulo') unlocked.add('selo_cartas');
      if (stage.id === 'gerais') unlocked.add('selo_gerais');
      if (stage.id === 'apocalipse') unlocked.add('selo_apocalipse');
    }
  }

  return unlocked;
}

export function sortRanking(players = []) {
  return [...players].sort((a, b) => {
    const completedDiff = Number(b.completed_days ?? 0) - Number(a.completed_days ?? 0);
    if (completedDiff) return completedDiff;

    const streakDiff = Number(b.current_streak ?? 0) - Number(a.current_streak ?? 0);
    if (streakDiff) return streakDiff;

    const sealsDiff = Number(b.sealed_books ?? 0) - Number(a.sealed_books ?? 0);
    if (sealsDiff) return sealsDiff;

    const pointsDiff = Number(b.total_points ?? 0) - Number(a.total_points ?? 0);
    if (pointsDiff) return pointsDiff;

    return String(a.name ?? '').localeCompare(String(b.name ?? ''), 'pt-BR');
  });
}
