import { useState } from "react";

function letter(i) {
  return String.fromCharCode(65 + i);
}

function ScoreTag({ score }) {
  const s = score ?? 0;
  const cls = s === 1 ? "good" : s > 0 ? "partial" : "bad";
  const label = s === 1 ? "Correct" : s > 0 ? `${Math.round(s * 100)}%` : "Missed";
  return <span className={`score-tag ${cls}`}>{label}</span>;
}

// Renders one question's full breakdown: your pick, the correct answer, why.
function ReviewItem({ q, n, answer }) {
  const a = answer || {};
  const score = a.score ?? 0;
  const selected = a.selected || [];
  const correctSet = new Set(q.correct || []);

  return (
    <div className={`review-item ${score === 1 ? "ok" : score > 0 ? "part" : "miss"}`}>
      <div className="review-head">
        <span className="review-num">{n}</span>
        <span className="review-topic">{q.topic}</span>
        <ScoreTag score={score} />
      </div>
      <div className="review-prompt">{q.prompt}</div>

      {q.type === "open" ? (
        <div className="review-open">
          <div className="review-label">Your answer</div>
          <div className="muted">{a.text || <em>(blank)</em>}</div>
          <div className="review-label">Model answer</div>
          <div>{q.explanation}</div>
        </div>
      ) : (
        <>
          <ul className="review-opts">
            {q.options.map((opt, i) => {
              const picked = selected.includes(i);
              const correct = correctSet.has(i);
              const cls = [
                "review-opt",
                correct ? "correct" : "",
                picked && !correct ? "wrong" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <li key={i} className={cls}>
                  <span className="review-mark">{letter(i)}</span>
                  <span>{opt}</span>
                  {picked && <span className="review-yours">your pick</span>}
                  {correct && <span className="review-correct-tag">correct</span>}
                </li>
              );
            })}
          </ul>
          {q.explanation && <div className="review-why">{q.explanation}</div>}
        </>
      )}
    </div>
  );
}

export default function Result({ answers, pool, mode, onRetryMissed, onHome, onLibrary }) {
  const [missedOnly, setMissedOnly] = useState(false);
  const total = pool.length;
  const raw = pool.reduce((s, q) => s + (answers[q.id]?.score || 0), 0);
  const pct = total ? (raw / total) * 100 : 0;
  const missedQs = pool.filter((q) => (answers[q.id]?.score || 0) < 1);
  const missed = missedQs.length;

  const byTopic = {};
  pool.forEach((q) => {
    if (!byTopic[q.topic]) byTopic[q.topic] = { score: 0, total: 0 };
    byTopic[q.topic].total++;
    byTopic[q.topic].score += answers[q.id]?.score || 0;
  });

  const shown = missedOnly ? missedQs : pool;

  return (
    <section className="result-panel">
      <h2>Result</h2>
      <div className="score-summary">
        <div className="big">{raw.toFixed(1)} / {total}</div>
        <div className="muted">{pct.toFixed(0)}% · mode: {mode} · {missed} to review</div>
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

      <div className="section-title">
        <h3>Review answers</h3>
        {missed > 0 && (
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={missedOnly}
              onChange={(e) => setMissedOnly(e.target.checked)}
            />
            Missed only ({missed})
          </label>
        )}
      </div>

      <div className="review-list">
        {shown.length === 0 ? (
          <p className="muted">Nothing to show — perfect run.</p>
        ) : (
          shown.map((q) => {
            const n = pool.indexOf(q) + 1;
            return <ReviewItem key={q.id} q={q} n={n} answer={answers[q.id]} />;
          })
        )}
      </div>

      <div className="actions">
        {onLibrary && (
          <button className="secondary-action" onClick={onLibrary}>
            Library
          </button>
        )}
        {missed > 0 && onRetryMissed && (
          <button
            className="secondary-action"
            onClick={() => onRetryMissed(missedQs.map((q) => q.id))}
          >
            Retry missed ({missed})
          </button>
        )}
        <button onClick={onHome}>Back to home</button>
      </div>
    </section>
  );
}
