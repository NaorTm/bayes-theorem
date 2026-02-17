const lanczosCoefficients = [
  676.5203681218851,
  -1259.1392167224028,
  771.3234287776531,
  -176.6150291621406,
  12.507343278686905,
  -0.13857109526572012,
  0.000009984369578019572,
  0.00000015056327351493116
];

export function logGamma(z) {
  if (z < 0.5) {
    return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
  }

  let x = 0.9999999999998099;
  const adjusted = z - 1;

  for (let i = 0; i < lanczosCoefficients.length; i += 1) {
    x += lanczosCoefficients[i] / (adjusted + i + 1);
  }

  const t = adjusted + lanczosCoefficients.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (adjusted + 0.5) * Math.log(t) - t + Math.log(x);
}

export function betaFunction(a, b) {
  return Math.exp(logGamma(a) + logGamma(b) - logGamma(a + b));
}

export function betaPdf(x, alpha, beta) {
  if (x <= 0 || x >= 1) {
    return 0;
  }
  const logNumerator = (alpha - 1) * Math.log(x) + (beta - 1) * Math.log(1 - x);
  return Math.exp(logNumerator - (logGamma(alpha) + logGamma(beta) - logGamma(alpha + beta)));
}

export function normalPdf(x, mean, std) {
  const variance = std ** 2;
  const coefficient = 1 / Math.sqrt(2 * Math.PI * variance);
  return coefficient * Math.exp(-((x - mean) ** 2) / (2 * variance));
}

export function numericalCdfForBeta(alpha, beta, points = 1000) {
  const values = [];
  const step = 1 / points;
  let cumulative = 0;

  for (let i = 1; i <= points; i += 1) {
    const x = i * step;
    cumulative += betaPdf(x, alpha, beta) * step;
    values.push({ x, cdf: cumulative });
  }

  const total = values.at(-1)?.cdf || 1;
  return values.map((entry) => ({ x: entry.x, cdf: entry.cdf / total }));
}

export function betaCredibleInterval(alpha, beta, lower = 0.025, upper = 0.975) {
  const cdf = numericalCdfForBeta(alpha, beta);

  const lowerPoint = cdf.find((entry) => entry.cdf >= lower)?.x ?? 0;
  const upperPoint = cdf.find((entry) => entry.cdf >= upper)?.x ?? 1;

  return {
    lower: lowerPoint,
    upper: upperPoint
  };
}

export function linspace(min, max, count) {
  if (count <= 1) {
    return [min];
  }
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, index) => min + index * step);
}
