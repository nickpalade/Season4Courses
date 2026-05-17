# Machine Learning — Lectures 2, 3, 4 Explained

Source: `ML_Session_2_26-1.pdf` (Binary classification), `ML_Session_3_26.pdf` (Beyond binary), `ML_Session_4_26.pdf` (Tree models). Book: Flach, Ch 2, 3, 5.

---

## Lecture 2: Binary Classification & Related Tasks

Three predictive scenarios:

| Task | Label space ℒ | Output space 𝒴 | Learning problem |
|---|---|---|---|
| Classification | 𝒞 | 𝒞 | learn `ĉ: 𝒳 → 𝒞` approximating true `c` |
| Scoring/ranking | 𝒞 | ℝ^\|𝒞\| | output score vector |
| Probability estimation | 𝒞 | [0,1]^\|𝒞\| | output probability vector |

### 2.1 Classification

#### Intuition
Map instance to one of finite class labels. Binary = 2 labels (⊕/⊖, spam/ham).

#### Formal
Classifier `ĉ: 𝒳 → 𝒞`, 𝒞 = {C₁,...,Cₖ}. Training: examples `(x, c(x))`. Learning constructs `ĉ` matching true `c` on unseen data.

#### Performance — Confusion Matrix

|  | Pred ⊕ | Pred ⊖ |
|---|---|---|
| Actual ⊕ | TP | FN |
| Actual ⊖ | FP | TN |

Worked example (n=100):

|  | Pred ⊕ | Pred ⊖ | |
|---|---|---|---|
| Actual ⊕ | 60 | 15 | 75 |
| Actual ⊖ | 10 | 15 | 25 |
|  | 70 | 30 | 100 |

Metrics:
- **Accuracy** `acc = (TP+TN)/n = 0.75`
- **Error rate** `err = 1 − acc = 0.25`
- **TPR / recall / sensitivity** `= TP/(TP+FN) = 60/75 = 0.80`
- **TNR / specificity** `= TN/(TN+FP) = 15/25 = 0.60`
- **FPR** `= FP/(FP+TN) = 10/25 = 0.40`
- **FNR** `= FN/(TP+FN) = 15/75 = 0.20`
- **Precision** `= TP/(TP+FP) = 60/70 ≈ 0.857`
- **F1** `= 2·prec·rec / (prec+rec)` — harmonic mean. Not affected by negatives → good for imbalanced data.

**Imbalance trap:** 99⊕/1⊖, predict-all-positive classifier → acc=0.99 but useless. Use F1/precision/recall.

#### Evaluation Methodology
- **Train/test split** — reserve test data
- **k-fold CV** — `Perf = (1/k) Σ Perfᵢ`
- **Train/val/test** — validation for hyperparam tuning

**Over/underfitting:**
- Overfit: high train, low test (memorized noise)
- Underfit: low both (model too weak)
- Both = poor generalization

### 2.2 Visualising Performance

Decision rule `ĉ(x) = I(f(x) > τ)`. Vary τ → many confusion matrices.

#### ROC Curve
x = FPR (1−spec), y = TPR (sens). Each threshold = one point.

- Diagonal = random/no-skill
- Above = good
- Below = worse than random
- Top-left = perfect

#### AUC
Area under ROC. Scalar summary across all thresholds. 0.5 random, 1.0 perfect.

Worked threshold sweep (8⊕, 11⊖):

| τ | TP | FP | FN | TN | Sens | Spec |
|---|---|---|---|---|---|---|
| τ₁ mid | 7 | 3 | 1 | 8 | 7/8 | 8/11 |
| τ₂ high | 5 | 1 | 3 | 10 | 5/8 | 10/11 |
| τ₃ low | 8 | 7 | 0 | 4 | 8/8 | 4/11 |

Raise τ → fewer FP, more FN. Lower τ → opposite.

### 2.3 Scoring & Ranking

Scoring classifier `ŝ: 𝒳 → ℝᵏ`. Outputs real-valued score per class. Distinguish very-correct from barely-correct.

