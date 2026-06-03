import { useCallback, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { QUIZZES, getQuiz } from "./quizzes.js";
import Library from "./components/Library.jsx";
import Home from "./components/Home.jsx";
import Quiz from "./components/Quiz.jsx";
import Result from "./components/Result.jsx";
import {
  loadAll,
  loadQuiz,
  saveQuiz,
  setSelectedQuizId,
  clearQuiz,
  clearAll,
} from "./storage.js";
import { shuffle as shuf, shuffleOptions, applyOptionOrder } from "./scoring.js";

export default function App() {
  const navigate = useNavigate();
  const [selectedQuizId, setSelectedId] = useState(null);
  const [pool, setPool] = useState([]);
  const [mode, setMode] = useState("practice");
  const [answers, setAnswers] = useState({});
  const [flagged, setFlaggedState] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [allState, setAllState] = useState({ selectedQuizId: null, perQuiz: {} });

  useEffect(() => {
    setAllState(loadAll());
  }, []);

  // Sync the route's :quizId into local state. Returns true once selected.
  const ensureSelected = useCallback((quizId) => {
    if (!quizId || !getQuiz(quizId)) return;
    setSelectedId((current) => {
      if (current === quizId) return current;
      const state = loadQuiz(quizId);
      setSelectedQuizId(quizId);
      setFlaggedState(new Set(state.flagged || []));
      setHistory(state.attempts || []);
      setActiveQuiz(state.activeQuiz || null);
      setAllState(loadAll());
      return quizId;
    });
  }, []);

  function backToLibrary() {
    setSelectedId(null);
    setSelectedQuizId(null);
    setAllState(loadAll());
    navigate("/");
  }

  const selectedQuiz = selectedQuizId ? getQuiz(selectedQuizId) : null;
  const questions = selectedQuiz?.questions || [];

  function setFlagged(next) {
    setFlaggedState(next);
    saveQuiz(selectedQuizId, { flagged: [...next] });
  }

  function onStart({ mode, topics, shuffle, shuffleAnswers }) {
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
    let optionOrders = null;
    if (shuffleAnswers) {
      optionOrders = {};
      p = p.map((q) => {
        const { q: shuffledQ, order } = shuffleOptions(q);
        if (order) optionOrders[q.id] = order;
        return shuffledQ;
      });
    }
    setPool(p);
    setMode(mode);
    setAnswers({});
    const nextActiveQuiz = {
      mode,
      poolIds: p.map((q) => q.id),
      optionOrders,
      answers: {},
      idx: 0,
      startedAt: new Date().toISOString(),
    };
    setActiveQuiz(nextActiveQuiz);
    saveQuiz(selectedQuizId, { activeQuiz: nextActiveQuiz });
    navigate(`/quiz/${selectedQuizId}/run`);
  }

  function onResume() {
    if (!activeQuiz) return;
    const orders = activeQuiz.optionOrders || {};
    const restoredPool = activeQuiz.poolIds
      .map((id) => questions.find((q) => q.id === id))
      .filter(Boolean)
      .map((q) => (orders[q.id] ? applyOptionOrder(q, orders[q.id]) : q));
    if (!restoredPool.length) {
      alert("Saved quiz could not be restored.");
      setActiveQuiz(null);
      saveQuiz(selectedQuizId, { activeQuiz: null });
      return;
    }
    setPool(restoredPool);
    setMode(activeQuiz.mode);
    setAnswers(activeQuiz.answers || {});
    navigate(`/quiz/${selectedQuizId}/run`);
  }

  const onProgress = useCallback(
    (progress) => {
      if (!selectedQuizId) return;
      const nextActiveQuiz = {
        mode,
        poolIds: pool.map((q) => q.id),
        answers: progress.answers,
        idx: progress.idx,
        startedAt: activeQuiz?.startedAt || new Date().toISOString(),
        savedAt: new Date().toISOString(),
      };
      setActiveQuiz(nextActiveQuiz);
      saveQuiz(selectedQuizId, { activeQuiz: nextActiveQuiz });
    },
    [activeQuiz?.startedAt, mode, pool, selectedQuizId]
  );

  function onFinish(finalAnswers, finalPool) {
    setAnswers(finalAnswers);
    const total = finalPool.length;
    const raw = finalPool.reduce(
      (s, q) => s + (finalAnswers[q.id]?.score || 0),
      0
    );
    const attempt = {
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      mode,
      score: +raw.toFixed(1),
      total,
    };
    const next = [...history, attempt];
    setHistory(next);
    setActiveQuiz(null);
    saveQuiz(selectedQuizId, {
      attempts: next,
      flagged: [...flagged],
      activeQuiz: null,
    });
    navigate(`/quiz/${selectedQuizId}/result`);
  }

  function onResetQuiz() {
    if (!selectedQuizId) return;
    if (!confirm(`Clear progress and flags for "${selectedQuiz.title}"?`)) return;
    clearQuiz(selectedQuizId);
    setFlaggedState(new Set());
    setHistory([]);
    setActiveQuiz(null);
    setAllState(loadAll());
  }

  function onResetAll() {
    if (!confirm("Clear ALL quiz progress across every quiz?")) return;
    clearAll();
    setFlaggedState(new Set());
    setHistory([]);
    setActiveQuiz(null);
    setSelectedId(null);
    setAllState({ selectedQuizId: null, perQuiz: {} });
    navigate("/");
  }

  const ctx = {
    selectedQuiz,
    questions,
    pool,
    mode,
    answers,
    flagged,
    history,
    activeQuiz,
    allState,
    ensureSelected,
    setFlagged,
    onStart,
    onResume,
    onProgress,
    onFinish,
    onResetQuiz,
    onResetAll,
    backToLibrary,
    navigate,
  };

  return (
    <div className="app">
      <header className="masthead">
        <div>
          <p className="eyebrow">ML exam trainer</p>
          <h1>Machine Learning Exam Practice</h1>
          <p className="sub">
            {selectedQuiz
              ? `${selectedQuiz.title} · ${questions.length} questions`
              : `${QUIZZES.length} quizzes — pick one to begin`}
          </p>
        </div>
        <div className="masthead-card">
          <span>{selectedQuiz ? flagged.size : QUIZZES.length}</span>
          <small>{selectedQuiz ? "flagged" : "quizzes"}</small>
        </div>
      </header>
      <main>
        <Routes>
          <Route index element={<LibraryRoute ctx={ctx} />} />
          <Route path="quiz/:quizId" element={<QuizLayout ctx={ctx} />}>
            <Route index element={<HomeRoute />} />
            <Route path="run" element={<QuizRoute />} />
            <Route path="result" element={<ResultRoute />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function LibraryRoute({ ctx }) {
  const navigate = useNavigate();
  return (
    <Library
      quizzes={QUIZZES}
      allState={ctx.allState}
      onSelect={(id) => navigate(`/quiz/${id}`)}
      onResetAll={ctx.onResetAll}
    />
  );
}

// Syncs :quizId into state, then renders the matched child route via Outlet.
function QuizLayout({ ctx }) {
  const { quizId } = useParams();

  useEffect(() => {
    ctx.ensureSelected(quizId);
  }, [quizId, ctx.ensureSelected]);

  if (!getQuiz(quizId)) return <Navigate to="/" replace />;
  // Wait for ensureSelected to land before rendering quiz-dependent children.
  if (ctx.selectedQuiz?.id !== quizId) return null;

  return <Outlet context={ctx} />;
}

function HomeRoute() {
  const ctx = useOutletContext();
  return (
    <Home
      quiz={ctx.selectedQuiz}
      questions={ctx.questions}
      flagged={ctx.flagged}
      history={ctx.history}
      activeQuiz={ctx.activeQuiz}
      onStart={ctx.onStart}
      onResume={ctx.onResume}
      onReset={ctx.onResetQuiz}
      onBack={ctx.backToLibrary}
    />
  );
}

function QuizRoute() {
  const ctx = useOutletContext();
  const navigate = useNavigate();
  // Deep-link / refresh with no live pool: bounce back to the quiz home.
  if (!ctx.pool.length) {
    return <Navigate to={`/quiz/${ctx.selectedQuiz.id}`} replace />;
  }
  return (
    <Quiz
      pool={ctx.pool}
      mode={ctx.mode}
      flagged={ctx.flagged}
      setFlagged={ctx.setFlagged}
      initialProgress={ctx.activeQuiz}
      onProgress={ctx.onProgress}
      onFinish={ctx.onFinish}
      onQuit={() => navigate(`/quiz/${ctx.selectedQuiz.id}`)}
    />
  );
}

function ResultRoute() {
  const ctx = useOutletContext();
  const navigate = useNavigate();
  if (!ctx.pool.length) {
    return <Navigate to={`/quiz/${ctx.selectedQuiz.id}`} replace />;
  }
  return (
    <Result
      answers={ctx.answers}
      pool={ctx.pool}
      mode={ctx.mode}
      onHome={() => navigate(`/quiz/${ctx.selectedQuiz.id}`)}
      onLibrary={ctx.backToLibrary}
    />
  );
}
