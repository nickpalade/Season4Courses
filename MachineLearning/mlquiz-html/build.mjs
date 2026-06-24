// Build a single self-contained ML Quiz HTML file from the React app's JSON data.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, "..", "quizwebsite", "data");
const letters = "ABCDEFGHIJ".split("");

// Lecture files -> human source label + short id prefix. ML topics only.
const LECTURES = [
  ["questions.json", "Past Paper", "EX"],
  ["lectures/01_ml_fundamentals.json", "L1 · ML Fundamentals", "L1"],
  ["lectures/02_binary_classification.json", "L2 · Binary Classification", "L2"],
  ["lectures/03_multiclass_regression_clustering.json", "L3 · Multi-class, Regression, Clustering", "L3"],
  ["lectures/04_decision_trees.json", "L4 · Decision Trees", "L4"],
  ["lectures/05_linear_models_svm.json", "L5 · Linear Models & SVM", "L5"],
  ["lectures/07a_features_pca.json", "L7a · Features & PCA", "L7a"],
  ["lectures/07b_distance_models_knn.json", "L7b · Distance Models & KNN", "L7b"],
  ["lectures/08_probabilistic_models.json", "L8 · Probabilistic Models", "L8"],
  ["lectures/09_ensembles.json", "L9 · Ensembles", "L9"],
  ["lectures/10_neural_networks.json", "L10 · Neural Networks", "L10"],
  ["lectures/11_xai_lime.json", "L11 · Explainable AI / LIME", "L11"],
];

const questions = [];
for (const [file, source, prefix] of LECTURES) {
  const raw = JSON.parse(readFileSync(join(dataDir, file), "utf8"));
  raw.forEach((q, i) => {
    const opts = (q.options || []).map((text, idx) => [letters[idx], text]);
    const answer = (q.correct || []).map((idx) => letters[idx]);
    questions.push({
      id: `${prefix}-Q${i + 1}`,
      source,
      domain: source,
      topic: q.topic || "General",
      type: q.type || (answer.length > 1 ? "multi" : "mcq"),
      question: q.prompt,
      options: opts,
      answer, // array of correct letters; [] for open questions
      note: q.explanation || "",
      anchor: `Machine Learning — ${source}`,
    });
  });
}

const styles = readFileSync(join(here, "styles.css"), "utf8");
const app = readFileSync(join(here, "app.js"), "utf8");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Machine Learning Quiz Lab</title>
    <style>
${styles}
    </style>
  </head>
  <body>
    <div class="app-shell">
      <aside class="sidebar" aria-label="Quiz setup">
        <div class="brand-block">
          <p class="eyebrow">Machine Learning</p>
          <h1>Quiz Lab</h1>
          <p class="bank-count"><span id="total-count">0</span> exam-style questions · MCQ · multi-select · open</p>
        </div>
        <section class="panel">
          <h2>Question Scope</h2>
          <div class="scope-toggle" role="group" aria-label="Question scope">
            <button class="scope-button active" id="scope-all" type="button">Every question</button>
            <button class="scope-button" id="scope-specific" type="button">Lecture specific</button>
          </div>
          <div class="topic-picker hidden" id="topic-picker">
            <div class="panel-head compact">
              <span>Choose one or more lectures</span>
              <button class="text-control" id="clear-topics" type="button">Clear</button>
            </div>
            <div class="topic-list" id="topic-list"></div>
          </div>
          <label class="switch-row">
            <input id="shuffle-toggle" type="checkbox" checked />
            <span>Randomize question order</span>
          </label>
          <button class="primary-action" id="start-session" type="button">Start Session</button>
        </section>
      </aside>

      <main class="workspace">
        <header class="topbar">
          <div>
            <p class="eyebrow">Active Session</p>
            <h2 id="session-title">All lectures · Quiz mode</h2>
          </div>
          <div class="stat-strip" aria-label="Session statistics">
            <div><span id="stat-score">0%</span><small>score</small></div>
            <div><span id="stat-progress">0 / 0</span><small>answered</small></div>
            <div><span id="stat-streak">0</span><small>streak</small></div>
          </div>
        </header>

        <section class="progress-wrap" aria-label="Session progress">
          <div class="progress-meta">
            <span id="progress-label">Ready</span>
            <span id="question-position">0 of 0</span>
          </div>
          <div class="progress-track"><div id="progress-bar"></div></div>
        </section>

        <section class="quiz-card" id="quiz-card" aria-live="polite">
          <div class="card-top">
            <div class="topic-pill" id="question-topic">Select a session</div>
            <div class="card-actions">
              <button class="icon-button" id="bookmark-button" type="button" title="Bookmark question" aria-label="Bookmark question">☆</button>
              <button class="icon-button" id="reset-progress" type="button" title="Reset saved progress" aria-label="Reset saved progress">↺</button>
            </div>
          </div>

          <h3 id="question-text">Choose lectures and press Start Session.</h3>
          <p class="source-line" id="source-line"></p>
          <div class="options" id="options-list"></div>
          <button class="secondary-action hidden" id="submit-button" type="button">Submit Answer</button>

          <div class="answer-panel hidden" id="answer-panel">
            <div class="answer-title">
              <span id="answer-result">Answer</span>
              <strong id="answer-choice"></strong>
            </div>
            <p id="answer-note"></p>
            <p id="answer-anchor"></p>
          </div>

          <div class="card-footer">
            <button class="secondary-action" id="prev-button" type="button">← Previous</button>
            <button class="secondary-action" id="reveal-button" type="button">Reveal Answer</button>
            <button class="primary-action" id="next-button" type="button">Next →</button>
          </div>
        </section>

        <section class="summary-card hidden" id="summary-card" aria-live="polite">
          <div class="summary-head">
            <div>
              <p class="eyebrow">Session Complete</p>
              <h2>Performance Summary</h2>
            </div>
            <button class="primary-action" id="new-session" type="button">New Session</button>
          </div>
          <div class="summary-stats" id="summary-stats"></div>
          <div class="summary-columns">
            <div>
              <h3>Lectures to Review</h3>
              <div class="topic-performance" id="topic-performance"></div>
            </div>
            <div>
              <h3>Missed Questions</h3>
              <div class="missed-list" id="missed-list"></div>
            </div>
          </div>
        </section>

        <section class="review-panel">
          <div class="panel-head">
            <div>
              <p class="eyebrow">Review</p>
              <h2>Question Navigator</h2>
            </div>
            <div class="review-controls">
              <button class="text-control" id="review-all" type="button">All</button>
              <button class="text-control" id="review-missed" type="button">Missed</button>
              <button class="text-control" id="review-bookmarked" type="button">Bookmarked</button>
            </div>
          </div>
          <div class="review-grid" id="review-grid"></div>
        </section>
      </main>
    </div>

    <script>
window.ML_QUESTIONS = ${JSON.stringify(questions)};
    </script>
    <script>
${app}
    </script>
  </body>
</html>
`;

writeFileSync(join(here, "index.html"), html);
console.log(`Built index.html with ${questions.length} questions.`);
