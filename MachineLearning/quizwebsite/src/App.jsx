import { useCallback, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
  useOutletContext,
} from "react-router-dom";
import { QUIZZES, getQuiz } from "./quizzes.js";
import {
  IconDescent,
  IconChevronRight,
  IconBookmark,
} from "./components/icons.jsx";
import Library from "./components/Library.jsx";
import Home from "./components/Home.jsx";
import Quiz from "./components/Quiz.jsx";
import Result from "./components/Result.jsx";
import Modal from "./components/Modal.jsx";
import {
  loadAll,
  loadQuiz,
  saveQuiz,
  setSelectedQuizId,
  clearQuiz,
  clearAll,
} from "./storage.js";
import { shuffle as shuf, shuffleOptions, applyOptionOrder } from "./scoring.js";

// Rebuild a runnable pool (original questions + persisted answer ordering) from
// a saved poolIds/optionOrders snapshot. Returns [] if nothing restorable.
function restorePool(poolIds, optionOrders, questions) {
  const orders = optionOrders || {};
  return (poolIds || [])
    .map((id) => questions.find((q) => q.id === id))
    .filter(Boolean)
    .map((q) => (orders[q.id] ? applyOptionOrder(q, orders[q.id]) : q));
}

export default function App() {
  const navigate = useNavigate();
  const [selectedQuizId, setSelectedId] = useState(null);
  const [pool, setPool] = useState([]);
  const [mode, setMode] = useState("practice");
  const [answers, setAnswers] = useState({});
  const [flagged, setFlaggedState] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [optionOrders, setOptionOrders] = useState(null);
  const [allState, setAllState] = useState({ selectedQuizId: null, perQuiz: {} });
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    setAllState(loadAll());
  }, []);

  // --- Styled dialog helpers (replace native alert/confirm) ---
  const uiConfirm = useCallback((opts, onConfirm) => {
    setDialog({ ...opts, onConfirm });
  }, []);
  const uiAlert = useCallback((title, message) => {
    setDialog({ title, message, confirmLabel: "OK", hideCancel: true, onConfirm: () => {} });
  }, []);
  const closeDialog = useCallback(() => setDialog(null), []);

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

  function clearFlags() {
    if (!selectedQuizId || flagged.size === 0) return;
    uiConfirm(
      {
        title: "Clear flags?",
        message: `Remove all ${flagged.size} flagged question${flagged.size > 1 ? "s" : ""} for this quiz.`,
        confirmLabel: "Clear flags",
        tone: "danger",
      },
      () => setFlagged(new Set())
    );
  }

  // Launch a fresh run from a prepared question pool + answer ordering.
  function launchRun(p, runMode, orders) {
    setPool(p);
    setMode(runMode);
    setOptionOrders(orders);
    setAnswers({});
    const nextActiveQuiz = {
      mode: runMode,
      poolIds: p.map((q) => q.id),
      optionOrders: orders,
      answers: {},
      idx: 0,
      startedAt: new Date().toISOString(),
    };
    setActiveQuiz(nextActiveQuiz);
    saveQuiz(selectedQuizId, { activeQuiz: nextActiveQuiz });
    navigate(`/quiz/${selectedQuizId}/run`);
  }

  function onStart({ mode, topics, shuffle, shuffleAnswers }) {
    let p = questions.slice();
    if (topics.length) p = p.filter((q) => topics.includes(q.topic));
    if (!p.length) {
      uiAlert("No questions", "No questions match that topic filter.");
      return;
    }
    if (mode === "review") {
      p = p.filter((q) => flagged.has(q.id));
      if (!p.length) {
        uiAlert("Nothing flagged", "No flagged questions match that filter yet.");
        return;
      }
    }
    if (shuffle) p = shuf(p);
    let orders = null;
    if (shuffleAnswers) {
      orders = {};
      p = p.map((q) => {
        const { q: shuffledQ, order } = shuffleOptions(q);
        if (order) orders[q.id] = order;
        return shuffledQ;
      });
    }
    launchRun(p, mode, orders);
  }

  // Retry a set of missed question ids as a fresh practice run.
  function onRetryMissed(missedIds) {
    const p = questions.filter((q) => missedIds.includes(q.id));
    if (!p.length) return;
    launchRun(p, "practice", null);
  }

  // Rebuild the in-memory run from the persisted activeQuiz (survives reload).
  const rehydrateActive = useCallback(() => {
    if (!selectedQuizId) return false;
    const aq = loadQuiz(selectedQuizId).activeQuiz;
    if (!aq) return false;
    const restored = restorePool(aq.poolIds, aq.optionOrders, questions);
    if (!restored.length) return false;
    setPool(restored);
    setMode(aq.mode);
    setOptionOrders(aq.optionOrders || null);
    setAnswers(aq.answers || {});
    setActiveQuiz(aq);
    return true;
  }, [selectedQuizId, questions]);

  // Rebuild a finished result (survives reload of a saved result screen).
  const rehydrateResult = useCallback((attemptId) => {
    if (!selectedQuizId) return false;
    const saved = loadQuiz(selectedQuizId);
    const attempt = attemptId
      ? saved.attempts?.find((item) => item.id === attemptId)
      : null;
    // Older saved data retained only the latest result, so it remains available.
    const result = attempt?.result || (!attemptId ? saved.lastResult : null);
    if (!result) return false;
    const restored = restorePool(result.poolIds, result.optionOrders, questions);
    if (!restored.length) return false;
    setPool(restored);
    setMode(result.mode);
    setOptionOrders(result.optionOrders || null);
    setAnswers(result.answers || {});
    return true;
  }, [selectedQuizId, questions]);

  function onReviewAttempt(attemptId) {
    const query = attemptId ? `?attempt=${encodeURIComponent(attemptId)}` : "";
    navigate(`/quiz/${selectedQuizId}/result${query}`);
  }

  function onResume() {
    if (!loadQuiz(selectedQuizId).activeQuiz) {
      uiAlert("Nothing to resume", "No saved quiz was found.");
      return;
    }
    navigate(`/quiz/${selectedQuizId}/run`);
  }

  const onProgress = useCallback(
    (progress) => {
      if (!selectedQuizId) return;
      const nextActiveQuiz = {
        mode,
        poolIds: pool.map((q) => q.id),
        optionOrders,
        answers: progress.answers,
        idx: progress.idx,
        startedAt: activeQuiz?.startedAt || new Date().toISOString(),
        savedAt: new Date().toISOString(),
      };
      setActiveQuiz(nextActiveQuiz);
      saveQuiz(selectedQuizId, { activeQuiz: nextActiveQuiz });
    },
    [activeQuiz?.startedAt, mode, pool, optionOrders, selectedQuizId]
  );

  function onFinish(finalAnswers, finalPool) {
    setAnswers(finalAnswers);
    const total = finalPool.length;
    const raw = finalPool.reduce(
      (s, q) => s + (finalAnswers[q.id]?.score || 0),
      0
    );
    const result = {
      poolIds: finalPool.map((q) => q.id),
      optionOrders,
      answers: finalAnswers,
      mode,
    };
    const attempt = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      mode,
      score: +raw.toFixed(1),
      total,
      result,
    };
    const next = [...history, attempt];
    setHistory(next);
    setActiveQuiz(null);
    const lastResult = { ...result, attempt };
    saveQuiz(selectedQuizId, {
      attempts: next,
      flagged: [...flagged],
      activeQuiz: null,
      lastResult,
    });
    navigate(`/quiz/${selectedQuizId}/result`);
  }

  function onResetQuiz() {
    if (!selectedQuizId) return;
    uiConfirm(
      {
        title: "Reset this quiz?",
        message: `Clear progress, attempts, and flags for "${selectedQuiz.title}".`,
        confirmLabel: "Reset quiz",
        tone: "danger",
      },
      () => {
        clearQuiz(selectedQuizId);
        setFlaggedState(new Set());
        setHistory([]);
        setActiveQuiz(null);
        setAllState(loadAll());
      }
    );
  }

  function onResetAll() {
    uiConfirm(
      {
        title: "Reset everything?",
        message: "Clear ALL quiz progress across every quiz. This cannot be undone.",
        confirmLabel: "Reset all",
        tone: "danger",
      },
      () => {
        clearAll();
        setFlaggedState(new Set());
        setHistory([]);
        setActiveQuiz(null);
        setSelectedId(null);
        setAllState({ selectedQuizId: null, perQuiz: {} });
        navigate("/");
      }
    );
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
    clearFlags,
    onStart,
    onResume,
    onProgress,
    onFinish,
    onRetryMissed,
    onReviewAttempt,
    onResetQuiz,
    onResetAll,
    backToLibrary,
    rehydrateActive,
    rehydrateResult,
    uiConfirm,
    navigate,
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              <IconDescent size={16} />
            </span>
            <span className="brand-name">GRADIENT</span>
            <span className="brand-crumb">
              <IconChevronRight size={13} aria-hidden="true" />
              {selectedQuiz ? selectedQuiz.title : "ML Exam Lab"}
            </span>
          </div>
          <div className="topbar-right">
            <span className="topbar-badge">
              <IconBookmark size={15} filled aria-hidden="true" />
              <b>{selectedQuiz ? flagged.size : QUIZZES.length}</b>
              <small>{selectedQuiz ? "flagged" : "quizzes"}</small>
            </span>
          </div>
        </div>
      </header>
      <div className="subbar">
        {selectedQuiz ? selectedQuiz.title : "Digital test"}
      </div>
      <main className="app">
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
      <Modal
        open={!!dialog}
        title={dialog?.title}
        message={dialog?.message}
        confirmLabel={dialog?.confirmLabel}
        cancelLabel={dialog?.cancelLabel}
        tone={dialog?.tone}
        hideCancel={dialog?.hideCancel}
        onConfirm={() => {
          dialog?.onConfirm?.();
          closeDialog();
        }}
        onCancel={closeDialog}
      />
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
      onResume={(id) => navigate(`/quiz/${id}/run`)}
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
      onClearFlags={ctx.clearFlags}
      onReviewAttempt={ctx.onReviewAttempt}
      onBack={ctx.backToLibrary}
    />
  );
}

