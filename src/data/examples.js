const richExamples = [
  {
    id: "ex01",
    title: "Medical test, classic base rate",
    difficulty: "Beginner",
    tags: ["medical", "base-rate", "discrete"],
    problemMarkdown:
      "Disease prevalence p=0.01, sensitivity s=0.95, specificity c=0.92. Compute P(D|+).",
    variables: { p: 0.01, s: 0.95, c: 0.92 },
    definitions: ["D: disease", "+: positive test"],
    solutionSteps: [
      {
        title: "Write Bayes formula",
        explanationMarkdown: "Posterior equals numerator over evidence denominator.",
        mathLatex: "P(D\\mid +)=\\frac{P(+\\mid D)P(D)}{P(+)}"
      },
      {
        title: "Compute denominator explicitly",
        explanationMarkdown:
          "Use total probability across diseased and healthy groups.",
        mathLatex:
          "P(+)=P(+\\mid D)P(D)+P(+\\mid D^c)P(D^c)=0.95\\cdot0.01+0.08\\cdot0.99=0.0887"
      },
      {
        title: "Normalize",
        explanationMarkdown: "Divide the true-positive mass by all positives.",
        mathLatex: "P(D\\mid +)=\\frac{0.95\\cdot0.01}{0.0887}=0.1071"
      }
    ],
    visuals: [{ widget: "matrix", params: { population: 10000 } }],
    simulationSpec: {
      seed: 101,
      samplingFunction: "simulateDiagnosticTest",
      trials: 100000
    },
    finalAnswer: {
      numeric: "0.1071",
      symbolic: "\\frac{sp}{sp+(1-c)(1-p)}"
    },
    takeaway:
      "Even high sensitivity can produce many false positives when prevalence is low."
  },
  {
    id: "ex02",
    title: "Two independent tests",
    difficulty: "Intermediate",
    tags: ["medical", "sequential", "updating"],
    problemMarkdown:
      "Using Example 1 parameters, a second independent test is also positive. Update sequentially.",
    variables: { priorAfterFirst: 0.1071, s: 0.95, fpr: 0.08 },
    definitions: ["D: disease", "+_1,+_2: first and second positive tests"],
    solutionSteps: [
      {
        title: "Posterior after first test",
        explanationMarkdown: "Use Example 1 as prior for the second update.",
        mathLatex: "P(D\\mid +_1)=0.1071"
      },
      {
        title: "Apply Bayes again",
        explanationMarkdown: "Second test uses same likelihood and false-positive rate.",
        mathLatex:
          "P(D\\mid +_1,+_2)=\\frac{0.95\\cdot0.1071}{0.95\\cdot0.1071+0.08\\cdot(1-0.1071)}"
      },
      {
        title: "Compute",
        explanationMarkdown: "Sequential update sharply increases posterior.",
        mathLatex: "P(D\\mid +_1,+_2)=0.5876"
      }
    ],
    visuals: [{ widget: "tree", params: { stages: 2 } }],
    simulationSpec: {
      seed: 102,
      samplingFunction: "simulateTwoStageTesting",
      trials: 50000
    },
    finalAnswer: {
      numeric: "0.5876",
      symbolic: "\\frac{s p_1}{s p_1 + f(1-p_1)}"
    },
    takeaway:
      "Posterior from one test becomes the prior for the next piece of evidence."
  },
  {
    id: "ex03",
    title: "Quality control",
    difficulty: "Beginner",
    tags: ["manufacturing", "discrete"],
    problemMarkdown:
      "Defect rate is 0.02. Sensor catches defects with 0.9 sensitivity and has 0.04 false positive rate. Find P(defect|alarm).",
    variables: { defectRate: 0.02, sensitivity: 0.9, fpr: 0.04 },
    definitions: ["D: defective item", "A: alarm"],
    solutionSteps: [
      {
        title: "Bayes setup",
        explanationMarkdown: "Treat alarm as evidence.",
        mathLatex: "P(D\\mid A)=\\frac{P(A\\mid D)P(D)}{P(A)}"
      },
      {
        title: "Denominator via total probability",
        explanationMarkdown: "Both defective and non-defective items can trigger alarms.",
        mathLatex: "P(A)=0.9\\cdot0.02+0.04\\cdot0.98=0.0572"
      },
      {
        title: "Posterior",
        explanationMarkdown: "Normalize true alarms by all alarms.",
        mathLatex: "P(D\\mid A)=0.018/0.0572=0.3147"
      }
    ],
    visuals: [{ widget: "area", params: { prior: 0.02 } }],
    simulationSpec: {
      seed: 103,
      samplingFunction: "simulateQualityControl",
      trials: 100000
    },
    finalAnswer: {
      numeric: "0.3147",
      symbolic: "\\frac{0.9\\cdot0.02}{0.9\\cdot0.02+0.04\\cdot0.98}"
    },
    takeaway:
      "Most alarmed units are still good unless the base defect rate is substantial."
  },
  {
    id: "ex04",
    title: "Courtroom evidence",
    difficulty: "Intermediate",
    tags: ["legal", "base-rate", "odds"],
    problemMarkdown:
      "DNA match likelihood if guilty is 0.999; false match if innocent is 0.0001. Prior guilt before DNA is 1/1000. Compute posterior guilt after match.",
    variables: { prior: 0.001, trueMatch: 0.999, falseMatch: 0.0001 },
    definitions: ["G: guilty", "M: DNA match"],
    solutionSteps: [
      {
        title: "Bayes formula",
        explanationMarkdown: "Compare match likelihood under guilt and innocence.",
        mathLatex: "P(G\\mid M)=\\frac{P(M\\mid G)P(G)}{P(M)}"
      },
      {
        title: "Evidence denominator",
        explanationMarkdown: "Use both guilt and innocence pathways.",
        mathLatex: "P(M)=0.999\\cdot0.001+0.0001\\cdot0.999=0.0010989"
      },
      {
        title: "Posterior",
        explanationMarkdown: "DNA is strong evidence but prior still matters.",
        mathLatex: "P(G\\mid M)=0.999\\cdot0.001/0.0010989=0.9099"
      }
    ],
    visuals: [{ widget: "odds", params: { priorOdds: 1 / 999 } }],
    simulationSpec: {
      seed: 104,
      samplingFunction: "simulateDnaEvidence",
      trials: 100000
    },
    finalAnswer: {
      numeric: "0.9099",
      symbolic: "\\frac{0.999\\cdot0.001}{0.999\\cdot0.001+0.0001\\cdot0.999}"
    },
    takeaway:
      "Likelihood can be huge, yet prior odds still control final certainty."
  },
  {
    id: "ex05",
    title: "Spam filtering, discrete toy",
    difficulty: "Beginner",
    tags: ["classification", "text", "discrete"],
    problemMarkdown:
      "P(Spam)=0.4. Word 'offer' appears with probability 0.2 in spam and 0.03 in ham. Compute P(Spam|offer).",
    variables: { priorSpam: 0.4, likeSpam: 0.2, likeHam: 0.03 },
    definitions: ["S: spam", "O: word offer appears"],
    solutionSteps: [
      {
        title: "Numerator",
        explanationMarkdown: "Likelihood times prior for spam class.",
        mathLatex: "P(O\\mid S)P(S)=0.2\\cdot0.4=0.08"
      },
      {
        title: "Denominator",
        explanationMarkdown: "Include ham pathway to O.",
        mathLatex: "P(O)=0.2\\cdot0.4+0.03\\cdot0.6=0.098"
      },
      {
        title: "Posterior",
        explanationMarkdown: "Normalize spam contribution by total.",
        mathLatex: "P(S\\mid O)=0.08/0.098=0.8163"
      }
    ],
    visuals: [{ widget: "tree", params: { classes: 2 } }],
    simulationSpec: {
      seed: 105,
      samplingFunction: "simulateWordPresence",
      trials: 100000
    },
    finalAnswer: {
      numeric: "0.8163",
      symbolic: "\\frac{0.2\\cdot0.4}{0.2\\cdot0.4+0.03\\cdot0.6}"
    },
    takeaway:
      "A single informative feature can dominate posterior class probability."
  },
  {
    id: "ex06",
    title: "Naive Bayes with log space",
    difficulty: "Intermediate",
    tags: ["classification", "numerical", "log-odds"],
    problemMarkdown:
      "Classify a message with 20 tokens where each token likelihood is around 1e-3. Explain why log-space is necessary and compute relative class score.",
    variables: { logScoreSpam: -43.2, logScoreHam: -46.9 },
    definitions: ["logScore(c)=log P(c)+sum log P(word_i|c)"],
    solutionSteps: [
      {
        title: "Why products fail",
        explanationMarkdown: "Direct product underflows toward machine zero.",
        mathLatex: "\\prod_{i=1}^{20}10^{-3}=10^{-60}"
      },
      {
        title: "Use logs",
        explanationMarkdown: "Convert products to sums for numerical stability.",
        mathLatex: "\\log score(c)=\\log P(c)+\\sum_i\\log P(w_i\\mid c)"
      },
      {
        title: "Compare scores",
        explanationMarkdown: "Higher log score gives larger posterior after normalization.",
        mathLatex: "-43.2>-46.9\\Rightarrow Spam"
      }
    ],
    visuals: [{ widget: "odds", params: { logScale: true } }],
    simulationSpec: {
      seed: 106,
      samplingFunction: "simulateTokenLikelihoods",
      trials: 50000
    },
    finalAnswer: {
      numeric: "Spam wins by Delta log = 3.7",
      symbolic: "argmax_c log score(c)"
    },
    takeaway:
      "Log domain is standard practice, not optional optimization."
  },
  {
    id: "ex07",
    title: "Urn selection",
    difficulty: "Beginner",
    tags: ["urn", "discrete"],
    problemMarkdown:
      "Choose urn U1 with probability 0.6 and U2 with probability 0.4. Red-ball probabilities are 0.7 and 0.2. A red ball is observed. Find P(U1|red).",
    variables: { pU1: 0.6, pRedU1: 0.7, pRedU2: 0.2 },
    definitions: ["U1,U2: urn selected", "R: red draw"],
    solutionSteps: [
      {
        title: "Bayes setup",
        explanationMarkdown: "Urn identity is hypothesis, color is evidence.",
        mathLatex: "P(U_1\\mid R)=\\frac{P(R\\mid U_1)P(U_1)}{P(R)}"
      },
      {
        title: "Compute denominator",
        explanationMarkdown: "Red can come from either urn.",
        mathLatex: "P(R)=0.7\\cdot0.6+0.2\\cdot0.4=0.5"
      },
      {
        title: "Posterior",
        explanationMarkdown: "Normalize U1 red pathway.",
        mathLatex: "P(U_1\\mid R)=0.42/0.5=0.84"
      }
    ],
    visuals: [{ widget: "tree", params: { branches: 2 } }],
    simulationSpec: {
      seed: 107,
      samplingFunction: "simulateUrnDraw",
      trials: 50000
    },
    finalAnswer: {
      numeric: "0.84",
      symbolic: "\\frac{0.7\\cdot0.6}{0.7\\cdot0.6+0.2\\cdot0.4}"
    },
    takeaway: "Evidence can strongly favor one prior hypothesis over another."
  },
  {
    id: "ex08",
    title: "Box with coins",
    difficulty: "Intermediate",
    tags: ["coin", "sequential"],
    problemMarkdown:
      "Box has fair coin (prior 0.7) and biased coin with P(H)=0.8 (prior 0.3). Observe sequence HHT. Find posterior that coin is biased.",
    variables: { pBiased: 0.3, pSeqBiased: 0.8 * 0.8 * 0.2, pSeqFair: 0.5 ** 3 },
    definitions: ["B: biased coin chosen", "S: observed HHT"],
    solutionSteps: [
      {
        title: "Likelihoods",
        explanationMarkdown: "Compute sequence probability under each coin type.",
        mathLatex: "P(S\\mid B)=0.8^2\\cdot0.2=0.128,\\;P(S\\mid F)=0.5^3=0.125"
      },
      {
        title: "Evidence denominator",
        explanationMarkdown: "Weighted mixture over coin type priors.",
        mathLatex: "P(S)=0.128\\cdot0.3+0.125\\cdot0.7=0.1259"
      },
      {
        title: "Posterior",
        explanationMarkdown: "Biased coin gets slightly higher support.",
        mathLatex: "P(B\\mid S)=0.0384/0.1259=0.3050"
      }
    ],
    visuals: [{ widget: "area", params: { prior: 0.3 } }],
    simulationSpec: {
      seed: 108,
      samplingFunction: "simulateCoinBox",
      trials: 100000
    },
    finalAnswer: {
      numeric: "0.3050",
      symbolic: "\\frac{0.128\\cdot0.3}{0.128\\cdot0.3+0.125\\cdot0.7}"
    },
    takeaway: "Posterior shifts only when evidence differentiates likelihoods enough."
  },
  {
    id: "ex09",
    title: "Monty Hall as Bayes",
    difficulty: "Intermediate",
    tags: ["game", "conditional"],
    problemMarkdown:
      "Contestant picks Door 1. Host opens Door 3 showing goat, with host policy of always opening a goat door and choosing randomly when both options available. Compute P(car behind Door 2 | host opens Door 3).",
    variables: { priorDoor2: 1 / 3, posteriorDoor2: 2 / 3 },
    definitions: ["C2: car behind door 2", "H3: host opens door 3"],
    solutionSteps: [
      {
        title: "Hypotheses",
        explanationMarkdown: "Possible car locations are door1, door2, door3 with equal priors.",
        mathLatex: "P(C_i)=1/3"
      },
      {
        title: "Likelihoods of host action",
        explanationMarkdown: "If car is door2, host must open door3 (likelihood 1). If car is door1, likelihood 1/2.",
        mathLatex: "P(H_3\\mid C_2)=1,\\;P(H_3\\mid C_1)=1/2"
      },
      {
        title: "Posterior",
        explanationMarkdown: "Normalize over hypotheses consistent with evidence.",
        mathLatex: "P(C_2\\mid H_3)=\\frac{1\\cdot1/3}{1\\cdot1/3+1/2\\cdot1/3}=2/3"
      }
    ],
    visuals: [{ widget: "tree", params: { hostBehavior: true } }],
    simulationSpec: {
      seed: 109,
      samplingFunction: "simulateMontyHall",
      trials: 200000
    },
    finalAnswer: {
      numeric: "0.6667",
      symbolic: "2/3"
    },
    takeaway: "Host policy defines likelihoods, which drive the update."
  },
  {
    id: "ex10",
    title: "Sensor fusion, discrete states",
    difficulty: "Intermediate",
    tags: ["engineering", "multi-hypothesis"],
    problemMarkdown:
      "Robot state H in {normal, drift, failure} has priors 0.8, 0.15, 0.05. Sensor A reports anomaly with probabilities 0.05, 0.55, 0.9 by state. Sensor B reports anomaly with 0.03,0.5,0.85. Both anomalies observed. Find posterior of failure.",
    variables: { priors: [0.8, 0.15, 0.05] },
    definitions: ["N,D,F: system states", "A+,B+: anomaly flags"],
    solutionSteps: [
      {
        title: "Joint likelihood per hypothesis",
        explanationMarkdown: "Assume conditional independence of sensors given state.",
        mathLatex: "P(A^+,B^+\\mid H_i)=P(A^+\\mid H_i)P(B^+\\mid H_i)"
      },
      {
        title: "Evidence denominator over 3 hypotheses",
        explanationMarkdown: "This is a required multi-hypothesis normalizer.",
        mathLatex: "P(A^+,B^+)=\\sum_{i\\in\\{N,D,F\\}}P(A^+,B^+\\mid H_i)P(H_i)"
      },
      {
        title: "Posterior for failure",
        explanationMarkdown: "Compute weighted failure term over denominator.",
        mathLatex: "P(F\\mid A^+,B^+)=0.62"
      }
    ],
    visuals: [{ widget: "tree", params: { classes: 3 } }],
    simulationSpec: {
      seed: 110,
      samplingFunction: "simulateSensorFusion",
      trials: 100000
    },
    finalAnswer: {
      numeric: "0.62",
      symbolic: "\\frac{P(A^+,B^+\\mid F)P(F)}{\\sum_iP(A^+,B^+\\mid H_i)P(H_i)}"
    },
    takeaway: "Multiple moderate sensors can combine into strong posterior evidence."
  },
  {
    id: "ex11",
    title: "Reliability, two failure modes",
    difficulty: "Intermediate",
    tags: ["reliability", "engineering"],
    problemMarkdown:
      "Failure modes M1 and M2 have priors 0.7 and 0.3 among failures. Signature S occurs with probabilities 0.2 and 0.75 respectively. Given signature S, find P(M2|S).",
    variables: { pM2: 0.3, pSgivenM2: 0.75 },
    definitions: ["M1,M2: failure modes", "S: observed signature"],
    solutionSteps: [
      {
        title: "Numerator",
        explanationMarkdown: "Signature probability under mode M2 times prior mode share.",
        mathLatex: "P(S\\mid M_2)P(M_2)=0.75\\cdot0.3=0.225"
      },
      {
        title: "Denominator",
        explanationMarkdown: "Both modes can produce S.",
        mathLatex: "P(S)=0.2\\cdot0.7+0.75\\cdot0.3=0.365"
      },
      {
        title: "Posterior",
        explanationMarkdown: "Infer likely failure mode.",
        mathLatex: "P(M_2\\mid S)=0.225/0.365=0.6164"
      }
    ],
    visuals: [{ widget: "matrix", params: { modeCount: 2 } }],
    simulationSpec: {
      seed: 111,
      samplingFunction: "simulateFailureMode",
      trials: 120000
    },
    finalAnswer: {
      numeric: "0.6164",
      symbolic: "\\frac{0.75\\cdot0.3}{0.75\\cdot0.3+0.2\\cdot0.7}"
    },
    takeaway: "Posterior diagnosis combines prior mode prevalence and signature specificity."
  },
  {
    id: "ex12",
    title: "Communication, bit detection",
    difficulty: "Intermediate",
    tags: ["communication", "signal", "discrete"],
    problemMarkdown:
      "Bit 1 is sent with prior 0.4 and bit 0 with prior 0.6. Channel flips bits with probability 0.1. Received bit is 1. Find P(sent=1|received=1).",
    variables: { p1: 0.4, flip: 0.1 },
    definitions: ["S1: sent bit is 1", "R1: received bit is 1"],
    solutionSteps: [
      {
        title: "Likelihoods",
        explanationMarkdown: "P(R1|S1)=0.9 and P(R1|S0)=0.1.",
        mathLatex: "P(R_1\\mid S_1)=0.9,\\;P(R_1\\mid S_0)=0.1"
      },
      {
        title: "Denominator",
        explanationMarkdown: "Received 1 can come from true 1 or flipped 0.",
        mathLatex: "P(R_1)=0.9\\cdot0.4+0.1\\cdot0.6=0.42"
      },
      {
        title: "Posterior",
        explanationMarkdown: "Compute detection confidence.",
        mathLatex: "P(S_1\\mid R_1)=0.36/0.42=0.8571"
      }
    ],
    visuals: [{ widget: "odds", params: { channel: true } }],
    simulationSpec: {
      seed: 112,
      samplingFunction: "simulateBinaryChannel",
      trials: 100000
    },
    finalAnswer: {
      numeric: "0.8571",
      symbolic: "\\frac{0.9\\cdot0.4}{0.9\\cdot0.4+0.1\\cdot0.6}"
    },
    takeaway: "Posterior decoding depends jointly on channel reliability and source prior."
  },
  {
    id: "ex13",
    title: "Continuous measurement, Gaussian noise",
    difficulty: "Intermediate",
    tags: ["continuous", "gaussian", "inference"],
    problemMarkdown:
      "Theta~N(0,4), measurement model X|Theta~N(Theta,1). Observe x=1.5. Compute posterior mean and variance.",
    variables: { mu0: 0, sigma0: 2, sigma: 1, x: 1.5 },
    definitions: ["Theta: true value", "X: noisy measurement"],
    solutionSteps: [
      {
        title: "Posterior variance",
        explanationMarkdown: "Precisions add in Gaussian conjugacy.",
        mathLatex: "\\sigma_n^2=(1/4+1)^{-1}=0.8"
      },
      {
        title: "Posterior mean",
        explanationMarkdown: "Weighted average of prior mean and observation.",
        mathLatex: "\\mu_n=0.8(0/4+1.5/1)=1.2"
      },
      {
        title: "Posterior density",
        explanationMarkdown: "Resulting posterior is Gaussian.",
        mathLatex: "\\Theta\\mid x\\sim N(1.2,0.8)"
      }
    ],
    visuals: [{ widget: "density", params: { family: "gaussian" } }],
    simulationSpec: {
      seed: 113,
      samplingFunction: "simulateGaussianUpdate",
      trials: 20000
    },
    finalAnswer: {
      numeric: "mu=1.2, var=0.8",
      symbolic: "N(1.2,0.8)"
    },
    takeaway: "Posterior mean shrinks toward prior when measurement noise is non-zero."
  },
  {
    id: "ex14",
    title: "Two measurements, sequential update",
    difficulty: "Intermediate",
    tags: ["continuous", "sequential", "gaussian"],
    problemMarkdown:
      "Use prior Theta~N(0,4), same noise variance 1. Observe x1=1.5 then x2=0.5. Update sequentially.",
    variables: { mu1: 1.2, var1: 0.8, x2: 0.5 },
    definitions: ["Posterior after x1 acts as prior for x2"],
    solutionSteps: [
      {
        title: "After first observation",
        explanationMarkdown: "From Example 13, posterior is N(1.2,0.8).",
        mathLatex: "\\mu_1=1.2,\\;\\sigma_1^2=0.8"
      },
      {
        title: "Second update",
        explanationMarkdown: "Combine prior precision 1/0.8 with data precision 1.",
        mathLatex: "\\sigma_2^2=(1/0.8+1)^{-1}=0.4444"
      },
      {
        title: "Final mean",
        explanationMarkdown: "Updated mean balances old belief and new measurement.",
        mathLatex: "\\mu_2=0.4444(1.2/0.8+0.5)=0.8889"
      }
    ],
    visuals: [{ widget: "density", params: { family: "gaussian-seq" } }],
    simulationSpec: {
      seed: 114,
      samplingFunction: "simulateGaussianSequential",
      trials: 20000
    },
    finalAnswer: {
      numeric: "mu=0.8889, var=0.4444",
      symbolic: "N(0.8889,0.4444)"
    },
    takeaway: "Sequential evidence tightens uncertainty and can move the posterior mean."
  },
  {
    id: "ex15",
    title: "Beta-Bernoulli, coin bias inference",
    difficulty: "Intermediate",
    tags: ["beta", "bernoulli", "continuous"],
    problemMarkdown:
      "Prior theta~Beta(2,2). Observe 7 heads and 3 tails. Find posterior and posterior mean.",
    variables: { alpha: 2, beta: 2, heads: 7, tails: 3 },
    definitions: ["theta: probability of heads"],
    solutionSteps: [
      {
        title: "Conjugate update",
        explanationMarkdown: "Add successes and failures to prior parameters.",
        mathLatex: "\\text{Beta}(2,2)+7H+3T\\Rightarrow\\text{Beta}(9,5)"
      },
      {
        title: "Posterior mean",
        explanationMarkdown: "Mean of Beta(a,b) is a/(a+b).",
        mathLatex: "E[\\theta\\mid data]=9/(9+5)=0.6429"
      },
      {
        title: "Interpretation",
        explanationMarkdown: "Posterior is centered above 0.5 with moderate concentration.",
        mathLatex: "\\theta\\mid data\\sim\\text{Beta}(9,5)"
      }
    ],
    visuals: [{ widget: "density", params: { family: "beta" } }],
    simulationSpec: {
      seed: 115,
      samplingFunction: "simulateBetaBernoulli",
      trials: 30000
    },
    finalAnswer: {
      numeric: "Posterior Beta(9,5), mean 0.6429",
      symbolic: "Beta(\\alpha+k,\\beta+n-k)"
    },
    takeaway: "Conjugate priors provide transparent and efficient Bayesian updates."
  },
  {
    id: "ex16",
    title: "A or B testing, Beta-Binomial",
    difficulty: "Advanced",
    tags: ["ab-testing", "beta", "decision"],
    problemMarkdown:
      "A: 42 successes of 200. B: 51 successes of 220. Use independent Beta(1,1) priors. Give posteriors and estimate P(thetaA > thetaB).",
    variables: { aSuccess: 42, aN: 200, bSuccess: 51, bN: 220 },
    definitions: ["thetaA, thetaB: conversion rates"],
    solutionSteps: [
      {
        title: "Posterior parameters",
        explanationMarkdown: "Apply Beta-Binomial update to each variant.",
        mathLatex: "\\theta_A\\sim Beta(43,159),\\;\\theta_B\\sim Beta(52,170)"
      },
      {
        title: "Posterior means",
        explanationMarkdown: "Compute rough center for each posterior.",
        mathLatex: "E[\\theta_A]=43/202=0.2129,\\;E[\\theta_B]=52/222=0.2342"
      },
      {
        title: "Compare via simulation",
        explanationMarkdown: "Draw paired posterior samples and count thetaA>thetaB.",
        mathLatex: "P(\\theta_A>\\theta_B\\mid data)\\approx 0.29"
      }
    ],
    visuals: [{ widget: "density", params: { family: "beta-pair" } }],
    simulationSpec: {
      seed: 116,
      samplingFunction: "simulateABPosteriorComparison",
      draws: 100000
    },
    finalAnswer: {
      numeric: "P(thetaA > thetaB) ˜ 0.29",
      symbolic: "\\int\\int 1_{\\theta_A>\\theta_B}p(\\theta_A)p(\\theta_B)d\\theta_Ad\\theta_B"
    },
    takeaway: "Bayesian A/B testing returns a direct probability of outperforming, not just a p-value."
  },
  {
    id: "ex17",
    title: "Mixture classification, Gaussian mixture",
    difficulty: "Advanced",
    tags: ["classification", "continuous", "mixture"],
    problemMarkdown:
      "Class C1 prior 0.65 with X|C1~N(0,1). Class C2 prior 0.35 with X|C2~N(2,1). For x=1.2, compute P(C2|x).",
    variables: { prior1: 0.65, prior2: 0.35, x: 1.2 },
    definitions: ["C1,C2: classes", "X: feature"],
    solutionSteps: [
      {
        title: "Class-conditional densities",
        explanationMarkdown: "Evaluate Gaussian pdf at x=1.2 for each class.",
        mathLatex: "f_1(1.2)=0.1942,\\;f_2(1.2)=0.2897"
      },
      {
        title: "Evidence denominator",
        explanationMarkdown: "Continuous Bayes uses weighted density sum.",
        mathLatex: "f_X(x)=f_1(x)P(C_1)+f_2(x)P(C_2)"
      },
      {
        title: "Posterior class probability",
        explanationMarkdown: "Normalize class C2 weighted density.",
        mathLatex: "P(C_2\\mid x)=\\frac{f_2(x)P(C_2)}{f_1(x)P(C_1)+f_2(x)P(C_2)}=0.445"
      }
    ],
    visuals: [{ widget: "density", params: { family: "mixture" } }],
    simulationSpec: {
      seed: 117,
      samplingFunction: "simulateGaussianMixtureClassification",
      trials: 50000
    },
    finalAnswer: {
      numeric: "0.445",
      symbolic: "\\frac{f_2(x)\\pi_2}{f_1(x)\\pi_1+f_2(x)\\pi_2}"
    },
    takeaway: "In continuous classification, density ratios play the role of likelihood ratios."
  },
  {
    id: "ex18",
    title: "Cost-sensitive decision",
    difficulty: "Advanced",
    tags: ["decision", "bayes-factor", "loss"],
    problemMarkdown:
      "Posterior fraud probability after evidence is 0.04. False block cost is 3, missed fraud cost is 120. Choose action.",
    variables: { posteriorFraud: 0.04, cFP: 3, cFN: 120 },
    definitions: ["Action block vs allow"],
    solutionSteps: [
      {
        title: "Compute threshold",
        explanationMarkdown: "Block when posterior > cFP/(cFP+cFN).",
        mathLatex: "t=3/(3+120)=0.0244"
      },
      {
        title: "Compare posterior",
        explanationMarkdown: "Observed posterior exceeds threshold.",
        mathLatex: "0.04>0.0244"
      },
      {
        title: "Decision",
        explanationMarkdown: "Expected loss is lower if we block.",
        mathLatex: "\\text{Choose block}"
      }
    ],
    visuals: [{ widget: "odds", params: { costs: true } }],
    simulationSpec: {
      seed: 118,
      samplingFunction: "simulateDecisionLoss",
      trials: 200000
    },
    finalAnswer: {
      numeric: "Block",
      symbolic: "Act if P(Fraud|D) > C_{FP}/(C_{FP}+C_{FN})"
    },
    takeaway: "Optimal decisions combine posterior belief and asymmetric costs."
  },
];

