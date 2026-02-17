import { useMemo, useState } from "react";
import SliderInput from "../SliderInput";
import { confusionMatrixFromRates } from "../../utils/bayes";
import { roundTo, toPercent } from "../../utils/format";
import { MathDisplay } from "../MathText";

export default function LabConfusionMatrix() {
  const [prevalence, setPrevalence] = useState(0.01);
  const [sensitivity, setSensitivity] = useState(0.95);
  const [specificity, setSpecificity] = useState(0.9);
  const [population, setPopulation] = useState(10000);

  const matrix = useMemo(
    () =>
      confusionMatrixFromRates({
        prevalence,
        sensitivity,
        specificity,
        population
      }),
    [prevalence, sensitivity, specificity, population]
  );

  return (
    <article className="card lab-card" aria-label="Lab 3 confusion matrix playground">
      <h3>Lab 3: Confusion Matrix Playground</h3>
      <p>Use prevalence, sensitivity, and specificity to see how base rates drive posterior probabilities.</p>

      <div className="lab-grid">
        <div>
          <SliderInput
            id="lab3-prevalence"
            label="Prevalence"
            min={0.001}
            max={0.3}
            step={0.001}
            value={prevalence}
            onChange={setPrevalence}
            display={toPercent(prevalence, 2)}
          />
          <SliderInput
            id="lab3-sensitivity"
            label="Sensitivity"
            min={0.5}
            max={0.999}
            step={0.001}
            value={sensitivity}
            onChange={setSensitivity}
            display={toPercent(sensitivity, 2)}
          />
          <SliderInput
            id="lab3-specificity"
            label="Specificity"
            min={0.5}
            max={0.999}
            step={0.001}
            value={specificity}
            onChange={setSpecificity}
            display={toPercent(specificity, 2)}
          />

          <label className="input-row" htmlFor="lab3-population">
            <span>Population N</span>
            <input
              id="lab3-population"
              type="number"
              min={100}
              step={100}
              value={population}
              onChange={(event) => setPopulation(Number(event.target.value) || 10000)}
            />
          </label>
        </div>

        <div>
          <table className="matrix-table" aria-label="2 by 2 confusion matrix">
            <caption>Counts per {population.toLocaleString()}</caption>
            <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col">Disease</th>
                <th scope="col">No disease</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Test +</th>
                <td>{Math.round(matrix.truePositive).toLocaleString()}</td>
                <td>{Math.round(matrix.falsePositive).toLocaleString()}</td>
              </tr>
              <tr>
                <th scope="row">Test -</th>
                <td>{Math.round(matrix.falseNegative).toLocaleString()}</td>
                <td>{Math.round(matrix.trueNegative).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div className="result-grid">
            <p>
              <strong>False positive rate</strong>: {toPercent(matrix.falsePositiveRate, 2)}
            </p>
            <p>
              <strong>False negative rate</strong>: {toPercent(matrix.falseNegativeRate, 2)}
            </p>
            <p>
              <strong>P(Disease|+)</strong>: {toPercent(matrix.posteriorGivenPositive, 2)}
            </p>
            <p>
              <strong>P(Disease|-)</strong>: {toPercent(matrix.posteriorGivenNegative, 2)}
            </p>
          </div>

          <MathDisplay
            math={`P(D\\mid +)=\\frac{Se\\cdot Prev}{Se\\cdot Prev + (1-Sp)(1-Prev)}=${roundTo(
              matrix.posteriorGivenPositive,
              4
            )}`}
          />
        </div>
      </div>
    </article>
  );
}
