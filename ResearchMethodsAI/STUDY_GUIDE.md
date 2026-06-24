# Research Methods AI — Study Guide

A plain-language summary of every slide deck behind the 100-question quiz
(`context/index.html`). Read a section, then take that source's questions.
Each question's title is tagged `[EASY]`, `[MID]`, or `[HARD]`.

Decks covered: **L1, L3, L4, L5, Week 2, Week 6.**

---

## L1 — Scientific Thinking & Research Design

### Scientific thinking
- Science is a disciplined way to **avoid fooling yourself**. The main enemy is your own cognition.
- **Confirmation bias** — seeking/weighting evidence that supports what you already believe, ignoring what contradicts it.
- **Heuristics** — mental shortcuts; fast but error-prone (e.g. availability, anchoring).
- Good practice: pre-specify what would *disprove* your idea, not just confirm it.

### The empirical cycle
The loop that turns observation into knowledge:
1. **Observation** — notice a phenomenon.
2. **Induction** — form a general hypothesis from specific cases.
3. **Deduction** — derive a concrete, testable prediction.
4. **Testing** — collect data, run the test.
5. **Evaluation** — compare result to prediction, refine theory, repeat.

### Validity (does the study measure what it claims?)
- **Internal validity** — can you trust the cause→effect claim *inside* the study? Threatened by **confounding variables** (a third variable that moves with both cause and effect).
- **External validity** — do results **generalise** to other people, settings, times? Threatened by **sampling bias** (non-representative sample).
- A study can be high on one and low on the other (tight lab experiment = high internal, often low external).

### Research design
- **Correlational** — measure variables as they are; shows association, **not causation**.
- **Experimental** — actively **manipulate** an independent variable + **random assignment** → supports causal claims.
- **Independent variable (IV)** = manipulated cause. **Dependent variable (DV)** = measured effect.
- **Between-subjects** — different participants in each condition.
- **Within-subjects** — same participants in all conditions (controls individual differences, but risks order/carryover effects).
- **Random assignment** spreads confounds evenly across conditions.

### GenAI in research (course policy)
- GenAI tools allowed with **transparency** — disclose use, you stay responsible for correctness and its limitations (hallucination, bias).

**Key terms:** confirmation bias, empirical cycle, induction vs deduction, internal/external validity, confound, sampling bias, IV/DV, random assignment, between/within-subjects.

---

## Week 2 — Data Collection & Measurement

### Variables & metrics
- A study turns concepts into **variables**: **features** (inputs/predictors) and **targets** (outcomes).
- **Quantitative** (numeric) vs **qualitative** (categorical) variables.
- Categories must be **exhaustive** (cover all cases) and **mutually exclusive** (no overlap).

### Data collection methods
- **Self-report** — questionnaires, surveys, interviews. Cheap, scalable; vulnerable to bias.
- **Behavioral observation** — watch behaviour. **Naturalistic** (real setting) vs **contrived** (staged). **Concealed** vs not (concealment reduces reactivity but raises ethics issues).
- **Physiological / sensor** — heart rate, eye-tracking, etc. Objective, harder to fake.
- **Archival** — existing records/datasets. No collection cost; you inherit their limitations.

### Survey & interview design
- Response formats: **open-ended**, **rating scales** (e.g. Likert), **multiple choice**.
- Interview types: **structured** (fixed script), **semi-structured** (guide + follow-ups), **unstructured** (free).

### Response biases & data quality
- **Social desirability bias** — answering to look good rather than truthfully.
- **Acquiescence bias** — tendency to agree regardless of content.
- **Crowdworking** (e.g. MTurk) — fast labels but quality risk; needs attention checks.
- Aggregating multiple annotators: **majority vote**, **weighted voting** (weight by annotator reliability).

### Research proposal & planning
- **SMART** goals: **S**pecific, **M**easurable, **A**chievable, **R**elevant, **T**ime-bound.
- Distinguish **structured** (tabular) vs **unstructured** (text/image/audio) data when planning storage/analysis.

**Key terms:** feature/target, quantitative/qualitative, exhaustive & mutually exclusive, self-report, naturalistic vs contrived observation, Likert, structured/semi-structured/unstructured interview, social desirability & acquiescence bias, majority/weighted voting, SMART.

---

## L3 — Data Simulation & Modelling (in R)

### Data science fundamentals
- **Variable types / measurement levels:**
  - **Nominal** — labels, no order (colour).
  - **Ordinal** — ordered, unequal gaps (small/med/large).
  - **Interval** — equal gaps, no true zero (°C).
  - **Ratio** — equal gaps + true zero (height, count).
- **Random variable** — variable whose value comes from a probability distribution.

### Distributions & sampling
- **Discrete** (countable outcomes, **PMF** = probability mass function) vs **continuous** (**PDF** = probability density function).
- R draw functions: `rnorm` (normal), `rpois` (Poisson), `runif` (uniform), `sample` (from a set).

### Linear model simulation
- Build data from a known equation:
  `y = b0 + b1*x1 + b2*x2 + ε`
  - `b0` intercept, `b1/b2` slopes/effects, `ε` random noise.
- **Dummy coding** — represent a categorical predictor as 0/1 columns so it fits a linear model.
- Simulating with known coefficients lets you check whether an analysis **recovers** the truth.

