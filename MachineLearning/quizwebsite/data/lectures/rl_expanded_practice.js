const q = (id, difficulty, topic, title, options, correct, explanation, type = "mcq") => ({
  id,
  type,
  difficulty,
  topic,
  title: `[${difficulty[0].toUpperCase()}${difficulty.slice(1)}] ${title}`,
  prompt: "",
  options,
  correct,
  explanation,
});

const hash = (value) =>
  [...value].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 9973, 17);

const lengthen = (option, target, salt) => {
  const suffixes = [
    " while keeping the same decision setting",
    " under the same policy objective",
    " without changing the return definition",
    " in the same sequential problem",
  ];
  let result = option;
  let i = salt % suffixes.length;
  while (result.length + 10 < target && suffixes.some((suffix) => !result.endsWith(suffix))) {
    const suffix = suffixes[i % suffixes.length];
    if (!result.endsWith(suffix)) result += suffix;
    i += 1;
  }
  return result;
};

const rotateSingle = (id, options) => {
  const target = Math.max(...options.map((option) => option.length));
  const balanced = options.map((option, index) =>
    index === 0 ? option : lengthen(option, target, hash(`${id}:${index}`))
  );
  const shift = hash(id) % balanced.length;
  const ordered = [...balanced.slice(shift), ...balanced.slice(0, shift)];
  const correctIndex = ordered.indexOf(balanced[0]);
  return [ordered, [correctIndex]];
};

const one = (id, d, topic, title, correct, a, b, c, explanation) => {
  const [options, correctIndex] = rotateSingle(id, [correct, a, b, c]);
  return q(id, d, topic, title, options, correctIndex, explanation);
};

const many = (id, d, topic, title, options, correct, explanation) =>
  q(id, d, topic, title, options, correct, explanation, "multi");

const direct = (id, d, topic, title, options, correct, explanation) =>
  q(id, d, topic, title, options, [correct], explanation);

