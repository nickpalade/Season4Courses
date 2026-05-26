export default function Result({ answers, pool, mode, onHome }) {
  const total = pool.length;
  const raw = pool.reduce((s, q) => s + (answers[q.id]?.score || 0), 0);
  const pct = total ? (raw / total) * 100 : 0;
  const missed = pool.filter((q) => (answers[q.id]?.score || 0) < 1).length;

  const byTopic = {};
  pool.forEach((q) => {
    if (!byTopic[q.topic]) byTopic[q.topic] = { score: 0, total: 0 };
    byTopic[q.topic].total++;
    byTopic[q.topic].score += answers[q.id]?.score || 0;
  });

  return (
    <section className="result-panel">
      <h2>Result</h2>
      <div className="score-summary">
        <div className="big">{raw.toFixed(1)} / {total}</div>
        <div className="muted">{pct.toFixed(0)}% - mode: {mode} - {missed} to review</div>
      </div>

      <h3>By topic</h3>
      <div>
        {Object.entries(byTopic).map(([t, s]) => (
          <div key={t} className="row-item topic-score">
            <span>{t}</span>
            <strong>{s.score.toFixed(1)} / {s.total}</strong>
          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={onHome}>Back to home</button>
      </div>
    </section>
  );
}
