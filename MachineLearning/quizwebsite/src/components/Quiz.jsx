import { useEffect, useState } from "react";
import { scoreMulti } from "../scoring.js";

export default function Quiz({
  pool,
  mode,
  flagged,
  setFlagged,
  initialProgress,
  onProgress,
  onFinish,
  onQuit,
}) {
  const [idx, setIdx] = useState(initialProgress?.idx || 0);
  const [answers, setAnswers] = useState(initialProgress?.answers || {});
  const [submitWarning, setSubmitWarning] = useState("");
  const [revealedQuestionId, setRevealedQuestionId] = useState(null);

  useEffect(() => {
    onProgress?.({ idx, answers });
  }, [idx, answers, onProgress]);

  const q = pool[idx];
  if (!q) {
    return (
      <section>
        <h2>No questions available</h2>
        <p className="muted">Go back home and choose a different mode or topic filter.</p>
        <div className="actions">
          <button onClick={onQuit}>Back to home</button>
        </div>
      </section>
    );
  }

  const currentAnswer = answers[q.id] || {};
  const selected = currentAnswer.selected || [];
  const openText = currentAnswer.text || "";
  const submitted = Boolean(currentAnswer.submitted);
  const revealed = revealedQuestionId === q.id;
  const selfGrade = currentAnswer.score ?? null;
  const isFlagged = flagged.has(q.id);
  const isMulti = q.type === "multi";
  const isFirst = idx === 0;
  const isLast = idx + 1 === pool.length;
  const score = currentAnswer.score;
  const correctSet = new Set(q.correct);

  function saveCurrent(patch) {
    setAnswers((cur) => ({
      ...cur,
      [q.id]: {
        ...cur[q.id],
        ...patch,
      },
    }));
  }

  function toggleFlag() {
    const next = new Set(flagged);
    next.has(q.id) ? next.delete(q.id) : next.add(q.id);
    setFlagged(next);
  }

  function toggleOpt(i) {
    if (submitted) return;
    setSubmitWarning("");
    if (q.type === "mcq") {
      saveCurrent({ selected: [i] });
      return;
    }
    const next = selected.includes(i) ? selected.filter((x) => x !== i) : [...selected, i];
    saveCurrent({ selected: next });
  }

  function submit() {
    setSubmitWarning("");
    if (q.type === "open") {
      saveCurrent({ submitted: true });
      return;
    }
    if (selected.length === 0) {
      setSubmitWarning("Choose at least one option before submitting.");
      return;
    }
    const nextScore = scoreMulti(selected, q.correct, q.options.length);
    saveCurrent({ selected: [...selected], score: nextScore, submitted: true });
    if (mode === "practice" && nextScore < 1) {
      const next = new Set(flagged);
      next.add(q.id);
      setFlagged(next);
    }
  }

  function gradeOpen(g) {
    saveCurrent({ score: g, open: true, text: openText, submitted: true });
  }

  function goTo(nextIdx) {
    if (nextIdx < 0 || nextIdx >= pool.length) return;
    setIdx(nextIdx);
    setSubmitWarning("");
    setRevealedQuestionId(null);
  }

  function finish() {
    onFinish(answers, pool);
  }

  function optClass(i) {
    if (q.type === "open") return "opt";
    const isCorrect = correctSet.has(i);
    const isSel = selected.includes(i);
    if (!submitted && !revealed) return "opt";
    if (revealed && !submitted && isCorrect) return "opt expected";
    if (mode !== "practice") return "opt" + (isSel ? " sel" : "");
    if (isSel && isCorrect) return "opt correct";
    if (isSel && !isCorrect) return "opt wrong";
    if (!isSel && isCorrect) return "opt expected";
    return "opt";
  }

  return (
    <section className="quiz-panel">
      <div className="bar">
        <div className="progress" style={{ width: `${((idx + 1) / pool.length) * 100}%` }} />
      </div>
      <div className="meta">
        <span>Q {idx + 1} / {pool.length}</span>
        <span>- {q.topic}</span>
        {isMulti && <span className="pill">multiple answers</span>}
        <button className="link" onClick={toggleFlag}>
          {isFlagged ? "Unflag" : "Flag"}
        </button>
        <button className="link" onClick={onQuit}>Quit</button>
      </div>

      <h2 className="prompt">{q.prompt}</h2>

      {q.type === "open" ? (
        <textarea
          value={openText}
          onChange={(e) => saveCurrent({ text: e.target.value })}
          placeholder="Type your answer, then submit to compare with the model answer."
          disabled={submitted}
        />
      ) : (
        <div className="options" role={isMulti ? "group" : "radiogroup"}>
          {q.options.map((opt, i) => {
            const picked = selected.includes(i);
            return (
              <button
                key={i}
                type="button"
                className={`${optClass(i)} ${picked ? "picked" : ""}`}
                onClick={() => toggleOpt(i)}
                disabled={submitted}
                role={isMulti ? "checkbox" : "radio"}
                aria-checked={picked}
              >
                <span className="option-mark">{picked ? "✓" : String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {submitWarning && <div className="warning">{submitWarning}</div>}

      {revealed && !submitted && (
        <div className="feedback reveal-feedback">
          <div className="label">Answer revealed</div>
          {q.type !== "open" && q.correct.length > 0 && (
            <div className="reveal-correct">
              <span className="muted">Correct:</span>{" "}
              {q.correct
                .map((i) => `${String.fromCharCode(65 + i)} — ${q.options[i]}`)
                .join("  ·  ")}
            </div>
          )}
          {q.type !== "open" && q.correct.length === 0 && (
            <div className="reveal-correct">
              <span className="muted">Correct:</span> none of the options are correct.
            </div>
          )}
          <div className="reveal-explanation">{q.explanation}</div>
        </div>
      )}

      {submitted && q.type === "open" && (
        <div className="feedback">
          <div className="label">Your answer:</div>
          <div className="muted">{openText || <em>(empty)</em>}</div>
          <div className="label" style={{ marginTop: 12 }}>Model answer:</div>
          <div>{q.explanation}</div>
          <div className="self-grade">
            <span className="muted">Self-grade:</span>
            <button className={selfGrade === 1 ? "sel-good" : ""} onClick={() => gradeOpen(1)}>
              Got it
            </button>
            <button className={selfGrade === 0.5 ? "sel-good" : ""} onClick={() => gradeOpen(0.5)}>
              Partial
            </button>
            <button className={selfGrade === 0 ? "sel-bad" : ""} onClick={() => gradeOpen(0)}>
              Missed
            </button>
          </div>
        </div>
      )}

      {submitted && q.type !== "open" && mode === "practice" && (
        <div className={"feedback " + (score === 1 ? "good" : score === 0 ? "bad" : "")}>
          <div className="label">
            {score === 1 ? "Correct" : score > 0 ? `Partial (${(score * 100).toFixed(0)}%)` : "Incorrect"}
          </div>
          <div>{q.explanation}</div>
        </div>
      )}

      <div className="actions split-actions">
        <button className="secondary-action" onClick={() => goTo(idx - 1)} disabled={isFirst}>
          Previous
        </button>
        <div className="right-actions">
          {!submitted && (
            <button
              className="secondary-action"
              onClick={() => setRevealedQuestionId(revealed ? null : q.id)}
            >
              {revealed ? "Hide answer" : "Reveal answer"}
            </button>
          )}
          {!submitted && <button onClick={submit}>Submit</button>}
          {!isLast && (
            <button className="secondary-action" onClick={() => goTo(idx + 1)}>
              Next
            </button>
          )}
          {isLast && (
            <button onClick={finish}>
              Finish
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
