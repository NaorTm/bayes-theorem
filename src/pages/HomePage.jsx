import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="home-page">
      <div className="hero card">
        <p className="eyebrow">From intuition to inference</p>
        <h2>Bayes&apos; theorem, deeply and interactively</h2>
        <p>
          This site teaches Bayes through multiple synchronized mental models: area geometry,
          trees, confusion matrices, flows, and odds. You get derivations, step-by-step worked
          examples, simulation-backed labs, and graded practice with hints and full solutions.
        </p>
        <div className="cta-row">
          <Link className="button" to="/tutorial">
            Start Tutorial
          </Link>
          <Link className="button secondary" to="/labs">
            Open Visual Labs
          </Link>
          <Link className="button secondary" to="/examples">
            Explore Examples
          </Link>
        </div>
      </div>

      <div className="home-grid">
        <article className="card">
          <h3>What you will master</h3>
          <ul>
            <li>Translate text problems into events and hypotheses.</li>
            <li>Derive Bayes from definitions and total probability.</li>
            <li>Compute discrete and continuous posteriors correctly.</li>
            <li>Avoid base-rate neglect and denominator errors.</li>
            <li>Use odds, Bayes factors, and cost-sensitive decisions.</li>
          </ul>
        </article>
        <article className="card">
          <h3>Built-in learning loop</h3>
          <ul>
            <li>Intuition first, then formal definition and derivation.</li>
            <li>Worked example with matching interactive visualization.</li>
            <li>Quick-check quiz with immediate feedback.</li>
            <li>Trap question targeting common mistakes.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
