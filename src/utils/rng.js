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
