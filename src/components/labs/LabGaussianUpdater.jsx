import { useMemo, useState } from "react";
import { line, max, scaleLinear } from "d3";
import SliderInput from "../SliderInput";
import { gaussianPosterior } from "../../utils/bayes";
import { linspace, normalPdf } from "../../utils/math";
import { roundTo } from "../../utils/format";
import { MathDisplay } from "../MathText";

function GaussianPlot({ mu0, sigma0, sigma, x, posteriorMean, posteriorStd }) {
  const width = 360;
  const height = 220;
  const padding = 28;

  const minX = Math.min(mu0 - 4 * sigma0, x - 4 * sigma, posteriorMean - 4 * posteriorStd);
  const maxX = Math.max(mu0 + 4 * sigma0, x + 4 * sigma, posteriorMean + 4 * posteriorStd);
  const xs = linspace(minX, maxX, 260);

  const priorData = xs.map((value) => ({ x: value, y: normalPdf(value, mu0, sigma0) }));
  const likeData = xs.map((value) => ({ x: value, y: normalPdf(x, value, sigma) }));
  const postData = xs.map((value) => ({ x: value, y: normalPdf(value, posteriorMean, posteriorStd) }));

  const ymax = max([...priorData, ...likeData, ...postData], (entry) => entry.y) || 1;
  const xScale = scaleLinear().domain([minX, maxX]).range([padding, width - padding]);
  const yScale = scaleLinear().domain([0, ymax]).range([height - padding, padding]);

  const draw = line()
    .x((point) => xScale(point.x))
    .y((point) => yScale(point.y));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="lab-svg"
      role="img"
      aria-label="Prior likelihood and posterior Gaussian curves"
    >
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--text)" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="var(--text)" />
      <path d={draw(priorData) || ""} fill="none" stroke="var(--warning)" strokeWidth="2.5" />
      <path d={draw(likeData) || ""} fill="none" stroke="var(--muted-text)" strokeWidth="2.5" />
      <path d={draw(postData) || ""} fill="none" stroke="var(--accent-strong)" strokeWidth="2.5" />
      <text x={width - padding - 120} y={padding + 14} fill="var(--warning)">
        Prior
      </text>
      <text x={width - padding - 120} y={padding + 34} fill="var(--muted-text)">
        Likelihood shape
      </text>
      <text x={width - padding - 120} y={padding + 54} fill="var(--accent-strong)">
        Posterior
      </text>
    </svg>
  );
}

export default function LabGaussianUpdater() {
  const [mu0, setMu0] = useState(0);
  const [sigma0, setSigma0] = useState(2);
  const [sigma, setSigma] = useState(1);
  const [x, setX] = useState(1.8);

  const posterior = useMemo(() => gaussianPosterior({ mu0, sigma0, sigma, x }), [mu0, sigma0, sigma, x]);

  return (
    <article className="card lab-card" aria-label="Lab 6 gaussian gaussian updater">
      <h3>Lab 6: Gaussian-Gaussian Updater</h3>
      <p>Posterior mean is a precision-weighted average: shrinkage toward prior or data depends on noise.</p>

      <div className="lab-grid">
        <div>
          <SliderInput
            id="lab6-mu0"
            label="Prior mean mu0"
            min={-5}
            max={5}
            step={0.1}
            value={mu0}
            onChange={setMu0}
            display={roundTo(mu0, 2)}
          />
          <SliderInput
            id="lab6-sigma0"
            label="Prior std sigma0"
            min={0.2}
            max={5}
            step={0.1}
            value={sigma0}
            onChange={setSigma0}
            display={roundTo(sigma0, 2)}
          />
          <SliderInput
            id="lab6-sigma"
            label="Likelihood std sigma"
            min={0.2}
            max={5}
            step={0.1}
            value={sigma}
            onChange={setSigma}
            display={roundTo(sigma, 2)}
          />
          <SliderInput
            id="lab6-x"
            label="Observed x"
            min={-6}
            max={6}
            step={0.1}
            value={x}
            onChange={setX}
            display={roundTo(x, 2)}
          />
        </div>

        <div>
          <GaussianPlot
            mu0={mu0}
            sigma0={sigma0}
            sigma={sigma}
            x={x}
            posteriorMean={posterior.posteriorMean}
            posteriorStd={posterior.posteriorStd}
          />

          <div className="result-grid">
            <p>
              <strong>Posterior mean</strong>: {roundTo(posterior.posteriorMean, 4)}
            </p>
            <p>
              <strong>Posterior variance</strong>: {roundTo(posterior.posteriorVariance, 4)}
            </p>
            <p>
              <strong>Posterior std</strong>: {roundTo(posterior.posteriorStd, 4)}
            </p>
            <p>
              <strong>Weight on observation</strong>: {roundTo(posterior.shrinkageToObservation, 4)}
            </p>
          </div>

          <MathDisplay
            math={`\\mu_n=\\frac{\\mu_0/\\sigma_0^2 + x/\\sigma^2}{1/\\sigma_0^2 + 1/\\sigma^2}=${roundTo(
              posterior.posteriorMean,
              4
            )}`}
          />
          <MathDisplay
            math={`\\sigma_n^2=\\left(\\frac{1}{\\sigma_0^2}+\\frac{1}{\\sigma^2}\\right)^{-1}=${roundTo(
              posterior.posteriorVariance,
              4
            )}`}
          />
        </div>
      </div>
    </article>
  );
}
