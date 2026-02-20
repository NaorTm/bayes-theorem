import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3";
import SliderInput from "./SliderInput";
import { roundTo, toPercent } from "../utils/format";

const lensLabels = {
  area: "Area",
  tree: "Tree",
  matrix: "Matrix",
  odds: "Odds"
};

function AreaLens({ prior, pBGivenA, pBGivenNotA }) {
  const width = 320;
  const height = 180;
  const x = scaleLinear().domain([0, 1]).range([0, width]);
  const y = scaleLinear().domain([0, 1]).range([height, 0]);
  const aWidth = x(prior);
  const bGivenAHeight = height - y(pBGivenA);
  const bGivenNotAHeight = height - y(pBGivenNotA);

  return (
    <figure className="lens-figure" aria-label="Area model">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Unit square area model for Bayes theorem">
        <rect x="0" y="0" width={aWidth} height={height} fill="var(--accent-soft)" />
        <rect x={aWidth} y="0" width={width - aWidth} height={height} fill="var(--muted-bg)" />
        <rect
          x="0"
          y={height - bGivenAHeight}
          width={aWidth}
          height={bGivenAHeight}
          fill="var(--accent-strong)"
        />
        <rect
          x={aWidth}
          y={height - bGivenNotAHeight}
          width={width - aWidth}
          height={bGivenNotAHeight}
          fill="var(--warning)"
        />
        <line x1={aWidth} y1="0" x2={aWidth} y2={height} stroke="var(--text)" strokeDasharray="4 4" />
      </svg>
      <figcaption>
        <code>A ∩ B</code> (teal) is numerator mass; <code>Aᶜ ∩ B</code> (orange) joins it in the denominator.
      </figcaption>
    </figure>
  );
}

function TreeLens({ prior, pBGivenA, pBGivenNotA, values }) {
  return (
    <div className="lens-text" aria-label="Tree model">
      <p>
        <code>P(A)={toPercent(prior)}</code>, <code>P(B|A)={toPercent(pBGivenA)}</code> → <code>P(A ∩ B)={toPercent(values.numerator)}</code>
      </p>
      <p>
        <code>P(Aᶜ)={toPercent(1 - prior)}</code>, <code>P(B|Aᶜ)={toPercent(pBGivenNotA)}</code> → <code>P(Aᶜ ∩ B)={toPercent(values.altEvidenceMass)}</code>
      </p>
      <p>
        Evidence total <code>P(B)={toPercent(values.denominator)}</code>, so <code>P(A|B)={toPercent(values.posterior)}</code>.
      </p>
    </div>
  );
}