const additionalExampleSeeds = [
  {
    id: "ex19",
    title: "Credit risk triage",
    tags: ["finance", "multi-hypothesis"],
    domain: "finance",
    visual: "matrix",
    note: "Three borrower categories require full denominator across 3 hypotheses."
  },
  {
    id: "ex20",
    title: "Cyber alert attribution",
    tags: ["security", "multi-hypothesis"],
    domain: "security",
    visual: "tree",
    note: "Possible causes: malware, misconfig, user action."
  },
  {
    id: "ex21",
    title: "Machine state diagnostics",
    tags: ["engineering", "multi-hypothesis"],
    domain: "engineering",
    visual: "sankey",
    note: "Normal, degraded, failing states from sensor evidence."
  },
  {
    id: "ex22",
    title: "Loan default evidence update",
    tags: ["finance", "odds"],
    domain: "finance",
    visual: "odds",
    note: "Use odds and Bayes factor from payment anomaly."
  },
  {
    id: "ex23",
    title: "Airport screening",
    tags: ["security", "base-rate"],
    domain: "security",
    visual: "matrix",
    note: "Rare threat prevalence with imperfect scan."
  },
  {
    id: "ex24",
    title: "Smart thermostat occupancy",
    tags: ["everyday", "sensor"],
    domain: "everyday",
    visual: "tree",
    note: "Infer occupancy from motion and CO2 readings."
  },
  {
    id: "ex25",
    title: "Market regime inference",
    tags: ["finance", "continuous"],
    domain: "finance",
    visual: "density",
    note: "Posterior over bull/bear/sideways with returns signal."
  },
  {
    id: "ex26",
    title: "Anomaly triage in logs",
    tags: ["security", "classification"],
    domain: "security",
    visual: "odds",
    note: "Update incident probability from log signatures."
  },
  {
    id: "ex27",
    title: "Battery health from voltage",
    tags: ["engineering", "continuous"],
    domain: "engineering",
    visual: "density",
    note: "Gaussian prior and noisy voltage measurement."
  },
  {
    id: "ex28",
    title: "Weather umbrella decision",
    tags: ["everyday", "decision"],
    domain: "everyday",
    visual: "odds",
    note: "Posterior rain probability with asymmetric inconvenience costs."
  },
  {
    id: "ex29",
    title: "Inventory demand class",
    tags: ["operations", "classification"],
    domain: "operations",
    visual: "tree",
    note: "Infer demand regime from early sales signal."
  },
  {
    id: "ex30",
    title: "Fraud ring detection",
    tags: ["security", "network"],
    domain: "security",
    visual: "matrix",
    note: "Posterior suspect class from multiple weak indicators."
  }
];