**Scoring tree:** leaf stores `log₂(spam/ham ratio)`. spam:20/ham:5 → score = +2.

**Margin:** `z(x) = c(x) · ŝ(x)`, `c(x) ∈ {+1,−1}`.
- `z > 0` correct
- `z < 0` wrong
- `|z|` large → confident

#### Loss Functions
`L: ℝ → [0,∞)`. Reward positive margins, penalize negative.

| Loss | Formula |
|---|---|
| 0-1 | `L₀₁(z) = 1 if z≤0, else 0` |
| Hinge (SVM) | `Lₕ(z) = max(0, 1−z)` |
| Exponential (AdaBoost) | `L_exp(z) = exp(−z)` |
| Logistic (logreg) | `L_log(z) = log₂(1+exp(−z))` |
| Squared | `L_sq(z) = (1−z)²` |

Avg loss `(1/|Te|) Σ L(z(x))`. ML training = minimize this.

#### Ranking Error
```
rank-err = [Σ_{x∈Te⊕, x'∈Te⊖} I[ŝ(x)<ŝ(x')] + ½·I[ŝ(x)=ŝ(x')]] / (Pos·Neg)
```
Penalty when positive scored below negative. Ties = half penalty.

### 2.4 Probability Estimation

`p̂: 𝒳 → [0,1]ᵏ`, `Σᵢ p̂ᵢ(x) = 1`. Tree leaf with spam:20/ham:5 → `p̂(spam)=0.80`. Threshold 0.5 ⇔ majority class.

**Mean Squared Probability Error:**
```
SE(x) = ½ · Σᵢ (p̂ᵢ(x) − I[c(x)=Cᵢ])²
MSE(Te) = (1/|Te|) · Σ SE(x)
```
Low MSE = well-calibrated.

---

## Lecture 3: Beyond Binary Classification

### 3.1 Multi-Class Classification

#### Intuition
Many concepts not binary. Disease diagnosis, topic classification, ER triage (ICU/CCU/RW).

#### Formal
`ĉ: 𝒳 → 𝒞`, 𝒞 = {C₁,...,Cₖ}, k > 2.

#### Building Multi-Class from Binary

Some algos natively multi-class (decision trees). Others binary-only (SVM) → need wrappers:

**One-vs-Rest (OvR):**
- Train k (or k−1) binary classifiers: Cᵢ vs all others
- Inference: run all, form codeword, find nearest row in code matrix
- Misclassification by any one → wrong result

Unordered/ordered code matrices:
```
+1 −1 −1       +1  0
−1 +1 −1       −1 +1
−1 −1 +1       −1 −1
```

**One-vs-One (OvO) / all-pairs:**
- Train classifier per pair of classes, ignore other classes
- k(k−1)/2 symmetric or k(k−1) asymmetric classifiers
- 3 classes → 3/6; 4 classes → 6/12
- Inference: voting scheme

**Output code matrix:** k×l matrix, entries ∈ {+1, −1, 0}. Each entry `cᵢⱼ` = encoding of class i for classifier j. 0 = no prediction.

#### Complexity

|  | Training | Inference |
|---|---|---|
| OvR | O(kmᵅ) | O(kβ) |
| OvO | O(k²(m/k)ᵅ) | O(k²β) |

k=classes, m=instances, α=train complexity, β=inference complexity per instance. OvO more accurate, slower inference.

#### Evaluation

Multi-class confusion matrix (3-class, n=100):

| Actual\Pred | C1 | C2 | C3 | total |
|---|---|---|---|---|
| C1 (ICU) | 15 | 2 | 3 | 20 |
| C2 (CCU) | 7 | 15 | 8 | 30 |
| C3 (RW) | 2 | 3 | 45 | 50 |
| total | 24 | 20 | 56 | 100 |

- **Accuracy** = diagonal/total = (15+15+45)/100 = **0.75**
- **Per-class precision/recall:**
  - C1: prec=15/24=0.63, rec=15/20=0.75
  - C2: prec=15/20=0.75, rec=15/30=0.50
  - C3: prec=45/56=0.80, rec=45/50=0.90
