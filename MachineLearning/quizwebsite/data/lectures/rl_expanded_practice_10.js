export default (direct) => [
  direct(
    "rle_10_01",
    "easy",
    "Access to dynamics",
    "What makes access to an MDP model reversible in the lecture's terminology?",
    [
      "The agent can query another action from the same state instead of committing to the first outcome",
      "The agent can undo any Q-value update after observing an unexpectedly low reward",
      "The environment returns the agent to the start state whenever an episode terminates",
      "The transition probabilities are deterministic enough that every sampled trajectory can be replayed exactly",
    ],
    0,
    "Reversible access means the dynamics can be queried repeatedly from a chosen state-action pair, as in planning with a model. Real interaction is irreversible because acting moves the process onward."
  ),
  direct(
    "rle_10_02",
    "easy",
    "Model output",
    "A model returns one sampled successor for a queried state-action pair. What kind of model access is this?",
    [
      "A distributional model, because repeated queries could reveal several successors",
      "A sample model, because each query supplies one draw rather than the full distribution",
      "An irreversible environment, because only one successor is shown by each query",
      "A local value model, because it avoids representing transition probabilities explicitly",
    ],
    1,
    "The lecture separates reversible versus irreversible access from distributional versus sample output. A reversible model may still return only one sampled successor per query."
  ),
  direct(
    "rle_10_03",
    "medium",
    "Planning and learning",
    "Which combination is classified as borderline or model-based RL in the lecture?",
    [
      "Irreversible dynamics access with a local solution discarded after the next action",
      "Irreversible dynamics access with a global solution stored across visited states",
      "Reversible dynamics access with a global solution stored across states",
      "Reversible dynamics access with a local search tree rebuilt only for the current decision",
    ],
    2,
    "The lecture classifies reversible access plus a global stored solution as borderline/model-based RL. Reversible plus local is planning, while irreversible plus global is model-free RL."
  ),
  direct(
    "rle_10_04",
    "easy",
    "Learning a model",
    "How can an agent obtain reusable model access when its real-world interaction is irreversible?",
    [
      "By treating each real transition as reversible once its TD error falls below a threshold",
      "By storing a local search tree and discarding all values immediately after taking an action",
      "By replacing transition uncertainty with the most frequent successor and treating it as exact during planning",
      "By fitting transition and reward estimates from collected tuples and querying those estimates",
    ],
    3,
    "Model-based RL learns estimates of p(s'|s,a) and r(s,a,s') from irreversible experience. The learned estimates can then be queried reversibly for planning."
  ),
  direct(
    "rle_10_05",
    "easy",
    "Data efficiency",
    "What main benefit does the lecture attribute to learning and reusing a dynamics model?",
    [
      "Potentially improving data efficiency by extracting extra updates from real experience",
      "Guaranteeing optimal behaviour before every reachable state has been encountered",
      "Removing approximation error by converting stochastic transitions into deterministic ones",
      "Eliminating the need for a reward function once the transition probabilities are estimated",
    ],
    0,
    "A learned model can generate additional planning experience from data already collected, so model-based RL can be more data efficient. This is a potential benefit, not an optimality guarantee."
  ),
  direct(
    "rle_10_06",
    "medium",
    "Transition estimation",
    "For a fixed (s,a), successor counts are 4, 2, and 6. What transition distribution does the count model estimate?",
    [
      "(0.40, 0.20, 0.40), because the final count is treated as a terminal correction",
      "(1/3, 1/6, 1/2), because the three counts are normalized by their total of twelve",
      "(1/2, 1/4, 1/4), because the two smaller successor counts are pooled before normalization",
      "(1/6, 1/3, 1/2), because successor probabilities follow increasing visit rank",
    ],
    1,
    "The denominator is n(s,a)=4+2+6=12. Normalizing gives 4/12=1/3, 2/12=1/6, and 6/12=1/2."
  ),
  direct(
    "rle_10_07",
    "medium",
    "Reward estimation",
    "The transition (s,a,s') occurred four times with total observed reward 10. What is the tabular reward estimate?",
    [
      "10, because the model stores cumulative reward rather than conditional mean reward",
      "4/10, because reward probability is normalized over the accumulated reward mass",
      "2.5, because the total reward is averaged over the four matching transitions",
      "10/|S|, because every successor state shares the accumulated transition reward",
    ],
    2,
    "The reward model r(s,a,s') is the total reward Rsum(s,a,s') divided by the number of matching transitions n(s,a,s'), so 10/4=2.5."
  ),
  direct(
    "rle_10_08",
    "easy",
    "Tabular model storage",
    "Why does the lecture describe the transition-count table as having size |S| x |A| x |S|?",
    [
      "It stores a separate policy, value, and reward entry for every state-action combination",
      "It records one count for each current state and action but marginalizes all successor states",
      "It duplicates each state-action count once for model learning and once for value learning",
      "It records a count for every current-state, action, and successor-state combination",
    ],
    3,
    "The count n(s,a,s') has three indices: current state, action, and observed next state. Hence the tabular array has dimensions |S| x |A| x |S|."
  ),
  direct(
    "rle_10_09",
    "hard",
    "Backup dimensions",
    "A one-step target averages over every possible next state but samples one next action from the policy. How is that backup classified?",
    [
      "Sample width over actions, expected width over dynamics, and one-step depth",
      "Expected width over actions, sample width over dynamics, and full-return depth",
      "Sample width over actions, sample width over dynamics, and full-return depth",
      "Expected width over actions, expected width over dynamics, and one-step depth",
    ],
    0,
    "The action branch is sampled, the transition branch is averaged using the dynamics distribution, and the target stops after one transition. These dimensions are independent choices."
  ),
  direct(
    "rle_10_10",
    "medium",
    "Real-time dynamic programming",
    "Why does RTDP apply dynamic-programming updates along traces sampled from the start state?",
    [
      "To make the model irreversible so its updates match ordinary model-free learning",
      "To concentrate computation on states likely to be reachable instead of sweeping all states",
      "To replace Bellman optimality updates with complete Monte Carlo return estimates",
      "To ensure every state-action pair, including unreachable ones, receives the same number of planning updates",
    ],
    1,
    "Classical DP sweeps the entire state space, including potentially unreachable states. RTDP deliberately follows start-state traces while retaining model-based Bellman updates."
  ),
  direct(
    "rle_10_11",
    "medium",
    "Dyna cycle",
    "After Dyna observes a real transition, which sequence matches the lecture's integrated architecture?",
    [
      "Update only the model, finish the episode, and rebuild the value function from scratch",
      "Generate simulated transitions first, then use them to overwrite the newly observed real tuple",
      "Update from the real tuple, learn the model, then perform standard updates on model samples",
      "Learn a backward model, rank every predecessor, then avoid updating from the real transition",
    ],
    2,
    "Dyna learns from the observed transition, updates its model, and uses model-generated tuples for additional applications of a standard method such as Q-learning."
  ),
  direct(
    "rle_10_12",
    "hard",
    "Dyna planning budget",
    "In tabular Dyna, what does setting k=10 mean between two consecutive real environment steps?",
    [
      "The real transition is replayed ten times with different learning rates, while the model remains unused until evaluation",
      "Ten environment actions are taken without updating, after which their rewards are averaged once",
      "The model predicts a ten-step rollout that must terminate before any Q-value can be changed",
      "Ten model-generated transitions receive planning updates in addition to learning from the real step",
    ],
    3,
    "The lecture defines k as the number of planning updates made between real steps. Each planning update uses simulated transition data from the learned model."
  ),
  direct(
    "rle_10_13",
    "easy",
    "Simulated experience",
    "Once Dyna samples (s,a,r,s') from its learned model, how is that tuple used?",
    [
      "It is passed to a standard model-free update in the same form as an observed transition",
      "It updates only the transition counts because simulated rewards cannot affect value estimates",
      "It replaces the corresponding real tuple so each state-action pair has one stored outcome",
      "It is kept solely for selecting the next real action and never changes the learned Q-table",
    ],
    0,
    "Dyna's key integration is to apply an ordinary update such as Q-learning to both real and model-generated transitions."
  ),
  direct(
    "rle_10_14",
    "medium",
    "Priority measure",
    "Why does prioritized sweeping use the absolute TD error as a queue priority?",
    [
      "It preserves whether the update raises or lowers Q and uses that signed direction to determine the queue order",
      "It measures the size of the pending value change without cancelling large negative errors",
      "It estimates how many predecessor states exist without consulting a backward model",
      "It converts every Bellman target into a probability that can be normalized across states",
    ],
    1,
    "Priority should reflect update magnitude. Taking the absolute value treats large positive and negative discrepancies as important rather than allowing sign to hide their size."
  ),
  direct(
    "rle_10_15",
    "medium",
    "Backward model",
    "A state's value changes sharply after discovering a reward. What information does prioritized sweeping's backward model provide?",
    [
      "The successor distribution needed to replace the Q-learning target with an expected backup",
      "The action probabilities of the current policy at every state reachable from the changed state",
      "The earlier state-action pairs that can lead to the changed state and may now need updates",
      "The complete forward trajectory that first discovered the reward, including every sampled action",
    ],
    2,
    "The reverse model identifies precursors of a changed state. Those predecessors can be reconsidered so new information propagates backward efficiently."
  ),
  direct(
    "rle_10_16",
    "hard",
    "Backward propagation",
    "State z receives a much larger value. The reverse model says only (x,left) and (y,right) can transition to z. What should prioritized sweeping consider next?",
    [
      "Every action from every state, because priority queues require uniform full-state sweeps",
      "Only successors of z, because value information must be propagated in the direction of motion",
      "Only the state-action pair that originally produced the reward, regardless of its relation to z",
      "The priorities of (x,left) and (y,right), because their targets may have changed through z",
    ],
    3,
    "A change at z can alter the backup targets of its precursors. The backward model restricts this search to state-action pairs that can lead to z."
  ),
  direct(
    "rle_10_17",
    "hard",
    "Priority queue workflow",
    "Which ordering best matches one prioritized-sweeping planning iteration?",
    [
      "Pop the highest-priority item, update its Q-value, inspect its precursors, and enqueue important ones",
      "Pop the smallest reward, resample its successor until deterministic, and clear every predecessor",
      "Update all Q-values uniformly, construct a queue only after the sweep, and then discard the learned reverse model",
      "Choose a random precursor, update the forward model only, and postpone its TD error calculation",
    ],
    0,
    "The queue focuses computation: pop an important item, perform its value update, use the backward model to find precursors, and queue those with sufficiently large error."
  ),
  direct(
    "rle_10_18",
    "hard",
    "Dyna versus prioritized sweeping",
    "Which distinction between Dyna and prioritized sweeping is emphasized in the lecture summary?",
    [
      "Dyna uses only real transitions, whereas prioritized sweeping alone permits simulated updates",
      "Dyna samples a forward model; prioritized sweeping uses a backward model and a priority queue",
      "Dyna requires expected backups, whereas prioritized sweeping requires complete Monte Carlo returns",
      "Dyna stores a local solution for one action, whereas prioritized sweeping stores no value function",
    ],
    1,
    "Dyna uses its learned forward model to sample extra transitions. Prioritized sweeping additionally uses reverse connectivity to select consequential updates through a queue."
  ),
  direct(
    "rle_10_19",
    "hard",
    "Local solutions",
    "Why does the lecture call a local solution with irreversible MDP access an impossible useful combination?",
    [
      "Irreversible access supplies only one transition sample, so every local estimate must remain biased",
      "A local solution can be reused only while the policy remains fixed, which real interaction prevents",
      "After executing the real action, the discarded local solution cannot be reused by resampling that state",
      "A local solution costs as much as a global one, so discarding it cannot reduce memory or computation",
    ],
    2,
    "A local solution is thrown away after acting. With irreversible access, the agent cannot simply return to the same state and exploit that one-use computation again."
  ),
  direct(
    "rle_10_20",
    "medium",
    "Expected and sample backups",
    "What changes when an update replaces one sampled successor with an expectation under p(s'|s,a)?",
    [
      "Its policy changes from on-policy to off-policy because all successor states are included",
      "Its depth changes from one step to a full return because an expectation uses every future reward",
      "Its model access becomes irreversible because the successor distribution is consumed in one update",
      "Its width over dynamics changes from sample to expected while policy and depth can stay unchanged",
    ],
    3,
    "Backup width over the transition dynamics is separate from action width, target policy, and backup depth. Averaging successors changes only the dynamics-width choice here."
  ),
];