const data = {
  rl01: [
    one("rle_01_01","easy","RL signal","What makes reward feedback different from a supervised label?","Reward evaluates the taken behaviour without naming the correct action","Reward is a one-hot target for every possible action","Reward is available before the agent acts","Reward removes the need for exploration","A reward says how good the outcome was, not which action should have been selected."),
    one("rle_01_02","easy","Agent-environment loop","Which sequence best describes one RL interaction step?","Observe state, choose action, receive reward and next state","Choose label, receive feature vector, update target","Receive next action, choose reward, observe policy","Sample a full dataset, then act once","The core loop is state -> action -> reward/next state."),
    one("rle_01_03","easy","Long-term objective","Why can an RL agent rationally reject an immediate reward?","A later sequence of rewards may give larger expected return","Immediate rewards are never included in return","The agent is required to prefer delayed rewards","Rejecting reward guarantees exploration","RL optimizes cumulative discounted return, not greedy one-step reward."),
    one("rle_01_04","easy","Policy","What is a policy?","A rule or distribution mapping states to actions","The reward function of the environment","The transition probability of the MDP","The set of all possible returns","A policy is the agent's behavior rule."),
    one("rle_01_05","easy","Experience","What does it mean that RL learns from experience?","The agent updates from interaction outcomes it generated or observed","The trainer supplies the optimal action for every state","The model receives a static labelled table only","The environment reveals its full transition matrix after each step","Experience is made of trajectories, rewards, states, and actions."),
    one("rle_01_06","medium","Credit assignment","Why is credit assignment hard in sparse-reward tasks?","A late reward may depend on many earlier choices","Every action receives an immediate target label","Sparse rewards make state transitions deterministic","The best action is directly encoded in the reward sign","Delayed sparse rewards make it unclear which earlier actions caused success."),
    one("rle_01_07","medium","Exploration","Why is exploration not just random noise?","It gathers information that can improve future decisions","It replaces the value function with a reward table","It guarantees the current episode has maximum return","It is only used after learning has converged","Exploration has an information value, not merely randomness."),
    one("rle_01_08","medium","Delayed reward","Which problem is most RL-specific?","Learning which early action helped a reward received much later","Fitting a regression line to independent examples","Grouping unlabelled points by Euclidean distance","Counting class frequencies in a fixed dataset","Temporal dependence and delayed feedback are central to RL."),
    one("rle_01_09","medium","Deadly triad","Which combination is most associated with possible divergence?","Bootstrapping, function approximation, and off-policy learning","Monte Carlo returns, tabular values, and on-policy learning","Discounting, finite episodes, and exact dynamic programming","Exploration, exploitation, and optimistic initialization","The named deadly triad is bootstrapping + function approximation + off-policy learning."),
    one("rle_01_10","medium","AlphaGo","What does AlphaGo's famous surprising move mainly illustrate?","RL/search systems can discover strategies outside human priors","RL always trains without supervised components","Tree search is unnecessary once a value function exists","Human demonstrations are mathematically invalid","The example is used to show discovery beyond familiar human play."),
    many("rle_01_11","medium","RL characteristics","Which statements correctly describe RL?",["Actions can affect the future data the agent sees","The objective is expected return","Exploration can be necessary even when exploitation looks good","The environment always gives the optimal action label"],[0,1,2],"RL is sequential and evaluative; labels for optimal actions are not supplied."),
    one("rle_01_12","hard","Distribution shift","Why can an RL policy change its own training distribution?","Its actions determine which states are visited next","The test set is fixed before training","Rewards are independent of actions","The policy only observes iid examples","In RL, behavior affects future state visitation."),
    one("rle_01_13","hard","Autonomy tradeoff","What is the main cost of learning without demonstrations?","The agent may need unsafe or inefficient exploration to discover good behavior","The reward function becomes unnecessary","The optimal policy is available from labels","The transition model becomes deterministic","Learning by trial and error can be sample-inefficient and risky."),
    one("rle_01_14","hard","Reward design","Why can a badly designed reward cause bad behavior?","The agent optimizes the specified signal, not the designer's unstated intention","Rewards are ignored by optimal policies","Discount factors correct every reward-design error","Bad rewards only slow convergence but cannot change behavior","RL faithfully optimizes reward, so misspecification matters."),
    one("rle_01_15","hard","Planning vs learning","What distinguishes learning from a reward signal from pure planning?","Learning can improve without an initially known transition model","Planning never uses value functions","Learning forbids policies","Planning requires stochastic rewards","Learning may infer values or models from experience."),
    one("rle_01_16","easy","State","What is a state supposed to summarize?","Information relevant for choosing actions and predicting future consequences","Only the reward received on the previous step","The complete source code of the agent","The final return of the episode","A useful state representation captures decision-relevant information."),
    one("rle_01_17","medium","Return","What does expected return average over?","Stochasticity in actions, transitions, and rewards under a policy","Only the first reward in an episode","Only states with positive reward","Only deterministic trajectories","Expected return accounts for randomness in the policy/environment."),
    one("rle_01_18","hard","Supervised pretraining","How can supervised learning still appear inside an RL system?","It can initialize a policy before RL improves it with reward feedback","It makes the task no longer sequential","It replaces reward with clustering labels permanently","It guarantees the learned policy is optimal","Systems can combine imitation/pretraining with RL fine-tuning."),
    many("rle_01_19","hard","Common misconceptions","Which are false claims about RL?",["RL always improves monotonically during training","RL always receives the correct action as feedback","RL never needs exploration","RL optimizes long-term return"],[0,1,2],"The last statement is true; the first three are common misconceptions."),
    one("rle_01_20","medium","Evaluation","Why evaluate a learned policy over multiple episodes?","Returns are random, so one rollout may be misleading","The policy changes after every evaluation episode by definition","Discounting is disabled during evaluation","Multiple episodes reveal the transition matrix exactly","Policy performance is an expectation and needs repeated sampling.")
  ],
  rl02: [
    one("rle_02_01","easy","Bandit setup","What is absent from a standard multi-armed bandit compared with a full MDP?","State transitions to future decision states","Reward feedback after actions","A choice among actions","Uncertainty about action quality","Bandits isolate action selection without sequential state dynamics."),
    one("rle_02_02","easy","Exploitation","Which action is exploitative?","Choosing the arm with the highest current value estimate","Choosing a rarely tried arm because uncertainty is high","Choosing uniformly at random","Choosing an arm only to estimate its reward variance","Exploitation uses current estimates for immediate payoff."),
    one("rle_02_03","easy","Exploration","Which action is exploratory?","Trying an arm with uncertain value to improve estimates","Always choosing the current empirical best arm","Stopping learning after the first reward","Ignoring all reward observations","Exploration gathers information."),
    one("rle_02_04","easy","Sample average","What does an action-value estimate represent in a stationary bandit?","An estimate of that arm's expected reward","The probability the arm will be selected by the environment","The number of states reachable after pulling the arm","The discount factor for that arm","Bandit values estimate expected reward for each action."),
    one("rle_02_05","medium","Epsilon-greedy","What does epsilon control in epsilon-greedy action selection?","The probability of taking a random exploratory action","The learning rate of the transition model","The maximum reward allowed","The number of arms in the bandit","Epsilon is the exploration probability."),
    one("rle_02_06","medium","Fixed epsilon","Why can fixed epsilon be wasteful late in training?","It keeps selecting random arms even after value estimates are confident","It prevents any exploratory action after the first step","It requires knowing the transition matrix","It makes all arms have identical estimates","Fixed epsilon does not naturally shrink with uncertainty."),
    one("rle_02_07","medium","UCB","What is the core idea of UCB?","Add an uncertainty bonus that is large for under-sampled arms","Always sample arms uniformly forever","Initialize all estimates below the minimum reward","Use the Bellman optimality equation over states","UCB balances estimated value with uncertainty."),
    one("rle_02_08","medium","Optimistic initialization","Why does optimistic initialization encourage exploration under greedy choice?","Untried arms look attractive until sampled and corrected downward","It adds random noise to every action forever","It changes the true reward distribution","It prevents value estimates from being updated","Optimism makes unexplored actions temporarily overvalued."),
    one("rle_02_09","medium","Nonstationary bandits","Why use a constant step size in a nonstationary bandit?","Recent rewards should matter more than old rewards","It computes the exact sample average over all time","It removes the need for exploration","It guarantees every reward is positive","Constant step sizes track changing action values."),
    one("rle_02_10","medium","Regret","What does regret measure in a bandit?","Loss relative to repeatedly choosing the best arm in hindsight or expectation","The variance of the chosen arm only","The probability that rewards are delayed","The number of states in the environment","Regret quantifies opportunity cost of suboptimal pulls."),
    many("rle_02_11","medium","Exploration methods","Which methods can produce exploration?",["Epsilon-greedy random actions","UCB uncertainty bonuses","Optimistic initial estimates","Pure greedy with pessimistic initial values"],[0,1,2],"The first three promote trying uncertain actions; pessimistic greedy often under-explores."),
    one("rle_02_12","hard","UCB bonus","Why does the UCB bonus shrink for a frequently selected arm?","Its visit count appears in the denominator of the uncertainty term","Its true reward becomes smaller","The arm is removed from the action set","The exploration constant becomes zero automatically","More samples reduce uncertainty."),
    one("rle_02_13","hard","Exploration decay","Why might decaying epsilon be preferable to fixed epsilon?","It explores early and wastes fewer pulls once estimates are reliable","It guarantees identifying the best arm after one pull","It makes rewards deterministic","It removes all dependence on initial estimates","Decay matches exploration to learning progress, though it needs care."),
    one("rle_02_14","hard","Optimism limits","When can optimistic initialization be less useful?","In continuing nonstationary tasks where initial optimism is quickly forgotten","When every arm has the same known value exactly","When rewards are observed after each pull","When greedy action selection is used","Initial optimism mainly drives early exploration."),
    one("rle_02_15","hard","Action selection","Which method explores based on uncertainty rather than fixed random chance?","Upper Confidence Bound","Fixed epsilon-greedy","Pure greedy with zero optimism","Always choosing the last arm","UCB targets under-sampled actions through confidence bonuses."),
    one("rle_02_16","easy","Stationarity","What does stationary mean for bandit rewards?","Each arm's reward distribution does not change over time","The agent never changes its action selection","The best arm changes every step","Rewards are always deterministic","Stationarity is about the environment's reward distributions."),
    one("rle_02_17","medium","Initial values","Why do initial action values matter less with sample-average updates over long stationary runs?","Many observations eventually dominate the initial guess","Initial values are never used","Rewards overwrite the estimate exactly after one sample","Exploration becomes illegal","Sample averages dilute initial estimates as counts grow."),
    one("rle_02_18","hard","Ties","Why can tie-breaking matter in greedy bandits?","If several arms share the same estimate, deterministic tie-breaking may delay trying some arms","Ties make reward feedback impossible","Tie-breaking changes the true arm means","Ties eliminate exploitation","Tie-breaking affects early exploration when estimates are equal."),
    many("rle_02_19","hard","Bandit pitfalls","Which choices can cause poor bandit learning?",["Never exploring after an unlucky first sample","Using fixed high epsilon forever in a stable task","Using stale sample averages in a changing task","Updating estimates from observed rewards"],[0,1,2],"The first three are pitfalls; updating from rewards is necessary."),
    one("rle_02_20","medium","Best arm uncertainty","Why should a learner sometimes sample an arm that is not currently best?","Its estimate may be low only because it has little data","Suboptimal arms become optimal when ignored","Sampling it changes rewards of other arms","Bandits require round-robin selection forever","Uncertainty means the current estimate may be wrong.")
  ],
  rl03: [
    one("rle_03_01","easy","MDP components","Which tuple best matches an MDP?","States, actions, transition probabilities, rewards, and discount factor","Features, labels, loss, optimizer, and batch size","Clusters, centroids, linkage, and inertia","Policy, replay buffer, neural net, and GPU","An MDP is commonly defined by S, A, P, R, gamma."),
    one("rle_03_02","easy","Markov property","What does the Markov property require?","The current state contains all history needed for predicting the next state distribution","The agent remembers every previous observation exactly","Rewards must be deterministic","The policy must be time-dependent","Markov means the present state is sufficient for future dynamics."),
    one("rle_03_03","easy","Transition","What does P(s'|s,a) describe?","The probability of next state s' after action a in state s","The probability the policy chooses s'","The value of action a in state s","The discount applied to the current reward","Transitions are environment dynamics."),
    one("rle_03_04","easy","Discount","What happens as gamma approaches zero?","The agent emphasizes immediate rewards more strongly","Future rewards become more important than immediate rewards","The state space becomes smaller","The transition function disappears","Small gamma shortens the effective planning horizon."),
    one("rle_03_05","medium","Return","Which expression is closest to discounted return?","R_{t+1}+gamma R_{t+2}+gamma^2 R_{t+3}+...","R_t minus R_{t-1}","The largest reward in the episode only","The number of actions taken before termination","Return is cumulative future discounted reward."),
    one("rle_03_06","medium","Policy stochasticity","What does a stochastic policy output?","A probability distribution over actions for a state","A deterministic next state for every action","A reward distribution independent of state","A fixed discount factor per episode","Stochastic policies choose actions probabilistically."),
    one("rle_03_07","medium","Agent/environment","Which part is normally controlled by the agent?","The policy used to choose actions","The transition probabilities","The reward function after deployment","The set of possible next states returned by nature","The agent controls action choice, not environment dynamics."),
    one("rle_03_08","medium","Episodic task","What defines an episodic task?","Interaction breaks into episodes with terminal states","There is exactly one state forever","The discount factor must be zero","Rewards are unavailable until training ends","Episodic tasks have starts and ends."),
    one("rle_03_09","medium","Continuing task","Why is discounting often important in continuing tasks?","It can keep infinite reward sums finite","It forces episodes to terminate","It makes all policies deterministic","It removes stochastic transitions","Discounting helps define finite values over infinite horizons."),
    one("rle_03_10","medium","Reward vs value","How is immediate reward different from value?","Reward is one-step feedback; value is expected cumulative future return","Reward is learned by the agent; value is fixed by the environment","Reward only exists in supervised learning","Value ignores future consequences","Value summarizes long-term consequences."),
    many("rle_03_11","medium","MDP facts","Which statements are correct?",["A policy maps states to action choices","The environment supplies rewards and next states","Gamma controls future reward weighting","The MDP definition includes epsilon-greedy exploration"],[0,1,2],"Epsilon-greedy is an algorithmic choice, not part of the MDP."),
    one("rle_03_12","hard","State representation","Why can a poor state representation violate the Markov assumption?","It may omit information from history needed to predict future dynamics","It may include too many actions","It makes rewards positive","It forces deterministic policies","If relevant hidden history is missing, the process is partially observable."),
    one("rle_03_13","hard","Gamma effect","Why can changing gamma change the optimal policy?","It changes the tradeoff between immediate and delayed rewards","It only multiplies all returns by the same constant","It changes the number of available actions","It makes transition probabilities uniform","Different horizons can favor different actions."),
    one("rle_03_14","hard","Terminal states","What is usually true of a terminal state in episodic return calculations?","No further rewards are generated after termination","Its value must be infinite","It must transition to every other state equally","It is selected by the policy as an action","Terminal states end the episode."),
    one("rle_03_15","hard","Reward shaping","What is a risk of changing the reward function?","It can change the optimal behavior if shaping is not designed carefully","It only changes learning speed, never behavior","It removes the Markov property automatically","It guarantees better exploration","Reward changes alter the objective."),
    one("rle_03_16","easy","Action space","What is an action space?","The set of actions available to the agent","The set of hidden variables in the environment","The set of all observed rewards","The set of terminal states only","The action space defines possible choices."),
    one("rle_03_17","medium","Expected objective","Why is the RL objective usually an expectation?","Transitions, rewards, and policies can be stochastic","Rewards are always deterministic","Only one trajectory is possible","Expectations remove the need for policies","Return is random under stochastic dynamics."),
    one("rle_03_18","hard","Time limits","Why can an artificial time limit complicate MDP modeling?","Timeout termination may not represent the natural environment state","It always improves value estimates","It removes delayed rewards","It makes gamma irrelevant","Timeouts can create truncation that differs from true terminal failure/success."),
    many("rle_03_19","hard","Markov modeling","Which choices help restore Markovian state?",["Including velocity when position alone is insufficient","Adding previous action when dynamics depend on actuator lag","Using belief state in partial observability","Dropping all observations except immediate reward"],[0,1,2],"State must include information needed for future prediction."),
    one("rle_03_20","medium","Policy evaluation target","Given a fixed policy, what are we usually estimating?","Expected return from states or state-action pairs under that policy","The single best action independent of state","The environment's source code","The number of arms in a bandit","Policy evaluation estimates v_pi or q_pi.")
  ],
  rl04: [
    one("rle_04_01","easy","State value","What does v_pi(s) mean?","Expected return starting in s and following policy pi","Immediate reward for entering s","Probability pi chooses the greedy action","Number of visits to s","State value is long-term expected return under a policy."),
    one("rle_04_02","easy","Action value","What does q_pi(s,a) add beyond v_pi(s)?","It fixes the first action a before following pi","It removes future rewards","It ignores transition probabilities","It stores only the immediate reward","q values condition on a first action."),
    one("rle_04_03","easy","Bellman idea","What is the core Bellman idea?","Value equals expected reward now plus discounted value later","Value equals only the final reward","Value is unrelated across neighboring states","Value is the number of legal actions","Bellman equations recursively relate values across transitions."),
    one("rle_04_04","easy","Optimal value","What does v*(s) represent?","The best achievable expected return from state s","The return under the first policy tried","The immediate reward at state s","The probability that s is terminal","v* is the optimal value function."),
    one("rle_04_05","medium","Greedy policy","How can a policy be improved using q values?","Choose actions with maximal q_pi(s,a) in each state","Choose actions with minimal visit count only","Ignore q and maximize immediate reward only","Randomize uniformly forever","Greedy improvement selects high action values."),
    one("rle_04_06","medium","Expectation vs optimality","How does Bellman optimality differ from Bellman expectation?","It uses a max over actions instead of averaging under pi","It drops rewards from the equation","It requires gamma to be zero","It ignores transition probabilities","Optimality assumes best action choice."),
    one("rle_04_07","medium","Ties","Why can multiple optimal policies share one v*?","Different actions can tie for optimal value","Each policy has a different MDP","v* is random noise","Optimal policies cannot be deterministic","Tied optimal actions can produce the same optimal value."),
    one("rle_04_08","medium","Curse of dimensionality","Why do tabular value functions fail in huge state spaces?","The number of entries can grow exponentially with state variables","Bellman equations stop being true","Rewards become unavailable","Policies cannot be stochastic","Large state spaces make tables infeasible."),
    one("rle_04_09","medium","Backup","What is a backup in value-function learning?","An update that moves a value estimate toward a target built from reward and successor value","A copy of the source code","A random exploratory action","A reset of the environment","Backups propagate value information."),
    one("rle_04_10","medium","Policy evaluation","What does iterative policy evaluation repeatedly apply?","The Bellman expectation backup for a fixed policy","The max backup while changing policy every step","Monte Carlo tree expansion only","A supervised cross-entropy loss","Policy evaluation holds pi fixed and estimates its values."),
    many("rle_04_11","medium","Value facts","Which statements are correct?",["v_pi averages over actions chosen by pi","q_pi conditions on a first action","v* is unique for a fixed MDP","Every optimal policy must choose the same action in every state"],[0,1,2],"Optimal policies can differ when actions tie."),
    one("rle_04_12","hard","Value vs model","Why is knowing v* not the same as knowing the transition model?","v* tells expected returns, not full next-state probabilities","v* contains every transition probability explicitly","The model is only the discount factor","Transition models cannot be stochastic","Values compress consequences; models describe dynamics."),
    one("rle_04_13","hard","Bootstrapping","What makes a Bellman-style update bootstrapped?","It uses another learned estimate such as v(s') in its target","It waits until an episode finishes to use the full return","It samples each action equally","It requires no reward signal","Bootstrapping updates from estimates."),
    one("rle_04_14","hard","Approximation need","What motivates function approximation for values?","Generalizing values across unseen or many similar states","Making the Bellman equation unnecessary","Avoiding rewards entirely","Forcing all policies to be deterministic","Approximation combats state explosion."),
    one("rle_04_15","hard","Local error propagation","Why can a wrong successor value affect predecessor states?","Bellman backups use successor estimates in predecessor targets","States are evaluated independently forever","Rewards erase all future terms","Only terminal states can have values","Value errors can propagate through backups."),
    one("rle_04_16","easy","Immediate reward","Which term in Bellman backup captures one-step payoff?","r or R_{t+1}","gamma v(s') only","The policy entropy","The learning rate","Immediate reward is the first component of return."),
    one("rle_04_17","medium","Discounted successor","Why multiply successor value by gamma?","To reduce the weight of delayed future return","To normalize action probabilities","To make rewards nonnegative","To count state visits","Gamma discounts future value."),
    one("rle_04_18","hard","State aggregation","What is a risk of aggregating states for value approximation?","States needing different actions may be forced to share one value","The state space always becomes larger","It prevents any generalization","It reveals the exact transition matrix","Aggregation trades detail for generalization."),
    many("rle_04_19","hard","Optimality equation","Which belong in the Bellman optimality backup?",["Immediate reward","Discounted successor optimal value","Max over available actions","Averaging over a fixed non-greedy policy only"],[0,1,2],"Optimality backs up the best action, not a fixed policy average."),
    one("rle_04_20","medium","Value scale","What happens to value magnitudes when rewards are scaled by 10?","Values generally scale by 10 if gamma and dynamics stay the same","Policies must become random","Transition probabilities change","The state space shrinks","Value functions reflect reward scale.")
  ],
  rl05: [
    one("rle_05_01","easy","DP requirement","What must dynamic programming know?","The environment's transition and reward model","Only sampled complete episodes","Only a policy network","Only the replay buffer","DP uses expected model-based backups."),
    one("rle_05_02","easy","Policy iteration","What alternates in policy iteration?","Policy evaluation and policy improvement","Exploration and replay sampling","Gradient descent and backpropagation","Clustering and classification","Policy iteration evaluates then greedifies."),
    one("rle_05_03","easy","Value iteration","What backup is central to value iteration?","Bellman optimality backup with a max over actions","Full Monte Carlo return average","Random action selection only","Supervised label prediction","Value iteration folds improvement into value updates."),
    one("rle_05_04","easy","Expected update","Why is a DP update called expected?","It sums over possible next states using transition probabilities","It uses exactly one sampled transition","It ignores stochastic outcomes","It guesses the next state uniformly without a model","Expected backups use the full distribution."),
    one("rle_05_05","medium","Convergence","What is a key tabular DP guarantee?","Convergence to a global optimum under standard finite discounted assumptions","Only local convergence to the nearest policy","No convergence even with exact model","Convergence only with neural networks","Finite tabular discounted DP has strong guarantees."),
    one("rle_05_06","medium","Policy stability","When does policy iteration stop?","When greedy improvement no longer changes the policy","After exactly one sweep in every MDP","When every reward is zero","When exploration reaches epsilon zero","A stable greedy policy is optimal in policy iteration."),
    one("rle_05_07","medium","Synchronous sweep","What is a sweep in DP?","Updating values for all states or state-action choices once","Sampling one transition from replay","Running one full physical episode only","Choosing one random action","DP often updates across the whole state set."),
    one("rle_05_08","medium","Model-based planning","Why is DP model-based?","It computes updates from known P and R rather than only sampled experience","It learns a neural transition model from pixels","It refuses to use value functions","It requires no environment knowledge","Classical DP assumes the model is given."),
    one("rle_05_09","medium","Policy improvement","Why does greedy improvement not make the policy worse in exact DP?","The policy improvement theorem applies when values are evaluated accurately","Greedy actions are always exploratory","Gamma is set to zero","Rewards are deterministic by assumption","Exact values justify greedy improvement."),
    one("rle_05_10","medium","Computational cost","Why can DP be impractical?","It needs sweeps and sums over large state/action/next-state spaces","It cannot solve stochastic MDPs","It never converges in tabular form","It requires no memory","The model and full backups are expensive."),
    many("rle_05_11","medium","DP properties","Which properties describe tabular DP?",["Requires a complete model","Uses expected backups","Can solve for optimal values in finite discounted MDPs","Learns purely from single sampled transitions"],[0,1,2],"Single sampled transition learning is TD-like, not DP."),
    one("rle_05_12","hard","Value iteration classification","Why is value iteration often called off-policy in backup taxonomy?","It backs up the greedy action rather than evaluating the current behavior policy","It uses complete episodes only","It samples actions from epsilon-greedy","It has no policy implicit in it","The max backup targets greedy optimal behavior."),
    one("rle_05_13","hard","Truncated evaluation","Why can modified policy iteration be faster?","It avoids full policy evaluation before each improvement","It removes the need for a model","It uses no Bellman backups","It guarantees one-step convergence","Partial evaluation can save computation."),
    one("rle_05_14","hard","Asynchronous DP","What is asynchronous DP allowed to do?","Update states in selected orders rather than full synchronized sweeps","Ignore some states forever while claiming exact convergence","Use rewards without transition probabilities","Convert the MDP to a bandit","Asynchronous methods can update subsets if coverage conditions hold."),
    one("rle_05_15","hard","Expected vs sample","What is the tradeoff between expected and sample backups?","Expected backups use more model computation; sample backups use less per update but add sampling noise","Expected backups are always model-free","Sample backups require enumerating all next states","They are identical when transitions are stochastic","Expected backups reduce variance but cost more."),
    one("rle_05_16","easy","Reward model","What does R(s,a) or R(s,a,s') specify?","Expected immediate reward for a transition or state-action","The full return from the start state","The policy's action probability","The number of episodes sampled","Reward models define one-step payoff."),
    one("rle_05_17","medium","Extracting policy","After value iteration converges, how is a policy obtained?","Choose actions greedy with respect to the converged value function","Use the first random policy unchanged","Choose the least visited action","Ignore transition probabilities","Optimal values imply greedy optimal actions."),
    one("rle_05_18","hard","DP limitation","Why does exact DP not directly solve continuous state spaces?","It cannot enumerate infinitely many states without approximation/discretization","Bellman equations do not apply in continuous domains","Rewards cannot be continuous","Policies cannot be stochastic","Exact tabular DP needs finite enumeration."),
    many("rle_05_19","hard","Policy iteration facts","Which are correct?",["Evaluation estimates v for the current policy","Improvement makes the policy greedy with respect to those values","The process stops when policy is stable","Evaluation requires sampled episodes and no model"],[0,1,2],"Classical DP evaluation uses the model, not sampled episodes."),
    one("rle_05_20","medium","Planning meaning","In this context, what is planning?","Using a model to compute or improve a policy without direct new trial-and-error in the real environment","Choosing actions uniformly at random","Updating only from real reward samples","Deleting the value function","Planning reasons with a model.")
  ],
};

