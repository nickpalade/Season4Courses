import { useEffect, useRef, useState } from "react";
import { scoreMulti } from "../scoring.js";
import { IconBookmark, IconArrow, IconArrowRight } from "./icons.jsx";

function formatElapsed(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Quiz({
  pool,
  mode,
  flagged,
  setFlagged,
  initialProgress,
  onProgress,
  onFinish,
  onQuit,
  confirm,
}) {
  const [idx, setIdx] = useState(initialProgress?.idx || 0);
  const [answers, setAnswers] = useState(initialProgress?.answers || {});
  const [submitWarning, setSubmitWarning] = useState("");
  const [revealedQuestionId, setRevealedQuestionId] = useState(null);
  const [now, setNow] = useState(Date.now());
  const promptRef = useRef(null);

  useEffect(() => {
    onProgress?.({ idx, answers });
  }, [idx, answers, onProgress]);

  // Tick a live clock so the elapsed timer updates each second.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // Move keyboard focus to the prompt when the question changes (a11y).
  useEffect(() => {
    promptRef.current?.focus();
  }, [idx]);

  const startedAt = initialProgress?.startedAt;
  const elapsed = startedAt
    ? Math.max(0, Math.floor((now - new Date(startedAt).getTime()) / 1000))
    : 0;

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
  const answeredCount = pool.filter((item) => answers[item.id]?.submitted).length;
  const canReveal = mode !== "exam"; // exam mode = no spoilers

  // Keyboard shortcuts: ← / → navigate, 1-9 pick an option, Enter submits or
  // advances, F flags. Disabled while typing in the open-answer textarea.
  useEffect(() => {
    function onKey(e) {
      const tag = e.target.tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === "ArrowLeft") {
        goTo(idx - 1);
      } else if (k === "ArrowRight") {
        goTo(idx + 1);
      } else if (k === "Enter") {
        // Let a focused button handle its own Enter (avoids double-action).
        if (tag === "BUTTON") return;
        e.preventDefault();
        if (!submitted) submit();
        else if (!isLast) goTo(idx + 1);
        else finish();
      } else if (k.toLowerCase() === "f") {
        toggleFlag();
      } else if (q.type !== "open" && /^[1-9]$/.test(k)) {
        const i = Number(k) - 1;
        if (i < q.options.length) toggleOpt(i);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, answers, submitted, q, isLast, mode]);

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
    const unanswered = pool.filter((item) => !answers[item.id]?.submitted).length;
    if (unanswered > 0 && confirm) {
      confirm(
        {
          title: "Finish now?",
          message: `${unanswered} question${unanswered > 1 ? "s are" : " is"} unanswered and will score 0.`,
          confirmLabel: "Finish anyway",
          cancelLabel: "Keep going",
          tone: "danger",
        },
        () => onFinish(answers, pool)
      );
      return;
    }
    onFinish(answers, pool);
  }

  function quit() {
    if (confirm) {
      confirm(
        {
          title: "Save & exit?",
          message: "Your progress is saved — resume anytime from the quiz home or library.",
          confirmLabel: "Exit",
          cancelLabel: "Stay",
        },
        onQuit
      );
      return;
    }
    onQuit();
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
      <div
        className="bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={pool.length}
        aria-valuenow={answeredCount}
        aria-label={`${answeredCount} of ${pool.length} answered`}
      >
        <div
          className="progress"
          style={{ width: `${(answeredCount / pool.length) * 100}%` }}
        />
      </div>

      <div className="q-topline">
        <span className="q-eyebrow">
          Question {idx + 1} / {pool.length}
          <span className="q-answered">· {answeredCount} answered</span>
        </span>
        <div className="q-topline-right">
          <span className="q-timer" title="Time elapsed" aria-label={`Elapsed ${formatElapsed(elapsed)}`}>
            {formatElapsed(elapsed)}
          </span>
          <button
            className={"bookmark" + (isFlagged ? " on" : "")}
            onClick={toggleFlag}
            title={isFlagged ? "Remove bookmark (F)" : "Bookmark this question (F)"}
            aria-pressed={isFlagged}
          >
            <IconBookmark size={22} filled={isFlagged} />
          </button>
          <button className="link q-exit" onClick={quit}>
            Save &amp; exit
          </button>
        </div>
      </div>

      <div className="q-block">
        <span className="q-points">1.0p</span>
        <span className="q-index">{idx + 1}</span>
        <div className="q-content">
          <h2 className="prompt" tabIndex={-1} ref={promptRef}>{q.prompt}</h2>
          <div className="q-tags">
            <span className="q-topic">{q.topic}</span>
            {q.difficulty && (
              <span className={`pill diff-${q.difficulty}`}>{q.difficulty}</span>
            )}
            {isMulti && <span className="pill">multiple answers</span>}
          </div>

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
                <span className="option-mark" aria-hidden="true" />
                <span className="option-text">{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {submitWarning && <div className="warning" role="alert">{submitWarning}</div>}

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
        <div className={"feedback " + (score === 1 ? "good" : score === 0 ? "bad" : "")} role="status" aria-live="polite">
          <div className="label">
            {score === 1 ? "Correct" : score > 0 ? `Partial (${(score * 100).toFixed(0)}%)` : "Incorrect"}
          </div>
          <div>{q.explanation}</div>
        </div>
      )}

          <div className="updated-note">Updated 3 weeks ago</div>
        </div>
      </div>

      <div className="actions split-actions">
        <button className="secondary-action" onClick={() => goTo(idx - 1)} disabled={isFirst}>
          Previous
        </button>
        <div className="right-actions">
          {!submitted && canReveal && (
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

      <nav className="q-nav" aria-label="Question navigator">
        <div className="q-nav-scroll">
          {pool.map((item, i) => {
            const a = answers[item.id];
            const isAnswered = Boolean(
              a && (a.submitted || a.selected?.length || a.text)
            );
            const cls =
              "q-nav-num" +
              (i === idx ? " current" : "") +
              (isAnswered ? " answered" : "") +
              (flagged.has(item.id) ? " flagged" : "");
            return (
              <button
                key={item.id}
                className={cls}
                onClick={() => goTo(i)}
                title={`Go to question ${i + 1}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <div className="q-nav-arrows">
          <button onClick={() => goTo(idx - 1)} disabled={isFirst} title="Previous">
            <IconArrow size={20} />
          </button>
          <button onClick={() => goTo(idx + 1)} disabled={isLast} title="Next">
            <IconArrowRight size={20} />
          </button>
        </div>
      </nav>
    </section>
  );
}
