const KEY = "mlquiz_state_v3";
const OLD_KEY_V2 = "mlquiz_state_v2";

function emptyQuizState() {
  return { flagged: [], attempts: [], activeQuiz: null };
}

function emptyState() {
  return { selectedQuizId: null, perQuiz: {} };
}

function readRaw() {
  try {
    const v = localStorage.getItem(KEY);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

function migrateFromV2() {
  try {
    const raw = localStorage.getItem(OLD_KEY_V2);
    if (!raw) return null;
    const old = JSON.parse(raw);
    const migrated = emptyState();
    migrated.perQuiz.past = {
      flagged: old.flagged || [],
      attempts: old.attempts || [],
      activeQuiz: old.activeQuiz || null,
    };
    localStorage.setItem(KEY, JSON.stringify(migrated));
    return migrated;
  } catch {
    return null;
  }
}

export function loadAll() {
  return readRaw() || migrateFromV2() || emptyState();
}

export function saveAll(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadQuiz(quizId) {
  const all = loadAll();
  return all.perQuiz[quizId] || emptyQuizState();
}

export function saveQuiz(quizId, patch) {
  if (!quizId) return;
  const all = loadAll();
  const cur = all.perQuiz[quizId] || emptyQuizState();
  all.perQuiz[quizId] = { ...cur, ...patch };
  saveAll(all);
}

export function setSelectedQuizId(quizId) {
  const all = loadAll();
  all.selectedQuizId = quizId;
  saveAll(all);
}

export function clearQuiz(quizId) {
  if (!quizId) return;
  const all = loadAll();
  delete all.perQuiz[quizId];
  saveAll(all);
}

export function clearAll() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(OLD_KEY_V2);
}
