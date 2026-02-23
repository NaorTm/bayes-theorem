import { Link } from "react-router-dom";
import { tutorialModules } from "../data/tutorialModules";
import { examples } from "../data/examples";
import { practiceLevels, totalPracticeProblemCount } from "../data/practice";
import { labs } from "../components/labs";

function countRichExamples() {
  return examples.filter((example) => Number(example.id.replace("ex", "")) <= 18).length;
}

export default function HomePage() {
  const richExamples = countRichExamples();
  const moduleCount = tutorialModules.filter((module) => module.id !== "P").length;
  const practiceLevelCount = practiceLevels.length;

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

      <article className="card">
        <h3>Coverage Snapshot</h3>
        <dl className="kv-grid home-metrics">
          <div>
            <dt>Tutorial modules A-J</dt>
            <dd>{moduleCount}</dd>
          </div>
          <div>
            <dt>Visual labs</dt>
            <dd>{labs.length}</dd>
          </div>
          <div>
            <dt>Examples total</dt>
            <dd>{examples.length}</dd>
          </div>
          <div>
            <dt>Rich worked examples</dt>
            <dd>{richExamples}</dd>
          </div>
          <div>
            <dt>Practice levels</dt>
            <dd>{practiceLevelCount}</dd>
          </div>
          <div>
            <dt>Practice problems</dt>
            <dd>{totalPracticeProblemCount}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
