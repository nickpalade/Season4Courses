import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:4173";
const OUT = "shots";
mkdirSync(OUT, { recursive: true });

const log = (...a) => console.log("•", ...a);
const fail = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on("pageerror", (e) => fail.push("pageerror: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") fail.push("console.error: " + m.text());
});

async function shot(name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  log("shot", name);
}

// 1) Library
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForSelector(".quiz-card");
const cardCount = await page.locator(".quiz-card").count();
log("library cards:", cardCount);
await shot("01-library");

// topbar + subbar present
const subbar = await page.locator(".subbar").innerText();
log("subbar:", JSON.stringify(subbar));

// 2) Open first quiz -> Home
await page.locator(".quiz-card").first().click();
await page.waitForSelector(".modes");
await shot("02-home");
const crumb = await page.locator(".brand-crumb").innerText();
log("breadcrumb:", JSON.stringify(crumb));

// 3) Start Practice
await page.getByRole("button", { name: /Practice/ }).first().click();
await page.waitForSelector(".q-block");
await shot("03-quiz-start");

// nav footer numbers
const navNums = await page.locator(".q-nav-num").count();
log("navigator numbers:", navNums);

// 4) Pick first option + submit
await page.locator(".opt").first().click();
await page.waitForTimeout(150);
await shot("04-option-picked");
await page.getByRole("button", { name: "Submit" }).click();
await page.waitForSelector(".feedback");
await shot("05-feedback");

// 5) Bookmark toggles state (Q may be auto-flagged in practice, so test the flip)
const before = await page.locator(".bookmark.on").count();
await page.locator(".bookmark").click();
await page.waitForTimeout(100);
const after = await page.locator(".bookmark.on").count();
log("bookmark toggled:", before !== after);

// 6) Jump via navigator to Q3 (if exists)
if (navNums >= 3) {
  await page.locator(".q-nav-num").nth(2).click();
  await page.waitForTimeout(150);
  const cur = await page.locator(".q-nav-num.current").innerText();
  log("jumped to navigator current:", cur);
  await shot("06-navigator-jump");
}

// 7) Answer every question (handle mcq/multi + open) then finish
const total = navNums;
for (let i = 0; i < total; i++) {
  await page.locator(".q-nav-num").nth(i).click();
  await page.waitForTimeout(50);
  const submitBtn = page.getByRole("button", { name: "Submit" });
  if (!(await submitBtn.count())) continue; // already submitted
  const opt = page.locator(".opt").first();
  const textarea = page.locator("textarea");
  if (await opt.count()) {
    await opt.click();
  } else if (await textarea.count()) {
    await textarea.fill("test answer");
  }
  await submitBtn.click().catch(() => {});
  await page.waitForTimeout(50);
  // open questions need a self-grade to count as scored
  const grade = page.getByRole("button", { name: "Got it" });
  if (await grade.count()) await grade.click().catch(() => {});
}
const finishBtn = page.getByRole("button", { name: "Finish" });
if (await finishBtn.count()) {
  await finishBtn.click();
  // a confirm modal may appear if anything is still unanswered
  const anyway = page.getByRole("button", { name: /Finish anyway/ });
  if (await anyway.count()) await anyway.click();
  await page.waitForSelector(".score-summary", { timeout: 8000 });
  await shot("07-result");
  log("reached result screen");

  // Finished attempts retain their answer breakdown and can be reopened from history.
  await page.getByRole("button", { name: "Back to home" }).click();
  await page.waitForSelector(".history");
  await page.getByRole("button", { name: "Review answers" }).click();
  await page.waitForSelector(".score-summary");
  log("reopened a saved result");
}

// 8) Mobile viewport check
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForSelector(".quiz-card");
await shot("08-mobile-library");

await browser.close();

console.log("\n=== ERRORS ===");
console.log(fail.length ? fail.join("\n") : "none");
process.exit(fail.length ? 1 : 0);
