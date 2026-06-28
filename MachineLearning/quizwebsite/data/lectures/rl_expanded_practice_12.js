export default (direct) => [
  direct(
    "rle_12_01",
    "easy",
    "Curse of dimensionality",
    "Why can a table of Q-values become unusable even when each entry is cheap to store?",
    [
      "The number of state-action entries can grow beyond what can be visited or stored",
      "A table changes the environment dynamics whenever an entry is updated from experience",
      "Tabular values require a differentiable transition model for every possible state",
      "A table can represent deterministic policies but cannot represent stochastic policies",
    ],
    0,
    "Large state spaces create an enormous number of state-action entries. The lecture gives chess, with roughly 10^47 states, as an example of why tabulation is infeasible."
  ),
  direct(
    "rle_12_02",
    "easy",
    "Value approximation",
    "What is the intended storage advantage of replacing v_pi(s) with an approximator v_hat(s,w)?",
    [
      "Use fewer bits for each tabular value while keeping an independent entry for every state",
      "A comparatively small parameter vector represents values across a much larger state space",
      "Cache a fixed number of recent returns and use the nearest episode as the state estimate",
      "Represent states by hash keys while retaining a separate exact value for every distinct key",
    ],
    1,
    "Function approximation compresses the value function: the number of parameters should be much smaller than the number of states."
  ),
  direct(
    "rle_12_03",
    "medium",
    "Prediction objective",
    "In the lecture's squared value-error objective, what role can the weighting mu(s) play?",
    [
      "It sets the learning rate separately for every component of the parameter vector w",
      "It converts the approximate value into an action probability before error is measured",
      "It gives more influence to selected states, for example according to visitation frequency",
      "It discounts later rewards inside the return while leaving all state errors equally weighted",
    ],
    2,
    "The objective sums weighted squared errors over states. Choosing mu(s) from occurrence frequencies makes frequently encountered states contribute more strongly."
  ),
  direct(
    "rle_12_04",
    "easy",
    "Gradient descent",
    "Which parameter change is the basic gradient-descent step for reducing a value-error objective?",
    [
      "Take a large step in a random direction and keep it only if every state error decreases",
      "Move along the positive gradient because it identifies the steepest decrease in error",
      "Set the parameters equal to the latest target so that the current sample has zero error",
      "Take a small step opposite the gradient because that locally decreases the objective",
    ],
    3,
    "The gradient points toward steepest local increase, so gradient descent takes a suitably small step in the negative-gradient direction."
  ),
  direct(
    "rle_12_05",
    "medium",
    "Gradient Monte Carlo",
    "What supplies the target when gradient Monte Carlo updates an approximate state value?",
    [
      "The cumulative discounted rewards observed after that state in the completed episode",
      "The current one-step reward plus the approximator's value of the sampled next state",
      "The maximum approximate action value over all actions available in the current state",
      "The expected return computed exactly from a known transition and reward distribution",
    ],
    0,
    "Gradient Monte Carlo uses the sampled return from the remainder of an episode as its value target. It does not bootstrap from the current approximation."
  ),
  direct(
    "rle_12_06",
    "medium",
    "Generalization",
    "How can an update from one visited state change the estimate for a different, unvisited state?",
    [
      "The algorithm copies the latest target to every state that has not yet appeared in an episode",
      "Both states depend on shared parameters, so changing those parameters can affect both outputs",
      "Monte Carlo updates reconstruct missing trajectories by reversing the observed state sequence",
      "Unvisited states inherit values only when they have exactly the same immediate reward distribution",
    ],
    1,
    "With function approximation, states share weights or features. Updating those shared parameters from an observed state can therefore generalize to other states."
  ),
  direct(
    "rle_12_07",
    "medium",
    "Gradient TD",
    "Which target distinguishes gradient TD(0) from gradient Monte Carlo in this lecture?",
    [
      "A full discounted return with the final reward replaced by the current start-state value",
      "An exact expectation over every successor state under a learned dynamics distribution",
      "The immediate reward plus a discounted approximate value for the sampled next state",
      "The largest return previously observed after visiting the same state in any episode",
    ],
    2,
    "TD(0) uses a one-step bootstrapped target, r + gamma v_hat(s',w), whereas Monte Carlo waits for and uses the sampled return."
  ),
  direct(
    "rle_12_08",
    "easy",
    "State aggregation",
    "What does a state-aggregation value approximator store?",
    [
      "One independent value for each state, plus a separate table identifying its group",
      "One action preference for every pair of groups, without representing state values",
      "A transition probability between every pair of groups for each available action",
      "One shared value estimate for all states assigned to the same group",
    ],
    3,
    "State aggregation groups states and learns one value per group. This is a simple form of parameter sharing and generalization."
  ),
  direct(
    "rle_12_09",
    "hard",
    "Linear approximation",
    "For v_hat(s,w)=w^T x(s), state A has features (1,1) and state B has (1,0). Which single weight change alters both estimates?",
    [
      "Changing w1, the weight on the feature active in both states",
      "Changing w2, the weight active in A but inactive in B",
      "Adding a new state-specific weight that is active only in A",
      "Changing A's target without applying any parameter update",
    ],
    0,
    "Both feature vectors contain the first component, so changing w1 changes both dot products. The second component affects only A."
  ),
  direct(
    "rle_12_10",
    "medium",
    "Feature construction",
    "Which statement matches the lecture's treatment of basis functions for approximation?",
    [
      "Only polynomial features are compatible with gradient methods because other bases lack derivatives",
      "Possible choices include polynomial, Fourier, coarse-coded, and learned nonlinear features",
      "Basis functions must partition the state space into non-overlapping groups to preserve convergence",
      "Once a basis is selected, its outputs must equal the true state values before weights can be learned",
    ],
    1,
    "The lecture presents several possible representations, including polynomial and Fourier features, coarse coding, linear functions, and neural networks."
  ),
  direct(
    "rle_12_11",
    "medium",
    "Neural approximation",
    "How are artificial neural networks characterized in the approximation section?",
    [
      "As exact lookup tables whose entries are tied only when two states have identical encodings",
      "As linear models that avoid feature interactions and therefore cannot overfit sampled returns",
      "As nonlinear approximators with efficient derivatives but a risk of overfitting",
      "As transition models that require known dynamics before they can approximate a state value",
    ],
    2,
    "The lecture describes neural networks as nonlinear function approximators with derivatives that are efficient to compute, while explicitly noting overfitting as a problem."
  ),
  direct(
    "rle_12_12",
    "hard",
    "Approximate control",
    "The agent approximates q_pi(s,a) and improves the same behavior policy from its sampled next actions. Which control method does the lecture identify?",
    [
      "Gradient Monte Carlo control, because every action value is updated from completed sampled trajectories after termination",
      "Q-learning with approximation, because policy improvement always uses a greedy target action",
      "Actor-critic, because any parameterized action-value function is defined as an actor",
      "SARSA with function approximation, because the on-policy TD target uses the sampled next action",
    ],
    3,
    "The lecture extends generalized policy iteration to approximate state-action values and identifies the on-policy TD control method as SARSA."
  ),
  direct(
    "rle_12_13",
    "easy",
    "Policy-based RL",
    "What does a policy-gradient method learn directly that an action-value method normally derives afterward?",
    [
      "A parameterized mapping from states to action probabilities",
      "A tabular transition distribution for each state-action pair",
      "A reward model that predicts the feedback for every possible successor",
      "A complete search tree rooted at the state currently observed by the agent",
    ],
    0,
    "Policy-based RL directly parameterizes pi(a|s,theta). In an action-value method, action selection is derived from learned q-values, for example using epsilon-greedy choice."
  ),
  direct(
    "rle_12_14",
    "medium",
    "Stochastic policies",
    "Which capability is listed as an advantage of directly parameterizing pi(a|s,theta)?",
    [
      "It forces every learned policy to remain uniformly random until the value function converges",
      "It can represent chosen action probabilities rather than obtaining them indirectly from values",
      "It guarantees that gradient ascent finds the globally best deterministic policy from any start",
      "It removes the need to define a performance objective because probabilities provide one automatically",
    ],
    1,
    "A parameterized policy can express deliberate stochastic action probabilities and can also approach a deterministic greedy policy."
  ),
  direct(
    "rle_12_15",
    "medium",
    "Softmax preferences",
    "What is the effect of increasing one action preference h(s,a,theta) while holding the other preferences fixed in a softmax policy?",
    [
      "It increases every action probability by the same amount because softmax preserves all pairwise preference differences",
      "It makes the selected action deterministic immediately, regardless of how small the increase is",
      "It raises that action's probability while normalization adjusts the probabilities of the alternatives",
      "It changes only the state-value baseline and leaves the policy distribution exactly unchanged",
    ],
    2,
    "Softmax maps relative preferences to a normalized distribution. Raising one preference increases its relative probability while the distribution still sums to one."
  ),
  direct(
    "rle_12_16",
    "hard",
    "Policy objective",
    "The episodic objective has gradient (2,-1) at theta, with step size 0.1. Which gradient-ascent update is correct?",
    [
      "theta becomes theta + (-0.2,0.1), following the negative performance gradient",
      "theta becomes theta + (0.2,0.1), making both parameter changes positive",
      "theta becomes theta + (2,-1), because ascent does not scale the gradient",
      "theta becomes theta + (0.2,-0.1), following the performance gradient",
    ],
    3,
    "Gradient ascent adds the step size times the performance gradient: 0.1 x (2,-1) = (0.2,-0.1)."
  ),
  direct(
    "rle_12_17",
    "easy",
    "REINFORCE",
    "What kind of policy update does REINFORCE make after an action is followed by a high sampled return?",
    [
      "It increases that action's probability in proportion to the return and the policy's score direction",
      "It replaces the sampled action's probability with the numeric return and renormalizes the entire policy only after the episode",
      "It decreases all action preferences equally so the high-return action remains relatively unchanged",
      "It updates a transition model first and changes the policy only after simulated confirmation",
    ],
    0,
    "REINFORCE is a Monte Carlo policy-gradient method. Its update favors sampled actions associated with high returns through the gradient of the log policy."
  ),
  direct(
    "rle_12_18",
    "hard",
    "REINFORCE baseline",
    "An action produces return G_t=8 while the learned state-value baseline is 10. How should the baseline-adjusted REINFORCE signal treat that action?",
    [
      "Favor it because every positive return must increase the probability of its sampled action",
      "Disfavor it because its return is two below the state-dependent baseline",
      "Ignore it because baselines make all updates with nonzero state value mathematically invalid",
      "Favor it by eight because the baseline affects only critic learning and not the policy update",
    ],
    1,
    "The actor is weighted by G_t-v_hat(S_t,w). Here the advantage-like signal is -2, so the sampled action is made less likely despite its positive raw return."
  ),
  direct(
    "rle_12_19",
    "hard",
    "Joint learning",
    "REINFORCE observes G_t=7 and its learned baseline predicts 5. Which joint update correctly assigns roles to theta and w?",
    [
      "Theta fits the return by squared error, while w follows the sampled action's log-policy gradient",
      "Theta and w both use the raw return 7, so the baseline has no effect on either update",
      "Theta's policy update is weighted by 2, while w updates the value baseline toward 7",
      "Theta remains fixed because the return is positive, while w moves toward the action probability",
    ],
    2,
    "The policy parameters theta use the advantage-like signal G_t-v_hat=2. The value parameters w learn to predict the sampled return."
  ),
  direct(
    "rle_12_20",
    "hard",
    "Actor-critic",
    "An actor-critic observes reward 1, v(S)=3, v(S')=5, and gamma=0.9. Which signal should weight the actor's online policy update?",
    [
      "1.5, from reward plus discounted successor value minus the successor value",
      "3, because the current state value is the actor's direct learning signal",
      "6, because reward and undiscounted successor value are added before the update",
      "2.5, from the one-step TD error 1 + 0.9(5) - 3",
    ],
    3,
    "The critic's TD error is 1 + 0.9 x 5 - 3 = 2.5. Actor-critic uses that online signal to assess and reinforce the sampled action."
  ),
];
