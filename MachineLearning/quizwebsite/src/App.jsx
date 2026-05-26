import { useCallback, useEffect, useState } from "react";
import questions from "../data/questions.json";
import Home from "./components/Home.jsx";
import Quiz from "./components/Quiz.jsx";
import Result from "./components/Result.jsx";
import { load, save, clear } from "./storage.js";
import { shuffle as shuf } from "./scoring.js";

export default function App() {
  const [view, setView] = useState("home");
  const [pool, setPool] = useState([]);
  const [mode, setMode] = useState("practice");
  const [answers, setAnswers] = useState({});
  const [flagged, setFlaggedState] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);

  useEffect(() => {
    const stored = load();
    setFlaggedState(new Set(stored.flagged || []));
    setHistory(stored.attempts || []);
    setActiveQuiz(stored.activeQuiz || null);
  }, []);

  function setFlagged(next) {
    setFlaggedState(next);
    save({ flagged: [...next] });
  }

  function onStart({ mode, topics, shuffle }) {
    let p = questions.slice();
    if (topics.length) p = p.filter((q) => topics.includes(q.topic));
    if (!p.length) {
      alert("No questions match that topic filter.");
      return;
    }
    if (mode === "review") {
      p = p.filter((q) => flagged.has(q.id));
      if (!p.length) {
        alert("No flagged questions match that filter yet.");
        return;
      }
    }
    if (shuffle) p = shuf(p);
    setPool(p);
    setMode(mode);
    setAnswers({});
    const nextActiveQuiz = {
      mode,
      poolIds: p.map((q) => q.id),
      answers: {},
      idx: 0,
      startedAt: new Date().toISOString(),
    };
    setActiveQuiz(nextActiveQuiz);
    save({ activeQuiz: nextActiveQuiz });
    setView("quiz");
  }

  function onResume() {
    if (!activeQuiz) return;
    const restoredPool = activeQuiz.poolIds
      .map((id) => questions.find((q) => q.id === id))
      .filter(Boolean);
    if (!restoredPool.length) {
      alert("Saved quiz could not be restored.");
      setActiveQuiz(null);
      save({ activeQuiz: null });
      return;
    }
    setPool(restoredPool);
    setMode(activeQuiz.mode);
    setAnswers(activeQuiz.answers || {});
    setView("quiz");
  }

  const onProgress = useCallback((progress) => {
    const nextActiveQuiz = {
      mode,
      poolIds: pool.map((q) => q.id),
      answers: progress.answers,
      idx: progress.idx,
      startedAt: activeQuiz?.startedAt || new Date().toISOString(),
      savedAt: new Date().toISOString(),
    };
    setActiveQuiz(nextActiveQuiz);
    save({ activeQuiz: nextActiveQuiz });
  }, [activeQuiz?.startedAt, mode, pool]);

  function onFinish(finalAnswers, finalPool) {
    setAnswers(finalAnswers);
    const total = finalPool.length;
    const raw = finalPool.reduce((s, q) => s + (finalAnswers[q.id]?.score || 0), 0);
    const attempt = {
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      mode,
      score: +raw.toFixed(1),
      total,
    };
    const next = [...history, attempt];
    setHistory(next);
    setActiveQuiz(null);
    save({ attempts: next, flagged: [...flagged], activeQuiz: null });
    setView("result");
  }

  function onReset() {
    if (!confirm("Clear all history and flags?")) return;
    clear();
    setFlaggedState(new Set());
    setHistory([]);
    setActiveQuiz(null);
  }

  return (
    <div className="app">
      <header className="masthead">
        <div>
          <p className="eyebrow">ML exam trainer</p>
          <h1>Machine Learning Exam Practice</h1>
          <p className="sub">Based on examplepaper.pdf - {questions.length} questions</p>
        </div>
        <div className="masthead-card">
          <span>{flagged.size}</span>
          <small>flagged</small>
        </div>
      </header>
      <main>
        {view === "home" && (
          <Home
            questions={questions}
            flagged={flagged}
            history={history}
            activeQuiz={activeQuiz}
            onStart={onStart}
            onResume={onResume}
            onReset={onReset}
          />
        )}
        {view === "quiz" && (
          <Quiz
            pool={pool}
            mode={mode}
            flagged={flagged}
            setFlagged={setFlagged}
            initialProgress={activeQuiz}
            onProgress={onProgress}
            onFinish={onFinish}
            onQuit={() => setView("home")}
          />
        )}
        {view === "result" && (
          <Result
            answers={answers}
            pool={pool}
            mode={mode}
            onHome={() => setView("home")}
          />
        )}
      </main>
    </div>
  );
}
