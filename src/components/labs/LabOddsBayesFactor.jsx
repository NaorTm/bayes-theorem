import { useMemo, useState } from "react";
import SliderInput from "../SliderInput";
import { oddsUpdate, priorProbabilityFromOdds } from "../../utils/bayes";
import { roundTo, toPercent } from "../../utils/format";
import { MathDisplay } from "../MathText";

function evidenceStrength(lr) {
  if (lr < 1) {
    return "Evidence favors H0";
  }
  if (lr < 3) {
    return "Weak evidence";
  }
  if (lr < 10) {
    return "Moderate evidence";
  }
  return "Strong evidence";
}

export default function LabOddsBayesFactor() {
  const [priorOdds, setPriorOdds] = useState(0.2);
  const [likelihoodRatio, setLikelihoodRatio] = useState(6);

  const updated = useMemo(() => oddsUpdate(priorOdds, likelihoodRatio), [priorOdds, likelihoodRatio]);
  const posteriorProbability = priorProbabilityFromOdds(updated.posteriorOdds);

  return (
    <article className="card lab-card" aria-label="Lab 4 odds and Bayes factor">
      <h3>Lab 4: Odds and Bayes Factor</h3>
      <p>Update in odds form. Multiplication in odds is addition in log-odds.</p>

      <div className="lab-grid">
        <div>
          <SliderInput
            id="lab4-prior-odds"
            label="Prior odds H1:H0"
            min={0.01}
            max={20}
            step={0.01}
            value={priorOdds}
            onChange={setPriorOdds}
            display={roundTo(priorOdds, 2)}
          />
          <SliderInput
            id="lab4-lr"
            label="Likelihood ratio"
            min={0.1}
            max={50}
            step={0.1}
            value={likelihoodRatio}
            onChange={setLikelihoodRatio}
            display={roundTo(likelihoodRatio, 1)}
          />
          <p>
            Evidence strength: <strong>{evidenceStrength(likelihoodRatio)}</strong>
          </p>
        </div>

        <div>
          <div className="result-grid">
            <p>
              <strong>Posterior odds</strong>: {roundTo(updated.posteriorOdds, 3)}
            </p>
            <p>
              <strong>Posterior probability H1</strong>: {toPercent(posteriorProbability, 2)}
            </p>
            <p>
              <strong>log prior odds</strong>: {roundTo(updated.logOddsPrior, 3)}
            </p>
            <p>
              <strong>log likelihood ratio</strong>: {roundTo(updated.logLikelihoodRatio, 3)}
            </p>
            <p>
              <strong>log posterior odds</strong>: {roundTo(updated.logOddsPosterior, 3)}
            </p>
          </div>
          <MathDisplay
            math={`\\frac{P(H_1\\mid D)}{P(H_0\\mid D)}=\\frac{P(D\\mid H_1)}{P(D\\mid H_0)}\\cdot\\frac{P(H_1)}{P(H_0)}=${roundTo(
              likelihoodRatio,
              3
            )}\\cdot ${roundTo(priorOdds, 3)}=${roundTo(updated.posteriorOdds, 3)}`}
          />
          <MathDisplay
            math={`\\log\\,odds_{post}=\\log\\,LR+\\log\\,odds_{prior}=${roundTo(
              updated.logLikelihoodRatio,
              3
            )}+${roundTo(updated.logOddsPrior, 3)}=${roundTo(updated.logOddsPosterior, 3)}`}
          />
        </div>
      </div>
    </article>
  );
}
