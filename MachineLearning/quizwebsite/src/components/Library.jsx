import { useState } from "react";

export default function Library({ quizzes, allState, onSelect, onResume, onResetAll }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = q
    ? quizzes.filter((quiz) =>
        [quiz.title, quiz.subtitle, quiz.group]
          .filter(Boolean)
          .some((s) => s.toLowerCase().includes(q))
      )
    : quizzes;

  const groups = filtered.reduce((acc, quiz) => {
    const g = quiz.group || "Quizzes";
    if (!acc[g]) acc[g] = [];
    acc[g].push(quiz);
    return acc;
  }, {});

  const totals = quizzes.reduce(
    (acc, quiz) => {
      const st = allState.perQuiz?.[quiz.id];
      if (st?.attempts?.length) acc.attempted += 1;
      acc.flagged += st?.flagged?.length || 0;
      return acc;
    },
    { attempted: 0, flagged: 0 }
  );

  return (
    <section className="library-panel">
      <div className="study-board">
        <div>
          <span className="stat-value">{quizzes.length}</span>
          <span className="stat-label">quizzes</span>
        </div>
        <div>
          <span className="stat-value">{totals.attempted}</span>
          <span className="stat-label">attempted</span>
        </div>
        <div>
          <span className="stat-value">{totals.flagged}</span>
          <span className="stat-label">flagged total</span>
        </div>
      </div>

      <h2>Quiz Library</h2>
      <p className="muted">
        Each quiz keeps its own progress, flagged questions, and attempt history.
      </p>

      <div className="library-search">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search quizzes…"
          aria-label="Search quizzes"
        />
        {q && (
          <span className="library-search-count">
            {filtered.length} match{filtered.length === 1 ? "" : "es"}
          </span>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="muted">No quizzes match “{query}”.</p>
      ) : (
        Object.entries(groups).map(([group, list]) => (
          <div key={group} className="quiz-group">
            <h3>{group}</h3>
            <div className="quiz-grid">
              {list.map((quiz) => {
                const st = allState.perQuiz?.[quiz.id] || {};
                const attempts = st.attempts || [];
                const flaggedCount = st.flagged?.length || 0;
                const inProgress = Boolean(st.activeQuiz);
                const best = attempts.length
                  ? Math.max(...attempts.map((a) => a.score / a.total))
                  : null;
                const last = attempts.length
                  ? attempts[attempts.length - 1]
                  : null;
                return (
                  <div key={quiz.id} className="quiz-card-wrap">
                    <button
                      className="quiz-card"
                      onClick={() => onSelect(quiz.id)}
                      type="button"
                    >
                      <div className="quiz-card-head">
                        <strong>{quiz.title}</strong>
                        {inProgress && (
                          <span className="pill pill-amber">In progress</span>
                        )}
                      </div>
                      <span className="quiz-card-sub">{quiz.subtitle}</span>
                      <div className="quiz-card-stats">
                        <span>
                          <b>{quiz.questions.length}</b> Qs
                        </span>
                        <span>
                          <b>{attempts.length}</b> attempts
                        </span>
                        <span>
                          <b>{flaggedCount}</b> flagged
                        </span>
                        {best !== null && (
                          <span>
                            <b>{Math.round(best * 100)}%</b> best
                          </span>
                        )}
                      </div>
                      {last && (
                        <div className="quiz-card-last">
                          Last: {last.date} · {last.score}/{last.total} ({Math.round((last.score / last.total) * 100)}%)
                        </div>
                      )}
                    </button>
                    {inProgress && onResume && (
                      <button
                        className="quiz-card-resume"
                        type="button"
                        onClick={() => onResume(quiz.id)}
                      >
                        Resume →
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      <div className="row" style={{ justifyContent: "flex-end" }}>
        <button className="link" onClick={onResetAll}>
          Reset ALL progress
        </button>
      </div>
    </section>
  );
}
