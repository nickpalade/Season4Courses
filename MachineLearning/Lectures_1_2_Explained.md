# Machine Learning — Lectures 1 & 2 Explained

Source: `ML_Session_1_26-1.pdf` (Ingredients of ML), `ML_Session_2_26-1.pdf` (Binary classification and related tasks). Course book: Flach, *Machine Learning: The Art and Science of Algorithms That Make Sense of Data*, Cambridge, 2012, Chapters 1–2.

---

## Lecture 1: The Ingredients of Machine Learning

ML built from three ingredients: **tasks**, **models**, **features**.

> "Machine learning is about using the right features to build the right models that achieve the right tasks."

---

### 1.1 Tasks

#### Intuition
Task ≠ application. "Detecting dogs in photos" = application. Task = underlying **general skill** (e.g., image classification). Tasks are problems ML solves; they describe what the computer improves performance at.

#### Formal Definition
Two-axis categorization:

**Axis 1 — Predictive vs Descriptive** (does output involve a target variable?)

| | Predictive (has target) | Descriptive (no target) |
|---|---|---|
| examples | classification, regression, predictive clustering | descriptive clustering, association rule mining, subgroup discovery |

**Axis 2 — Supervised vs Unsupervised** (training data labelled?)

|  | Predictive model | Descriptive model |
|---|---|---|
| **Supervised** | Classification, Regression | Subgroup discovery |
| **Unsupervised** | Predictive clustering | Descriptive clustering, Association rule mining |

Task definitions:
- **Classification** — predict categorical target from features
- **Regression** — predict numerical target from features
- **Clustering (predictive)** — predict hidden/latent variable, assign class labels (e.g., fraud detection)
- **Clustering (descriptive)** — group data without target intent (e.g., plant taxonomy)
- **Association rule mining** — find interesting variable relations (market basket)
- **Subgroup discovery** — find interesting associations w.r.t. property of interest (risk groups in disease)

#### Example
Weather/play dataset:

| Outlook | Temp | Humidity | Windy | **Play** |
|---|---|---|---|---|
| Sunny | Hot | High | False | No |
| Overcast | Hot | High | False | Yes |
| Rainy | Mild | Normal | False | Yes |
| ... | ... | ... | ... | ... |

`Play` column = label → supervised classification task.

---

### 1.2 Models

#### Intuition
Model = what gets learned from data to solve task. Regression example: `Yᵢ = f(Xᵢ, β) + eᵢ` where Y = target, X = features, e = noise, β = parameters, f = model function.

#### Formal Definition
**Two categorizations:**

**(a) By main intuition / modus operandi:**
- **Geometric models** — use geometric concepts (hyperplanes, distance metrics, linear transformations). Key concepts: instance space (e.g., Cartesian), Euclidean distance `√Σ(xᵢ−yᵢ)²`, decision boundaries/hyperplanes. Examples: linear regression, SVM, kNN.
- **Probabilistic models** — assume underlying random process generating X, Y. Goal: find P(Y|X). **Bayes rule:** `P(Y|X) = P(X|Y)P(Y) / P(X)` = `(likelihood × prior) / evidence`. Examples: Naive Bayes, GMM.
- **Logical models** — translatable to human-readable if-then rules; organized as feature trees. Declarative. Examples: decision trees, rule lists.

**(b) By resolution:**
- **Grouping models** — split instance space into segments, simple model per segment. **Fixed/finite resolution.** Instances outside training distribution cannot be mapped (e.g., decision tree has no leaf for "snowy" if never trained on it).
- **Grading models** — one global model, **infinite resolution** in Cartesian space. Generalize to unseen regions. Examples: linear regression, SVM.

Mapping (from book):
```
Geometric: Linear Classifier, Linear Regression, kNN, Logistic Regression, K-means, SVM
Logical:   Trees, Rules, Association rules
Probabilistic: GMM, Naive Bayes
Grading ←————————————————————————→ Grouping
```

**Two phases:**
- **Training** — learn model from training set (slow)
- **Inference** — apply learned model to new data point (fast)

---

### 1.3 Features

#### Intuition
Feature = measurement performable on any instance. Function from instance space → feature domain. Data given as instance×feature table; class column is target.

#### Formal Definition
Often raw data isn't tabular (images, text, time series). Must extract features:
- **Feature construction** — build features from raw data (e.g., pixel histograms from images, term frequencies from text, min/max/shapelets from time series)
- **Discretisation** — numerical → categorical
- **Feature transformation** — project to new space (e.g., PCA)
- **Feature selection** — drop redundant features

---

