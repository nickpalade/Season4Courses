export default (direct) => [
  direct("rle_11_01", "easy", "Planning", "What distinguishes planning from direct model-free learning in this lecture?", [
    "Planning uses lookahead in a model before choosing or improving actions",
    "Planning updates only after an action is executed in the real environment",
    "Planning requires a labelled dataset of optimal actions for every state",
    "Planning removes the need to represent rewards or future consequences",
  ], 0, "Planning searches possible futures using a model; model-free learning updates from actual or recorded experience without such lookahead."),
  direct("rle_11_02", "easy", "Planning types", "A chess program searches only from the current board to choose its next move. What type of planning is this?", [
    "Background planning that updates a global policy across the whole state space",
    "Decision-time planning for the current state",
    "Policy evaluation from real trajectories",
    "Uniform-cost preprocessing of all states",
  ], 1, "Decision-time planning performs lookahead for the current state to select an action, rather than building a global solution in advance."),
  direct("rle_11_03", "easy", "Graph search", "Why can graph search avoid work that a plain tree search repeats?", [
    "It assigns the same edge cost to every transition",
    "It expands every path until a terminal state is reached",
    "It recognizes a previously generated state instead of searching it again",
    "It replaces the model with fresh samples from the real environment at every expansion",
  ], 2, "Different paths or loops can reach the same state. A graph representation records that state and avoids redundant expansion."),
  direct("rle_11_04", "easy", "Search frontier", "In graph search, what does the open list contain?", [
    "States whose optimal path has already been proven",
    "Only terminal states reached by the current best path through the search graph",
    "Fully expanded states that cannot generate new children",
    "Generated frontier states that remain candidates for expansion",
  ], 3, "The open list is the frontier awaiting possible expansion; fully expanded states belong to the closed list."),
  direct("rle_11_05", "easy", "Weighted paths", "Why can breadth-first search choose a poor route when edge costs vary?", [
    "It minimizes the number of edges rather than accumulated edge cost",
    "It always expands the edge with the largest immediate transition cost first by design",
    "It estimates remaining cost with an inadmissible heuristic",
    "It samples only one successor from every stochastic action",
  ], 0, "Breadth-first search is optimal in number of steps under equal costs, but a short path can be more expensive when weights differ."),
  direct("rle_11_06", "easy", "MCTS phases", "Which sequence gives one complete Monte Carlo Tree Search iteration?", [
    "Expansion, selection, backup, simulation",
    "Selection, expansion, simulation, backup",
    "Selection, simulation, backup, expansion",
    "Simulation, backup, selection, expansion",
  ], 1, "MCTS descends by selection, adds one new state by expansion, estimates it with a rollout, and backs the result up through the tree."),

  direct("rle_11_07", "medium", "Uniform-cost search", "The frontier contains paths with accumulated costs 9, 4, and 7. Which path does uniform-cost search expand next?", [
    "The path of cost 9 because it has explored farther",
    "The path of cost 7 because it is closest to the mean",
    "The path of cost 4 because its g-value is smallest",
    "Whichever path has the smallest estimated remaining cost h",
  ], 2, "Uniform-cost search prioritizes the smallest accumulated path cost g(s), without using a remaining-cost heuristic."),
  direct("rle_11_08", "medium", "A-star", "For two frontier states, x has g=5,h=4 and y has g=7,h=1. Which does A* expand first?", [
    "x, because its accumulated cost g is smaller",
    "x, because its heuristic h is larger",
    "Both, because A* ignores differences smaller than one",
    "y, because g(y)+h(y)=8 is below g(x)+h(x)=9",
  ], 3, "A* orders the frontier by f=g+h. State y has f=8, while x has f=9."),
  direct("rle_11_09", "medium", "Admissible heuristic", "What property makes a cost heuristic admissible for A*?", [
    "It never overestimates the true remaining cost",
    "It exactly equals the remaining cost at every state",
    "It is always larger than the accumulated cost g",
    "It ranks every state in the same order as breadth-first search",
  ], 0, "An admissible heuristic is optimistic: h(s) is no greater than the true cost-to-go. Exactness is sufficient but not required."),
  direct("rle_11_10", "medium", "Forward pruning", "A beam search keeps only the best M candidates at each depth. What guarantee can this sacrifice?", [
    "It can no longer represent different edge costs",
    "It may discard the branch containing the optimal solution",
    "It must expand all stochastic outcomes of every available action before continuing",
    "It cannot use a heuristic to rank its frontier states",
  ], 1, "Forward pruning reduces width, but a branch that looks weak early may contain the optimal solution, so optimality can be lost."),
  direct("rle_11_11", "medium", "Stochastic search", "Why can exhaustive classic search become especially wide in a stochastic MDP?", [
    "Every reward must be expanded as a separate action choice",
    "A stochastic problem prevents successor states from ever being stored in a reusable graph",
    "An action may require branches for all of its possible successor states",
    "The heuristic must enumerate every policy before estimating a cost",
  ], 2, "Under stochastic dynamics, an action can lead to multiple next states; explicit search may need to unfold every possible outcome."),
  direct("rle_11_12", "medium", "Sample-based planning", "A simulator can sample next states but does not expose transition probabilities. Why is sample-based planning suitable?", [
    "It estimates transition probabilities first and then requires an exact DP backup before acting",
    "It reuses the first sampled successor as the expected successor on every later query",
    "It evaluates only immediate rewards so that successor probabilities become irrelevant",
    "It estimates action values from simulated rollouts without an analytic model",
  ], 3, "Sample-based planning needs a generative model that produces transitions; it can estimate returns without enumerating an explicit probability distribution."),
  direct("rle_11_13", "medium", "Monte Carlo search", "What does the mean rollout return after choosing action a at state s estimate?", [
    "Q(s,a) for taking a and then following the rollout policy",
    "The optimal Q(s,a) independently of the rollout policy",
    "The immediate expected reward of a with future rewards removed",
    "The value of the behaviour before action a was selected",
  ], 0, "The first action is fixed to a, then the rollout policy controls later actions, so the mean estimates that policy's action value."),
  direct("rle_11_14", "medium", "Rollout policy", "What is the main effect of replacing random rollouts with a stronger prior policy?", [
    "It removes rollout-policy bias by making each finite estimate exact",
    "It can make finite-rollout value estimates more informative",
    "It lowers variance only when the prior policy is uniformly random",
    "It changes rollout values into guaranteed optimal values below the root",
  ], 1, "Monte Carlo search quality depends on its rollout policy. A better prior can produce more useful return estimates, though it gives no one-sample guarantee."),

  direct("rle_11_15", "hard", "Search complexity", "A deterministic search has branching factor b and depth d. Why does exhaustive lookahead quickly become infeasible?", [
    "Its memory grows only with d, but each heuristic call is exact",
    "Its cost is linear in b because states at a depth share one action",
    "The number of possible action sequences grows on the order of b^d",
    "Its transition model must be relearned independently at every node",
  ], 2, "At each additional depth, every branch can split into b more actions, producing exponential growth in the number of paths."),
  direct("rle_11_16", "hard", "Sparse sampling", "With A actions, N sampled successors per action, and depth D, what captures sparse sampling's main computational problem?", [
    "Its work is A+N+D, so depth has almost no effect",
    "Its work is A*N*D, because all successor samples are reused without branching at every level",
    "Its work is D^(A*N), because only depth creates branches",
    "Its sampled tree can scale as (A*N)^D, still exponential in depth",
  ], 3, "Sparse sampling avoids enumerating all stochastic outcomes, but repeating A actions and N samples recursively yields roughly (A*N)^D work."),
  direct("rle_11_17", "hard", "MCTS allocation", "How does MCTS address sparse sampling's waste on consistently poor directions?", [
    "It uses bandit selection to direct more simulations toward promising or uncertain branches",
    "It assigns all remaining simulations to the branch with the current highest sample mean",
    "It reduces the fixed sample width at deeper levels while still choosing branches uniformly",
    "It allocates simulations in proportion to immediate reward without tracking uncertainty",
  ], 0, "MCTS allocates samples adaptively using an exploration-exploitation rule, producing an asymmetric tree focused by evidence and uncertainty."),
  direct("rle_11_18", "hard", "UCT selection", "At a tree node, two actions have similar mean return, but one has far fewer visits. What does the UCT exploration bonus tend to do?", [
    "Penalize the less-visited action until its estimated mean has been proven globally optimal",
    "Favor the less-visited action because its value estimate is more uncertain",
    "Force both actions to receive identical cumulative returns",
    "Ignore visit counts and choose only by the current mean return",
  ], 1, "UCT adds an uncertainty bonus that is larger for less-visited actions, encouraging exploration when estimated values are comparable."),
  direct("rle_11_19", "hard", "MCTS backup", "A rollout from a newly expanded node returns 6. What should the backup phase do with this result?", [
    "Add every rollout state permanently to the explicit search tree",
    "Replace all ancestor action values with the rollout return of 6 regardless of their prior visits",
    "Update visit counts and mean-return statistics along the selected tree path",
    "Use 6 only to rank rollout-policy actions outside the current tree",
  ], 2, "Backup propagates the sample through the visited tree path, incrementally updating counts and mean action values used by later selection."),
  direct("rle_11_20", "hard", "Planning and learning", "Which design correctly combines learned values with planning according to the lecture?", [
    "Run planning only before learning, since learned approximate values permanently invalidate all search statistics",
    "Use planning solely to evaluate states that the learned policy never visits",
    "Keep learning and planning independent so neither introduces approximation error",
    "Use learned values to steer search, and use planning results as targets or corrections",
  ], 3, "Planning and learning can form a loop: approximate values guide new planning, while planning corrects decisions or generates training data."),
];
