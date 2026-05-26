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