function QuizRoute() {
  const ctx = useOutletContext();
  const navigate = useNavigate();

  // Refresh / deep-link with no live pool: rebuild from the saved activeQuiz.
  // Only bounce home if there is genuinely nothing to restore.
  useEffect(() => {
    if (!ctx.pool.length) {
      const ok = ctx.rehydrateActive();
      if (!ok) navigate(`/quiz/${ctx.selectedQuiz.id}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ctx.pool.length) return null;

  return (
    <Quiz
      pool={ctx.pool}
      mode={ctx.mode}
      flagged={ctx.flagged}
      setFlagged={ctx.setFlagged}
      initialProgress={ctx.activeQuiz}
      onProgress={ctx.onProgress}
      onFinish={ctx.onFinish}
      confirm={ctx.uiConfirm}
      onQuit={() => navigate(`/quiz/${ctx.selectedQuiz.id}`)}
    />
  );
}

function ResultRoute() {
  const ctx = useOutletContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const attemptId = searchParams.get("attempt");

  useEffect(() => {
    const ok = ctx.rehydrateResult(attemptId);
    if (!ok) navigate(`/quiz/${ctx.selectedQuiz.id}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  if (!ctx.pool.length) return null;

  return (
    <Result
      answers={ctx.answers}
      pool={ctx.pool}
      mode={ctx.mode}
      onRetryMissed={ctx.onRetryMissed}
      onHome={() => navigate(`/quiz/${ctx.selectedQuiz.id}`)}
      onLibrary={ctx.backToLibrary}
    />
  );
}