- **Weighted avg precision** = 0.20·0.63 + 0.30·0.75 + 0.50·0.80 = **0.75**

#### Multi-Class ROC

- **Macro-avg**: metric per class, then mean. Treats classes equally.
  `macro-TPR = (TPR₁+TPR₂+TPR₃)/3`
- **Micro-avg**: aggregate counts then compute. Treats instances equally.
  `micro-TPR = (TP₁+TP₂+TP₃) / (TP₁+TP₂+TP₃+FN₁+FN₂+FN₃)`

Plot one ROC per class + macro + micro curves.

### 3.2 Regression

#### Intuition
Predict numerical target. Higher resolution than classification.

#### Formal
Regressor `f̂: 𝒳 → ℝ`. Learn from labeled `(xᵢ, f(xᵢ))`. Capture trend, ignore noise.

#### Residuals & Loss
`residual = f(x) − f̂(x)`. Apply loss (squared most common):
```
Σᵢ (f(xᵢ) − f̂(xᵢ))²
```

#### Polynomial Fitting
n-degree polynomial has n+1 parameters:
- `y = ax + b` → degree 1, 2 params (a=slope, b=intercept)
- `y = ax² + bx + c` → degree 2, 3 params

Higher degree fits training exactly → **overfit**. Rule: # parameters << # data points.

#### Bias-Variance Dilemma

Low-complexity model:
- less variance from training fluctuations
- systematic **bias** that data can't fix

High-complexity model:
- no bias
- high **variance** from training noise

Decomposition of expected squared loss:
```
E[(f(x) − f̂(x))²] = (f(x) − E[f̂(x)])² + E[(f̂(x) − E[f̂(x)])²]
                    ↑ bias²                ↑ variance
```
First term = bias (off on average). Second = variance (estimator varies w/ training set).

### 3.3 Unsupervised & Descriptive Learning

Recap of task matrix:

|  | Predictive | Descriptive |
|---|---|---|
| Supervised | Classification, Regression | Subgroup discovery |
| Unsupervised | Predictive clustering | Descriptive clustering, Association rules |

#### Clustering — Predictive vs Descriptive

- **Predictive clusterer**: `q̂: 𝒳 → 𝒞` — generalizes to new instances
- **Descriptive clusterer**: `q̂: D → 𝒞` — describes given data D, no holdout
- Cluster labels show only differences, no semantic meaning

#### Distance-Based Clustering

**Exemplar** = center of mass minimizing **scatter** (distance sum) over set. Good clustering = within-cluster scatter << total scatter.

- **Between-cluster scatter**: distance between exemplars (maximize)
- **Within-cluster scatter**: distance to own exemplar (minimize)

#### Evaluating Clustering

**With ground truth** (compare pairs):
Predicted {e1,e2,e3},{e4,e5} vs true {e1,e2},{e3,e4,e5}:

|  | Are together | Not together |
|---|---|---|
| Should be | 2 (TP) | 2 (FN) |
| Should not | 2 (FP) | 4 (TN) |

- **Rand index** = 6/10 (accuracy analog)
- **Precision** = 2/4
- **Recall** = 2/4
- **F1** = 1/2

**Without ground truth — Silhouette coefficient:**
```
s = (b − a) / max(a, b)
```
- a = mean distance to other points in same cluster
- b = mean distance to nearest other cluster's points
- s ∈ [−1, +1]. Near +1 = well-separated. 0 = on boundary. Negative = wrong cluster.

#### Subgroup Discovery

Supervised task, different goal from classification. Find interesting population subgroups (statistically unusual + large enough), not maximize accuracy.

`ĝ: D → {true, false}` learned from labeled `(xᵢ, l(xᵢ))`. Extension `G = {x ∈ D | ĝ(x)=true}`.

Examples: risk groups for cancer/heart disease, traffic accident patterns.

**Evaluation — Chi-squared:**
```
χ² = Σ (Oᵢ − Eᵢ)² / Eᵢ
```
Measure how subgroup class distribution differs from population marginals.

