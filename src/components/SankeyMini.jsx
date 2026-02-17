import PropTypes from "prop-types";
import { roundTo, toPercent } from "../utils/format";

export default function SankeyMini({ prior, pBGivenA, pBGivenNotA }) {
  const width = 420;
  const height = 180;
  const totalA = prior;
  const totalNotA = 1 - prior;
  const aToB = totalA * pBGivenA;
  const aToNotB = totalA - aToB;
  const notAToB = totalNotA * pBGivenNotA;
  const notAToNotB = totalNotA - notAToB;

  const scale = (value) => Math.max(value * 110, 2);

  return (
    <figure className="card sankey-card" aria-label="Sankey flow model">
      <h4>Sankey Flow Lens</h4>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Flow from hypotheses to evidence outcomes">
        <text x="12" y="26">A ({toPercent(totalA, 1)})</text>
        <text x="12" y="112">A^c ({toPercent(totalNotA, 1)})</text>
        <text x="320" y="36">B</text>
        <text x="320" y="132">B^c</text>

        <path
          d={`M 70 20 C 180 20, 250 20, 310 20`}
          stroke="var(--accent-strong)"
          strokeWidth={scale(aToB)}
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d={`M 70 40 C 180 70, 250 100, 310 120`}
          stroke="var(--accent-soft)"
          strokeWidth={scale(aToNotB)}
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />

        <path
          d={`M 70 100 C 180 80, 250 50, 310 28`}
          stroke="var(--warning)"
          strokeWidth={scale(notAToB)}
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d={`M 70 125 C 180 125, 250 125, 310 125`}
          stroke="var(--muted-text)"
          strokeWidth={scale(notAToNotB)}
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
      <figcaption>
        Flow widths encode probabilities. Evidence node B has total {toPercent(aToB + notAToB, 2)}.
        Posterior is {roundTo(aToB / Math.max(aToB + notAToB, 1e-9), 4)}.
      </figcaption>
    </figure>
  );
}

SankeyMini.propTypes = {
  prior: PropTypes.number,
  pBGivenA: PropTypes.number,
  pBGivenNotA: PropTypes.number
};

SankeyMini.defaultProps = {
  prior: 0.01,
  pBGivenA: 0.95,
  pBGivenNotA: 0.08
};
