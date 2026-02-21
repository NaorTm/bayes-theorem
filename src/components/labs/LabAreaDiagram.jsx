import { useMemo, useState } from "react";
import SliderInput from "../SliderInput";
import { bayesPosterior } from "../../utils/bayes";
import { roundTo, toPercent } from "../../utils/format";
import { MathDisplay } from "../MathText";
import { simulateEventFrequency } from "../../utils/rng";
import SimulationAgreementPanel from "./SimulationAgreementPanel";

export default function LabAreaDiagram() {
  const [pA, setPA] = useState(0.01);
  const [pBGivenA, setPBGivenA] = useState(0.95);
  const [pBGivenNotA, setPBGivenNotA] = useState(0.08);
  const [mode, setMode] = useState("probabilities");
  const [population, setPopulation] = useState(10000);
  const [seed, setSeed] = useState(101);
  const [simTrials, setSimTrials] = useState(6000);

  const computed = useMemo(() => {
    const result = bayesPosterior(pA, pBGivenA, pBGivenNotA);
    const counts = {
      aAndB: population * pA * pBGivenA,
      aAndNotB: population * pA * (1 - pBGivenA),
      notAAndB: population * (1 - pA) * pBGivenNotA,
      notAAndNotB: population * (1 - pA) * (1 - pBGivenNotA)
    };

    return {
      ...result,
      counts
    };
  }, [pA, pBGivenA, pBGivenNotA, population]);

  const simulation = useMemo(
    () => simulateEventFrequency({ probability: computed.posterior, trials: simTrials, seed }),
    [computed.posterior, seed, simTrials]
  );

  const displayValue = (probability, count) => {
    if (mode === "counts") {
      return Math.round(count).toLocaleString();
    }
    return toPercent(probability, 2);
  };

  const width = 300;
  const height = 180;
  const leftWidth = width * pA;
  const bInAHeight = height * pBGivenA;
  const bInNotAHeight = height * pBGivenNotA;

  return (
    <article className="card lab-card" aria-label="Lab 1 area diagram">
      <h3>Lab 1: Area Diagram (Unit Square)</h3>
      <p>Adjust prior and likelihood terms, then switch between probability and counts-per-N views.</p>
      <div className="lab-grid">
        <div>
          <SliderInput
            id="lab1-pa"
            label="P(A)"
            min={0.001}
            max={0.6}
            step={0.001}
            value={pA}
            onChange={setPA}
            display={toPercent(pA, 1)}
          />
          <SliderInput
            id="lab1-pbga"
            label="P(B|A)"
            min={0.05}
            max={0.99}
            step={0.01}
            value={pBGivenA}
            onChange={setPBGivenA}
            display={toPercent(pBGivenA, 1)}
          />
          <SliderInput
            id="lab1-pbgna"
            label="P(B|A^c)"
            min={0.01}
            max={0.6}
            step={0.01}
            value={pBGivenNotA}
            onChange={setPBGivenNotA}
            display={toPercent(pBGivenNotA, 1)}
          />
          <label className="input-row" htmlFor="lab1-population">
            <span>Population N</span>
            <input
              id="lab1-population"
              type="number"
              min={100}
              step={100}
              value={population}
              onChange={(event) => setPopulation(Number(event.target.value) || 10000)}
            />
          </label>
          <label className="input-row" htmlFor="lab1-seed">
            <span>Simulation seed</span>
            <input id="lab1-seed" type="number" value={seed} onChange={(event) => setSeed(Number(event.target.value) || 101)} />
          </label>
          <SliderInput
            id="lab1-sim-trials"
            label="Simulation trials"
            min={500}
            max={50000}
            step={500}
            value={simTrials}
            onChange={setSimTrials}
          />
          <fieldset className="mode-toggle">
            <legend>Display mode</legend>
            <label>
              <input
                type="radio"
                name="lab1-mode"
                value="probabilities"
                checked={mode === "probabilities"}
                onChange={() => setMode("probabilities")}
              />
              Probabilities
            </label>
            <label>
              <input
                type="radio"
                name="lab1-mode"
                value="counts"
                checked={mode === "counts"}
                onChange={() => setMode("counts")}
              />
              Counts per N
            </label>
          </fieldset>
        </div>

        <div>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="lab-svg"
            role="img"
            aria-label="Unit square showing A intersect B, A complement intersect B, and complement regions"
          >
            <rect x="0" y="0" width={leftWidth} height={height} fill="var(--accent-soft)" />
            <rect x={leftWidth} y="0" width={width - leftWidth} height={height} fill="var(--muted-bg)" />

            <rect x="0" y="0" width={leftWidth} height={bInAHeight} fill="var(--accent-strong)" />
            <rect x={leftWidth} y="0" width={width - leftWidth} height={bInNotAHeight} fill="var(--warning)" />

            <line x1={leftWidth} y1="0" x2={leftWidth} y2={height} stroke="var(--text)" strokeDasharray="4 4" />
            <line x1="0" y1={bInAHeight} x2={leftWidth} y2={bInAHeight} stroke="var(--text)" strokeDasharray="3 3" />
            <line
              x1={leftWidth}
              y1={bInNotAHeight}
              x2={width}
              y2={bInNotAHeight}
              stroke="var(--text)"
              strokeDasharray="3 3"
            />
          </svg>
          <div className="result-grid">
            <p>
              <strong>AnB</strong>: {displayValue(pA * pBGivenA, computed.counts.aAndB)}
            </p>
            <p>
              <strong>A? nB</strong>: {displayValue((1 - pA) * pBGivenNotA, computed.counts.notAAndB)}
            </p>
            <p>
              <strong>P(B)</strong>: {mode === "counts" ? Math.round(population * computed.evidence).toLocaleString() : toPercent(computed.evidence, 2)}
            </p>
            <p>
              <strong>P(A|B)</strong>: {mode === "counts" ? `${Math.round(computed.counts.aAndB).toLocaleString()} / ${Math.round(population * computed.evidence).toLocaleString()} = ${toPercent(computed.posterior, 2)}` : toPercent(computed.posterior, 2)}
            </p>
          </div>
          <MathDisplay
            math={`P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B)}=\\frac{${roundTo(
              pBGivenA,
              3
            )}\\cdot ${roundTo(pA, 3)}}{${roundTo(computed.evidence, 4)}}=${roundTo(computed.posterior, 4)}`}
          />
          <SimulationAgreementPanel
            label="P(A|B)"
            theoretical={computed.posterior}
            estimate={simulation.estimate}
            trials={simulation.trials}
            tolerance={0.02}
          />
        </div>
      </div>
    </article>
  );
}
