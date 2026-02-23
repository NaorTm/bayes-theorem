import PropTypes from "prop-types";
import { clamp, roundTo, toPercent } from "../utils/format";

function AreaPreview({ params }) {
  const prior = clamp(Number(params?.prior ?? 0.2), 0.01, 0.95);
  const pBGivenA = clamp(Number(params?.pBGivenA ?? 0.8), 0.01, 0.99);
  const pBGivenNotA = clamp(Number(params?.pBGivenNotA ?? 0.15), 0.01, 0.99);

  const width = 300;
  const height = 140;
  const aWidth = width * prior;
  const bHeightA = height * pBGivenA;
  const bHeightNotA = height * pBGivenNotA;

  return (
    <figure className="example-visual-body" aria-label="Area visualization">
      <svg viewBox={`0 0 ${width} ${height}`} className="lab-svg" role="img" aria-label="Unit square area model">
        <rect x="0" y="0" width={aWidth} height={height} fill="var(--accent-soft)" />
        <rect x={aWidth} y="0" width={width - aWidth} height={height} fill="var(--muted-bg)" />
        <rect x="0" y="0" width={aWidth} height={bHeightA} fill="var(--accent-strong)" />
        <rect x={aWidth} y="0" width={width - aWidth} height={bHeightNotA} fill="var(--warning)" />
        <line x1={aWidth} y1="0" x2={aWidth} y2={height} stroke="var(--text)" strokeDasharray="4 4" />
      </svg>
      <figcaption>
        A and A^c split the space. Dark region shows A cap B; orange region shows A^c cap B.
      </figcaption>
    </figure>
  );
}

AreaPreview.propTypes = {
  params: PropTypes.object
};

AreaPreview.defaultProps = {
  params: {}
};

function TreePreview({ params }) {
  const priors = Array.isArray(params?.priors) ? params.priors : [0.6, 0.4];
  const likes = Array.isArray(params?.likelihoods) ? params.likelihoods : [0.8, 0.2];

  const p1 = clamp(Number(priors[0] ?? 0.6), 0.01, 0.99);
  const p2 = clamp(Number(priors[1] ?? 0.4), 0.01, 0.99);
  const l1 = clamp(Number(likes[0] ?? 0.8), 0.01, 0.99);
  const l2 = clamp(Number(likes[1] ?? 0.2), 0.01, 0.99);
  const joint1 = p1 * l1;
  const joint2 = p2 * l2;
  const evidence = joint1 + joint2;
  const posterior = evidence === 0 ? 0 : joint1 / evidence;

  return (
    <div className="example-visual-body" aria-label="Tree visualization">
      <svg viewBox="0 0 340 160" className="lab-svg" role="img" aria-label="Two-stage tree diagram">
        <line x1="28" y1="80" x2="130" y2="38" stroke="var(--accent-strong)" strokeWidth="2" />
        <line x1="28" y1="80" x2="130" y2="122" stroke="var(--warning)" strokeWidth="2" />
        <line x1="130" y1="38" x2="290" y2="26" stroke="var(--accent-strong)" strokeWidth="2" />
        <line x1="130" y1="122" x2="290" y2="84" stroke="var(--warning)" strokeWidth="2" />
        <text x="6" y="84" fill="var(--text)">
          Start
        </text>
        <text x="134" y="36" fill="var(--text)">
          H1
        </text>
        <text x="134" y="128" fill="var(--text)">
          H2
        </text>
        <text x="292" y="30" fill="var(--text)">
          E
        </text>
        <text x="292" y="88" fill="var(--text)">
          E
        </text>
      </svg>
      <p>
        P(H1|E) = {toPercent(posterior, 2)} with denominator P(E) = {toPercent(evidence, 2)}.
      </p>
    </div>
  );
}

TreePreview.propTypes = {
  params: PropTypes.object
};

TreePreview.defaultProps = {
  params: {}
};

