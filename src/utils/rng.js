export function createSeededRng(seed = 12345) {
  let t = seed >>> 0;
  return function random() {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function bernoulliSample(p, random) {
  return random() < p ? 1 : 0;
}

export function runBernoulliTrialSeries(p, n, seed = 12345) {
  const random = createSeededRng(seed);
  const results = [];
  let successCount = 0;

  for (let i = 0; i < n; i += 1) {
    const outcome = bernoulliSample(p, random);
    successCount += outcome;
    results.push({
      trial: i + 1,
      outcome,
      runningMean: successCount / (i + 1)
    });
  }

  return {
    successes: successCount,
    failures: n - successCount,
    results
  };
}

export function simulateEventFrequency({ probability, trials = 5000, seed = 12345 }) {
  const random = createSeededRng(seed);
  let hits = 0;
  for (let i = 0; i < trials; i += 1) {
    hits += random() < probability ? 1 : 0;
  }
  return {
    trials,
    hits,
    estimate: hits / Math.max(trials, 1)
  };
}

function gaussianSample(random, mean = 0, std = 1) {
  const u1 = Math.max(random(), 1e-12);
  const u2 = random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + std * z0;
}

export function simulateNormalMean({ mean, std, trials = 5000, seed = 12345 }) {
  const random = createSeededRng(seed);
  let sum = 0;
  for (let i = 0; i < trials; i += 1) {
    sum += gaussianSample(random, mean, std);
  }
  return {
    trials,
    estimate: sum / Math.max(trials, 1)
  };
}
