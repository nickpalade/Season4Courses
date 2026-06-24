import { useState } from "react";
import {
  IconArrow,
  IconPractice,
  IconExam,
  IconFlag,
  IconResume,
  IconTarget,
  IconLayers,
  IconTrend,
} from "./icons.jsx";

export default function Home({
  quiz,
  questions,
  flagged,
  activeQuiz,
  onStart,
  onResume,
  onReset,
  onClearFlags,
  onReviewAttempt,
  onBack,
  history,
}) {
  const allTopics = [...new Set(questions.map((q) => q.topic))].sort();
  const [topics, setTopics] = useState(new Set());
  const [shuffle, setShuffle] = useState(false);
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const filteredCount = topics.size
    ? questions.filter((q) => topics.has(q.topic)).length
    : questions.length;
  const averageScore = history.length
    ? Math.round(
        (history.reduce((sum, attempt) => sum + attempt.score / attempt.total, 0) /
          history.length) *
          100
      )
    : 0;

  function toggleTopic(t) {
    const next = new Set(topics);
    next.has(t) ? next.delete(t) : next.add(t);
    setTopics(next);
  }

  function start(mode) {
    onStart({ mode, topics: [...topics], shuffle, shuffleAnswers });
  }

  return (
    <section className="home-panel">
      <div className="home-header">
        <button className="link link-icon" onClick={onBack}>
          <IconArrow size={15} /> Back to library
        </button>
        <div className="home-quiz-title">
          <strong>{quiz.title}</strong>
          <span className="muted">{quiz.subtitle}</span>
        </div>
      </div>

      <div className="study-board">
        <div>
          <span className="stat-icon"><IconTarget size={20} /></span>
          <span className="stat-value">{filteredCount}</span>
          <span className="stat-label">in current set</span>
        </div>
        <div>
          <span className="stat-icon"><IconLayers size={20} /></span>
          <span className="stat-value">{allTopics.length}</span>
          <span className="stat-label">topics</span>
        </div>
        <div>
          <span className="stat-icon"><IconTrend size={20} /></span>
          <span className="stat-value">{history.length ? `${averageScore}%` : "--"}</span>
          <span className="stat-label">average</span>
        </div>
      </div>

      <h2>Choose your run</h2>
      {activeQuiz && (
        <div className="resume-card">
          <div>
            <strong>Saved quiz in progress</strong>
            <span>
              {activeQuiz.mode} - question {(activeQuiz.idx || 0) + 1} of {activeQuiz.poolIds?.length || 0}
            </span>
          </div>
          <button onClick={onResume}>Resume</button>
        </div>
      )}
      <div className="modes">
        <button className="mode-btn" onClick={() => start("practice")}>
          <span className="mode-icon"><IconPractice size={24} /></span>
          <span className="big">Practice</span>
          <span className="small">Instant feedback and explanation</span>
        </button>
        <button className="mode-btn" onClick={() => start("exam")}>
          <span className="mode-icon"><IconExam size={24} /></span>
          <span className="big">Mock Exam</span>
          <span className="small">No spoilers until the end</span>
        </button>
        <button
          className="mode-btn"
          onClick={() => start("review")}
          disabled={flagged.size === 0}
          title={flagged.size === 0 ? "No flagged questions" : ""}
        >
          <span className="mode-icon"><IconFlag size={24} /></span>
          <span className="big">Review Flagged ({flagged.size})</span>
          <span className="small">Only the questions you marked</span>
        </button>
      </div>

      <div className="section-title">
        <h3>Filter topics</h3>
        {topics.size > 0 && (
          <button className="link" onClick={() => setTopics(new Set())}>
            Clear filters
          </button>
        )}
      </div>
      <div className="topics">
        {allTopics.map((t) => (
          <label key={t} className={topics.has(t) ? "active" : ""}>
            <input
              type="checkbox"
              checked={topics.has(t)}
              onChange={() => toggleTopic(t)}
            />
            {t}
          </label>
        ))}
      </div>

      <div className="row">
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
          />
          Shuffle questions
        </label>
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={shuffleAnswers}
            onChange={(e) => setShuffleAnswers(e.target.checked)}
          />
          Shuffle answers
        </label>
        {flagged.size > 0 && (
          <button className="link" onClick={onClearFlags}>
            Clear flags ({flagged.size})
          </button>
        )}
        <button className="link" onClick={onReset}>
          Reset this quiz
        </button>
      </div>

      {history.length > 0 && (
        <div className="history">
          <h3>Past attempts</h3>
          {[...history].reverse().map((a, i) => (
            <div key={i} className="row-item">
              <span>{a.date} - {a.mode}</span>
              <strong>
                {a.score}/{a.total} ({Math.round((a.score / a.total) * 100)}%)
              </strong>
              {(a.result || i === 0) && (
                <button
                  className="link"
                  onClick={() => onReviewAttempt(a.result ? a.id : null)}
                >
                  Review answers
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