### Data transformation & recoding
- Bound values with `pmin` / `pmax`; round; apply power transforms.
- Convert a continuous score to a **binary outcome** with a **threshold**.

### Logistic regression (for classification)
- **Logistic function** squashes any number into (0,1) → a probability.
- Models **log-odds** linearly: `log(p/(1-p)) = b0 + b1*x1 + …`.
- The **intercept** shifts baseline probability; convert predicted probability to a 0/1 label by sampling or thresholding.

**Key terms:** nominal/ordinal/interval/ratio, random variable, PMF/PDF, rnorm/rpois/runif/sample, linear equation y=b0+b1x+ε, dummy coding, threshold to binary, logistic function, log-odds.

---

## L4 — Data Analysis & Prediction

### Exploratory analysis (describe the data)
- **Descriptive statistics** — mean, median, spread (SD, range), shape of distribution.
- Plots, **cross-tabulation**, **correlation** to spot relationships. Goal: understand, not yet test.

### Confirmatory analysis (test a hypothesis)
- **Hypothesis testing**: null (H0) vs alternative (H1).
- **p-value** — probability of data this extreme *if H0 were true*. Small p → reject H0. It is **not** the probability H0 is true.
- **Type I error** (false positive) — reject a true H0. **Type II error** (false negative) — fail to reject a false H0.
- **Confidence interval** — range of plausible values for an estimate.
- **Frequentist** (p-values, long-run frequencies) vs **Bayesian** (priors + posteriors over hypotheses).

### Linear regression
- **OLS** fits a line minimising squared residuals.
- **Coefficients** = effect of each predictor on the outcome; test whether each differs significantly from 0.

### Categorical tests
- **Chi-squared** — association between categorical variables.
- **Logistic regression** — model a binary outcome.

### Prediction models
- **Random forest**, **neural networks**, **k-NN** — flexible predictors.
- **Confusion matrix** — TP/FP/TN/FN; basis for accuracy/precision/recall.
- **Overfitting** — model memorises noise, fails on new data → need train/test split or cross-validation.
- **Interpretability trade-off** — simple models (regression) explain easily; complex models (deep nets) predict better but are harder to interpret.

**Key terms:** descriptive stats, correlation, p-value, Type I/II error, confidence interval, frequentist vs Bayesian, OLS coefficients, chi-squared, confusion matrix, overfitting, interpretability trade-off.

---

## L5 — Open & Reproducible Research

### Open data
- Many journals now require **data sharing**. Barriers: privacy, effort, competition, lack of incentives.
- **Reproducibility checklists** standardise what to report.

### Reproducibility vs replication (don't mix them up)
- **Reproducibility (computational)** — same data + same code → **same result**. Failures come from missing code/data, software versions, undocumented steps.
- **Replication** — **new** data, same method → consistent finding. A **replication crisis** = many published findings don't replicate (notably psychology; varies by field).

### Reproducibility in CS / AI
- Common gaps: missing documentation, no repository/code link, **data-split leakage** confounds (test info leaking into training).

### Publication process
- **Predatory journals** — charge fees, skip real peer review.
- Peer review types: **single-blind**, **double-blind**, **open**.
- **Publication bias** — positive/novel results get published, null results don't → distorted literature ("file-drawer problem").

**Key terms:** open data, reproducibility (computational), replication, replication crisis, data leakage, predatory journals, single/double-blind & open review, publication bias.

---

## Week 6 — Research Ethics

### Belmont framework (3 core principles)
1. **Respect for persons** — autonomy; **informed consent**; protect those with reduced autonomy.
2. **Beneficence** — maximise benefit, minimise harm; **risk–benefit** assessment.
3. **Justice** — fair distribution of benefits/burdens; **fair selection** of subjects.

### Case study — Facebook Emotional Contagion (2014)
- Manipulated news feeds to alter emotions **without informed consent**.
- Lessons: failed **consent** (respect), under-assessed **harm** (beneficence), weak **ethical review**.

### Ethics across the data lifecycle
- **Collection** — scraping vs **Terms of Service**; consent.
- **Storage** — **GDPR**: lawful basis, minimisation, subject rights, security.
- **Analysis** — avoid **QRPs** (questionable research practices: p-hacking, HARKing).
- **Visualization** — don't mislead with axes/cherry-picking.

### AI ethics & governance
- Apply Belmont to AI systems.
- **EU AI Act** — **risk-based** classification (unacceptable / high / limited / minimal).
- Expectations: **bias audits**, **transparency**, disclosure when users interact with AI.

### Ethical scenarios (integration)
- Reddit/web scraping, copyright in training data, chatbot **disclosure**, **data reuse** beyond original consent, fair treatment of crowd **workforce** (justice).

**Key terms:** Belmont (respect/beneficence/justice), informed consent, risk–benefit, Facebook contagion study, GDPR, QRPs/p-hacking, EU AI Act risk tiers, bias audit, transparency/disclosure.

---

## How to use this guide
1. Read one deck's section above.
2. Open `context/index.html`, pick that deck's domain in the sidebar.
3. Start with `[EASY]` (definitions), then `[MID]` (apply), then `[HARD]` (reason/compare).
4. Missed a question → re-read the matching bullet here.

> Content is grounded in the slide decks. If an answer looks off, check the
> original PDF in `context/` before trusting it for exam prep.