## Lecture 2: Binary Classification and Related Tasks

Three predictive scenarios:

| Task | Label space ℒ | Output space 𝒴 | Learning problem |
|---|---|---|---|
| Classification | 𝒞 | 𝒞 | learn `ĉ: 𝒳 → 𝒞` approximating true `c` |
| Scoring/ranking | 𝒞 | ℝ^\|𝒞\| | output score vector over classes |
| Probability estimation | 𝒞 | [0,1]^\|𝒞\| | output probability vector over classes |

---

### 2.1 Classification

#### Intuition
Map instance to one of finite class labels. **Binary classifier** = 2 labels (spam/ham, ⊕/⊖).

#### Formal Definition
Classifier: `ĉ: 𝒳 → 𝒞`, 𝒞 = {C₁,...,Cₖ}. Examples are `(x, c(x))` where `c(x)` is true class. Learning = construct `ĉ` matching `c` as closely as possible on unseen data.

#### Performance Assessment — Contingency Table (Confusion Matrix)

|  | Predicted ⊕ | Predicted ⊖ |
|---|---|---|
| **Actual ⊕** | TP | FN |
| **Actual ⊖** | FP | TN |

Example (Te = 100):

|  | Pred ⊕ | Pred ⊖ | |
|---|---|---|---|
| Actual ⊕ | 60 | 15 | 75 |
| Actual ⊖ | 10 | 15 | 25 |
|  | 70 | 30 | 100 |

**Metrics:**
- **Accuracy** `acc = (TP+TN)/|Te|` = (60+15)/100 = **0.75**
- **Error rate** `err = 1 − acc` = **0.25**
- **True positive rate / recall / sensitivity** `tpr = TP/(TP+FN)` = 60/75 = **0.80**
- **True negative rate / specificity** `tnr = TN/(TN+FP)` = 15/25 = **0.60**
- **False positive rate** `fpr = FP/(FP+TN)` = 10/25 = **0.40**
- **False negative rate** `fnr = FN/(TP+FN)` = 15/75 = **0.20**
- **Precision / confidence** `prec = TP/(TP+FP)` = 60/70 ≈ **0.857**
- **F1 score** `F₁ = 2·prec·rec / (prec+rec)` — harmonic mean of prec & rec, **not affected by negatives** (good for imbalanced data)

**Problem with accuracy on imbalanced data:**
99 ⊕ / 1 ⊖ dataset, classifier predicts all ⊕ → acc = 0.99 but useless if minority class matters. Use precision/recall/F1 instead.

#### Evaluation Methodology
Goal: estimate **generalization** to inference phase.

- **Train/test split** — reserve part of data for testing
- **Cross-validation** — k folds, train on k−1, test on remaining; aggregate: `Perf = (1/k) Σ Perfᵢ`
- **Train/validation/test** — validation set for hyperparameter tuning, test for final evaluation

**Over/under-fitting:**
- **Overfitting**: high train acc, low test acc (model memorized noise)
- **Underfitting**: low train AND test acc (model too weak)
- Both = low generalization.

---

### 2.2 Visualising Classification Performance

#### Intuition
Binary decision rule often: `ĉ(x) = I(f(x) > τ)`. Threshold τ affects confusion matrix. Vary τ → many confusion matrices → summarize via curves.

#### ROC Curve & Coverage Plot

- **Coverage plot**: x-axis = Negatives covered (FP count), y-axis = Positives covered (TP count). Absolute counts.
- **ROC curve** (Receiver Operating Characteristic): normalized coverage plot. x = `fpr` (1−specificity), y = `tpr` (sensitivity). Each point = one threshold.

**Interpreting ROC:**
- Diagonal (0,0)→(1,1) = **random/no-skill classifier**
- Above diagonal = good (high tpr, low fpr)
- Below diagonal = poor (worse than random)
- Top-left corner = perfect

**AUC (Area Under Curve):** scalar summary of model skill across all thresholds. AUC = 0.5 random, AUC = 1.0 perfect. Higher AUC ⇒ better ranking ability across thresholds.

#### Worked Threshold Example
Dataset: 8 positives (blue), 11 negatives (orange) along score axis `f(x)`.

| Threshold | TP | FP | FN | TN | Sens | Spec |
|---|---|---|---|---|---|---|
| τ₁ (mid-low) | 7 | 3 | 1 | 8 | 7/8 | 8/11 |
| τ₂ (high) | 5 | 1 | 3 | 10 | 5/8 | 10/11 |
| τ₃ (low) | 8 | 7 | 0 | 4 | 8/8 | 4/11 |

