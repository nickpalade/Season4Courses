# Reinforcement Learning Practice Exam — Answer Key

> Correct answer marked ✅ with brief reasoning.

## Question 1
What is not a benefit of reinforcement learning?
- ✅ **Stable learning** — RL is notoriously unstable (bootstrapping + function approximation + off-policy = "deadly triad"). The other three are genuine benefits.
- Outperform human solutions
- Solve tasks you can't demonstrate
- Autonomous learning

## Question 2
What is an important difference between UCB and ε-greedy policies?
- ✅ **UCB incorporates uncertainty information and may therefore more gradually transition from exploration to exploitation.** — UCB adds an uncertainty bonus that shrinks with visits, so exploration tapers smoothly. ε-greedy explores at a fixed random rate, ignoring uncertainty.

## Question 3
Best way to initialize value estimates for a purely greedy bandit?
- ✅ **You want your initial estimates slightly above the highest possible reward.** — Optimistic initialization: every untried action looks attractive, forcing exploration even under a greedy policy. "20× higher" wastes time; below lowest reward kills exploration.

## Question 4
What is the objective of reinforcement learning?
- ✅ **To find the best decision in every possible state** — i.e. an optimal policy. Not a single max reward, not just a value function, not a shortest path (that's a special case).

## Question 5
Correct mappings in an MDP?
- ✅ **The policy function computes s -> a and the Transition function s,a -> s'** — policy maps states to actions; transition maps state+action to next state.

## Question 6
What is true about the discount parameter γ?
- ✅ **It should be between 0 and 1. Making it smaller will make the agent weigh future rewards less.** — γ∈[0,1]; smaller γ shrinks future reward weight (γ^k decays faster).

## Question 7
Which expression is correct?
- ✅ **There is only one optimal value function, but there may be multiple optimal policies.** — v* is unique; ties in action values allow several optimal policies.

## Question 8
What is correct about tabular Dynamic Programming?
- ✅ **Dynamic Programming finds a global solution, and is guaranteed to converge to the optimal solution.** — With a full model and tabular states, DP provably converges to the global optimum.

## Question 9
The Bellman equation
- ✅ **Is a recursive formula describing how values at different states are related** — it relates the value of a state to values of successor states.

## Question 10
The curse of dimensionality describes
- ✅ **The fact that the number of unique states scales exponentially in the number of variables in a state.** — Each added state variable multiplies the state count.

## Question 11
Main advantage of Monte Carlo over Dynamic Programming?
- ✅ **Monte Carlo methods can learn without complete knowledge about environment** — MC learns from sampled experience; DP needs the full transition/reward model. (MC does NOT bootstrap — that's the opposite.)

## Question 12
First-visit MC: what updates the state value estimate?
- ✅ **The cumulative future discounted reward** — the return Gₜ from that state onward. No bootstrapping.

## Question 13
Adapting first-visit MC from state values to action values?
- ✅ **Average over state-action pairs instead of states** — estimate Q by averaging returns following each (s,a) pair.

## Question 14
Correct SARSA update equation?
- ✅ **Q(st,at) ← Q(st,at) + α[Rt+1 + γ·Q(st+1,at+1) − Q(st,at)]** — on-policy: uses the actually-taken next action a_{t+1}. (max → Q-learning; Σπ → Expected SARSA; Gₜ → Monte Carlo.)

## Question 15
Best description of exploring starts?
- ✅ **Let each episode start at random state-action pair** — guarantees every (s,a) has nonzero probability of being visited.

## Question 16
What problem does importance sampling solve in off-policy methods?
- ✅ **The probability of an action occurring can be different in the behaviour policy and target policy.** — IS reweights returns by the ratio of target-to-behaviour action probabilities.

## Question 17
What problem does double learning solve?
- ✅ **Maximization bias** — using one estimator to both select and evaluate the max overestimates values; two estimators decouple selection from evaluation.

## Question 18
Analogy of stimulus traces in computational RL?
- ✅ **N-step methods** — stimulus/eligibility traces spread credit back over recent steps, like n-step / TD(λ) updates.

## Question 19
Rescorla-Wagner explanation of extinction?
- ✅ **r = 0, V>0 and therefore (r-V)<0** — reward stops (r=0) while a positive expectation remains (V>0); the negative prediction error drives V down.

## Question 20
New predictor added before reward — dopaminergic response?
- ✅ **A response peak shortly after the predictor** — once learned, the reward-prediction-error signal shifts from the reward to the earliest reliable predictor.

## Question 21
Priority expression for prioritized sweeping (Q-learning)?
- ✅ **|r + γ·maxₐ' Q(s',a') − Q(s,a)|** — absolute TD error; magnitude decides update priority.

## Question 22
Which expression is correct (DP vs Q-learning)?
- ✅ **Dynamic programming uses expected updates, Q-learning uses sample updates. Dynamic programming requires a distributional model.** — DP sweeps the full distribution (needs the model); Q-learning updates from single sampled transitions.

## Question 23
Model-based RL uses a model of
- ✅ **The Transition Function** — (and reward). The model predicts next states/rewards.

## Question 24
Tabular dynamics model from counts n?
- ✅ **p(s'|s,a) = n(s,a,s') / n(s,a)** — fraction of (s,a) visits that landed in s'.

## Question 25
Value iteration back-up classification (policy / dynamics)?
- ✅ **Off-policy, expected over the dynamics.** — Uses max over actions (off-policy / greedy) and sums over the full transition distribution (expected).

## Question 26
Downside of breadth-first search?
- ✅ **It does not consider the cost of every edge** — BFS treats all edges equally, so it's not cost-optimal on weighted graphs.

## Question 27
Benefit of sample-based search over classic/heuristic search?
- ✅ **In stochastic problems we don't require access to an analytic transition model** — a generative (sampling) model suffices; no explicit probability distribution needed.

## Question 28
Correct order of the four MCTS phases?
- ✅ **Selection, Expansion, Simulation, Back-up** — descend the tree, add a node, roll out, propagate the result.

## Question 29
UCT: how does the uncertainty estimate scale with n(s,a)?
- ✅ **∼ 1/√n(s,a)** — exploration bonus ∝ √(ln N / n(s,a)), so it shrinks as 1/√n.

## Question 30
S1 (policy gradient learns parameterized policy; action-value methods learn values then derive policy) and S2 (policy gradient enables arbitrary action probabilities).
- ✅ **Both S1 and S2 are correct.**

## Question 31
Method that learns both a policy and a value function?
- ✅ **An actor-critic method.** — Actor = policy, critic = value function.

## Question 32
Best description of stochastic gradient descent?
- ✅ **Make small steps in the direction of negative gradient.** — Per-sample (stochastic) gradient steps; first-order method.

## Question 33
What neural networks did AlphaGo include?
- ✅ **A policy network and a value network.** — Policy net for move priors, value net for position evaluation, combined with MCTS.

## Question 34 (calculation)
Q-learning update. Given r=10, q(s,a)=6, α=0.2, γ=0.75.

Formula:
```
q(s,a) ← q(s,a) + α [ r + γ·maxₐ' q(s',a') − q(s,a) ]
       = 6 + 0.2 [ 10 + 0.75·maxₐ' q(s',a') − 6 ]
```
Plug in the **maximum** of the next-action q-values shown in the graph (call it M):
```
q(s,a) = 6 + 0.2 [ 4 + 0.75·M ]
```
> ⚠️ The numeric next-action values are only in the figure (not in the text). Read the largest next-action estimate M off the graph and substitute.
> Example: if M = 8 → q = 6 + 0.2[10 + 6 − 6] = 6 + 0.2·10 = **8.0**.

## Question 35 (calculation)
Optimal state-action value q*(s,a) for the top action node, **no discounting** (γ=1).

q* of an action node = expected value over its transitions of (immediate reward + value of the next state), where the next state's value is the **max** over its actions' q* (which are given at the bottom):
```
q*(s,a) = Σ_s'  p(s'|s,a) · [ r(s,a,s') + maxₐ' q*(s',a') ]
```
> ⚠️ Read the transition probabilities p, rewards r, and bottom-row q* values off the figure, then compute the probability-weighted sum.
