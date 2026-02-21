import { lazy } from "react";

const LabAreaDiagram = lazy(() => import("./LabAreaDiagram"));
const LabTreeBuilder = lazy(() => import("./LabTreeBuilder"));
const LabConfusionMatrix = lazy(() => import("./LabConfusionMatrix"));
const LabOddsBayesFactor = lazy(() => import("./LabOddsBayesFactor"));
const LabBetaBinomial = lazy(() => import("./LabBetaBinomial"));
const LabGaussianUpdater = lazy(() => import("./LabGaussianUpdater"));
const LabNaiveBayesText = lazy(() => import("./LabNaiveBayesText"));
const LabBayesNet = lazy(() => import("./LabBayesNet"));

export const labs = [
  {
    id: "lab1",
    title: "Area Diagram",
    description: "Unit square area decomposition with P(A), P(B|A), P(B|A^c).",
    component: LabAreaDiagram
  },
  {
    id: "lab2",
    title: "Tree Diagram Builder",
    description: "Two-stage tree for multiple hypotheses and evidence.",
    component: LabTreeBuilder
  },
  {
    id: "lab3",
    title: "Confusion Matrix Playground",
    description: "Prevalence, sensitivity, specificity and posteriors for test outcomes.",
    component: LabConfusionMatrix
  },
  {
    id: "lab4",
    title: "Odds and Bayes Factor",
    description: "Odds-form updates and log-odds interpretation.",
    component: LabOddsBayesFactor
  },
  {
    id: "lab5",
    title: "Beta-Binomial Updater",
    description: "Conjugate update with posterior density and seeded simulation.",
    component: LabBetaBinomial
  },
  {
    id: "lab6",
    title: "Gaussian-Gaussian Updater",
    description: "Continuous Bayes update with shrinkage visualization.",
    component: LabGaussianUpdater
  },
  {
    id: "lab7",
    title: "Naive Bayes Text",
    description: "Toy classifier with log-space computation.",
    component: LabNaiveBayesText
  },
  {
    id: "lab8",
    title: "Bayes Net Playground",
    description: "Exact inference by enumeration on a small network.",
    component: LabBayesNet
  }
];

export function getLabById(id) {
  return labs.find((lab) => lab.id === id);
}
