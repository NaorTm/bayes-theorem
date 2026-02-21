import { useMemo, useState } from "react";
import { line, max, scaleLinear } from "d3";
import SliderInput from "../SliderInput";
import { betaPosterior } from "../../utils/bayes";
import { betaCredibleInterval, betaPdf, linspace } from "../../utils/math";
import { runBernoulliTrialSeries } from "../../utils/rng";
import { roundTo, toPercent } from "../../utils/format";
import { MathDisplay } from "../MathText";
import SimulationAgreementPanel from "./SimulationAgreementPanel";

function DensityPlot({ prior, posterior }) {
  const width = 360;
  const height = 220;
  const padding = 28;

  const xValues = linspace(0.001, 0.999, 220);
  const priorData = xValues.map((x) => ({ x, y: betaPdf(x, prior.alpha, prior.beta) }));
  const postData = xValues.map((x) => ({ x, y: betaPdf(x, posterior.alpha, posterior.beta) }));

  const yMax = max([...priorData, ...postData], (entry) => entry.y) || 1;

  const xScale = scaleLinear().domain([0, 1]).range([padding, width - padding]);
  const yScale = scaleLinear().domain([0, yMax]).range([height - padding, padding]);

  const drawLine = line()
    .x((point) => xScale(point.x))
    .y((point) => yScale(point.y));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Prior and posterior Beta distributions"
      className="lab-svg"
    >
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--text)" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="var(--text)" />
      <path d={drawLine(priorData) || ""} fill="none" stroke="var(--warning)" strokeWidth="2.5" />
      <path d={drawLine(postData) || ""} fill="none" stroke="var(--accent-strong)" strokeWidth="2.5" />
      <text x={width - padding - 100} y={padding + 14} fill="var(--warning)">
        Prior
      </text>
      <text x={width - padding - 100} y={padding + 34} fill="var(--accent-strong)">
        Posterior
      </text>
      <text x={width - padding - 20} y={height - padding + 18} fill="var(--text)">
        theta
      </text>
    </svg>
  );
}

export default function LabBetaBinomial() {
  const [alpha, setAlpha] = useState(2);
  const [beta, setBeta] = useState(2);
  const [n, setN] = useState(20);
  const [k, setK] = useState(12);
  const [seed, setSeed] = useState(17);
  const [trueP, setTrueP] = useState(0.6);
  const [simTrials, setSimTrials] = useState(60);

  const posterior = useMemo(() => betaPosterior(alpha, beta, k, n), [alpha, beta, k, n]);

  const priorMean = alpha / (alpha + beta);
  const posteriorMean = posterior.alpha / (posterior.alpha + posterior.beta);
  const credible = useMemo(() => betaCredibleInterval(posterior.alpha, posterior.beta), [posterior]);

  const simulation = useMemo(
    () => runBernoulliTrialSeries(trueP, simTrials, seed),
    [seed, trueP, simTrials]
  );

  return (
    <article className="card lab-card" aria-label="Lab 5 beta binomial updater">
      <h3>Lab 5: Beta-Binomial Updater</h3>
      <p>Posterior Beta(alpha + k, beta + n - k), with deterministic simulation via seed.</p>

      <div className="lab-grid">
        <div>
          <SliderInput
            id="lab5-alpha"
            label="Prior alpha"
            min={1}
            max={20}
            step={1}
            value={alpha}
            onChange={setAlpha}
          />
          <SliderInput
            id="lab5-beta"
            label="Prior beta"
            min={1}
            max={20}
            step={1}
            value={beta}
            onChange={setBeta}
          />
          <SliderInput
            id="lab5-n"
            label="Observations n"
            min={1}
            max={200}
            step={1}
            value={n}
            onChange={(value) => {
              setN(value);
              if (k > value) {
                setK(value);
              }
            }}
          />
          <SliderInput
            id="lab5-k"
            label="Successes k"
            min={0}
            max={n}
            step={1}
            value={k}
            onChange={setK}
          />

          <label className="input-row" htmlFor="lab5-seed">
            <span>Simulation seed</span>
            <input
              id="lab5-seed"
              type="number"
              value={seed}
              onChange={(event) => setSeed(Number(event.target.value) || 17)}
            />
          </label>
          <SliderInput
            id="lab5-true-p"
            label="Simulation true p"
            min={0.05}
            max={0.95}
            step={0.01}
            value={trueP}
            onChange={setTrueP}
            display={toPercent(trueP, 1)}
          />
          <SliderInput
            id="lab5-simtrials"
            label="Simulation trials"
            min={10}
            max={500}
            step={5}
            value={simTrials}
            onChange={setSimTrials}
          />
        </div>

        <div>
          <DensityPlot prior={{ alpha, beta }} posterior={posterior} />

          <div className="result-grid">
            <p>
              <strong>Prior mean</strong>: {roundTo(priorMean, 4)}
            </p>
            <p>
              <strong>Posterior mean</strong>: {roundTo(posteriorMean, 4)}
            </p>
            <p>
              <strong>95% credible interval</strong>: [{roundTo(credible.lower, 3)}, {roundTo(credible.upper, 3)}]
            </p>
            <p>
              <strong>Simulation successes</strong>: {simulation.successes}/{simTrials}
            </p>
            <p>
              <strong>Simulation estimate</strong>: {roundTo(simulation.successes / Math.max(simTrials, 1), 4)}
            </p>
          </div>

          <MathDisplay
            math={`\\text{Posterior}=\\text{Beta}(\\alpha+k,\\beta+n-k)=\\text{Beta}(${posterior.alpha},${posterior.beta})`}
          />
          <SimulationAgreementPanel
            label="Posterior mean"
            theoretical={posteriorMean}
            estimate={simulation.successes / Math.max(simTrials, 1)}
            trials={simTrials}
            tolerance={0.08}
          />
        </div>
      </div>
    </article>
  );
}
