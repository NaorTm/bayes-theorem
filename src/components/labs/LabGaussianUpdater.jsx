import { useMemo, useState } from "react";
import { line, max, scaleLinear } from "d3";
import SliderInput from "../SliderInput";
import { gaussianPosterior } from "../../utils/bayes";
import { linspace, normalPdf } from "../../utils/math";
import { roundTo } from "../../utils/format";
import { MathDisplay } from "../MathText";
import { simulateNormalMean } from "../../utils/rng";
import SimulationAgreementPanel from "./SimulationAgreementPanel";

function GaussianPlot({ prior, likelihoodMean, likelihoodStd, posterior }) {
  const width = 360;
  const height = 220;
  const padding = 28;

  const minX = Math.min(prior.mean - 4 * prior.std, likelihoodMean - 4 * likelihoodStd, posterior.mean - 4 * posterior.std);
  const maxX = Math.max(prior.mean + 4 * prior.std, likelihoodMean + 4 * likelihoodStd, posterior.mean + 4 * posterior.std);
  const xValues = linspace(minX, maxX, 260);

  const priorData = xValues.map((x) => ({ x, y: normalPdf(x, prior.mean, prior.std) }));
  const likeData = xValues.map((x) => ({ x, y: normalPdf(x, likelihoodMean, likelihoodStd) }));
  const postData = xValues.map((x) => ({ x, y: normalPdf(x, posterior.mean, posterior.std) }));

  const yMax = max([...priorData, ...likeData, ...postData], (entry) => entry.y) || 1;

  const xScale = scaleLinear().domain([minX, maxX]).range([padding, width - padding]);
  const yScale = scaleLinear().domain([0, yMax]).range([height - padding, padding]);

  const drawLine = line().x((point) => xScale(point.x)).y((point) => yScale(point.y));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="lab-svg" role="img" aria-label="Prior likelihood and posterior Gaussian curves">
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--text)" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="var(--text)" />
      <path d={drawLine(priorData) || ""} fill="none" stroke="var(--warning)" strokeWidth="2" />
      <path d={drawLine(likeData) || ""} fill="none" stroke="var(--muted-text)" strokeWidth="2" />
      <path d={drawLine(postData) || ""} fill="none" stroke="var(--accent-strong)" strokeWidth="2.4" />
    </svg>
  );
}

export default function LabGaussianUpdater() {
  const [mu0, setMu0] = useState(0);
  const [sigma0, setSigma0] = useState(2);
  const [sigma, setSigma] = useState(1);
  const [x, setX] = useState(1.8);
  const [seed, setSeed] = useState(606);
  const [simTrials, setSimTrials] = useState(6000);

  const posterior = useMemo(() => gaussianPosterior({ mu0, sigma0, sigma, x }), [mu0, sigma0, sigma, x]);
  const simulation = useMemo(
    () => simulateNormalMean({ mean: posterior.posteriorMean, std: posterior.posteriorStd, trials: simTrials, seed }),
    [posterior.posteriorMean, posterior.posteriorStd, seed, simTrials]
  );

  return (
    <article className="card lab-card" aria-label="Lab 6 gaussian gaussian updater">
      <h3>Lab 6: Gaussian-Gaussian Updater</h3>
      <p>Posterior is Gaussian with precision-weighted mean and reduced variance.</p>
      <div className="lab-grid">
        <div>
          <SliderInput id="lab6-mu0" label="Prior mean mu0" min={-5} max={5} step={0.1} value={mu0} onChange={setMu0} />
          <SliderInput id="lab6-sigma0" label="Prior std sigma0" min={0.5} max={5} step={0.1} value={sigma0} onChange={setSigma0} />
          <SliderInput id="lab6-sigma" label="Likelihood std sigma" min={0.3} max={4} step={0.1} value={sigma} onChange={setSigma} />
          <SliderInput id="lab6-x" label="Observed x" min={-8} max={8} step={0.1} value={x} onChange={setX} />
          <label className="input-row" htmlFor="lab6-seed">
            <span>Simulation seed</span>
            <input id="lab6-seed" type="number" value={seed} onChange={(event) => setSeed(Number(event.target.value) || 606)} />
          </label>
          <SliderInput id="lab6-sim-trials" label="Simulation trials" min={500} max={50000} step={500} value={simTrials} onChange={setSimTrials} />
        </div>

        <div>
          <GaussianPlot
            prior={{ mean: mu0, std: sigma0 }}
            likelihoodMean={x}
            likelihoodStd={sigma}
            posterior={{ mean: posterior.posteriorMean, std: posterior.posteriorStd }}
          />
          <div className="result-grid">
            <p><strong>Posterior mean</strong>: {roundTo(posterior.posteriorMean, 4)}</p>
            <p><strong>Posterior variance</strong>: {roundTo(posterior.posteriorVariance, 4)}</p>
            <p><strong>Posterior std</strong>: {roundTo(posterior.posteriorStd, 4)}</p>
            <p><strong>Shrinkage to observation</strong>: {roundTo(posterior.shrinkageToObservation, 4)}</p>
          </div>
          <MathDisplay math={`\\sigma_n^2=\\left(\\frac{1}{\\sigma_0^2}+\\frac{1}{\\sigma^2}\\right)^{-1}=${roundTo(posterior.posteriorVariance, 4)}`} />
          <MathDisplay math={`\\mu_n=\\sigma_n^2\\left(\\frac{\\mu_0}{\\sigma_0^2}+\\frac{x}{\\sigma^2}\\right)=${roundTo(posterior.posteriorMean, 4)}`} />
          <SimulationAgreementPanel label="Posterior mean" theoretical={posterior.posteriorMean} estimate={simulation.estimate} trials={simulation.trials} tolerance={0.08} />
        </div>
      </div>
    </article>
  );
}
