export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function roundTo(value, decimals = 4) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function toPercent(value, decimals = 2) {
  return `${roundTo(value * 100, decimals)}%`;
}

export function normalizeWeights(values) {
  const sum = values.reduce((acc, value) => acc + value, 0);
  if (sum === 0) {
    return values.map(() => 0);
  }
  return values.map((value) => value / sum);
}

export function almostEqual(a, b, epsilon = 1e-9) {
  return Math.abs(a - b) <= epsilon;
}