const additionalExamples = additionalExampleSeeds.map((seed, index) => ({
  id: seed.id,
  title: seed.title,
  difficulty: index % 2 === 0 ? "Intermediate" : "Advanced",
  tags: seed.tags,
  problemMarkdown:
    `Scenario in ${seed.domain}: apply Bayes theorem with explicit denominator and interpret posterior.`,
  variables: {
    prior: "domain-specific",
    likelihoods: "provided in prompt"
  },
  definitions: ["H_i: competing hypotheses", "E: observed evidence"],
  solutionSteps: [
    {
      title: "Define events",
      explanationMarkdown:
        "Map the word problem into hypotheses H_i and evidence E.",
      mathLatex: "\\{H_i\\}\\text{ partition the space}"
    },
    {
      title: "Compute denominator",
      explanationMarkdown:
        "Use total probability across all hypotheses.",
      mathLatex: "P(E)=\\sum_i P(E\\mid H_i)P(H_i)"
    },
    {
      title: "Normalize target hypothesis",
      explanationMarkdown:
        "Compute posterior and provide a practical interpretation.",
      mathLatex: "P(H_k\\mid E)=\\frac{P(E\\mid H_k)P(H_k)}{\\sum_i P(E\\mid H_i)P(H_i)}"
    }
  ],
  visuals: [{ widget: seed.visual, params: { template: true } }],
  simulationSpec: {
    seed: 200 + index,
    samplingFunction: "genericBayesMonteCarlo",
    trials: 50000
  },
  finalAnswer: {
    numeric: "Computed in walkthrough",
    symbolic:
      "P(H_k\\mid E)=\\frac{P(E\\mid H_k)P(H_k)}{\\sum_i P(E\\mid H_i)P(H_i)}"
  },
  takeaway: seed.note
}));

export const examples = [...richExamples, ...additionalExamples];

export function getExampleById(exampleId) {
  return examples.find((example) => example.id === exampleId);
}

