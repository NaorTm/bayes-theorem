const masterySkills = ["denominator", "baseRates", "sequential", "continuous"];

const levelConfigs = [
  {
    level: 1,
    title: "Direct Bayes, two hypotheses",
    count: 12,
    skillWeights: { denominator: 0.5, baseRates: 0.3, sequential: 0.1, continuous: 0.1 },
    bank: [
      {
        title: "Clinic rapid test",
        prompt:
          "Disease prevalence is 0.03, sensitivity is 0.92, and false-positive rate is 0.07. Compute P(Disease|Positive).",
        baseHint2: "Write P(D|+)=P(+|D)P(D)/P(+), then substitute numbers for the numerator first.",
        baseHint3: "Use P(+)=P(+|D)P(D)+P(+|D^c)P(D^c).",
        fullSolution: [
          "Step 1: Let D be disease and + be a positive test.",
          "Step 2: Numerator = 0.92*0.03 = 0.0276.",
          "Step 3: Denominator = 0.92*0.03 + 0.07*0.97 = 0.0955.",
          "Step 4: Posterior = 0.0276/0.0955 = 0.2890.",
          "Step 5: Interpretation: fewer than one-third of positives are true disease at this base rate."
        ]
      },
      {
        title: "Warehouse defect alarm",
        prompt:
          "Defect rate is 0.015. Alarm sensitivity is 0.88 and false-positive rate is 0.04. Find P(Defect|Alarm).",
        baseHint2: "Target is P(D|A); numerator is P(A|D)P(D).",
        baseHint3: "Compute P(A)=P(A|D)P(D)+P(A|D^c)P(D^c).",
        fullSolution: [
          "Step 1: Define D=defect, A=alarm.",
          "Step 2: Numerator = 0.88*0.015 = 0.0132.",
          "Step 3: Denominator = 0.88*0.015 + 0.04*0.985 = 0.0526.",
          "Step 4: Posterior = 0.0132/0.0526 = 0.2510.",
          "Step 5: Alarm is informative but still yields many false alarms due to low defect prevalence."
        ]
      },
      {
        title: "Spam keyword",
        prompt:
          "P(Spam)=0.35. Word 'winner' appears with probability 0.24 in spam and 0.05 in ham. Compute P(Spam|winner).",
        baseHint2: "Use Bayes with H=Spam and E=winner.",
        baseHint3: "Denominator is weighted evidence from spam and ham classes.",
        fullSolution: [
          "Step 1: S=spam, W=word winner appears.",
          "Step 2: Numerator = 0.24*0.35 = 0.084.",
          "Step 3: Denominator = 0.24*0.35 + 0.05*0.65 = 0.1165.",
          "Step 4: Posterior = 0.084/0.1165 = 0.7210.",
          "Step 5: One strong feature can shift class probability sharply."
        ]
      },
      {
        title: "Storm siren",
        prompt:
          "Storm prior is 0.12. Siren triggers with probability 0.85 if storm and 0.18 otherwise. Compute P(Storm|Siren).",
        baseHint2: "Set H=storm and E=siren, then write Bayes template.",
        baseHint3: "Add both siren pathways to get P(E).",
        fullSolution: [
          "Step 1: S=storm, R=siren.",
          "Step 2: Numerator = 0.85*0.12 = 0.102.",
          "Step 3: Denominator = 0.85*0.12 + 0.18*0.88 = 0.2604.",
          "Step 4: Posterior = 0.102/0.2604 = 0.3917.",
          "Step 5: Evidence raises storm probability but not above 50%."
        ]
      }
    ]
  },
  {
    level: 2,
    title: "Multi-hypothesis and total probability",
    count: 14,
    skillWeights: { denominator: 0.5, baseRates: 0.2, sequential: 0.2, continuous: 0.1 },
    bank: [
      {
        title: "Three suppliers",
        prompt:
          "A part comes from S1 (0.5), S2 (0.3), or S3 (0.2). Defect rates are 0.01, 0.03, 0.06. Compute P(S3|defect).",
        baseHint2: "For multi-hypothesis Bayes, numerator is P(D|S3)P(S3).",
        baseHint3: "Denominator must sum all suppliers: sum_i P(D|Si)P(Si).",
        fullSolution: [
          "Step 1: Hypotheses are supplier source S1,S2,S3 and evidence D=defect.",
          "Step 2: Numerator = 0.06*0.2 = 0.012.",
          "Step 3: Denominator = 0.01*0.5 + 0.03*0.3 + 0.06*0.2 = 0.026.",
          "Step 4: Posterior = 0.012/0.026 = 0.4615.",
          "Step 5: Even with 20% share, supplier 3 explains nearly half of defects."
        ]
      },
      {
        title: "Network outage cause",
        prompt:
          "Outages are caused by hardware (0.25), software (0.5), or operator error (0.25). A reboot fix occurs with probabilities 0.2, 0.8, 0.5 respectively. Compute P(software|reboot-fix).",
        baseHint2: "Set target hypothesis to software and evidence to reboot-fix.",
        baseHint3: "Use full denominator across all three causes.",
        fullSolution: [
          "Step 1: H=hardware, S=software, O=operator; E=reboot fixed outage.",
          "Step 2: Numerator = 0.8*0.5 = 0.4.",
          "Step 3: Denominator = 0.2*0.25 + 0.8*0.5 + 0.5*0.25 = 0.575.",
          "Step 4: Posterior = 0.4/0.575 = 0.6957.",
          "Step 5: Reboot evidence strongly favors software cause."
        ]
      },
      {
        title: "Credit segment attribution",
        prompt:
          "Applicants are prime (0.45), near-prime (0.35), subprime (0.20). Late-payment flag probabilities are 0.05, 0.18, 0.42. Compute P(subprime|flag).",
        baseHint2: "Write numerator from subprime branch only.",
        baseHint3: "Evidence denominator is weighted sum over all segments.",
        fullSolution: [
          "Step 1: Let P,N,S be segments; F=late-payment flag.",
          "Step 2: Numerator = 0.42*0.20 = 0.084.",
          "Step 3: Denominator = 0.05*0.45 + 0.18*0.35 + 0.42*0.20 = 0.1695.",
          "Step 4: Posterior = 0.084/0.1695 = 0.4956.",
          "Step 5: A single flag nearly doubles subprime probability relative to prior."
        ]
      },
      {
        title: "Machine state root cause",
        prompt:
          "Machine state priors are Normal 0.6, Degraded 0.3, Critical 0.1. High-temperature alert probabilities are 0.08, 0.35, 0.9. Compute P(Critical|alert).",
        baseHint2: "Target is P(C|A) with C=critical and A=alert.",
        baseHint3: "Compute P(A)=0.08*0.6+0.35*0.3+0.9*0.1.",
        fullSolution: [
          "Step 1: Hypotheses N,D,C partition machine state.",
          "Step 2: Numerator = 0.9*0.1 = 0.09.",
          "Step 3: Denominator = 0.08*0.6 + 0.35*0.3 + 0.9*0.1 = 0.243.",
          "Step 4: Posterior = 0.09/0.243 = 0.3704.",
          "Step 5: Alert raises critical risk from 10% to 37%."
        ]
      }
    ]
  },
  {
    level: 3,
    title: "Base-rate heavy and confusion matrix",
    count: 14,
    skillWeights: { denominator: 0.35, baseRates: 0.5, sequential: 0.1, continuous: 0.05 },
    bank: [
      {
        title: "Rare disease screen",
        prompt:
          "Prevalence 0.004, sensitivity 0.96, specificity 0.93. Compute P(D|+).",
        baseHint2: "Base rates matter: start from prevalence before test performance.",
        baseHint3: "Use false-positive rate 1-specificity in the denominator.",
        fullSolution: [
          "Step 1: D=disease, +=positive.",
          "Step 2: Numerator = 0.96*0.004 = 0.00384.",
          "Step 3: Denominator = 0.96*0.004 + 0.07*0.996 = 0.07356.",
          "Step 4: Posterior = 0.00384/0.07356 = 0.0522.",
          "Step 5: Despite high sensitivity, low prevalence keeps PPV low."
        ]
      },
      {
        title: "Airport secondary scan",
        prompt:
          "Threat prevalence is 0.0008. Scanner sensitivity 0.98, specificity 0.985. Find P(Threat|Positive).",
        baseHint2: "Do not confuse P(+|Threat) with P(Threat|+).",
        baseHint3: "Denominator combines true positives and false positives from non-threat travelers.",
        fullSolution: [
          "Step 1: T=threat, +=scanner positive.",
          "Step 2: Numerator = 0.98*0.0008 = 0.000784.",
          "Step 3: Denominator = 0.98*0.0008 + 0.015*0.9992 = 0.015772.",
          "Step 4: Posterior = 0.000784/0.015772 = 0.0497.",
          "Step 5: Most positives are false at very low prevalence."
        ]
      },
      {
        title: "Fraud model alert",
        prompt:
          "Fraud prevalence is 0.012. Alert catches fraud with 0.91 probability and has 0.06 false-positive rate. Compute P(Fraud|Alert).",
        baseHint2: "Numerator uses fraud prior, not alert rate.",
        baseHint3: "Denominator is alert mass from fraud + non-fraud transactions.",
        fullSolution: [
          "Step 1: F=fraud, A=alert.",
          "Step 2: Numerator = 0.91*0.012 = 0.01092.",
          "Step 3: Denominator = 0.91*0.012 + 0.06*0.988 = 0.0702.",
          "Step 4: Posterior = 0.01092/0.0702 = 0.1556.",
          "Step 5: Alert multiplies risk, but absolute probability remains moderate."
        ]
      },
      {
        title: "Factory x-ray",
        prompt:
          "Defect prevalence is 0.025. X-ray sensitivity is 0.94 and specificity is 0.9. Find P(Defect|Positive).",
        baseHint2: "Translate specificity to false-positive rate before applying Bayes.",
        baseHint3: "Use P(+)=P(+|D)P(D)+P(+|D^c)P(D^c).",
        fullSolution: [
          "Step 1: D=defect, +=positive x-ray.",
          "Step 2: Numerator = 0.94*0.025 = 0.0235.",
          "Step 3: Denominator = 0.94*0.025 + 0.10*0.975 = 0.121.",
          "Step 4: Posterior = 0.0235/0.121 = 0.1942.",
          "Step 5: Base-rate correction prevents overconfidence in positives."
        ]
      }
    ]
  },
  {
    level: 4,
    title: "Continuous Bayes and densities",
    count: 12,
    skillWeights: { denominator: 0.25, baseRates: 0.1, sequential: 0.15, continuous: 0.5 },
    bank: [
      {
        title: "Gaussian sensor update",
        prompt:
          "Prior theta~N(10, 3^2), observation x=13 with noise sigma=2. Compute posterior mean and variance.",
        baseHint2: "Use precision form: 1/sigma_n^2 = 1/sigma0^2 + 1/sigma^2.",
        baseHint3: "Posterior mean is precision-weighted average of prior mean and observation.",
        fullSolution: [
          "Step 1: Prior precision=1/9, likelihood precision=1/4.",
          "Step 2: Posterior variance = 1/(1/9+1/4)=36/13=2.7692.",
          "Step 3: Posterior mean = 2.7692*(10/9+13/4)=12.0769.",
          "Step 4: Posterior distribution is N(12.0769, 2.7692).",
          "Step 5: Posterior lies between prior mean and observation with reduced variance."
        ]
      },
      {
        title: "Beta-Binomial coin update",
        prompt:
          "Prior is Beta(3,4). Observe k=8 heads in n=12 flips. Compute posterior and posterior mean.",
        baseHint2: "Conjugate update: alpha'=alpha+k and beta'=beta+n-k.",
        baseHint3: "Posterior mean for Beta(a,b) is a/(a+b).",
        fullSolution: [
          "Step 1: Posterior alpha = 3+8 = 11.",
          "Step 2: Posterior beta = 4+(12-8) = 8.",
          "Step 3: Posterior is Beta(11,8).",
          "Step 4: Posterior mean = 11/(11+8)=0.5789.",
          "Step 5: Data shifts mean upward from prior 3/7≈0.4286."
        ]
      },
      {
        title: "Gaussian classification density",
        prompt:
          "Class priors are 0.6 and 0.4. Density values at x are f1(x)=0.18 and f2(x)=0.32. Compute P(Class2|x).",
        baseHint2: "Use density Bayes: P(C2|x)=f2(x)P(C2)/[f1(x)P(C1)+f2(x)P(C2)].",
        baseHint3: "Denominator is weighted density sum, not a direct probability of x.",
        fullSolution: [
          "Step 1: Numerator = 0.32*0.4 = 0.128.",
          "Step 2: Denominator = 0.18*0.6 + 0.32*0.4 = 0.236.",
          "Step 3: Posterior = 0.128/0.236 = 0.5424.",
          "Step 4: Class 2 is slightly more likely given x.",
          "Step 5: Continuous Bayes uses densities but same normalization logic."
        ]
      },
      {
        title: "Two-observation Gaussian update",
        prompt:
          "Prior theta~N(0, 2^2). Noise sigma=1. Observations are x1=1.2 and x2=0.7. Compute posterior mean after both.",
        baseHint2: "Sequential update: posterior after x1 becomes prior for x2.",
        baseHint3: "Equivalent batch precision: 1/sigma_n^2 = 1/sigma0^2 + n/sigma^2 with n=2.",
        fullSolution: [
          "Step 1: Batch posterior variance = 1/(1/4 + 2)=0.4444.",
          "Step 2: Sum observations is 1.9.",
          "Step 3: Posterior mean = 0.4444*(0/4 + 1.9/1)=0.8444.",
          "Step 4: Posterior after two points is N(0.8444, 0.4444).",
          "Step 5: Variance contracts compared with single-observation update."
        ]
      }
    ]
  },
  {
    level: 5,
    title: "Bayesian updating sequences",
    count: 10,
    skillWeights: { denominator: 0.25, baseRates: 0.2, sequential: 0.45, continuous: 0.1 },
    bank: [
      {
        title: "Two-stage medical testing",
        prompt:
          "Prevalence 0.02. Test A: sensitivity 0.9, FPR 0.08. Test B (independent): sensitivity 0.95, FPR 0.05. Compute P(D|A+,B+).",
        baseHint2: "Update once with A+ to get a new prior, then update again with B+.",
        baseHint3: "At each stage compute the denominator with current prior and complement.",
        fullSolution: [
          "Step 1: After A+, posterior1 = (0.9*0.02)/(0.9*0.02+0.08*0.98)=0.1867.",
          "Step 2: Treat 0.1867 as prior for Test B.",
          "Step 3: Posterior2 = (0.95*0.1867)/(0.95*0.1867+0.05*0.8133)=0.8135.",
          "Step 4: Sequential evidence drastically increases disease probability.",
          "Step 5: This is equivalent to multiplying Bayes factors sequentially."
        ]
      },
      {
        title: "Sensor fusion over time",
        prompt:
          "Prior fault probability 0.1. Sensor1 alert: P(a1|F)=0.8, P(a1|F^c)=0.2. Sensor2 alert: P(a2|F)=0.7, P(a2|F^c)=0.1. Given both alerts, compute posterior.",
        baseHint2: "Perform two Bayes updates in sequence using posterior-as-prior.",
        baseHint3: "Denominator must be recomputed after each update stage.",
        fullSolution: [
          "Step 1: After a1, posterior1=(0.8*0.1)/(0.8*0.1+0.2*0.9)=0.3077.",
          "Step 2: Update with a2: posterior2=(0.7*0.3077)/(0.7*0.3077+0.1*0.6923)=0.7568.",
          "Step 3: Final fault probability is 0.7568.",
          "Step 4: Two moderate sensors combine into strong evidence.",
          "Step 5: Check posterior remains in [0,1]."
        ]
      },
      {
        title: "Sequential coin evidence",
        prompt:
          "Coin is fair with prior 0.6 or biased-to-heads with prior 0.4 where P(H|biased)=0.75. Observed sequence H,H,T. Compute P(biased|data).",
        baseHint2: "Use likelihood of entire sequence under each hypothesis.",
        baseHint3: "Denominator is weighted sum of sequence likelihoods under fair and biased coins.",
        fullSolution: [
          "Step 1: P(data|biased)=0.75*0.75*0.25=0.140625.",
          "Step 2: P(data|fair)=0.5^3=0.125.",
          "Step 3: Numerator=0.140625*0.4=0.05625.",
          "Step 4: Denominator=0.140625*0.4+0.125*0.6=0.13125.",
          "Step 5: Posterior=0.05625/0.13125=0.4286."
        ]
      },
      {
        title: "Progressive fraud evidence",
        prompt:
          "Prior fraud probability is 0.03. Evidence E1 has LR=5, E2 has LR=3 (conditionally independent). Compute posterior after both pieces.",
        baseHint2: "Odds update is easiest: posterior odds = prior odds * LR1 * LR2.",
        baseHint3: "Convert back with p=odds/(1+odds).",
        fullSolution: [
          "Step 1: Prior odds = 0.03/0.97 = 0.03093.",
          "Step 2: Posterior odds after both = 0.03093*5*3 = 0.4639.",
          "Step 3: Posterior probability = 0.4639/(1+0.4639)=0.3169.",
          "Step 4: Sequential evidence can move low priors into action range.",
          "Step 5: Odds form avoids repeated denominator algebra."
        ]
      }
    ]
  }
];

