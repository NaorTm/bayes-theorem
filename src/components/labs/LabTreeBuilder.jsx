import { useMemo, useState } from "react";
import SliderInput from "../SliderInput";
import { multiHypothesisPosterior } from "../../utils/bayes";
import { normalizeWeights, roundTo, toPercent } from "../../utils/format";
import { MathDisplay } from "../MathText";
import { simulateEventFrequency } from "../../utils/rng";
import SimulationAgreementPanel from "./SimulationAgreementPanel";

export default function LabTreeBuilder() {
  const [priors, setPriors] = useState([0.5, 0.3, 0.2]);
  const [likelihoods, setLikelihoods] = useState([0.9, 0.4, 0.1]);
  const [seed, setSeed] = useState(202);
  const [simTrials, setSimTrials] = useState(6000);

  const normalizedPriors = useMemo(() => normalizeWeights(priors), [priors]);

  const computed = useMemo(
    () => multiHypothesisPosterior(normalizedPriors, likelihoods),
    [normalizedPriors, likelihoods]
  );
  const simulation = useMemo(
    () => simulateEventFrequency({ probability: computed.posteriors[0], trials: simTrials, seed }),
    [computed.posteriors, seed, simTrials]
  );

  const updatePrior = (index, value) => {
    setPriors((prev) => prev.map((entry, idx) => (idx === index ? value : entry)));
  };

  const updateLikelihood = (index, value) => {
    setLikelihoods((prev) => prev.map((entry, idx) => (idx === index ? value : entry)));
  };

  return (
    <article className="card lab-card" aria-label="Lab 2 tree diagram builder">
      <h3>Lab 2: Tree Diagram Builder</h3>
      <p>Stage 1 sets class priors. Stage 2 sets evidence likelihood for each class.</p>

      <div className="lab-grid">
        <div>
          {normalizedPriors.map((value, index) => (
            <div key={`h-${index}`} className="cluster-block">
              <h4>{`Hypothesis H${index + 1}`}</h4>
              <SliderInput
                id={`lab2-prior-${index}`}
                label="Raw prior weight"
                min={0.01}
                max={1.0}
                step={0.01}
                value={priors[index]}
                onChange={(next) => updatePrior(index, next)}
                display={roundTo(priors[index], 2)}
              />
              <p>Normalized prior: {toPercent(value, 2)}</p>
              <SliderInput
                id={`lab2-like-${index}`}
                label="P(Evidence|Hi)"
                min={0.01}
                max={0.99}
                step={0.01}
                value={likelihoods[index]}
                onChange={(next) => updateLikelihood(index, next)}
                display={toPercent(likelihoods[index], 1)}
              />
            </div>
          ))}
          <label className="input-row" htmlFor="lab2-seed">
            <span>Simulation seed</span>
            <input id="lab2-seed" type="number" value={seed} onChange={(event) => setSeed(Number(event.target.value) || 202)} />
          </label>
          <SliderInput
            id="lab2-sim-trials"
            label="Simulation trials"
            min={500}
            max={50000}
            step={500}
            value={simTrials}
            onChange={setSimTrials}
          />
        </div>

        <div>
          <div className="tree-list" role="list" aria-label="Joint probability leaves">
            {normalizedPriors.map((prior, index) => (
              <div role="listitem" key={`leaf-${index}`}>
                <strong>{`H${index + 1}`}</strong>
                <p>{`P(H${index + 1}) = ${toPercent(prior, 2)}`}</p>
                <p>{`P(E|H${index + 1}) = ${toPercent(likelihoods[index], 2)}`}</p>
                <p>{`Joint leaf = ${toPercent(computed.numerators[index], 3)}`}</p>
                <p>{`Posterior = ${toPercent(computed.posteriors[index], 2)}`}</p>
              </div>
            ))}
          </div>
          <p>
            <strong>Evidence total P(E)</strong>: {toPercent(computed.evidence, 3)}
          </p>
          <MathDisplay
            math={`P(H_k\\mid E)=\\frac{P(E\\mid H_k)P(H_k)}{\\sum_iP(E\\mid H_i)P(H_i)}\\quad,\\quad P(E)=${roundTo(
              computed.evidence,
              4
            )}`}
          />
          <SimulationAgreementPanel
            label="P(H1|E)"
            theoretical={computed.posteriors[0]}
            estimate={simulation.estimate}
            trials={simulation.trials}
          />
        </div>
      </div>
    </article>
  );
}
