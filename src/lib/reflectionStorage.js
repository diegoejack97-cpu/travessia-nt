const REFLECTIONS_KEY = 'travessia_reflections';

function readReflections() {
  const raw = window.localStorage.getItem(REFLECTIONS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getReflection(playerId, dayNumber) {
  return (
    readReflections().find(
      (item) => item.player_id === playerId && Number(item.day_number) === Number(dayNumber),
    )?.note ?? ''
  );
}

export function saveReflection({ playerId, dayNumber, bookId, note }) {
  const reflections = readReflections();
  const nextReflection = {
    player_id: playerId,
    day_number: dayNumber,
    book_id: bookId,
    note,
    updated_at: new Date().toISOString(),
  };

  const next = [
    ...reflections.filter(
      (item) => !(item.player_id === playerId && Number(item.day_number) === Number(dayNumber)),
    ),
    nextReflection,
  ];

  window.localStorage.setItem(REFLECTIONS_KEY, JSON.stringify(next));
}