data.rl06 = [
  direct("rle_06_01", "easy", "Discounted return", "An episode pays rewards 2, 4, and 8 after a visit. With gamma = 0.5, what return is assigned to that visit?", [
    "4, because later rewards are averaged",
    "14, because discounting starts after termination",
    "6, from 2 + 0.5(4) + 0.25(8)",
    "3.5, from discounting every reward once",
  ], 2, "The return from the visit is 2 + 0.5 x 4 + 0.5^2 x 8 = 6."),
  direct("rle_06_02", "easy", "First-visit MC", "A state S occurs twice in one episode, at t=1 and t=4. Which sample does first-visit MC use for S?", [
    "Only the return calculated from t=1",
    "Only the reward received exactly at t=1",
    "The average of the t=1 and t=4 rewards",
    "Only the return calculated from t=4",
  ], 0, "First-visit MC uses the return following the first occurrence of S in that episode."),
  direct("rle_06_03", "easy", "Every-visit MC", "The same state appears three times in an episode. How many return samples can every-visit MC add for that state?", [
    "One, because an episode supplies one state sample",
    "Two, because the final occurrence is terminal",
    "Four, including the return before the episode starts",
    "Three, one return following each occurrence",
  ], 3, "Every-visit MC treats the return after each of the three occurrences as a sample."),
  direct("rle_06_04", "easy", "Episode updates", "At time t the final reward has not yet occurred. What prevents a standard Monte Carlo update at that moment?", [
    "The behavior policy has not been made greedy yet",
    "The complete return from time t is still unknown",
    "The transition probabilities have not been enumerated",
    "The next-state value has not converged yet",
  ], 1, "Standard MC needs the complete sampled return, which is only known after the remaining rewards arrive."),
  direct("rle_06_05", "easy", "Model-free learning", "A simulator can generate full episodes but will not reveal transition probabilities. Which evaluation method still applies directly?", [
    "Policy evaluation by exact Bellman sweeps",
    "Value iteration over a fully known transition matrix",
    "Monte Carlo evaluation from sampled returns",
    "Backward induction over a known game tree",
  ], 2, "MC evaluation needs sampled episodes and rewards, not an explicit transition model."),
  direct("rle_06_06", "easy", "Action values", "Why does MC control estimate q(s,a) rather than only v(s) when no environment model is available?", [
    "q(s,a) makes a sampled return deterministic once its first action is fixed",
    "q(s,a) removes the need to visit each action",
    "q(s,a) can be computed before any episode ends",
    "q(s,a) compares actions without one-step lookahead through a model",
  ], 3, "Without a model, state values alone do not reveal the consequences of each action; action values do."),
  direct("rle_06_07", "medium", "Incremental mean", "After five visits, an estimate is 8. The sixth observed return is 2. Using the sample-average update, what is the new estimate?", [
    "7, because 8 + (1/6)(2 - 8) = 7",
    "5, because the old estimate and new return are averaged",
    "6, because the return is divided by the visit count",
    "7.2, because the step size remains one fifth",
  ], 0, "With six total samples, the step size is 1/6, so the update is 8 - 1 = 7."),
  direct("rle_06_08", "medium", "Exploring starts", "A card-game simulator can reset to any legal hand and force the opening action. Which MC assumption can this implement?", [
    "A one-step bootstrap from every successor hand",
    "Exploring starts over state-action pairs",
    "A deterministic policy after the first episode",
    "An exact expectation over all card draws",
  ], 1, "Resetting to arbitrary state-action pairs implements exploring starts and gives each pair a chance to be sampled."),
  direct("rle_06_09", "medium", "Coverage", "An MC agent always chooses action Left in state S. What is the immediate learning problem?", [
    "Returns from Left become bootstrapped estimates",
    "The value of S cannot be estimated at all",
    "Right becomes optimal merely because it is untried",
    "There are no return samples for q(S, Right)",
  ], 3, "MC cannot compare an action for which the behavior policy supplies no returns."),
  direct("rle_06_10", "medium", "Epsilon-soft policy", "There are four actions and an epsilon-greedy policy uses epsilon = 0.2. What probability does each non-greedy action receive?", [
    "0.20, because epsilon is assigned to every action",
    "0.80, because greedy probability is shared equally",
    "0.05, from the random 0.2 split across four actions",
    "0.25, because epsilon-greedy is uniform over actions",
  ], 2, "The random component chooses uniformly among four actions, giving each action 0.2/4 = 0.05 from that component."),
  direct("rle_06_11", "medium", "Policy improvement", "After estimating q(S,a), action B has the largest value. What is the policy-improvement step in MC with exploring starts?", [
    "Make B greedy in S for the next policy",
    "Delete samples collected under the previous policy",
    "Replace q(S,B) with the immediate reward",
    "Average B with the least-visited action",
  ], 0, "MC ES alternates return-based action-value estimation with greedy improvement."),
  direct("rle_06_12", "medium", "On-policy control", "In on-policy epsilon-soft MC control, which policy generates episodes and is also improved?", [
    "A separate uniformly random behavior policy",
    "An unknown optimal policy used only for scoring",
    "A greedy target policy that never explores",
    "The same epsilon-soft policy being evaluated",
  ], 3, "On-policy control learns about the policy that generates its experience while gradually improving that policy."),
  direct("rle_06_13", "medium", "Variance", "Two episodes pass through S but then follow very different random paths. What feature of MC is exposed by their very different targets?", [
    "High variance from using whole sampled returns",
    "Bias caused by bootstrapping from a learned successor-state estimate",
    "Dependence on a known transition matrix",
    "Failure to include rewards after leaving S",
  ], 0, "Whole returns include all downstream randomness, so MC targets can vary substantially."),
  direct("rle_06_14", "medium", "Discounting", "Keeping an episode fixed, gamma is reduced from 1 to 0.4. Which change should you expect in an early-state MC return?", [
    "Terminal rewards receive more weight than before",
    "The return becomes a one-step bootstrap target",
    "Distant rewards contribute less to the return",
    "The visit changes from first-visit to every-visit",
  ], 2, "A smaller discount factor reduces the contribution of rewards far after the state visit."),
  direct("rle_06_15", "hard", "First vs every visit", "In a continuing loop converted into short episodes, one state repeats frequently near each cutoff. Which choice most changes how that episode is weighted?", [
    "Replacing q values with a complete transition and reward model",
    "Choosing first-visit rather than every-visit MC",
    "Making the reward function deterministic",
    "Computing returns backward instead of forward",
  ], 1, "Every-visit contributes several correlated samples from that episode; first-visit contributes only one for the state."),
  direct("rle_06_16", "hard", "Truncation", "A rollout is stopped after 100 steps even though the task has not terminated. Treating the cutoff as terminal causes what problem for plain MC?", [
    "It silently adds an exploring start at step 100",
    "It turns all earlier updates into expected backups",
    "It gives later actions a probability of exactly zero",
    "It omits rewards that could occur beyond the cutoff",
  ], 3, "A truncated rollout does not contain the natural complete return, so future reward beyond the cutoff is lost unless handled separately."),
  direct("rle_06_17", "hard", "Nonstationarity", "Why can averaging every historical return equally be slow after the environment changes?", [
    "MC then starts using learned successor-state estimates as update labels",
    "Old returns retain substantial influence on the estimate",
    "Recent episodes are counted more than once",
    "The discount factor increases after each visit",
  ], 1, "The ordinary sample average forgets old experience slowly; a constant step size can track changes more responsively."),
  direct("rle_06_18", "hard", "Episode-level credit", "Only the final move earns reward, but an earlier state-action pair consistently appears in successful episodes. How does MC assign it credit?", [
    "By backing up the estimated value of the next state",
    "By assigning it only the immediate reward observed on its own time step",
    "By using the final reward as part of its later return",
    "By querying the model for its causal contribution",
  ], 2, "The return following the earlier pair includes the delayed final reward, allowing episode-level credit assignment."),
  direct("rle_06_19", "hard", "Sample versus expectation", "DP and MC evaluate the same fixed policy. For one state, what distinguishes their backup targets?", [
    "DP uses a model-based expectation; MC uses a sampled return",
    "DP uses only terminal rewards; MC uses only immediate rewards",
    "DP is model-free; MC enumerates successor probabilities",
    "DP requires exploration; MC requires none for evaluation",
  ], 0, "DP computes an expectation from the model, whereas MC observes complete returns from sampled trajectories."),
  direct("rle_06_20", "hard", "Control convergence", "Why must exploration persist while an on-policy MC controller becomes increasingly greedy?", [
    "To keep the behavior policy identical to the final greedy target policy",
    "To keep relevant state-action pairs sampled during improvement",
    "To replace sampled returns with Bellman targets",
    "To force all action values to become equal",
  ], 1, "Greediness drives improvement, but continued coverage is needed so competing actions remain estimable."),
];

