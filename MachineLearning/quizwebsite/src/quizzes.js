import past from "../data/questions.json";
import l01 from "../data/lectures/01_ml_fundamentals.json";
import l02 from "../data/lectures/02_binary_classification.json";
import l03 from "../data/lectures/03_multiclass_regression_clustering.json";
import l04 from "../data/lectures/04_decision_trees.json";
import l05 from "../data/lectures/05_linear_models_svm.json";
import l07a from "../data/lectures/07a_features_pca.json";
import l07b from "../data/lectures/07b_distance_models_knn.json";
import l08 from "../data/lectures/08_probabilistic_models.json";
import l09 from "../data/lectures/09_ensembles.json";
import l10 from "../data/lectures/10_neural_networks.json";
import l11 from "../data/lectures/11_xai_lime.json";
import cogsci from "../data/lectures/cogsci_intro.json";
import cogsci2 from "../data/lectures/cogsci_test2.json";
import rlPast from "../data/lectures/rl_past.json";
import rlExpanded from "../data/lectures/rl_expanded_practice.js";
import rl01 from "../data/lectures/rl_01_foundations.json";
import rl02 from "../data/lectures/rl_02_bandits.json";
import rl03 from "../data/lectures/rl_03_mdp.json";
import rl04 from "../data/lectures/rl_04_value_functions.json";
import rl05 from "../data/lectures/rl_05_dynamic_programming.json";
import rl06 from "../data/lectures/rl_06_monte_carlo.json";
import rl07 from "../data/lectures/rl_07_td_learning.json";
import rl08 from "../data/lectures/rl_08_offpolicy.json";
import rl09 from "../data/lectures/rl_09_psych_neuro.json";
import rl10 from "../data/lectures/rl_10_model_based.json";
import rl11 from "../data/lectures/rl_11_search_planning.json";
import rl12 from "../data/lectures/rl_12_policy_approx.json";
import neuralExam2024 from "../data/lectures/neural_computing_exam_2024.json";
import neuralRetake2024 from "../data/lectures/neural_computing_retake_2024.json";
import neuralExam2025 from "../data/lectures/neural_computing_exam_2025.json";
import neuralRetake2025 from "../data/lectures/neural_computing_retake_2025.json";
import neuralExam from "../data/lectures/neural_computing_exam_2026.json";

