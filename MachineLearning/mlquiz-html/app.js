(function () {
  const questions = window.ML_QUESTIONS || [];
  const storageKey = "mlQuizLab:v1";

  const els = {
    totalCount: document.getElementById("total-count"),
    topicList: document.getElementById("topic-list"),
    topicPicker: document.getElementById("topic-picker"),
    clearTopics: document.getElementById("clear-topics"),
    scopeAll: document.getElementById("scope-all"),
    scopeSpecific: document.getElementById("scope-specific"),
    shuffle: document.getElementById("shuffle-toggle"),
    start: document.getElementById("start-session"),
    sessionTitle: document.getElementById("session-title"),
    score: document.getElementById("stat-score"),
    progress: document.getElementById("stat-progress"),
    streak: document.getElementById("stat-streak"),
    progressLabel: document.getElementById("progress-label"),
    questionPosition: document.getElementById("question-position"),
    progressBar: document.getElementById("progress-bar"),
    topic: document.getElementById("question-topic"),
    bookmark: document.getElementById("bookmark-button"),
    reset: document.getElementById("reset-progress"),
    questionText: document.getElementById("question-text"),
    source: document.getElementById("source-line"),
    options: document.getElementById("options-list"),
    submit: document.getElementById("submit-button"),
    answerPanel: document.getElementById("answer-panel"),
    answerResult: document.getElementById("answer-result"),
    answerChoice: document.getElementById("answer-choice"),
    answerNote: document.getElementById("answer-note"),
    answerAnchor: document.getElementById("answer-anchor"),
    prev: document.getElementById("prev-button"),
    reveal: document.getElementById("reveal-button"),
    next: document.getElementById("next-button"),
    summaryCard: document.getElementById("summary-card"),
    newSession: document.getElementById("new-session"),
    summaryStats: document.getElementById("summary-stats"),
    topicPerformance: document.getElementById("topic-performance"),
    missedList: document.getElementById("missed-list"),
    reviewGrid: document.getElementById("review-grid"),
    reviewAll: document.getElementById("review-all"),
    reviewMissed: document.getElementById("review-missed"),
    reviewBookmarked: document.getElementById("review-bookmarked"),
  };

  const state = {
    scope: "all",
    selectedDomains: new Set(),
    shuffle: true,
    session: [],
    index: 0,
    answers: {}, // id -> array of chosen letters (or "OPEN" sentinel for open Qs)
    pending: {}, // id -> Set of letters chosen but not yet submitted (multi)
    revealed: {},
    completed: false,
    reviewFilter: "all",
    saved: loadSaved(),
  };

  function loadSaved() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || { incorrect: {}, bookmarked: {}, attempts: {} };
    } catch {
      return { incorrect: {}, bookmarked: {}, attempts: {} };
    }
  }

  function saveSaved() {
    localStorage.setItem(storageKey, JSON.stringify(state.saved));
  }

  questions.forEach((q) => {
    q.domain = q.domain || q.source || "General";
  });

  const domains = [...new Set(questions.map((q) => q.domain))].sort((a, b) => a.localeCompare(b));

  function shuffleArray(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function matchingQuestions() {
    if (state.scope === "all" || state.selectedDomains.size === 0) return [...questions];
    return questions.filter((q) => state.selectedDomains.has(q.domain));
  }

  function makeSession() {
    let list = matchingQuestions();
    if (state.shuffle) list = shuffleArray(list);
    state.session = list;
    state.index = 0;
    state.answers = {};
    state.pending = {};
    state.revealed = {};
    state.completed = false;
    render();
  }

  function currentQuestion() {
    return state.session[state.index];
  }

  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    const setB = new Set(b);
    return a.every((x) => setB.has(x));
  }

  function isCorrect(q) {
    if (q.type === "open") return false; // open questions are self-graded, never auto-scored
    const chosen = state.answers[q.id];
    if (!chosen) return false;
    return sameSet(chosen, q.answer);
  }

  function answered(q) {
    return Boolean(state.answers[q.id]);
  }

  function labelText(q, label) {
    const opt = q.options.find((item) => item[0] === label);
    return opt ? opt[1] : label;
  }

  function correctText(q) {
    return q.answer.map((l) => `${l}. ${labelText(q, l)}`).join("  ·  ");
  }

  function scoreStats() {
    const gradable = state.session.filter((q) => q.type !== "open");
    const ans = gradable.filter((q) => answered(q)).length;
    let correct = 0;
    for (const q of gradable) if (isCorrect(q)) correct += 1;
    let streak = 0;
    for (let i = state.index; i >= 0; i -= 1) {
      const q = state.session[i];
      if (!q || q.type === "open" || !answered(q)) continue;
      if (!isCorrect(q)) break;
      streak += 1;
    }
    return { answered: ans, correct, streak, total: gradable.length, score: ans ? Math.round((correct / ans) * 100) : 0 };
  }

  function recordAttempt(q) {
    state.saved.attempts[q.id] = (state.saved.attempts[q.id] || 0) + 1;
    if (isCorrect(q)) delete state.saved.incorrect[q.id];
    else state.saved.incorrect[q.id] = true;
    saveSaved();
  }

  // mcq: single click commits. multi: toggle into pending until Submit. open: handled by reveal.
  function chooseOption(label) {
    const q = currentQuestion();
    if (!q || state.completed || state.revealed[q.id]) return;
    if (q.type === "multi") {
      const set = state.pending[q.id] || new Set();
      if (set.has(label)) set.delete(label);
      else set.add(label);
      state.pending[q.id] = set;
      render();
      return;
    }
    state.answers[q.id] = [label];
    state.revealed[q.id] = true;
    recordAttempt(q);
    render();
  }

  function submitMulti() {
    const q = currentQuestion();
    if (!q || q.type !== "multi") return;
    const set = state.pending[q.id] || new Set();
    state.answers[q.id] = [...set].sort();
    state.revealed[q.id] = true;
    recordAttempt(q);
    render();
  }

  function revealAnswer() {
    const q = currentQuestion();
    if (!q) return;
    if (q.type === "open" && !state.answers[q.id]) state.answers[q.id] = ["OPEN"];
    state.revealed[q.id] = true;
    render();
  }

  function finishSession() {
    state.completed = true;
    state.session.forEach((q) => {
      state.revealed[q.id] = true;
    });
    render();
    els.summaryCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderDomains() {
    els.topicList.innerHTML = "";
    domains.forEach((domain) => {
      const count = questions.filter((q) => q.domain === domain).length;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `topic-chip${state.selectedDomains.has(domain) ? " active" : ""}`;
      button.textContent = `${domain} · ${count}`;
      button.addEventListener("click", () => {
        if (state.selectedDomains.has(domain)) state.selectedDomains.delete(domain);
        else state.selectedDomains.add(domain);
        renderDomains();
        makeSession();
      });
      els.topicList.appendChild(button);
    });
    els.topicPicker.classList.toggle("hidden", state.scope !== "specific");
    els.scopeAll.classList.toggle("active", state.scope === "all");
    els.scopeSpecific.classList.toggle("active", state.scope === "specific");
  }

  function renderQuestion() {
    const q = currentQuestion();
    els.options.innerHTML = "";
    els.submit.classList.add("hidden");

    if (!q) {
      els.topic.textContent = "No matching questions";
      els.questionText.textContent = "No questions match the current lecture selection.";
      els.source.textContent = "Choose every question or select at least one lecture.";
      els.answerPanel.classList.add("hidden");
      els.bookmark.textContent = "☆";
      return;
    }

    const typeLabel = q.type === "multi" ? "Select all that apply" : q.type === "open" ? "Open answer" : "Single answer";
    els.topic.textContent = `${q.domain} · ${typeLabel}`;
    els.questionText.textContent = q.question;
    els.source.textContent = `${q.id} · ${q.topic} · ${q.source}`;
    els.bookmark.textContent = state.saved.bookmarked[q.id] ? "★" : "☆";

    const committed = state.answers[q.id];
    const revealed = state.completed || state.revealed[q.id];
    const pending = state.pending[q.id] || new Set();

    q.options.forEach(([label, text]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-button";
      const chosen = committed ? committed.includes(label) : pending.has(label);
      if (chosen) button.classList.add("selected");
      if (revealed && q.answer.includes(label)) button.classList.add("correct");
      if (revealed && chosen && !q.answer.includes(label)) button.classList.add("incorrect");
      button.innerHTML = `<span class="option-letter">${label}</span><span>${text}</span>`;
      button.addEventListener("click", () => chooseOption(label));
      els.options.appendChild(button);
    });

    if (q.type === "multi" && !revealed) {
      els.submit.classList.remove("hidden");
      els.submit.disabled = pending.size === 0;
    }

    if (revealed) {
      els.answerPanel.classList.remove("hidden", "good", "bad");
      if (q.type === "open") {
        els.answerResult.textContent = "Model answer";
        els.answerChoice.textContent = "";
      } else {
        const ok = isCorrect(q);
        els.answerPanel.classList.add(ok ? "good" : "bad");
        els.answerResult.textContent = answered(q) ? (ok ? "Correct" : "Not quite") : "Answer revealed";
        els.answerChoice.textContent = `Correct: ${correctText(q)}`;
      }
      els.answerNote.textContent = q.note ? `Why: ${q.note}` : "";
      els.answerAnchor.textContent = q.anchor;
    } else {
      els.answerPanel.classList.add("hidden");
    }
  }

  function renderStats() {
    const stats = scoreStats();
    const total = state.session.length;
    const position = total ? state.index + 1 : 0;
    const scopeText = state.scope === "all" ? "Every question" : state.selectedDomains.size ? `${state.selectedDomains.size} lectures` : "Lecture specific";
    els.sessionTitle.textContent = `${scopeText} · ${state.shuffle ? "Randomized" : "In order"}`;
    els.score.textContent = `${stats.score}%`;
    els.progress.textContent = `${stats.answered} / ${stats.total}`;
    els.streak.textContent = stats.streak;
    els.progressLabel.textContent = total
      ? state.completed
        ? `Complete · ${stats.correct} correct · ${stats.total - stats.correct} review`
        : `${stats.correct} correct · ${stats.total - stats.answered} remaining (gradable)`
      : "Ready";
    els.questionPosition.textContent = `${position} of ${total}`;
    const done = state.session.filter((q) => state.revealed[q.id]).length;
    els.progressBar.style.width = total ? `${(done / total) * 100}%` : "0%";
    els.prev.disabled = state.index <= 0;
    els.next.textContent = state.index >= total - 1 ? "Finish →" : "Next →";
  }

  function renderSummary() {
    if (!state.completed) {
      els.summaryCard.classList.add("hidden");
      return;
    }
    els.summaryCard.classList.remove("hidden");
    const stats = scoreStats();
    const gradable = state.session.filter((q) => q.type !== "open");
    const missed = gradable.filter((q) => answered(q) && !isCorrect(q));
    const unanswered = gradable.filter((q) => !answered(q));
    const openCount = state.session.length - gradable.length;

    els.summaryStats.innerHTML = [
      ["Score", `${stats.score}%`],
      ["Correct", `${stats.correct}/${stats.total}`],
      ["Missed", String(missed.length)],
      ["Unanswered", String(unanswered.length)],
      ["Open (self-grade)", String(openCount)],
    ]
      .map(([label, value]) => `<div class="summary-stat"><strong>${value}</strong><span>${label}</span></div>`)
      .join("");

    const byDomain = new Map();
    gradable.forEach((q) => {
      if (!byDomain.has(q.domain)) byDomain.set(q.domain, { total: 0, correct: 0, missed: 0, unanswered: 0 });
      const row = byDomain.get(q.domain);
      row.total += 1;
      if (!answered(q)) row.unanswered += 1;
      else if (isCorrect(q)) row.correct += 1;
      else row.missed += 1;
    });

    const domainRows = [...byDomain.entries()]
      .map(([domain, row]) => ({ domain, ...row, accuracy: row.total ? row.correct / row.total : 0 }))
      .sort((a, b) => a.accuracy - b.accuracy || b.total - a.total);

    els.topicPerformance.innerHTML = domainRows
      .map((row) => {
        const pct = Math.round(row.accuracy * 100);
        return `<div class="topic-row">
          <div class="topic-row-head"><span>${row.domain}</span><strong>${pct}%</strong></div>
          <small>${row.correct}/${row.total} correct · ${row.missed} missed · ${row.unanswered} unanswered</small>
          <div class="mini-track"><span style="width:${pct}%"></span></div>
        </div>`;
      })
      .join("");

    els.missedList.innerHTML = missed.length
      ? missed
          .map(
            (q) => `<div class="missed-row">
              <div class="missed-row-head"><span>${q.id}</span><strong>${q.domain}</strong></div>
              <small>${q.question}</small>
            </div>`
          )
          .join("")
      : `<div class="missed-row"><div class="missed-row-head"><span>No missed answered questions</span></div><small>Unanswered & open questions are tracked separately above.</small></div>`;
  }

  function renderReview() {
    els.reviewGrid.innerHTML = "";
    const visible = state.session.filter((q) => {
      if (state.reviewFilter === "missed") return q.type !== "open" && answered(q) && !isCorrect(q);
      if (state.reviewFilter === "bookmarked") return state.saved.bookmarked[q.id];
      return true;
    });
    visible.forEach((q) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "review-item";
      if (q.id === currentQuestion()?.id) button.classList.add("current");
      if (q.type !== "open" && isCorrect(q)) button.classList.add("correct");
      if (q.type !== "open" && answered(q) && !isCorrect(q)) button.classList.add("incorrect");
      if (state.saved.bookmarked[q.id]) button.classList.add("bookmarked");
      button.innerHTML = `${q.id}<small>${q.domain}</small>`;
      button.addEventListener("click", () => {
        const idx = state.session.findIndex((item) => item.id === q.id);
        if (idx >= 0) {
          state.index = idx;
          render();
        }
      });
      els.reviewGrid.appendChild(button);
    });
  }

  function render() {
    els.totalCount.textContent = questions.length;
    renderQuestion();
    renderStats();
    renderSummary();
    renderReview();
  }

  function bindEvents() {
    els.scopeAll.addEventListener("click", () => {
      state.scope = "all";
      renderDomains();
      makeSession();
    });
    els.scopeSpecific.addEventListener("click", () => {
      state.scope = "specific";
      renderDomains();
      makeSession();
    });
    els.clearTopics.addEventListener("click", () => {
      state.selectedDomains.clear();
      renderDomains();
      makeSession();
    });
    els.shuffle.addEventListener("change", (event) => {
      state.shuffle = event.target.checked;
    });
    els.start.addEventListener("click", makeSession);
    els.submit.addEventListener("click", submitMulti);
    els.newSession.addEventListener("click", () => {
      makeSession();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    els.prev.addEventListener("click", () => {
      state.index = Math.max(0, state.index - 1);
      render();
    });
    els.next.addEventListener("click", () => {
      if (state.index >= state.session.length - 1) finishSession();
      else {
        state.index = Math.min(Math.max(0, state.session.length - 1), state.index + 1);
        render();
      }
    });
    els.reveal.addEventListener("click", revealAnswer);
    els.bookmark.addEventListener("click", () => {
      const q = currentQuestion();
      if (!q) return;
      if (state.saved.bookmarked[q.id]) delete state.saved.bookmarked[q.id];
      else state.saved.bookmarked[q.id] = true;
      saveSaved();
      render();
    });
    els.reset.addEventListener("click", () => {
      state.saved = { incorrect: {}, bookmarked: {}, attempts: {} };
      saveSaved();
      render();
    });
    els.reviewAll.addEventListener("click", () => {
      state.reviewFilter = "all";
      renderReview();
    });
    els.reviewMissed.addEventListener("click", () => {
      state.reviewFilter = "missed";
      renderReview();
    });
    els.reviewBookmarked.addEventListener("click", () => {
      state.reviewFilter = "bookmarked";
      renderReview();
    });
    document.addEventListener("keydown", (event) => {
      const q = currentQuestion();
      if (event.key >= "1" && event.key <= "9") {
        const opt = q?.options[Number(event.key) - 1];
        if (opt) chooseOption(opt[0]);
      }
      if (event.key === "Enter" && q?.type === "multi" && !state.revealed[q.id]) submitMulti();
      if (event.key === "ArrowRight") els.next.click();
      if (event.key === "ArrowLeft") els.prev.click();
      if (event.key.toLowerCase() === "r") revealAnswer();
    });
  }

  renderDomains();
  bindEvents();
  makeSession();
})();