function MatrixLens({ counts, values }) {
  return (
    <>
      <table className="matrix-table" aria-label="Confusion matrix style lens">
        <caption>Counts per {counts.population.toLocaleString()}</caption>
        <thead>
          <tr>
            <th scope="col"> </th>
            <th scope="col">B</th>
            <th scope="col">Not B</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">A</th>
            <td>{Math.round(counts.aAndB).toLocaleString()}</td>
            <td>{Math.round(counts.aAndNotB).toLocaleString()}</td>
          </tr>
          <tr>
            <th scope="row">Not A</th>
            <td>{Math.round(counts.notAAndB).toLocaleString()}</td>
            <td>{Math.round(counts.notAAndNotB).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <p className="lens-footnote">
        Matrix denominator is positive column total <code>{Math.round(counts.aAndB + counts.notAAndB).toLocaleString()}</code> = <code>P(B)</code>.
        Numerator is <code>{Math.round(counts.aAndB).toLocaleString()}</code> = <code>P(A ∩ B)</code>.
      </p>
      <p className="lens-footnote">
        Normalize: <code>{roundTo(values.posterior, 4)}</code> = <code>{Math.round(counts.aAndB).toLocaleString()}</code> / <code>{Math.round(counts.aAndB + counts.notAAndB).toLocaleString()}</code>.
      </p>
    </>
  );
}

function OddsLens({ values }) {
  return (
    <div className="lens-text" aria-label="Odds model">
      <p>
        Prior odds: <code>{roundTo(values.priorOdds, 4)}</code>
      </p>
      <p>
        Likelihood ratio: <code>{roundTo(values.lr, 4)}</code>
      </p>
      <p>
        Posterior odds: <code>{roundTo(values.posteriorOdds, 4)}</code>
      </p>
      <p>
        <code>log O(A|B)=log LR+log O(A)</code> (same normalization result in odds space).
      </p>
    </div>
  );
}

export default function BayesLensPanel({ prior, pBGivenA, pBGivenNotA, population }) {
  const [focusLens, setFocusLens] = useState("area");
  const [scenario, setScenario] = useState({ prior, pBGivenA, pBGivenNotA });

  const values = useMemo(() => {
    const numerator = scenario.prior * scenario.pBGivenA;
    const altEvidenceMass = (1 - scenario.prior) * scenario.pBGivenNotA;
    const denominator = numerator + altEvidenceMass;
    const posterior = denominator === 0 ? 0 : numerator / denominator;
    const counts = {
      population,
      aAndB: population * numerator,
      aAndNotB: population * scenario.prior * (1 - scenario.pBGivenA),
      notAAndB: population * altEvidenceMass,
      notAAndNotB: population * (1 - scenario.prior) * (1 - scenario.pBGivenNotA)
    };
    const priorOdds = scenario.prior / Math.max(1 - scenario.prior, 1e-9);
    const lr = scenario.pBGivenA / Math.max(scenario.pBGivenNotA, 1e-9);
    const posteriorOdds = priorOdds * lr;

    return {
      numerator,
      altEvidenceMass,
      denominator,
      posterior,
      counts,
      priorOdds,
      lr,
      posteriorOdds
    };
  }, [population, scenario.pBGivenA, scenario.pBGivenNotA, scenario.prior]);

  return (
    <section className="card">
      <h3>Four lenses, one synchronized numeric scenario</h3>
      <p>Adjust one scenario and inspect the same Bayes update through area, tree, matrix, and odds views.</p>

      <div className="lens-controls" aria-label="Synchronized Bayes scenario controls">
        <SliderInput
          id="lens-prior"
          label="P(A) prior"
          min={0.01}
          max={0.99}
          step={0.01}
          value={scenario.prior}
          onChange={(value) => setScenario((prev) => ({ ...prev, prior: value }))}
          display={toPercent(scenario.prior, 1)}
        />
        <SliderInput
          id="lens-like-a"
          label="P(B|A) likelihood"
          min={0.01}
          max={0.99}
          step={0.01}
          value={scenario.pBGivenA}
          onChange={(value) => setScenario((prev) => ({ ...prev, pBGivenA: value }))}
          display={toPercent(scenario.pBGivenA, 1)}
        />
        <SliderInput
          id="lens-like-not-a"
          label="P(B|A^c) alternative likelihood"
          min={0.01}
          max={0.99}
          step={0.01}
          value={scenario.pBGivenNotA}
          onChange={(value) => setScenario((prev) => ({ ...prev, pBGivenNotA: value }))}
          display={toPercent(scenario.pBGivenNotA, 1)}
        />
      </div>

      <section className="bayes-breakdown" aria-label="Denominator-first Bayes breakdown">
        <h4>Denominator-first Bayes breakdown</h4>
        <p>
          <strong>Numerator:</strong> <code>P(A ∩ B)=P(B|A)P(A)={toPercent(scenario.pBGivenA)}×{toPercent(scenario.prior)}={toPercent(values.numerator)}</code>
        </p>
        <p>
          <strong>Denominator (evidence):</strong>{" "}
          <code>
            P(B)=P(B|A)P(A)+P(B|A^c)P(A^c)={toPercent(values.numerator)}+{toPercent(values.altEvidenceMass)}={toPercent(values.denominator)}
          </code>
        </p>
        <p>
          <strong>Normalize:</strong> <code>P(A|B)=P(A ∩ B)/P(B)={toPercent(values.posterior)}</code>
        </p>
      </section>

      <div className="lens-tabs" role="tablist" aria-label="Focus lens toggle">
        {Object.entries(lensLabels).map(([key, label]) => (
          <button
            type="button"
            key={key}
            role="tab"
            aria-selected={focusLens === key}
            className={focusLens === key ? "active" : ""}
            onClick={() => setFocusLens(key)}
          >
            Focus: {label}
          </button>
        ))}
      </div>

      <div className="lens-grid">
        <section className={`lens-card ${focusLens === "area" ? "active" : ""}`} aria-label="Area lens card">
          <h4>Area lens</h4>
          <AreaLens prior={scenario.prior} pBGivenA={scenario.pBGivenA} pBGivenNotA={scenario.pBGivenNotA} />
        </section>

        <section className={`lens-card ${focusLens === "tree" ? "active" : ""}`} aria-label="Tree lens card">
          <h4>Tree lens</h4>
          <TreeLens
            prior={scenario.prior}
            pBGivenA={scenario.pBGivenA}
            pBGivenNotA={scenario.pBGivenNotA}
            values={values}
          />
        </section>

        <section className={`lens-card ${focusLens === "matrix" ? "active" : ""}`} aria-label="Matrix lens card">
          <h4>Matrix lens</h4>
          <MatrixLens counts={values.counts} values={values} />
        </section>

        <section className={`lens-card ${focusLens === "odds" ? "active" : ""}`} aria-label="Odds lens card">
          <h4>Odds lens</h4>
          <OddsLens values={values} />
        </section>
      </div>
    </section>
  );
}

BayesLensPanel.propTypes = {
  prior: PropTypes.number,
  pBGivenA: PropTypes.number,
  pBGivenNotA: PropTypes.number,
  population: PropTypes.number
};

BayesLensPanel.defaultProps = {
  prior: 0.01,
  pBGivenA: 0.95,
  pBGivenNotA: 0.1,
  population: 10000
};
