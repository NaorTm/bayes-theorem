export const glossaryTerms = [
  {
    term: "Prior",
    definition:
      "Belief about a hypothesis before seeing current evidence.",
    example: "Disease prevalence before a test result."
  },
  {
    term: "Likelihood",
    definition:
      "Probability (or density) of observed evidence under a hypothesis.",
    example: "P(+|Disease)."
  },
  {
    term: "Evidence",
    definition:
      "Normalizing constant for observed data, computed across all hypotheses.",
    example: "P(+)=P(+|D)P(D)+P(+|D^c)P(D^c)."
  },
  {
    term: "Posterior",
    definition:
      "Updated belief after incorporating evidence.",
    example: "P(Disease|+)."
  },
  {
    term: "Sensitivity",
    definition: "True positive rate: P(test+|condition present).",
    example: "0.95 means 95% of diseased cases test positive."
  },
  {
    term: "Specificity",
    definition: "True negative rate: P(test-|condition absent).",
    example: "0.92 means 92% of healthy cases test negative."
  },
  {
    term: "False positive rate",
    definition: "Probability test is positive when condition is absent.",
    example: "FPR = 1 - specificity."
  },
  {
    term: "False negative rate",
    definition: "Probability test is negative when condition is present.",
    example: "FNR = 1 - sensitivity."
  },
  {
    term: "Odds",
    definition: "Ratio p/(1-p), another way to encode probability.",
    example: "Probability 0.2 corresponds to odds 0.25."
  },
  {
    term: "Likelihood ratio",
    definition:
      "Ratio of evidence likelihood under two hypotheses.",
    example: "P(D|H1)/P(D|H0)."
  },
  {
    term: "Bayes factor",
    definition:
      "Likelihood ratio used to update prior odds into posterior odds.",
    example: "Posterior odds = Bayes factor × prior odds."
  },
  {
    term: "Conditional independence",
    definition:
      "Two variables are independent once a third variable is fixed.",
    example: "Features in Naive Bayes are assumed independent given class."
  },
  {
    term: "Conjugate prior",
    definition:
      "Prior that yields posterior in the same distribution family.",
    example: "Beta prior with Binomial likelihood gives Beta posterior."
  },
  {
    term: "Sigma-algebra view (advanced)",
    definition:
      "Conditioning is projection onto information represented by a sigma-algebra.",
    example: "E[X|G] is the best G-measurable mean-square predictor of X."
  }
];
