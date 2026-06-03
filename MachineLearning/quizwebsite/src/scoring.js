export function scoreMulti(selected, correct, totalOptions) {
  if (correct.length === 0) return selected.length === 0 ? 1 : 0;
  const wrongOpts = totalOptions - correct.length;
  const tp = selected.filter((i) => correct.includes(i)).length;
  const fp = selected.filter((i) => !correct.includes(i)).length;
  const truePart = tp / correct.length;
  const falsePart = wrongOpts > 0 ? fp / wrongOpts : 0;
  return Math.max(0, truePart - falsePart);
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Reorder a question's options by `order` (array of original indices in their
// new positions) and remap `correct` to the new positions. Returns a new
// question; open questions or a missing order pass through unchanged.
export function applyOptionOrder(q, order) {
  if (!order || q.type === "open" || !q.options) return q;
  const options = order.map((origIdx) => q.options[origIdx]);
  const correctSet = new Set(q.correct);
  const correct = order.reduce((acc, origIdx, newIdx) => {
    if (correctSet.has(origIdx)) acc.push(newIdx);
    return acc;
  }, []);
  return { ...q, options, correct };
}

// Produce a random option order for a question and the reordered question.
// `order` is null when there are no options to shuffle (open questions).
export function shuffleOptions(q) {
  if (q.type === "open" || !q.options) return { q, order: null };
  const order = shuffle(q.options.map((_, i) => i));
  return { q: applyOptionOrder(q, order), order };
}
