(function () {
  const questions = window.RMAI_QUESTIONS || [];
  const storageKey = "rmaiQuizLab:v1";

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
    answers: {},
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

  const SOURCE_DOMAINS = {
    "L1 Slides": "L1 · Scientific Thinking & Research Design",
    "L3 Slides": "L3 · Data Simulation & Modelling",
    "L4 Slides": "L4 · Data Analysis & Prediction",
    "L5 Slides": "L5 · Open & Reproducible Research",
    "Week 2 Slides": "W2 · Data Collection & Measurement",
    "Week 6 Slides": "W6 · Research Ethics",
  };

  function domainFor(q) {
    return SOURCE_DOMAINS[q.source] || q.source || "General";
  }

  questions.forEach((q) => {
    q.domain = domainFor(q);
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
    state.revealed = {};
    state.completed = false;
    render();
  }

  function currentQuestion() {
    return state.session[state.index];
  }

  function answerText(q) {
    const opt = q.options.find((item) => item[0] === q.answer);
    return opt ? opt[1] : "";
  }

  function optionText(q, label) {
    const opt = q.options.find((item) => item[0] === label);
    return opt ? opt[1] : "";
  }

  function cleanExplanation(note) {
    if (!note) return "Review the source topic for the rule being tested, then compare the correct option against the distractors.";
    return note
      .replace(/^Correct answer:\s*[^.]+\.?\s*/i, "")
      .replace(/\s*Added from .*$/i, "")
      .trim();
  }

  function scoreStats() {
    const answered = Object.keys(state.answers).length;
    let correct = 0;
    for (const q of state.session) {
      if (state.answers[q.id] === q.answer) correct += 1;
    }
    let streak = 0;
    for (let i = state.index; i >= 0; i -= 1) {
      const q = state.session[i];
      if (!q || !state.answers[q.id]) continue;
      if (state.answers[q.id] !== q.answer) break;
      streak += 1;
    }
    return { answered, correct, streak, score: answered ? Math.round((correct / answered) * 100) : 0 };
  }

  function selectAnswer(label) {
    const q = currentQuestion();
    if (!q || state.completed) return;
    state.answers[q.id] = label;
    state.revealed[q.id] = true;
    state.saved.attempts[q.id] = (state.saved.attempts[q.id] || 0) + 1;
    if (label === q.answer) delete state.saved.incorrect[q.id];
    else state.saved.incorrect[q.id] = true;
    saveSaved();
    render();
  }

  function revealAnswer() {
    const q = currentQuestion();
    if (!q) return;
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

    if (!q) {
      els.topic.textContent = "No matching questions";
      els.questionText.textContent = "No questions match the current domain selection.";
      els.source.textContent = "Choose every question or select at least one domain.";
      els.answerPanel.classList.add("hidden");
      els.bookmark.textContent = "☆";
      return;
    }

    els.topic.textContent = q.domain;
    els.questionText.textContent = q.question;
    els.source.textContent = `${q.id} · ${q.topic} · ${q.source}`;
    els.bookmark.textContent = state.saved.bookmarked[q.id] ? "★" : "☆";

    const selected = state.answers[q.id];
    const revealed = state.completed || state.revealed[q.id];

    q.options.forEach(([label, text]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-button";
      if (selected === label) button.classList.add("selected");
      if (revealed && label === q.answer) button.classList.add("correct");
      if (revealed && selected === label && selected !== q.answer) button.classList.add("incorrect");
      button.innerHTML = `<span class="option-letter">${label}</span><span>${text}</span>`;
      button.addEventListener("click", () => selectAnswer(label));
      els.options.appendChild(button);
    });

    if (revealed) {
      els.answerPanel.classList.remove("hidden", "good", "bad");
      if (selected) els.answerPanel.classList.add(selected === q.answer ? "good" : "bad");
      els.answerResult.textContent = selected ? (selected === q.answer ? "Correct" : "Not quite") : "Answer revealed";
      els.answerChoice.textContent =
        selected && selected !== q.answer
          ? `You chose ${selected}. ${optionText(q, selected)} Correct answer: ${q.answer}. ${answerText(q)}`
          : `Correct answer: ${q.answer}. ${answerText(q)}`;
      els.answerNote.textContent = `Why: ${cleanExplanation(q.note)}`;
      els.answerAnchor.textContent = q.anchor;
    } else {
      els.answerPanel.classList.add("hidden");
    }
  }

  function renderStats() {
    const stats = scoreStats();
    const total = state.session.length;
    const position = total ? state.index + 1 : 0;
    const scopeText = state.scope === "all" ? "Every question" : state.selectedDomains.size ? `${state.selectedDomains.size} domains` : "Domain specific";
    els.sessionTitle.textContent = `${scopeText} · ${state.shuffle ? "Randomized" : "In order"}`;
    els.score.textContent = `${stats.score}%`;
    els.progress.textContent = `${stats.answered} / ${total}`;
    els.streak.textContent = stats.streak;
    els.progressLabel.textContent = total
      ? state.completed
        ? `Complete · ${stats.correct} correct · ${total - stats.correct} review`
        : `${stats.correct} correct · ${total - stats.answered} remaining`
      : "Ready";
    els.questionPosition.textContent = `${position} of ${total}`;
    els.progressBar.style.width = total ? `${(stats.answered / total) * 100}%` : "0%";
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
    const missed = state.session.filter((q) => state.answers[q.id] && state.answers[q.id] !== q.answer);
    const unanswered = state.session.filter((q) => !state.answers[q.id]);

    els.summaryStats.innerHTML = [
      ["Score", `${stats.score}%`],
      ["Correct", `${stats.correct}/${state.session.length}`],
      ["Missed", String(missed.length)],
      ["Unanswered", String(unanswered.length)],
    ]
      .map(([label, value]) => `<div class="summary-stat"><strong>${value}</strong><span>${label}</span></div>`)
      .join("");

    const byDomain = new Map();
    state.session.forEach((q) => {
      if (!byDomain.has(q.domain)) byDomain.set(q.domain, { total: 0, correct: 0, missed: 0, unanswered: 0 });
      const row = byDomain.get(q.domain);
      row.total += 1;
      if (!state.answers[q.id]) row.unanswered += 1;
      else if (state.answers[q.id] === q.answer) row.correct += 1;
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
      : `<div class="missed-row"><div class="missed-row-head"><span>No missed answered questions</span></div><small>Unanswered questions are counted separately above.</small></div>`;
  }

  function renderReview() {
    els.reviewGrid.innerHTML = "";
    const visible = state.session.filter((q) => {
      if (state.reviewFilter === "missed") return state.answers[q.id] && state.answers[q.id] !== q.answer;
      if (state.reviewFilter === "bookmarked") return state.saved.bookmarked[q.id];
      return true;
    });
    visible.forEach((q) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "review-item";
      if (q.id === currentQuestion()?.id) button.classList.add("current");
      if (state.answers[q.id] === q.answer) button.classList.add("correct");
      if (state.answers[q.id] && state.answers[q.id] !== q.answer) button.classList.add("incorrect");
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
      if (event.key >= "1" && event.key <= "4") {
        const q = currentQuestion();
        const opt = q?.options[Number(event.key) - 1];
        if (opt) selectAnswer(opt[0]);
      }
      if (event.key === "ArrowRight") els.next.click();
      if (event.key === "ArrowLeft") els.prev.click();
      if (event.key.toLowerCase() === "r") revealAnswer();
    });
  }

  renderDomains();
  bindEvents();
  makeSession();
})();
