import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3";
import { toPercent } from "../utils/format";

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
        Left block is <code>A</code>, dark strip is <code>A \cap B</code>, orange strip is <code>A^c \cap B</code>.
      </figcaption>
    </figure>
  );
}

AreaLens.propTypes = {
  prior: PropTypes.number.isRequired,
  pBGivenA: PropTypes.number.isRequired,
  pBGivenNotA: PropTypes.number.isRequired
};

function TreeLens({ prior, pBGivenA, pBGivenNotA, posterior, evidence }) {
  return (
    <div className="lens-text" aria-label="Tree model">
      <p>
        Branch 1: <code>P(A)={toPercent(prior)}</code>, then <code>P(B|A)={toPercent(pBGivenA)}</code>
      </p>
      <p>
        Branch 2: <code>P(A^c)={toPercent(1 - prior)}</code>, then <code>P(B|A^c)={toPercent(pBGivenNotA)}</code>
      </p>
      <p>
        Leaf totals: <code>P(B)={toPercent(evidence)}</code>, posterior <code>P(A|B)={toPercent(posterior)}</code>
      </p>
    </div>
  );
}

TreeLens.propTypes = {
  prior: PropTypes.number.isRequired,
  pBGivenA: PropTypes.number.isRequired,
  pBGivenNotA: PropTypes.number.isRequired,
  posterior: PropTypes.number.isRequired,
  evidence: PropTypes.number.isRequired
};

function MatrixLens({ counts }) {
  return (
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
  );
}

MatrixLens.propTypes = {
  counts: PropTypes.shape({
    population: PropTypes.number.isRequired,
    aAndB: PropTypes.number.isRequired,
    aAndNotB: PropTypes.number.isRequired,
    notAAndB: PropTypes.number.isRequired,
    notAAndNotB: PropTypes.number.isRequired
  }).isRequired
};

function OddsLens({ priorOdds, posteriorOdds, likelihoodRatio }) {
  return (
    <div className="lens-text" aria-label="Odds model">
      <p>
        Prior odds: <code>{priorOdds.toFixed(3)}</code>
      </p>
      <p>
        Likelihood ratio: <code>{likelihoodRatio.toFixed(3)}</code>
      </p>
      <p>
        Posterior odds: <code>{posteriorOdds.toFixed(3)}</code>
      </p>
      <p>Log-odds update: log posterior = log LR + log prior.</p>
    </div>
  );
}

OddsLens.propTypes = {
  priorOdds: PropTypes.number.isRequired,
  posteriorOdds: PropTypes.number.isRequired,
  likelihoodRatio: PropTypes.number.isRequired
};

export default function BayesLensPanel({ prior, pBGivenA, pBGivenNotA, population }) {
  const [lens, setLens] = useState("area");

  const values = useMemo(() => {
    const numerator = prior * pBGivenA;
    const denominator = numerator + (1 - prior) * pBGivenNotA;
    const posterior = denominator === 0 ? 0 : numerator / denominator;
    const counts = {
      population,
      aAndB: population * numerator,
      aAndNotB: population * prior * (1 - pBGivenA),
      notAAndB: population * (1 - prior) * pBGivenNotA,
      notAAndNotB: population * (1 - prior) * (1 - pBGivenNotA)
    };
    const priorOdds = prior / Math.max(1 - prior, 1e-9);
    const lr = pBGivenA / Math.max(pBGivenNotA, 1e-9);
    const posteriorOdds = priorOdds * lr;
    return {
      posterior,
      evidence: denominator,
      counts,
      priorOdds,
      lr,
      posteriorOdds
    };
  }, [prior, pBGivenA, pBGivenNotA, population]);

  return (
    <section className="card">
      <h3>Four lenses, one numeric example</h3>
      <div className="lens-tabs" role="tablist" aria-label="Bayes lens toggle">
        {Object.entries(lensLabels).map(([key, label]) => (
          <button
            type="button"
            key={key}
            role="tab"
            aria-selected={lens === key}
            className={lens === key ? "active" : ""}
            onClick={() => setLens(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {lens === "area" ? <AreaLens prior={prior} pBGivenA={pBGivenA} pBGivenNotA={pBGivenNotA} /> : null}
      {lens === "tree" ? (
        <TreeLens
          prior={prior}
          pBGivenA={pBGivenA}
          pBGivenNotA={pBGivenNotA}
          posterior={values.posterior}
          evidence={values.evidence}
        />
      ) : null}
      {lens === "matrix" ? <MatrixLens counts={values.counts} /> : null}
      {lens === "odds" ? (
        <OddsLens
          priorOdds={values.priorOdds}
          posteriorOdds={values.posteriorOdds}
          likelihoodRatio={values.lr}
        />
      ) : null}
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
