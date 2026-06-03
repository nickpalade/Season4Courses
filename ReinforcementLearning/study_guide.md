# Reinforcement Learning — Study Guide

A from-scratch, intuition-first walkthrough of every concept you need for the practice exam. Read top to bottom; each section builds on the last. Sources are the Leiden *IntroRL* lecture PDFs (see `CONTEXT.md`).

---

## 1. What RL is (and isn't)

Reinforcement learning is **learning by trial and error to maximize long-term reward**. An *agent* takes *actions* in an *environment*, the environment returns a *reward* and a new *state*, and the agent tries to figure out which actions pay off over time.

It differs from the other two ML families:
- **Supervised learning** — you're given the right answer (labels) for each input.
- **Unsupervised learning** — no labels, you find structure.
- **Reinforcement learning** — no labels, only a *reward signal* that may be delayed. You discover good behavior yourself.

**Genuine benefits of RL:**
- *Autonomous learning* — the agent improves on its own from experience.
- *Solve tasks you can't demonstrate* — you don't need expert examples, just a reward. Useful when you can't show the right move but can score the outcome.
- *Outperform human solutions* — by exploring beyond what humans would try (AlphaGo's "move 37").

**What RL is NOT good at: stability.** RL is notoriously *unstable*. The combination of **bootstrapping + function approximation + off-policy learning** is called the **"deadly triad"** — together they can make value estimates diverge. So "stable learning" is a fake benefit; it's actually RL's weakness.

> Exam takeaway: if asked which is *not* a benefit of RL → **stable learning**.

---

## 2. Multi-armed bandits (one-step RL)

A **bandit** problem is RL stripped down to a single decision: several slot-machine arms, each with an unknown average reward. No states, no future — just "which arm do I pull to maximize reward?" This is the cleanest place to study the **exploration vs exploitation** tradeoff:
- *Exploit* = pull the arm you currently think is best.
- *Explore* = try other arms to improve your estimates.

### ε-greedy
Most of the time pick the best-looking arm; with small probability **ε** pick a *random* arm. Simple, but it explores at a **fixed random rate forever** and ignores *how uncertain* it is about each arm.

### UCB (Upper Confidence Bound)
Pick the arm with the highest **estimate + uncertainty bonus**. The bonus is large for rarely-tried arms and shrinks as you collect more samples:

```
UCB(a) = Q(a) + c · √( ln t / n(a) )
```

`n(a)` = times arm `a` was tried. As `n(a)` grows the bonus → 0.

**Key difference from ε-greedy:** UCB *uses uncertainty information*. It deliberately tries arms it knows little about, and naturally **transitions from exploration to exploitation more gradually and smoothly** as uncertainty disappears. ε-greedy never adapts its exploration to what it has learned.

### Optimistic initialization
Trick to force exploration even with a **purely greedy** policy (no random exploration at all). Set every action's initial value estimate **slightly above the highest possible reward**. Then every untried action looks better than reality, so the greedy agent is "disappointed" each time it tries one, and is pushed to try all of them before settling.
- Setting it *way* above (e.g. 20×) just wastes time being disappointed for longer.
- Setting it *below* the lowest reward kills exploration (untried actions look bad).

> Exam takeaway: optimistic init = **initial estimate slightly above the highest possible reward**.

---

## 3. Markov Decision Processes (the RL framework)

An **MDP** is the formal model of a sequential decision problem. Its pieces:

| Symbol | Name | Maps | Meaning |
|---|---|---|---|
| `s ∈ S` | State | — | Situation the agent is in |
| `a ∈ A` | Action | — | What the agent can do |
| `π` | **Policy** | `s → a` | The agent's behavior: which action in each state |
| `P` | **Transition function** | `s, a → s'` | Environment dynamics: where you land next |
| `R` | Reward function | `s, a → r` | Immediate payoff |
| `γ` | Discount factor | — | How much future matters |

The **Markov property**: the next state depends only on the *current* state and action, not the full history. "The present captures everything you need."

> Exam takeaway: **policy = s → a**, **transition = s,a → s'**.

### The objective of RL
Find the **optimal policy** — *the best decision in every possible state*. Not a single maximum reward, not just a value function, not a shortest path (that's only a special case). The goal is a full state→action mapping that maximizes expected long-term return.

### Return and the discount factor γ
The **return** `G_t` is total future reward, with later rewards discounted:

```
G_t = R_{t+1} + γ·R_{t+2} + γ²·R_{t+3} + ...
```

- γ is always between **0 and 1**.
- **Smaller γ → future rewards weighted less** (the agent becomes short-sighted, because `γ^k` decays faster).
- γ near 1 → far-sighted; γ near 0 → only cares about the immediate reward.
- Mathematically, γ < 1 also keeps the infinite sum finite.

---

## 4. Value functions and optimality

- **State value** `v(s)` = expected return starting from state `s` and following policy π.
- **Action value** `q(s,a)` = expected return after taking action `a` in `s`, then following π.

**Optimal value function vs optimal policy:**
- There is **exactly one optimal value function** `v*` (the best achievable value in each state — a unique set of numbers).
- But there can be **multiple optimal policies**, because when two actions tie for the best value, choosing either one is optimal.

> Exam takeaway: **one optimal value function, possibly many optimal policies.**

### The Bellman equation
A **recursive** relationship: the value of a state equals the immediate reward plus the (discounted) value of where you go next.

```
v(s) = Σ_a π(a|s) Σ_{s'} P(s'|s,a) [ r + γ·v(s') ]
```

In words: *value now = expected (reward + discounted value of the successor state)*. It links the value of a state to the values of its neighbors — that recursion is the engine behind almost every RL algorithm.

### Curse of dimensionality
The number of distinct states **grows exponentially with the number of state variables**. Add one more variable with `k` possible values and you multiply the state count by `k`. A handful of variables and you can't enumerate states anymore — which is why tabular methods break down and we need function approximation.

---

## 5. Dynamic Programming (planning with a full model)

**DP** solves an MDP when you **already know** the transition and reward functions (you have the complete model). The two core algorithms:
- **Policy iteration** — alternate (a) evaluate the current policy's values, (b) make the policy greedy w.r.t. those values.
- **Value iteration** — repeatedly apply the Bellman *optimality* update until values converge, then read off the greedy policy.

Properties:
- Works over the **full tabular state space**.
- Uses **expected updates** — it sweeps over the *entire* distribution of next states (so it *requires a distributional model*: actual probabilities `P(s'|s,a)`).
- **Guaranteed to converge to the global optimum.**

> Exam takeaway: DP = **global solution, guaranteed convergence to optimal**, but needs the full model.

---

## 6. Monte Carlo methods (learning from experience)

**Monte Carlo (MC)** learns *without a model* — purely from sampled, complete episodes. This is its **main advantage over DP**: it can learn even when you don't know the environment's dynamics.

How it works:
- Run an episode to the end, compute the actual **return `G_t`** (cumulative future discounted reward) from each state visited.
- The value estimate for a state is just the **average of the returns** observed from it.

**First-visit MC:** for each episode, use the return from the *first* time a state is visited to update its estimate. The thing that updates the estimate is the **cumulative future discounted reward (the return)** — *not* a bootstrap.

> Important contrast: **MC does NOT bootstrap.** It waits for the real return. DP and TD methods bootstrap (estimate from other estimates). MC trades bias for variance: unbiased but noisy.

**From state values to action values:** to estimate `q(s,a)` with MC, **average returns over state–action pairs** instead of over states.

### Exploring starts
A problem with MC control: if you always follow your current policy, you may never try certain (s,a) pairs, so you can't evaluate them. **Exploring starts** fixes this by letting **each episode begin at a random state–action pair**, guaranteeing every (s,a) has nonzero probability of being visited.

---

## 7. Temporal-Difference control: SARSA, Q-learning, Expected SARSA

TD methods update **after every step** using **bootstrapping** (estimate built on the next estimate). They combine MC's model-free sampling with DP's incremental updating.

General TD update: `Q(s,a) ← Q(s,a) + α [ target − Q(s,a) ]`, where `α` is the learning rate and the bracket is the **TD error**.

### SARSA (on-policy)
Uses the action **you actually take next**:

```
Q(s_t,a_t) ← Q(s_t,a_t) + α [ R_{t+1} + γ·Q(s_{t+1}, a_{t+1}) − Q(s_t,a_t) ]
```

The name = State–Action–Reward–State–Action. It's **on-policy**: it learns the value of the policy it's following (including its exploration).

### Q-learning (off-policy)
Uses the **max** over next actions, regardless of what you actually do:

```
Q(s_t,a_t) ← Q(s_t,a_t) + α [ R_{t+1} + γ·max_{a'} Q(s_{t+1}, a') − Q(s_t,a_t) ]
```

**Off-policy**: learns the optimal (greedy) policy while behaving with exploration.

### Telling the four apart (common exam trap)
The bracket's middle term reveals the method:
- `Q(s_{t+1}, a_{t+1})` (actual next action) → **SARSA**
- `max_{a'} Q(s_{t+1}, a')` → **Q-learning**
- `Σ_{a'} π(a'|s') Q(s_{t+1}, a')` (expectation over policy) → **Expected SARSA**
- `G_t` (full return) → **Monte Carlo**

---

## 8. Off-policy learning and importance sampling

**Off-policy** = learn about a *target policy* while collecting data with a different *behaviour policy* (e.g. learn the greedy policy while exploring randomly).

Problem: an action's probability differs between the two policies, so the sampled returns are biased toward the behaviour policy. **Importance sampling** corrects this by **reweighting each return by the ratio of target-to-behaviour action probabilities**:

```
ρ = π_target(a|s) / π_behaviour(a|s)
```

> Exam takeaway: importance sampling fixes that *the probability of an action can differ between behaviour and target policies.*

### Double learning
When you use **one** estimator to both *choose* the max action and *evaluate* it, noise gets selected for — you systematically **overestimate** values. This is **maximization bias**. **Double learning** (e.g. Double Q-learning) keeps **two estimators**: one picks the best action, the other evaluates it. Decoupling selection from evaluation removes the bias.

> Exam takeaway: double learning solves **maximization bias**.

---

## 9. Psychology & neuroscience links

RL theory mirrors how brains learn from reward.

### Rescorla–Wagner model
A classical-conditioning learning rule: update an association's strength `V` by the **prediction error** `(r − V)`:

```
ΔV = α (r − V)
```

- **Acquisition:** reward present (`r > 0`), `V` low → positive error → `V` rises.
- **Extinction:** reward **stops** (`r = 0`) but a positive expectation remains (`V > 0`), so `(r − V) < 0` — a **negative prediction error** that drives `V` back down. That's why a learned response fades when the reward disappears.

### Dopamine and reward-prediction error
Dopamine neurons signal a **reward-prediction error**, just like the TD error.
- Unexpected reward → dopamine spike *at the reward*.
- Once a **reliable predictor** (cue) is learned, the dopamine response **shifts earlier**, to a **peak shortly after the predictor** — the surprise has moved to the earliest signal that reliably forecasts reward. The reward itself no longer surprises.

### Eligibility / stimulus traces
A **stimulus trace** keeps a fading memory of recently active cues so that a later reward can be credited back to them. The computational analogue is **n-step methods** (and TD(λ)): credit is spread back over the last several steps rather than just the immediate one.

> Exam takeaway: stimulus traces ≈ **n-step methods**.

---

## 10. Model-based RL and planning

**Model-based RL** learns or uses a **model of the environment** — specifically the **transition function** (and reward) — so it can *plan* by simulating outcomes instead of only reacting.

### Learning a tabular model from counts
Estimate transition probabilities by counting:

```
p(s'|s,a) = n(s,a,s') / n(s,a)
```

i.e. of all the times you took `a` in `s`, what fraction landed in `s'`.

### Prioritized sweeping
When planning, don't waste updates on states that barely changed. Prioritize states by the **magnitude of their TD error** (largest first):

```
priority = | r + γ·max_{a'} Q(s',a') − Q(s,a) |
```

Big absolute TD error = big surprise = update it first; the change then propagates to predecessors.

### Classifying a backup: two independent axes
Every value update can be labeled on two axes:
1. **Policy axis** — *on-policy* (uses the actual policy / `Σπ`) vs *off-policy* (uses `max`, i.e. greedy).
2. **Width axis** — *sample* (one sampled transition) vs *expected* (sum over the full transition distribution).

Examples:
- **DP / value iteration** = **off-policy** (uses `max`) and **expected** (sweeps the whole dynamics distribution → needs a distributional model).
- **Q-learning** = **off-policy** (`max`) and **sample** (one real transition → no model needed).
- **SARSA** = on-policy, sample.

> Exam takeaways:
> - DP uses **expected** updates and needs a **distributional model**; Q-learning uses **sample** updates.
> - Value iteration's backup = **off-policy, expected over the dynamics**.

---

## 11. Search & sample-based planning

### Breadth-first search (BFS)
Explores level by level. Its **downside: it ignores edge costs** — every edge is treated equally, so on a weighted graph BFS is **not cost-optimal** (it finds the fewest-edges path, not the cheapest).

### Sample-based search
Instead of needing a full analytic probability model, you only need a **generative model** that can *sample* next states. **Benefit over classic/heuristic search: in stochastic problems you don't need an explicit analytic transition model** — sampling is enough.

### Monte Carlo Tree Search (MCTS)
Builds a search tree by repeating four phases **in order**:

1. **Selection** — descend the existing tree using a tree policy (UCT).
2. **Expansion** — add a new child node.
3. **Simulation** — roll out (often randomly) to a terminal result.
4. **Back-up** — propagate the result back up, updating node statistics.

### UCT (UCB applied to Trees)
The selection step uses a UCB-style rule. Its uncertainty/exploration bonus scales as:

```
bonus ∝ √( ln N / n(s,a) )   →   shrinks like  1/√n(s,a)
```

So the uncertainty estimate decreases on the order of **1/√n(s,a)** as a node is visited more.

> Exam takeaways: MCTS order = **Selection → Expansion → Simulation → Back-up**; UCT uncertainty ∼ **1/√n**.

---

## 12. Policy-based methods & function approximation

### Policy gradient
Instead of learning values and deriving a policy, **directly learn a parameterized policy** `π_θ(a|s)` and adjust `θ` by gradient ascent on expected return. Two true statements:
- **S1:** Policy-gradient methods learn a parameterized policy directly, whereas action-value methods learn values first and *derive* the policy from them.
- **S2:** Policy-gradient methods can represent **arbitrary action probabilities** (any continuous distribution), which value-greedy methods can't.

Both S1 and S2 are correct. Policy gradients also handle continuous action spaces and naturally produce stochastic policies.

### Actor–critic
A method that learns **both** a policy and a value function:
- **Actor** = the policy (chooses actions).
- **Critic** = the value function (evaluates them and supplies a lower-variance learning signal to the actor).

> Exam takeaway: learns both policy and value → **actor–critic**.

### Stochastic gradient descent (SGD)
The optimizer underneath function approximation: **take small steps in the direction of the negative gradient** of the loss, using one (or a few) samples at a time. First-order, per-sample, incremental.

### AlphaGo
Combined **two neural networks** with MCTS:
- a **policy network** (move priors — where to look),
- a **value network** (how good a position is).

> Exam takeaway: AlphaGo = **policy network + value network** (plus MCTS).

---

## 13. The two calculation questions

### Q-learning update (worked template)
Formula:

```
q(s,a) ← q(s,a) + α [ r + γ·max_{a'} q(s',a') − q(s,a) ]
```

Plug the givens `r=10, q(s,a)=6, α=0.2, γ=0.75`, and read the **largest** next-action value `M` off the figure:

```
q(s,a) = 6 + 0.2 [ 10 + 0.75·M − 6 ] = 6 + 0.2 [ 4 + 0.75·M ]
```

Worked example with `M = 8`: `6 + 0.2[10 + 6 − 6] = 6 + 0.2·10 = 8.0`.

**Method:** identify the max next-action q-value, substitute, evaluate the bracket, scale by α, add to the old estimate.

### Optimal q*(s,a) with no discounting (γ = 1)
The value of an **action node** = expected over its transitions of (immediate reward + value of the next state), where a state's value is the **max** of its actions' q*:

```
q*(s,a) = Σ_{s'} p(s'|s,a) · [ r(s,a,s') + max_{a'} q*(s',a') ]
```

**Method:** for each possible next state `s'`, take `(reward to reach it + best q* available there)`, multiply by its probability `p(s'|s,a)`, and **sum**. Read `p`, `r`, and the bottom-row `q*` values off the figure.

---

## Quick-recall cheat sheet

| Topic | One-liner |
|---|---|
| Non-benefit of RL | **Stable learning** (deadly triad = bootstrap + approx + off-policy) |
| UCB vs ε-greedy | UCB uses uncertainty → smooth explore→exploit transition |
| Optimistic init | Initial value slightly **above** max reward |
| RL objective | Best action in **every** state = optimal policy |
| Policy / Transition | π: s→a ; P: s,a→s' |
| Discount γ | In [0,1]; smaller = future matters less |
| Optimal v* vs π | One v*, possibly many optimal policies |
| Bellman | Recursive: value now = reward + γ·value(next) |
| Curse of dimensionality | States grow **exponentially** with #variables |
| DP | Global optimum, guaranteed; needs full (distributional) model; expected updates |
| MC advantage | Learns **without** a model; uses returns; **no bootstrap** |
| First-visit MC update | The **return** G_t |
| MC for q | Average over **(s,a) pairs** |
| SARSA | On-policy: uses actual next action a_{t+1} |
| Q-learning | Off-policy: uses **max** next q; sample update |
| Expected SARSA | Uses Σ π(a')·q |
| Exploring starts | Random **(s,a)** start each episode |
| Importance sampling | Reweight by target/behaviour prob ratio |
| Double learning | Fixes **maximization bias** (2 estimators) |
| Stimulus traces | ≈ **n-step** methods |
| Rescorla–Wagner extinction | r=0, V>0 → (r−V)<0 → V falls |
| Dopamine after new predictor | Peak shifts to **just after the predictor** |
| Prioritized sweeping | Priority = |TD error| |
| Model-based RL | Models the **transition function** |
| Tabular model | p(s'|s,a) = n(s,a,s')/n(s,a) |
| Value iteration backup | Off-policy, expected over dynamics |
| BFS downside | Ignores **edge costs** |
| Sample-based search benefit | No analytic model needed (sampling suffices) |
| MCTS phases | Selection → Expansion → Simulation → Back-up |
| UCT uncertainty | ∼ **1/√n(s,a)** |
| Policy gradient | Learns parameterized policy directly; arbitrary action probs |
| Actor–critic | Learns **both** policy + value |
| SGD | Small steps along **negative gradient** |
| AlphaGo nets | **Policy** net + **value** net |