export const QUIZZES = [
  {
    id: "neural_exam_2025",
    title: "Neural Computing — Exam 2025 MCQs",
    subtitle: "Ten multiple-choice questions with verified answers from Exam2025_solutions_Brightspace.",
    group: "Neural Computing",
    questions: neuralExam2025,
  },
  {
    id: "neural_retake_2025",
    title: "Neural Computing — Retake 2025 MCQs",
    subtitle: "Ten multiple-choice questions with verified answers from Retake2025_Neural_Computing_solutions.",
    group: "Neural Computing",
    questions: neuralRetake2025,
  },
  {
    id: "neural_exam_2024",
    title: "Neural Computing — Exam 2024 MCQs",
    subtitle: "Ten multiple-choice questions with verified answers from Exam2024_solutions.",
    group: "Neural Computing",
    questions: neuralExam2024,
  },
  {
    id: "neural_retake_2024",
    title: "Neural Computing — Retake 2024 MCQs",
    subtitle: "Ten multiple-choice questions with verified answers from Retake2024_solutions.",
    group: "Neural Computing",
    questions: neuralRetake2024,
  },
  {
    id: "neural_exam_2026",
    title: "Neural Computing — Exam 2026 MCQs",
    subtitle: "Ten multiple-choice questions from 2634fd.pdf. No answer key has been inferred.",
    group: "Neural Computing",
    questions: neuralExam,
  },
  {
    id: "past",
    title: "Past Paper",
    subtitle: "Example exam covering every topic.",
    group: "Exam",
    questions: past,
  },
  {
    id: "l01",
    title: "Lecture 1 — ML Fundamentals",
    subtitle: "Supervised vs unsupervised, predictive vs descriptive, feature importance.",
    group: "Lectures",
    questions: l01,
  },
  {
    id: "l02",
    title: "Lecture 2 — Binary Classification",
    subtitle: "Confusion matrices, ROC curves, ranking, probability estimation.",
    group: "Lectures",
    questions: l02,
  },
  {
    id: "l03",
    title: "Lecture 3 — Multi-class, Regression, Clustering",
    subtitle: "OvO and OvR, regression, unsupervised methods.",
    group: "Lectures",
    questions: l03,
  },
  {
    id: "l04",
    title: "Lecture 4 — Decision Trees",
    subtitle: "Tree growing, impurity, pruning, class imbalance.",
    group: "Lectures",
    questions: l04,
  },
  {
    id: "l05",
    title: "Lecture 5 — Linear Models & SVM",
    subtitle: "Perceptron, least squares, soft margin, kernels.",
    group: "Lectures",
    questions: l05,
  },
  {
    id: "l07a",
    title: "Lecture 7a — Features & PCA",
    subtitle: "Feature types, normalization, PCA, curse of dimensionality.",
    group: "Lectures",
    questions: l07a,
  },
  {
    id: "l07b",
    title: "Lecture 7b — Distance Models & KNN",
    subtitle: "k-NN, K-means, K-medoids, hierarchical clustering.",
    group: "Lectures",
    questions: l07b,
  },
  {
    id: "l08",
    title: "Lecture 8 — Probabilistic Models",
    subtitle: "Naive Bayes, logistic regression, MAP vs MLE, GMM.",
    group: "Lectures",
    questions: l08,
  },
  {
    id: "l09",
    title: "Lecture 9 — Ensembles",
    subtitle: "Bagging, Random Forest, boosting, Friedman test.",
    group: "Lectures",
    questions: l09,
  },
  {
    id: "l10",
    title: "Lecture 10 — Neural Networks",
    subtitle: "Perceptron, backprop, activations, history.",
    group: "Lectures",
    questions: l10,
  },
  {
    id: "l11",
    title: "Lecture 11 — Explainable AI / LIME",
    subtitle: "Local vs global, LIME, fairness, model-agnostic vs specific.",
    group: "Lectures",
    questions: l11,
  },
  {
    id: "cogsci",
    title: "Cognitive Science — Test 1",
    subtitle: "Behaviourism, Marr, symbol systems, attention, Bayesian cognition, consciousness (Q1–50).",
    group: "Cognitive Science",
    questions: cogsci,
  },
  {
    id: "cogsci2",
    title: "Cognitive Science — Test 2",
    subtitle: "Conditioning, latent learning, Marr, connectionism, Bayesian cognition, dynamical systems (Q1–40).",
    group: "Cognitive Science",
    questions: cogsci2,
  },
  {
    id: "rl_past",
    title: "RL — Practice Exam",
    subtitle: "Full 35-question practice exam spanning every RL topic (incl. two calculations).",
    group: "Reinforcement Learning",
    questions: rlPast,
  },
  {
    id: "rl01",
    title: "RL 1 — Foundations",
    subtitle: "What RL is, ML families, benefits vs the deadly triad, AlphaGo.",
    group: "Reinforcement Learning",
    questions: rl01,
  },
  {
    id: "rl02",
    title: "RL 2 — Multi-armed Bandits",
    subtitle: "Exploration vs exploitation, ε-greedy, UCB, optimistic initialization.",
    group: "Reinforcement Learning",
    questions: rl02,
  },
  {
    id: "rl03",
    title: "RL 3 — Markov Decision Processes",
    subtitle: "States, actions, policy/transition mappings, return, discounting γ.",
    group: "Reinforcement Learning",
    questions: rl03,
  },
  {
    id: "rl04",
    title: "RL 4 — Value Functions & Optimality",
    subtitle: "v(s) vs q(s,a), Bellman equation, optimal value vs policy, curse of dimensionality.",
    group: "Reinforcement Learning",
    questions: rl04,
  },
  {
    id: "rl05",
    title: "RL 5 — Dynamic Programming",
    subtitle: "Policy/value iteration, expected updates, convergence guarantees.",
    group: "Reinforcement Learning",
    questions: rl05,
  },
  {
    id: "rl06",
    title: "RL 6 — Monte Carlo Methods",
    subtitle: "Learning from returns, first-visit MC, no bootstrapping, exploring starts.",
    group: "Reinforcement Learning",
    questions: rl06,
  },
  {
    id: "rl07",
    title: "RL 7 — Temporal-Difference Control",
    subtitle: "SARSA, Q-learning, Expected SARSA, on-policy vs off-policy, TD error.",
    group: "Reinforcement Learning",
    questions: rl07,
  },
  {
    id: "rl08",
    title: "RL 8 — Off-policy & Importance Sampling",
    subtitle: "Target vs behaviour policies, IS ratio, maximization bias, double learning.",
    group: "Reinforcement Learning",
    questions: rl08,
  },
  {
    id: "rl09",
    title: "RL 9 — Psychology & Neuroscience",
    subtitle: "Rescorla-Wagner, prediction error, dopamine, stimulus traces, blocking.",
    group: "Reinforcement Learning",
    questions: rl09,
  },
  {
    id: "rl10",
    title: "RL 10 — Model-based RL",
    subtitle: "Transition models from counts, prioritized sweeping, backup axes, Dyna.",
    group: "Reinforcement Learning",
    questions: rl10,
  },
  {
    id: "rl11",
    title: "RL 11 — Search & Sample-based Planning",
    subtitle: "BFS, sample-based search, MCTS phases, UCT uncertainty.",
    group: "Reinforcement Learning",
    questions: rl11,
  },
  {
    id: "rl12",
    title: "RL 12 — Policy-based Methods & Approximation",
    subtitle: "Policy gradients, actor-critic, SGD, function approximation, AlphaGo.",
    group: "Reinforcement Learning",
    questions: rl12,
  },
  {
    id: "rle01",
    title: "Expanded RL Practice 1 - Foundations",
    subtitle: "20 extra questions on RL feedback, objectives, exploration, credit assignment, and AlphaGo.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl01,
  },
  {
    id: "rle02",
    title: "Expanded RL Practice 2 - Multi-armed Bandits",
    subtitle: "20 extra questions on exploration, UCB, epsilon-greedy, optimism, regret, and stationarity.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl02,
  },
  {
    id: "rle03",
    title: "Expanded RL Practice 3 - Markov Decision Processes",
    subtitle: "20 extra questions on MDP components, Markov state, return, discounting, and policies.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl03,
  },
  {
    id: "rle04",
    title: "Expanded RL Practice 4 - Value Functions & Optimality",
    subtitle: "20 extra questions on v, q, Bellman equations, optimality, backups, and approximation.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl04,
  },
  {
    id: "rle05",
    title: "Expanded RL Practice 5 - Dynamic Programming",
    subtitle: "20 extra questions on policy iteration, value iteration, expected backups, and DP limits.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl05,
  },
  {
    id: "rle06",
    title: "Expanded RL Practice 6 - Monte Carlo Methods",
    subtitle: "20 extra questions on episode returns, first-visit estimates, MC control, and variance.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl06,
  },
  {
    id: "rle07",
    title: "Expanded RL Practice 7 - Temporal-Difference Control",
    subtitle: "20 extra questions on SARSA, Q-learning, Expected SARSA, TD error, and bootstrapping.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl07,
  },
  {
    id: "rle08",
    title: "Expanded RL Practice 8 - Off-policy & Importance Sampling",
    subtitle: "20 extra questions on target/behavior policies, importance sampling, and double learning.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl08,
  },
  {
    id: "rle09",
    title: "Expanded RL Practice 9 - Psychology & Neuroscience",
    subtitle: "20 extra questions on prediction error, conditioning, dopamine, blocking, and stimulus traces.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl09,
  },
  {
    id: "rle10",
    title: "Expanded RL Practice 10 - Model-based RL",
    subtitle: "20 extra questions on learned models, Dyna, prioritized sweeping, planning, and model error.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl10,
  },
  {
    id: "rle11",
    title: "Expanded RL Practice 11 - Search & Sample-based Planning",
    subtitle: "20 extra questions on BFS, rollouts, MCTS phases, UCT, and search backups.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl11,
  },
  {
    id: "rle12",
    title: "Expanded RL Practice 12 - Policy Methods & Approximation",
    subtitle: "20 extra questions on policy gradients, actor-critic, SGD, function approximation, and AlphaGo.",
    group: "RL Expanded Practice",
    questions: rlExpanded.rl12,
  },
];

export function getQuiz(id) {
  return QUIZZES.find((q) => q.id === id) || null;
}
