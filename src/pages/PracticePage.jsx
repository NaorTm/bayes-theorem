import { useMemo, useState } from "react";
import {
  masterySkillKeys,
  practiceLevels,
  totalPracticeProblemCount
} from "../data/practice";

const initialMastery = {
  denominator: 50,
  baseRates: 50,
  sequential: 50,
  continuous: 50
};

function clampScore(score) {
  return Math.max(0, Math.min(100, score));
}

export default function PracticePage() {
  const [activeLevel, setActiveLevel] = useState(practiceLevels[0].level);
  const [hintModeByProblem, setHintModeByProblem] = useState({});
  const [mastery, setMastery] = useState(initialMastery);

  const current = useMemo(
    () => practiceLevels.find((level) => level.level === activeLevel) || practiceLevels[0],
    [activeLevel]
  );

  const applyMasteryDelta = (skillWeights, solvedWell) => {
    setMastery((prev) => {
      const delta = solvedWell ? 8 : -6;
      const next = { ...prev };

      masterySkillKeys.forEach((skill) => {
        const weight = skillWeights[skill] ?? 0;
        next[skill] = clampScore(prev[skill] + delta * weight);
      });

      return next;
    });
  };

  return (
    <section className="stack-page">
      <header className="card">
        <h2>Practice</h2>
        <p>
          {practiceLevels.length} levels, {totalPracticeProblemCount} total problems with adaptive hints,
          full solutions, and mastery tracking.
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

      <section className="card">
        <h3>Mastery tracker</h3>
        <p>Confidence is estimated per skill and updates as you self-report outcomes.</p>
        <div className="mastery-grid">
          {masterySkillKeys.map((skill) => (
            <div key={skill} className="mastery-item">
              <p>
                <strong>{skill}</strong>: {Math.round(mastery[skill])}%
              </p>
              <div className="progress-track" aria-label={`${skill} mastery`}>
                <div className="progress-fill" style={{ width: `${mastery[skill]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {current.problems.map((problem) => {
        const hintMode = hintModeByProblem[problem.id] || "base";
        const adaptiveHints = problem.hints.adaptive[hintMode];

        return (
          <details key={problem.id} className="card">
            <summary>
              {problem.id} - {problem.title}
            </summary>
            <p>{problem.prompt}</p>

            <label className="input-row" htmlFor={`${problem.id}-hint-mode`}>
              <span>Adaptive hint mode</span>
              <select
                id={`${problem.id}-hint-mode`}
                value={hintMode}
                onChange={(event) =>
                  setHintModeByProblem((prev) => ({
                    ...prev,
                    [problem.id]: event.target.value
                  }))
                }
              >
                <option value="base">General guidance</option>
                <option value="wrongDenominator">I keep missing the denominator</option>
                <option value="swappedConditional">I mix up P(A|B) and P(B|A)</option>
                <option value="independenceMisuse">I misuse independence assumptions</option>
              </select>
            </label>

            <h4>Hints</h4>
            <ol>
              <li>{problem.hints.hint1}</li>
              <li>{adaptiveHints ? adaptiveHints.hint2 : problem.hints.hint2Base}</li>
              <li>{adaptiveHints ? adaptiveHints.hint3 : problem.hints.hint3Base}</li>
            </ol>

            <h4>Full solution</h4>
            <ol>
              {problem.fullSolution.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <div className="mastery-actions">
              <button type="button" onClick={() => applyMasteryDelta(problem.skillWeights, true)}>
                I solved this correctly
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => applyMasteryDelta(problem.skillWeights, false)}
              >
                I need more practice
              </button>
            </div>

            <p>
              <strong>Optional simulation check:</strong> {problem.simulationCheck.method}, seed{" "}
              {problem.simulationCheck.seed}
            </p>
          </details>
        );
      })}
    </section>
  );
}
