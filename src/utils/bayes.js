import { clamp } from "./format";

export function bayesPosterior(prior, likelihoodGivenHypothesis, likelihoodGivenNotHypothesis) {
  const p = clamp(prior);
  const l1 = clamp(likelihoodGivenHypothesis);
  const l0 = clamp(likelihoodGivenNotHypothesis);
  const evidence = l1 * p + l0 * (1 - p);
  if (evidence === 0) {
    return {
      posterior: 0,
      evidence: 0,
      numerator: 0,
      denominator: 0
    };
  }
  return {
    posterior: (l1 * p) / evidence,
    evidence,
    numerator: l1 * p,
    denominator: evidence
  };
}

export function multiHypothesisPosterior(priors, likelihoods) {
  const numerator = priors.map((prior, index) => clamp(prior, 0, Infinity) * clamp(likelihoods[index], 0, Infinity));
  const evidence = numerator.reduce((acc, value) => acc + value, 0);
  if (evidence === 0) {
    return {
      posteriors: priors.map(() => 0),
      evidence,
      numerators: numerator
    };
  }
  return {
    posteriors: numerator.map((value) => value / evidence),
    evidence,
    numerators: numerator
  };
}

export function confusionMatrixFromRates({ prevalence, sensitivity, specificity, population = 10000 }) {
  const pD = clamp(prevalence);
  const sens = clamp(sensitivity);
  const spec = clamp(specificity);

  const diseased = population * pD;
  const healthy = population - diseased;

  const truePositive = diseased * sens;
  const falseNegative = diseased - truePositive;
  const trueNegative = healthy * spec;
  const falsePositive = healthy - trueNegative;

  const positive = truePositive + falsePositive;
  const negative = trueNegative + falseNegative;

  return {
    truePositive,
    falsePositive,
    trueNegative,
    falseNegative,
    positive,
    negative,
    posteriorGivenPositive: positive === 0 ? 0 : truePositive / positive,
    posteriorGivenNegative: negative === 0 ? 0 : falseNegative / negative,
    falsePositiveRate: 1 - spec,
    falseNegativeRate: 1 - sens
  };
}

export function oddsUpdate(priorOdds, likelihoodRatio) {
  const po = Math.max(priorOdds, 1e-12);
  const lr = Math.max(likelihoodRatio, 1e-12);
  const posteriorOdds = po * lr;
  return {
    posteriorOdds,
    logOddsPrior: Math.log(po),
    logLikelihoodRatio: Math.log(lr),
    logOddsPosterior: Math.log(posteriorOdds)
  };
}

export function priorProbabilityFromOdds(odds) {
  const o = Math.max(odds, 0);
  return o / (1 + o);
}

export function oddsFromProbability(probability) {
  const p = clamp(probability, 1e-12, 1 - 1e-12);
  return p / (1 - p);
}

export function gaussianPosterior({ mu0, sigma0, sigma, x }) {
  const precisionPrior = 1 / (sigma0 ** 2);
  const precisionLikelihood = 1 / (sigma ** 2);
  const posteriorVariance = 1 / (precisionPrior + precisionLikelihood);
  const posteriorMean = posteriorVariance * (mu0 * precisionPrior + x * precisionLikelihood);

  return {
    posteriorMean,
    posteriorVariance,
    posteriorStd: Math.sqrt(posteriorVariance),
    shrinkageToObservation: precisionLikelihood / (precisionPrior + precisionLikelihood)
  };
}

export function betaPosterior(alpha, beta, k, n) {
  return {
    alpha: alpha + k,
    beta: beta + (n - k)
  };
}