Raise threshold → fewer FP, more FN. Lower threshold → opposite.

---

### 2.3 Scoring and Ranking

#### Intuition
Scoring classifier outputs **real-valued score** per class (not just label). Lets us rank instances by confidence. Want classifier that distinguishes "very correct" from "barely correct."

#### Formal Definition
Scoring classifier `ŝ: 𝒳 → ℝᵏ`. For binary: `ŝ(x)` = score for positive class.

**Scoring tree example:** instead of leaf label, store `log₂(spam/ham ratio)`. Leaf with spam:20/ham:5 → score = log₂(20/5) = +2.

**Margin:** `z(x) = c(x) · ŝ(x)` where `c(x) ∈ {+1, −1}`.
- `z(x) > 0` → correct prediction (sign of score matches true class)
- `z(x) < 0` → incorrect
- |z(x)| large → confident prediction

#### Loss Functions
`L: ℝ → [0,∞)` maps margin to penalty. Reward large positive margins, penalize negative.

| Loss | Formula |
|---|---|
| **0-1** | `L₀₁(z) = 1` if z≤0, else 0 |
| **Hinge** (SVM) | `Lₕ(z) = max(0, 1−z)` |
| **Exponential** (AdaBoost) | `L_exp(z) = exp(−z)` |
| **Logistic** (logistic regression) | `L_log(z) = log₂(1+exp(−z))` |
| **Squared** | `L_sq(z) = (1−z)²` |

Average loss over test set: `(1/|Te|) Σ L(z(x))`. Most ML training = **minimize this loss** via optimization.

#### Ranking Error
Compare classifiers via pairwise ranking:

```
rank-err = [Σ_{x∈Te⊕, x'∈Te⊖}  I[ŝ(x) < ŝ(x')] + ½·I[ŝ(x) = ŝ(x')]] / (Pos · Neg)
```

Penalty if score of a positive < score of a negative (wrong order). Tied scores get half penalty. Denominator normalizes by # positive-negative pairs.

---

### 2.4 Class Probability Estimation

#### Intuition
Output **probability vector** over classes (not just label or score). Tells us *how likely* each class, not just which is most likely.

#### Formal Definition
`p̂: 𝒳 → [0,1]ᵏ`, with `Σᵢ p̂ᵢ(x) = 1`. Binary: `p̂(x)` = probability of positive class.

**Tree example:** leaf with spam:20/ham:5 → `p̂(spam|x) = 20/25 = 0.80`. Threshold 0.5 ⇔ majority class rule.

#### Mean Squared Probability Error
Let `I` = one-hot true class vector.

```
SE(x) = ½ · Σᵢ (p̂ᵢ(x) − I[c(x)=Cᵢ])²

MSE(Te) = (1/|Te|) · Σ_{x∈Te} SE(x)
```

Low MSE = well-calibrated probabilities.

---

## Connecting the Two Lectures

Lecture 1 sets up the three-ingredient framework (tasks, models, features). Lecture 2 zooms into **classification tasks** — specifically binary — and shows three levels of model output sophistication:

1. **Label only** (classification) → assess with confusion matrix metrics, ROC, AUC
2. **Real-valued score** (ranking) → assess with margin, loss functions, ranking error
3. **Calibrated probability** (probability estimation) → assess with MSE

Each level subsumes the previous: probabilities → scores → labels (via threshold).

---

## Test Your Understanding

**Q1** (Lecture 1): Decision trees are described as both **logical** and **grouping** models. Why does this make sense, and what does "finite resolution" of a tree imply for an instance whose feature value never appeared in training (e.g., a "snowy" weather input when training only saw sunny/cloudy/rainy)?

**Q2** (Lecture 2): A medical test for rare disease (1% prevalence) reports 95% accuracy. Why is this number misleading? Compute precision and recall assuming the model predicts "healthy" for everyone. Which metric exposes the problem?

**Q3** (Cross-lecture): SVM is shown in the "geometric, grading" quadrant of the model map. (a) Why geometric? (b) Why grading rather than grouping? (c) If we measured its performance via a confusion matrix at threshold τ=0, then varied τ, what curve would we trace?

**Q4** (Lecture 2): Two classifiers give these scores on 4 positives (P) and 4 negatives (N):
- Classifier A: P=[0.9, 0.8, 0.4, 0.3], N=[0.7, 0.6, 0.2, 0.1]
- Classifier B: P=[0.9, 0.7, 0.6, 0.5], N=[0.8, 0.4, 0.3, 0.2]

Compute ranking error for each. Which has better AUC?