function MatrixPreview({ params }) {
  const population = Math.max(Number(params?.population ?? 10000), 100);
  const prevalence = clamp(Number(params?.prevalence ?? 0.02), 0.001, 0.95);
  const sensitivity = clamp(Number(params?.sensitivity ?? 0.92), 0.01, 0.999);
  const specificity = clamp(Number(params?.specificity ?? 0.9), 0.01, 0.999);

  const diseased = population * prevalence;
  const healthy = population - diseased;
  const tp = diseased * sensitivity;
  const fn = diseased - tp;
  const tn = healthy * specificity;
  const fp = healthy - tn;
  const positive = tp + fp;
  const posterior = positive === 0 ? 0 : tp / positive;

  return (
    <div className="example-visual-body" aria-label="Confusion matrix visualization">
      <table className="matrix-table">
        <caption>Counts per {Math.round(population).toLocaleString()}</caption>
        <thead>
          <tr>
            <th scope="col"> </th>
            <th scope="col">Condition</th>
            <th scope="col">No condition</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Test +</th>
            <td>{Math.round(tp).toLocaleString()}</td>
            <td>{Math.round(fp).toLocaleString()}</td>
          </tr>
          <tr>
            <th scope="row">Test {"\u2212"}</th>
            <td>{Math.round(fn).toLocaleString()}</td>
            <td>{Math.round(tn).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <p>P(Condition|+) = {toPercent(posterior, 2)}</p>
    </div>
  );
}

MatrixPreview.propTypes = {
  params: PropTypes.object
};

MatrixPreview.defaultProps = {
  params: {}
};

function OddsPreview({ params }) {
  const priorOdds = Math.max(Number(params?.priorOdds ?? 0.2), 0.001);
  const lr = Math.max(Number(params?.likelihoodRatio ?? 5), 0.001);
  const posteriorOdds = priorOdds * lr;
  const posteriorProbability = posteriorOdds / (1 + posteriorOdds);

  return (
    <div className="example-visual-body" aria-label="Odds visualization">
      <p>Prior odds: {roundTo(priorOdds, 3)}</p>
      <p>Likelihood ratio: {roundTo(lr, 3)}</p>
      <p>Posterior odds: {roundTo(posteriorOdds, 3)}</p>
      <p>Posterior probability: {toPercent(posteriorProbability, 2)}</p>
      <p>log odds posterior = log LR + log odds prior</p>
    </div>
  );
}

OddsPreview.propTypes = {
  params: PropTypes.object
};

OddsPreview.defaultProps = {
  params: {}
};

function SankeyPreview() {
  return (
    <div className="example-visual-body" aria-label="Sankey-style flow visualization">
      <svg viewBox="0 0 340 140" className="lab-svg" role="img" aria-label="Flow from hypotheses to evidence">
        <path d="M 30 30 C 140 30, 210 26, 310 26" stroke="var(--accent-strong)" strokeWidth="16" fill="none" />
        <path d="M 30 54 C 140 76, 210 98, 310 112" stroke="var(--accent-soft)" strokeWidth="20" fill="none" />
        <path d="M 30 96 C 140 70, 210 44, 310 28" stroke="var(--warning)" strokeWidth="10" fill="none" />
        <path d="M 30 116 C 140 116, 210 116, 310 116" stroke="var(--muted-text)" strokeWidth="18" fill="none" />
      </svg>
      <p>Flow widths represent weighted likelihood mass that sums into evidence.</p>
    </div>
  );
}

function DensityPreview() {
  return (
    <div className="example-visual-body" aria-label="Density visualization">
      <svg viewBox="0 0 340 160" className="lab-svg" role="img" aria-label="Prior and posterior density curves">
        <line x1="20" y1="134" x2="320" y2="134" stroke="var(--text)" />
        <path d="M 24 134 C 90 24, 155 24, 210 134" stroke="var(--warning)" strokeWidth="3" fill="none" />
        <path d="M 110 134 C 160 36, 230 36, 292 134" stroke="var(--accent-strong)" strokeWidth="3" fill="none" />
      </svg>
      <p>Overlayed densities compare prior assumptions with the posterior update.</p>
    </div>
  );
}

export default function ExampleVisualPreview({ visual }) {
  const widget = visual?.widget ?? "matrix";
  const params = visual?.params ?? {};

  return (
    <section className="example-visual card-lite">
      <p className="eyebrow">Visualization Lens</p>
      <h5>{widget}</h5>

      {widget === "area" ? <AreaPreview params={params} /> : null}
      {widget === "tree" ? <TreePreview params={params} /> : null}
      {widget === "matrix" ? <MatrixPreview params={params} /> : null}
      {widget === "odds" ? <OddsPreview params={params} /> : null}
      {widget === "sankey" ? <SankeyPreview /> : null}
      {widget === "density" ? <DensityPreview /> : null}

      {!["area", "tree", "matrix", "odds", "sankey", "density"].includes(widget) ? (
        <p>Widget: {widget}</p>
      ) : null}
    </section>
  );
}

ExampleVisualPreview.propTypes = {
  visual: PropTypes.shape({
    widget: PropTypes.string,
    params: PropTypes.object
  })
};

ExampleVisualPreview.defaultProps = {
  visual: undefined
};