---

## Lecture 4: Tree Models

Tree models: decision trees, random forests, gradient boosting. Properties: understandable, interpretable, logical, **non-linear**.

### 4.1 Decision Trees

#### Anatomy
- **Internal nodes** = feature + question
- **Edges** = literal (answer to question, a value)
- **Leaves** = class label (or value)
- **Root** = top
- **Split** = set of literals at a node

Each leaf = conjunction of literals along root→leaf path → logical expression.

Example (PlayTennis):
```
                Outlook
       Sunny /   |Overcast    \ Rainy
       Humidity  Yes          Wind
       High/ \Normal     Strong/ \Weak
       No    Yes         No     Yes
```

Logical expression:
```
¬((Outlook=Sunny) ∧ (Humidity=High)) ∨
 ((Outlook=Sunny) ∧ (Humidity=Normal)) ∨
  (Outlook=Overcast) ∨
¬((Outlook=Rainy) ∧ (Wind=Strong)) ∨
 ((Outlook=Rainy) ∧ (Wind=Weak))
```

#### Capacity Bound

Binary classifier with d binary features `h: {0,1}ᵈ → {0,1}` representable by decision tree with **2ᵈ leaves**, **depth d+1**. (Each path = one combination of feature values.)

### 4.2 Growing a Decision Tree

#### Algorithm (Recursive)
```
GrowTree(D, F):
  if Homogeneous(D): return Label(D)
  S ← BestSplit(D, F)         # split D into D₁...Dₗ by literals in S
  for each i:
    if Dᵢ ≠ ∅: Tᵢ ← GrowTree(Dᵢ, F)
    else:      Tᵢ = leaf labeled Label(D)
  return tree with root S, children Tᵢ
```

#### Best Split = Most Pure

Pure split: each child has one class. Want leaves where majority class dominates.

**Total impurity** of splits D = D₁ ∪...∪ Dₗ:
```
Imp({D₁,...,Dₗ}) = Σⱼ (|Dⱼ|/|D|) · Imp(Dⱼ)
```

#### Impurity Measures (Binary)

Let `ṗ = n⊕ / (n⊕ + n⊖)` = empirical positive probability.

| Measure | Formula |
|---|---|
| Minority class (error) | `min(ṗ, 1−ṗ)` |
| Entropy | `−ṗ log₂ ṗ − (1−ṗ) log₂(1−ṗ)` |
| Gini index | `2ṗ(1−ṗ)` |

All three: max at ṗ=0.5, zero at ṗ∈{0,1}. Entropy and Gini are smooth concave upper bounds on training error.

#### Entropy Intuition

Bits to encode event with probability p: `I = −log₂ p`
- p=1 → 0 bits (certain, no info)
- p=½ → 1 bit
- p small → many bits

Multiple outcomes → expected average:
```
H(p₁,...,pₙ) = −Σᵢ p(xᵢ) log₂ p(xᵢ)
```

Binary: `H = −ṗ log₂ ṗ − (1−ṗ) log₂(1−ṗ)`.

#### Purity Gain

```
Gain = Imp(D) − Imp({D₁,...,Dₗ})
```
= entropy(parent) − weighted entropy(children).

Worked example (14 instances, 9⊕/5⊖, parent entropy ≈ 0.94, or 1.0 if balanced):
- Humidity split: pure left/right → gain = 1 − (7/14·0 + 7/14·0) = **1**
- Wind split: 0.99 each side → gain = 1 − (7/14·0.99 + 7/14·0.99) = **0.01**

Pick Humidity. Min gain = 0 when child distributions match parent.

#### Continuous Features

Sort values. Candidate thresholds = midpoints between adjacent values.

Two efficiency rules:
1. Only one threshold needed between adjacent observed values
2. Only thresholds between examples of different classes can improve gain

