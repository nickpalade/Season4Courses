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

export const QUIZZES = [
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
    title: "Cognitive Science — Past Exam",
    subtitle: "Behaviourism, Marr, symbol systems, attention, Bayesian cognition, consciousness (Q1–44).",
    group: "Cognitive Science",
    questions: cogsci,
  },
];

export function getQuiz(id) {
  return QUIZZES.find((q) => q.id === id) || null;
}
