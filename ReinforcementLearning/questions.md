# Reinforcement Learning Practice Exam Questions

## Question 1
What is not a benefit of reinforcement learning? 
- Stable learning
- Outperform human solutions
- Solve tasks you can't demonstrate
- Autonomous learning

## Question 2
What is an important difference between UCB and ε-greedy policies?
- UCB incorporates uncertainty information and may therefore more gradually transition from exploitation to exploration.
- ε-greedy incorporates uncertainty information and may therefore more gradually transition from exploitation to exploration.
- ε-greedy incorporates uncertainty information and may therefore more gradually transition from exploration to exploitation.
- UCB incorporates uncertainty information and may therefore more gradually transition from exploration to exploitation.

## Question 3
You have a bandit problem and decide to always act greedily with respect to the current action value estimates. To ensure good performance, what is the best way to initialize your value estimates?
- It does not matter how you set the initial estimates.
- You want your initial estimates much higher (at least 20 times) than the highest possible reward.
- You want your initial estimates slightly above the highest possible reward.
- You want your initial estimates below the lowest possible reward.

## Question 4
What is the objective of reinforcement learning?
- The objective of reinforcement learning is to find the highest possible reward in the environment
- The objective of reinforcement learning is to find the best decision in every possible state
- The objective of reinforcement learning is to find the ideal recursive value function
- The objective of reinforcement learning is to find the shortest path from the start state to the end state

## Question 5
What are the correct mappings in the definition of a Markov Decision Process? 
- The policy function computes a -> s' and the Transition function s -> a'
- The policy function computes s -> a and the Transition function s,a -> s'
- The policy function computes a -> s' and the value function r -> s
- The policy function computes s -> a and the value function s -> r

## Question 6
What is true about the discount parameter γ?
- It should be between 0 and 1. Making it smaller will make the agent weigh future rewards less.
- It should be between 0 and 1. Making it larger will make the agent weigh future rewards less.
- It should be between -1 and 1. Making it smaller will make the agent weigh future rewards less.
- It should be between -1 and 1. Making it larger will make the agent weigh future rewards less.

## Question 7
Which expression is correct?
- There is only one optimal policy, but there may be multiple optimal value functions.
- There is only one optimal value function and only one optimal policy.
- There are multiple optimal value functions and multiple optimal policies.
- There is only one optimal value function, but there may be multiple optimal policies.

## Question 8
What is correct about tabular Dynamic Programming?
- Dynamic Programming finds a global solution, but is not guaranteed to converge to the optimal solution.
- Dynamic Programming finds a global solution, and is guaranteed to converge to the optimal solution.
- Dynamic Programming finds a local solution, but is not guaranteed to converge to the optimal solution.
- Dynamic Programming finds a local solution, and is guaranteed to converge to the optimal solution.

## Question 9
The Bellman equation
- Is a recursive formula describing how values at different states are related
- Is a recursive formula describing how rewards at different states are related
- Is an iterative formula describing how rewards at different states are related
- Is an iterative formula describing how values at different states are related

## Question 10
The curse of dimensionality describes
- The fact that the dimensionality of the state vector scales exponentially in the number of unique states.
- The fact that the number of unique states scales polynomial in the number of variables in a state.
- The fact that the number of unique states scales exponentially in the number of variables in a state.
- The fact that the dimensionality of the state vector scales polynomial in the number of unique states.

## Question 11
What is the main advantage of Monte Carlo methods compared with Dynamic Programming methods?
- Monte Carlo methods can be used to learn action value
- Monte Carlo methods perform bootstrapping
- Monte Carlo methods can learn without complete knowledge about environment
- Monte Carlo methods can be used in continuous settings

## Question 12
When learning state values using a first-visit Monte Carlo method, what is used to update the current estimate of the value of a state?
- An estimated value of the next visited state
- The cumulative future discounted reward
- The immediate reward
- The estimated value of the action taken in that state

## Question 13
How are first-visit Monte Carlo methods adapted from state values to action values?
- Only average over the best action in each state
- Convert state values to action values after each episode
- Average over state-action pairs instead of states
- Try every action in each state

## Question 14
What is the correct update equation for SARSA?
- Q(st,at)←Q(st,at)+α[Rt+1+γ∑aπ(a|st+1)Q(st+1,a)−Q(st,at)]
- Q(st,at)←Q(st,at)+α[Rt+1+γQ(st+1,at+1)−Q(st,at)]
- Q(st,at)←Q(st,at)+α[Gt−Q(st,at)]
- Q(st,at)←Q(st,at)+α[Rt+1+γmaxaQ(st+1,a)−Q(st,at)]

## Question 15
What is the best description of exploring starts?
- Ensure exploration by using optimistic initialization of action values
- Let each episode start at random state-action pair
- Explore multiple actions for each state in each episode
- Ensure exploration by using an ε-greedy policy at the beginning of each episode

## Question 16
What problem is solved by using importance sampling in off-policy methods?
- The behaviour policy can become identical to the target policy during learning.
- The probability of an action occurring can be different in the behaviour policy and target policy.
- The learned target policy can become too greedy
- Many state-action pairs remain unvisited during learning.

## Question 17
What problem does double learning solve?
- Approximation errors
- Coverage
- Slow convergence
- Maximization bias

