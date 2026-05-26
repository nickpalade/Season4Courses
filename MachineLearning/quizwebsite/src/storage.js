const KEY = "mlquiz_state_v2";

export function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function save(patch) {
  const cur = load();
  localStorage.setItem(KEY, JSON.stringify({ ...cur, ...patch }));
}

export function clear() {
  localStorage.removeItem(KEY);
}