const adaptiveHintLibrary = {
  wrongDenominator: {
    hint2:
      "Mistake check: your denominator must be the total evidence mass P(E), not P(H) and not just one branch P(E|H).",
    hint3:
      "Write all pathways to E explicitly before dividing: P(E)=sum_i P(E|H_i)P(H_i)."
  },
  swappedConditional: {
    hint2:
      "Mistake check: do not swap P(H|E) with P(E|H). Bayes starts from P(E|H) and prior P(H).",
    hint3:
      "If you only have P(H|E), convert carefully or derive from joint probabilities; do not substitute it as likelihood."
  },
  independenceMisuse: {
    hint2:
      "Mistake check: only multiply likelihood terms if the problem states conditional independence under each hypothesis.",
    hint3:
      "If independence is unclear, keep the joint likelihood term P(E1,E2|H) instead of splitting it."
  }
};

function createProblem(levelConfig, baseProblem, index) {
  const id = `L${levelConfig.level}-P${String(index + 1).padStart(2, "0")}`;

  return {
    id,
    level: levelConfig.level,
    title:
      index < levelConfig.bank.length
        ? baseProblem.title
        : `${baseProblem.title} (variation ${index - levelConfig.bank.length + 2})`,
    prompt: baseProblem.prompt,
    hints: {
      hint1: "Hint 1: Define events/hypotheses clearly and state the target posterior.",
      hint2Base: `Hint 2: ${baseProblem.baseHint2}`,
      hint3Base: `Hint 3: ${baseProblem.baseHint3}`,
      adaptive: adaptiveHintLibrary
    },
    fullSolution: baseProblem.fullSolution,
    pitfallTypes: Object.keys(adaptiveHintLibrary),
    skillWeights: levelConfig.skillWeights,
    simulationCheck: {
      optional: true,
      seed: 3000 + levelConfig.level * 100 + index,
      method: "Monte Carlo with seeded RNG"
    }
  };
}

function buildLevel(levelConfig) {
  const problems = Array.from({ length: levelConfig.count }, (_, index) => {
    const baseProblem = levelConfig.bank[index % levelConfig.bank.length];
    return createProblem(levelConfig, baseProblem, index);
  });

  return {
    level: levelConfig.level,
    title: levelConfig.title,
    problems
  };
}

export const practiceLevels = levelConfigs.map(buildLevel);

export const totalPracticeProblemCount = practiceLevels.reduce(
  (acc, level) => acc + level.problems.length,
  0
);

export const masterySkillKeys = masterySkills;
