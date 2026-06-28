import assert from "node:assert/strict";
import test from "node:test";

import expandedPractice from "./data/lectures/rl_expanded_practice.js";

const questions = expandedPractice.rl06;
const paddingPhrases = [
  "while keeping the same decision setting",
  "under the same policy objective",
  "without changing the return definition",
  "in the same sequential problem",
];

test("Monte Carlo expanded practice is a hand-authored 20-question bank", () => {
  assert.equal(questions.length, 20);
  assert.equal(new Set(questions.map(({ title }) => title)).size, 20);
  assert.ok(
    questions.every(({ title }) => !title.includes("Which statement best captures")),
    "generic generated prompts must not return",
  );
  assert.ok(
    questions.flatMap(({ options }) => options).every((option) =>
      paddingPhrases.every((phrase) => !option.includes(phrase)),
    ),
    "artificial answer-length padding must not appear",
  );
});

test("answers do not reveal themselves through position or unique length", () => {
  const positions = [0, 0, 0, 0];
  let uniquelyLongestCorrect = 0;

  for (const question of questions) {
    assert.equal(question.type, "mcq");
    assert.equal(question.correct.length, 1);
    positions[question.correct[0]] += 1;

    const lengths = question.options.map((option) => option.length);
    const correctLength = lengths[question.correct[0]];
    if (correctLength === Math.max(...lengths) && lengths.filter((n) => n === correctLength).length === 1) {
      uniquelyLongestCorrect += 1;
    }
  }

  assert.deepEqual(positions, [5, 5, 5, 5]);
  assert.ok(uniquelyLongestCorrect <= 2, `correct answer is uniquely longest ${uniquelyLongestCorrect} times`);
});

test("TD-control expanded practice is hand-authored and covers the lecture", () => {
  const tdQuestions = expandedPractice.rl07;
  const searchable = JSON.stringify(tdQuestions).toLowerCase();

  assert.equal(tdQuestions.length, 20);
  assert.equal(new Set(tdQuestions.map(({ title }) => title)).size, 20);
  assert.ok(tdQuestions.every(({ title }) => !title.includes("Which statement best captures")));
  assert.ok(tdQuestions.flatMap(({ options }) => options).every((option) =>
    paddingPhrases.every((phrase) => !option.includes(phrase)),
  ));

  for (const term of ["td error", "sarsa", "q-learning", "expected sarsa", "on-policy", "off-policy", "terminal"]) {
    assert.ok(searchable.includes(term), `missing lecture concept: ${term}`);
  }
});

test("TD-control answers are balanced without a length giveaway", () => {
  const positions = [0, 0, 0, 0];
  const difficultyCounts = { easy: 0, medium: 0, hard: 0 };
  let uniquelyLongestCorrect = 0;

  for (const question of expandedPractice.rl07) {
    assert.equal(question.type, "mcq");
    assert.equal(question.correct.length, 1);
    difficultyCounts[question.difficulty] += 1;
    positions[question.correct[0]] += 1;
    const lengths = question.options.map((option) => option.length);
    const correctLength = lengths[question.correct[0]];
    if (correctLength === Math.max(...lengths) && lengths.filter((n) => n === correctLength).length === 1) {
      uniquelyLongestCorrect += 1;
    }
  }

  assert.deepEqual(positions, [5, 5, 5, 5]);
  assert.deepEqual(difficultyCounts, { easy: 6, medium: 8, hard: 6 });
  assert.ok(uniquelyLongestCorrect <= 2, `correct answer is uniquely longest ${uniquelyLongestCorrect} times`);
});

const remainingPracticeSpecs = {
  rl08: ["off-policy", "target policy", "importance sampling", "coverage", "maximization bias", "double q-learning"],
  rl09: ["rescorla", "prediction error", "dopamine", "blocking", "stimulus trace", "extinction"],
  rl10: ["model-based", "dyna", "prioritized sweeping", "transition", "reward model", "data efficient"],
  rl11: ["monte carlo tree search", "selection", "expansion", "simulation", "backup", "uct"],
  rl12: ["policy-gradient", "reinforce", "actor-critic", "baseline", "function approximation", "softmax"],
};

for (const [key, lectureTerms] of Object.entries(remainingPracticeSpecs)) {
  test(`${key} is hand-authored, lecture-grounded, and has non-obvious answers`, () => {
    const topicQuestions = expandedPractice[key];
    const searchable = JSON.stringify(topicQuestions).toLowerCase();
    const positions = [0, 0, 0, 0];
    const difficultyCounts = { easy: 0, medium: 0, hard: 0 };
    let uniquelyLongestCorrect = 0;

    assert.equal(topicQuestions.length, 20);
    assert.equal(new Set(topicQuestions.map(({ title }) => title)).size, 20);
    assert.ok(topicQuestions.every(({ title }) => !title.includes("Which statement best captures")));
    assert.ok(topicQuestions.flatMap(({ options }) => options).every((option) =>
      paddingPhrases.every((phrase) => !option.includes(phrase)),
    ));

    for (const term of lectureTerms) {
      assert.ok(searchable.includes(term.toLowerCase()), `${key} missing lecture concept: ${term}`);
    }

    for (const question of topicQuestions) {
      assert.equal(question.type, "mcq");
      assert.equal(question.correct.length, 1);
      assert.equal(question.options.length, 4);
      assert.equal(new Set(question.options).size, 4, `${question.id} has duplicate options`);
      assert.ok(question.explanation.length > 20, `${question.id} needs a substantive explanation`);
      difficultyCounts[question.difficulty] += 1;
      positions[question.correct[0]] += 1;
      const lengths = question.options.map((option) => option.length);
      const correctLength = lengths[question.correct[0]];
      if (correctLength === Math.max(...lengths) && lengths.filter((n) => n === correctLength).length === 1) {
        uniquelyLongestCorrect += 1;
      }
    }

    assert.deepEqual(positions, [5, 5, 5, 5]);
    assert.deepEqual(difficultyCounts, { easy: 6, medium: 8, hard: 6 });
    assert.ok(uniquelyLongestCorrect <= 2, `${key} correct answer is uniquely longest ${uniquelyLongestCorrect} times`);
  });
}