const moreTopics = {
  rl06: ["Monte Carlo Methods","returns from complete episodes","first-visit versus every-visit estimates","no bootstrapping","episode termination","exploring starts","on-policy MC control","epsilon-soft policies","high variance returns","sample averages","model-free evaluation","delayed updates","ordinary returns","policy improvement","coverage of state-action pairs","prediction versus control","stochastic episodes","full-return targets","GLIE intuition","MC limitations","episode-level credit assignment"],
  rl07: ["Temporal-Difference Control","TD target","bootstrapping","SARSA update","Q-learning update","Expected SARSA","on-policy learning","off-policy learning","TD error","one-step updates","bias-variance tradeoff","epsilon-greedy behavior","learning during episodes","max backup","policy being evaluated","control from q-values","sample efficiency","terminal transition handling","step-size effects","TD versus MC","online value propagation"],
  rl08: ["Off-policy and Importance Sampling","target policy","behavior policy","importance sampling ratio","ordinary IS","weighted IS","coverage requirement","variance explosion","off-policy evaluation","maximization bias","double learning","Double Q-learning","correlated estimates","greedy target","sampling mismatch","rare trajectories","per-decision IS","bias-variance tradeoff","safe reuse of data","off-policy control","support mismatch"],
  rl09: ["Psychology and Neuroscience","Rescorla-Wagner rule","prediction error","blocking","dopamine response","conditioning","stimulus trace","temporal credit","extinction","Pavlovian learning","instrumental learning","reward prediction","surprise signal","cue competition","habit versus goal-directed","biological plausibility","eligibility traces intuition","delayed reinforcement","neural value coding","behavioral experiments","overexpectation effects"],
  rl10: ["Model-based RL","learned transition model","planning from counts","Dyna architecture","real experience plus simulated updates","prioritized sweeping","backup priority","model error","sample efficiency","model-free comparison","expected versus sample planning","state predecessors","transition counts","reward model","planning depth","hallucinated experience","bias from bad models","integrated learning and planning","environment model","when model-based helps","uncertainty in learned models"],
  rl11: ["Search and Sample-based Planning","breadth-first search","sample-based search","rollouts","Monte Carlo Tree Search","selection phase","expansion phase","simulation phase","backup phase","UCT rule","exploration bonus in trees","planning horizon","leaf evaluation","anytime planning","branching factor","tree policy","default policy","value backup in search","deterministic search limits","AlphaGo-style search","simulation budget"],
  rl12: ["Policy-based Methods and Approximation","policy gradient","parameterized policy","REINFORCE","actor-critic","critic value estimate","advantage signal","SGD","function approximation","continuous actions","stochastic policies","baseline variance reduction","local optima","value network","policy network","AlphaGo integration","gradient direction","state features","generalization across states","deadly triad risk","policy entropy"]
};

for (const [key, [label, ...concepts]] of Object.entries(moreTopics)) {
  if (data[key]) continue;
  data[key] = concepts.map((concept, i) => {
    const n = String(i + 1).padStart(2, "0");
    const difficulty = i < 6 ? "easy" : i < 14 ? "medium" : "hard";
    const question = `Which statement best captures ${concept} in ${label}?`;
    const correct = {
      easy: `It is a ${label} concept tied to returns, policies, sampled experience, or how behavior is evaluated.`,
      medium: `It changes how estimates, policies, or backups are computed from experience, not just how the topic is named.`,
      hard: `Its effect depends on assumptions such as sampling coverage, bootstrapping, approximation, or model accuracy.`
    }[difficulty];
    return one(
      `rle_${key.slice(2)}_${n}`,
      difficulty,
      label,
      question,
      correct,
      `It is mainly a notation choice in ${label}; changing it would not alter targets, backups, or action choice.`,
      `It is only used to describe the dataset before learning starts, so it has no role during interaction.`,
      `It replaces the return objective with a one-step classification label, making future rewards irrelevant.`,
      `${concept} matters because ${label} is about estimating or improving behavior from sequential reward-driven interaction.`
    );
  });
}

export default data;
