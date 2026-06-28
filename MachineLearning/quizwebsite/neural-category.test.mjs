import { readFileSync, existsSync } from "node:fs";

const dataPath = new URL("./data/lectures/neural_computing_exam_2026.json", import.meta.url);
if (!existsSync(dataPath)) throw new Error("Neural Computing question set is missing");

const questions = JSON.parse(readFileSync(dataPath, "utf8"));
if (questions.length !== 10) throw new Error(`Expected 10 Neural Computing MCQs, received ${questions.length}`);
if (questions.some((q) => q.type !== "multi" || !q.ungraded || q.correct?.length)) {
  throw new Error("Neural Computing questions must remain ungraded until an authoritative key is available");
}

const quizzesSource = readFileSync(new URL("./src/quizzes.js", import.meta.url), "utf8");
if (!quizzesSource.includes('id: "neural_exam_2026"')) {
  throw new Error("Neural Computing category is not registered in the quiz library");
}

console.log("Neural Computing category integrity checks passed.");