#### BestSplit-Class Algorithm
```
BestSplit-Class(D, F):
  Imin ← 1
  for f ∈ F:
    split D into D₁...Dₗ by f's values
    if Imp({D₁...Dₗ}) < Imin:
      Imin ← Imp({D₁...Dₗ})
      fbest ← f
  return fbest
```

### 4.3 Pruning

Unconstrained tree memorizes training (zero train error) → **overfit** on noisy/limited data.

Two defenses:
1. **Limit growth** — cap depth or nodes
2. **Post-prune** — grow full tree, remove weak branches

#### Reduced Error Pruning
- Start at leaves, replace node with majority class
- Check accuracy on **validation set** (not training!)
- Keep change if accuracy maintained
- Simple, effective

### 4.4 Sensitivity to Skewed Class Distributions

Sources of imbalance:
- Asymmetric class distribution
- Asymmetric misclassification cost

Solutions:
- **Oversample minority** — extra training time, may not help
- **Use √Gini instead of Gini/entropy**

#### Why √Gini for Imbalance

Gini relative impurity of child 1:
```
n₁⊕ n₁⊖/n₁
─────────
n⊕ n⊖/n
```
**Sensitive** to class count changes.

√Gini relative impurity:
```
√(n₁⊕ n₁⊖ / (n⊕ n⊖))
```
**Insensitive** to scaling all positives by constant.

**Key fact:** Entropy and Gini sensitive to class distribution fluctuations. √Gini isn't.

### 4.5 Regression Trees

Extension: numeric target. Leaf prediction = **mean of training targets in leaf**.

#### Impurity → Variance

Replace Imp with variance:
```
Var(Y) = (1/|Y|) Σ_{y∈Y} (y − ȳ)²
```

Weighted variance over split:
```
Var({Y₁,...,Yₗ}) = Σⱼ (|Yⱼ|/|Y|) · Var(Yⱼ)
```

**Goal:** minimize weighted child variance.

**Connection:** variance of Bernoulli(ṗ) = `ṗ(1−ṗ)` = ½ Gini. So tree learning = minimize class variance in leaves (or stddev for √Gini).

#### Algorithm
1. Per feature, find threshold minimizing child variance
2. Across features, pick min-variance feature
3. Recurse on each leaf

Multi-feature (dosage, sex, age): repeat for each, pick best across all features and thresholds.

---

## Lessons Learned

- **Multi-class**: OvR cheap+brittle, OvO accurate+slower. Eval via per-class metrics, macro/micro avg, multi-class ROC.
- **Regression**: residual loss, polynomial fitting, bias-variance tradeoff.
- **Unsupervised**: predictive vs descriptive clustering, silhouette w/o ground truth, subgroup discovery.
- **Trees**: classification (entropy/Gini/error) or regression (variance) splits. Prune to fight overfit. √Gini handles imbalance.

---

## Test Your Understanding

**Q1** (L3): You build OvO classifier for 5 classes. (a) How many symmetric pairwise classifiers? (b) Asymmetric? (c) If one pairwise classifier mispredicts, can voting still recover correct class?

**Q2** (L3): Polynomial regression on 10 noisy points. Fit degree 1, degree 9. (a) Which has lower training error? (b) Which generalizes better? (c) Where on bias-variance spectrum does each sit?

**Q3** (L3): Clustering 6 points, ground truth {a,b,c},{d,e,f}. Algorithm outputs {a,b},{c,d,e,f}. Compute the pair-confusion-matrix and Rand index.

**Q4** (L4): Dataset 4⊕/4⊖. Split A: (4⊕,0⊖) | (0⊕,4⊖). Split B: (3⊕,1⊖) | (1⊕,3⊖). Compute Gini and entropy for parent and both splits. Which split better?

**Q5** (L4): Why does √Gini handle class imbalance better than Gini? Show via the relative-impurity formulas what happens when you multiply n⊕ by 10.

**Q6** (L4): Regression tree predicting house price. At root, you split on `sqft<1500`. Left leaf has prices {200k, 220k, 250k}. Right leaf has {400k, 450k, 500k, 480k}. (a) What predictions does each leaf output? (b) Compute weighted variance of this split.