## Question 18
What is the analogy of stimulus traces (from psychological learning theory) in computational reinforcement learning? 
- State generalisation
- Partial observability
- N-step methods
- Off-policy learning

## Question 19
How does the Rescorla-Wagner model of conditioning explain the phenomenon of extinction (for a state with current value estimate V and obtained reward r)? 
- r < 0, V=0 and therefore (r-V)<0
- r > 0, V=0 and therefore (r-V)>0
- r = 0, V>0 and therefore (r-V)<0
- r = 0, V<0 and therefore (r-V)>0

## Question 20
In a conditioning task with an animal, we add a new predictor (such as a light signal) before an expected reward (such as food). We simultaneously measure the response of dopaminergic neurons. What will we observe? 
- A response peak shortly before the reward
- A response peak shortly before the predictor
- A response peak shortly after the predictor
- A response peak shortly after the reward

## Question 21
Give the correct expression to compute the priority in prioritized sweeping for Q-learning.
- |r+γmaxa'Q(s',a')|
- r+γmaxa'Q(s',a')−Q(s,a)
- |r+γmaxa'Q(s',a')−Q(s,a)|
- r+γmaxa'Q(s',a')

## Question 22
Which expression is correct?
- Dynamic programming uses expected updates, Q-learning uses sample updates. Q-learning requires a distributional model.
- Dynamic programming uses sample updates, Q-learning uses expected updates. Q-learning requires a distributional model.
- Dynamic programming uses expected updates, Q-learning uses sample updates. Dynamic programming requires a distributional model.
- Dynamic programming uses sample updates, Q-learning uses expected updates. Dynamic programming requires a distributional model.

## Question 23
Model-based Reinforcement Learning uses a model of
- The Value function
- The State function
- The Discount Function
- The Transition Function

## Question 24
What is the correct expression to estimate a tabular dynamics model p(s'|s,a) based on the counts n of observed states or transitions?
- p(s'|s,a)=n(s,a,s')/n(s,a)
- p(s'|s,a)=n(a,s')/n(s,a)
- p(s'|s,a)=n(s',a)/n(s')
- p(s'|s,a)=n(s,a)/n(s,a,s')

## Question 25
Regarding the back-up over respectively the policy and the dynamics, how would you classify the value iteration back-up?
- On-policy, expected over the dynamics. 
- On-policy, sample over the dynamics. 
- Off-policy, sample over the dynamics. 
- Off-policy, expected over the dynamics. 

## Question 26
What is a downside of breath-first search?
- It will never find the optimal solution
- It cannot be applied to stochastic domains
- It does not consider the cost of every edge
- It only considers the problem breath - not the depth

## Question 27
What is a benefit of sample-based search over classic/heuristic search? 
- In problems with many actions we don't need to visit all of them at the root state
- In the limit of infinite compute we get guaranteed convergence to the optimal solution
- In stochastic problems we don't require access to an analytic transition model
- In larger problems we don't suffer from the curse of dimensionality

## Question 28
What is the correct order of the four phases of Monte Carlo Tree Search (MCTS)? 
- Selection, Expansion, Back-up, Simulation
- Selection, Expansion, Simulation, Back-up
- Selection, Simulation, Expansion, Back-up
- Selection, Simulation, Back-up, Expansion

## Question 29
In a UCT tree search, how does the uncertainty estimate of a state-action value scale with respect to the number of visits to that state-action n(s,a)? 
- ∼n(s,a)
- ∼1/√n(s,a)
- ∼1/n(s,a)
- ∼√n(s,a)

## Question 30
Regarding the two statements given below, which is correct?
- (S1) Policy gradient methods directly learn a parameterized policy, while action-value methods learn action values from with a policy is derived.
- (S2) Policy gradient methods enable the selection of actions with arbitrary probabilities.

Options:
- Only S2 is correct
- Both S1 and S2 are incorrect
- Both S1 and S2 are correct
- Only S1 is correct

## Question 31
What is the most correct name for a reinforcement learning method that learns both a policy function and a value function?
- The REINFORCE method.
- A double learning method.
- An actor-critic method.
- A model-based method.

## Question 32
How can stochastic gradient descent be best described?
- A second-order minimization algorithm.
- Try a step in a random direction, but return to the original position if the error increased.
- Iteratively eliminate the error for each encountered example.
- Make small steps in the direction of negative gradient.

## Question 33
AlphaGo is one of the main successful applications of reinforcement learning. What kind of neural networks did it include? 
- A value network
- Neither a policy network nor a value network
- A policy network and a value network
- A policy network

## Question 34
An agent makes the transition shown in the below graph, which shows the reward of the transition (r=10) and the current q-value estimates at the taken state action (q(s,a)=6) and the current estimates for different available next actions. The agent implements Q-learning with a learning rate of 0.2 and discount parameter of 0.75.

What will be the new estimate q(s,a) for the state-action in the top of the graph after a single Q-learning update?
- *Answer* (numerical calculation required)

## Question 35
The below figure shows a subpart of a larger Markov Decision Process. White circles are states, dark circles are actions. All transition probabilities, rewards and ground-truth optimal state-action value estimates for the actions at the bottom are shown in the figure. We do not discount returns. What is q*(s,a) for the action node shown at the top of the figure, i.e., its optimal state-action value.
- *Answer* (numerical calculation required)
