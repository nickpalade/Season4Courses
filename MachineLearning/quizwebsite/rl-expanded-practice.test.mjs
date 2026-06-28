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

