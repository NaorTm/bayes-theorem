import { useMemo, useState } from "react";
import { practiceLevels, totalPracticeProblemCount } from "../data/practice";

export default function PracticePage() {
  const [activeLevel, setActiveLevel] = useState(practiceLevels[0].level);

  const current = useMemo(
    () => practiceLevels.find((level) => level.level === activeLevel) || practiceLevels[0],
    [activeLevel]
  );

  return (
    <section className="stack-page">
      <header className="card">
        <h2>Practice</h2>
        <p>
          {practiceLevels.length} levels, {totalPracticeProblemCount} total problems with three hints and
          full solutions.
        </p>
        <div className="level-tabs" role="tablist" aria-label="Practice levels">
          {practiceLevels.map((level) => (
            <button
              key={level.level}
              type="button"
              role="tab"
              aria-selected={activeLevel === level.level}
              className={activeLevel === level.level ? "active" : ""}
              onClick={() => setActiveLevel(level.level)}
            >
              Level {level.level} ({level.problems.length})
            </button>
          ))}
        </div>
      </header>

      <section className="card">
        <h3>
          Level {current.level}: {current.title}
        </h3>
        <p>{current.problems.length} problems.</p>
      </section>

      {current.problems.map((problem) => (
        <details key={problem.id} className="card">
          <summary>
            {problem.id} - {problem.title}
          </summary>
          <p>{problem.prompt}</p>
          <h4>Hints</h4>
          <ol>
            {problem.hints.map((hint) => (
              <li key={hint}>{hint}</li>
            ))}
          </ol>
          <h4>Full solution</h4>
          <ol>
            {problem.fullSolution.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>
            <strong>Optional simulation check:</strong> {problem.simulationCheck.method}, seed={" "}
            {problem.simulationCheck.seed}
          </p>
        </details>
      ))}
    </section>
  );
}
