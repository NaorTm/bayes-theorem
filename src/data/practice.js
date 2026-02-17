const levelConfigs = [
  {
    level: 1,
    title: "Direct Bayes, two hypotheses",
    count: 12,
    templates: [
      "medical screening",
      "quality check",
      "spam flag",
      "weather alert",
      "sensor alarm",
      "fault detection"
    ]
  },
  {
    level: 2,
    title: "Multi-hypothesis and total probability",
    count: 14,
    templates: [
      "three suppliers",
      "three disease subtypes",
      "three machine states",
      "three credit segments",
      "three network causes"
    ]
  },
  {
    level: 3,
    title: "Base-rate heavy and confusion matrix",
    count: 14,
    templates: [
      "rare disease testing",
      "airport screening",
      "fraud screening",
      "factory defect scan",
      "cyber alert triage"
    ]
  },
  {
    level: 4,
    title: "Continuous Bayes and densities",
    count: 12,
    templates: [
      "Gaussian prior-likelihood",
      "Beta-Binomial update",
      "posterior predictive",
      "sequential Gaussian update"
    ]
  },
  {
    level: 5,
    title: "Bayesian updating sequences",
    count: 10,
    templates: [
      "two-stage medical testing",
      "sensor fusion over time",
      "sequential coin flips",
      "progressive fraud evidence"
    ]
  }
];

function createProblem(levelConfig, index) {
  const topic = levelConfig.templates[index % levelConfig.templates.length];
  const id = `L${levelConfig.level}-P${String(index + 1).padStart(2, "0")}`;

  return {
    id,
    level: levelConfig.level,
    title: `${topic} #${index + 1}`,
    prompt: `Solve a Bayes update for ${topic}. State the target posterior and compute it numerically.` ,
    hints: [
      "Hint 1: Define events or hypotheses clearly and identify the posterior you need.",
      "Hint 2: Write Bayes template P(H|E)=P(E|H)P(H)/P(E) with missing terms.",
      "Hint 3: Compute P(E) using total probability over all relevant hypotheses."
    ],
    fullSolution: [
      "Step 1: Declare hypotheses and evidence event E.",
      "Step 2: Compute numerator P(E|H_k)P(H_k).",
      "Step 3: Compute denominator P(E)=sum_i P(E|H_i)P(H_i).",
      "Step 4: Divide numerator by denominator and interpret in context.",
      "Step 5: Sanity-check posterior range and normalization."
    ],
    simulationCheck: {
      optional: true,
      seed: 3000 + levelConfig.level * 100 + index,
      method: "Monte Carlo with seeded RNG"
    }
  };
}

export const practiceLevels = levelConfigs.map((config) => ({
  level: config.level,
  title: config.title,
  problems: Array.from({ length: config.count }, (_, index) =>
    createProblem(config, index)
  )
}));

export const totalPracticeProblemCount = practiceLevels.reduce(
  (acc, level) => acc + level.problems.length,
  0
);
