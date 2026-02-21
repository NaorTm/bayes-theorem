import { useMemo, useState } from "react";
import SliderInput from "../SliderInput";
import { roundTo, toPercent } from "../../utils/format";
import { MathDisplay } from "../MathText";
import { simulateEventFrequency } from "../../utils/rng";
import SimulationAgreementPanel from "./SimulationAgreementPanel";

function probBinary(value, probabilityTrue) {
  return value ? probabilityTrue : 1 - probabilityTrue;
}

function jointProbability(assignment, params) {
  const { C, S, R, W } = assignment;
  const pC = probBinary(C, params.pCloudy);
  const pS = probBinary(S, C ? params.pSprinklerGivenCloudy : params.pSprinklerGivenNotCloudy);
  const pR = probBinary(R, C ? params.pRainGivenCloudy : params.pRainGivenNotCloudy);

  let pWTrue;
  if (S && R) {
    pWTrue = params.pWetGivenSprinklerAndRain;
  } else if (S && !R) {
    pWTrue = params.pWetGivenSprinklerOnly;
  } else if (!S && R) {
    pWTrue = params.pWetGivenRainOnly;
  } else {
    pWTrue = params.pWetGivenNeither;
  }
  const pW = probBinary(W, pWTrue);

  return pC * pS * pR * pW;
}

function matchesEvidence(assignment, evidence) {
  return Object.entries(evidence).every(([key, value]) => {
    if (value === "unknown") {
      return true;
    }
    return assignment[key] === (value === "true");
  });
}

function computeInferenceSummary(evidence, params) {
  let evidenceProbability = 0;
  let rainJoint = 0;
  let cloudyJoint = 0;
  let sprinklerJoint = 0;

  [false, true].forEach((C) => {
    [false, true].forEach((S) => {
      [false, true].forEach((R) => {
        [false, true].forEach((W) => {
          const assignment = { C, S, R, W };
          if (!matchesEvidence(assignment, evidence)) {
            return;
          }

          const joint = jointProbability(assignment, params);
          evidenceProbability += joint;

          if (R) {
            rainJoint += joint;
          }
          if (C) {
            cloudyJoint += joint;
          }
          if (S) {
            sprinklerJoint += joint;
          }
        });
      });
    });
  });

  if (evidenceProbability === 0) {
    return {
      rain: 0,
      cloudy: 0,
      sprinkler: 0,
      evidenceProbability: 0
    };
  }

  return {
    rain: rainJoint / evidenceProbability,
    cloudy: cloudyJoint / evidenceProbability,
    sprinkler: sprinklerJoint / evidenceProbability,
    evidenceProbability
  };
}

function EvidenceSelect({ label, value, onChange, id }) {
  return (
    <label htmlFor={id} className="input-row">
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="unknown">Unknown</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </label>
  );
}

export default function LabBayesNet() {
  const [params, setParams] = useState({
    pCloudy: 0.5,
    pSprinklerGivenCloudy: 0.1,
    pSprinklerGivenNotCloudy: 0.5,
    pRainGivenCloudy: 0.8,
    pRainGivenNotCloudy: 0.2,
    pWetGivenSprinklerAndRain: 0.99,
    pWetGivenSprinklerOnly: 0.9,
    pWetGivenRainOnly: 0.9,
    pWetGivenNeither: 0.01
  });

  const [evidence, setEvidence] = useState({
    C: "unknown",
    S: "unknown",
    R: "unknown",
    W: "true"
  });
  const [seed, setSeed] = useState(808);
  const [simTrials, setSimTrials] = useState(7000);

  const posteriors = useMemo(() => computeInferenceSummary(evidence, params), [evidence, params]);
  const simulation = useMemo(
    () => simulateEventFrequency({ probability: posteriors.rain, trials: simTrials, seed }),
    [posteriors.rain, seed, simTrials]
  );

  const setParam = (name, value) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <article className="card lab-card" aria-label="Lab 8 Bayes net playground">
      <h3>Lab 8: Bayes Net Playground</h3>
      <p>Cloudy → Rain, Cloudy → Sprinkler, Rain and Sprinkler → WetGrass. Inference is exact by enumeration.</p>

      <div className="lab-grid">
        <div>
          <h4>Set conditional tables</h4>
          <SliderInput
            id="lab8-pc"
            label="P(Cloudy)"
            min={0.01}
            max={0.99}
            step={0.01}
            value={params.pCloudy}
            onChange={(value) => setParam("pCloudy", value)}
            display={toPercent(params.pCloudy, 1)}
          />
          <SliderInput
            id="lab8-psc"
            label="P(Sprinkler|Cloudy)"
            min={0.01}
            max={0.99}
            step={0.01}
            value={params.pSprinklerGivenCloudy}
            onChange={(value) => setParam("pSprinklerGivenCloudy", value)}
            display={toPercent(params.pSprinklerGivenCloudy, 1)}
          />
          <SliderInput
            id="lab8-psnc"
            label="P(Sprinkler|not Cloudy)"
            min={0.01}
            max={0.99}
            step={0.01}
            value={params.pSprinklerGivenNotCloudy}
            onChange={(value) => setParam("pSprinklerGivenNotCloudy", value)}
            display={toPercent(params.pSprinklerGivenNotCloudy, 1)}
          />
          <SliderInput
            id="lab8-prc"
            label="P(Rain|Cloudy)"
            min={0.01}
            max={0.99}
            step={0.01}
            value={params.pRainGivenCloudy}
            onChange={(value) => setParam("pRainGivenCloudy", value)}
            display={toPercent(params.pRainGivenCloudy, 1)}
          />
          <SliderInput
            id="lab8-prnc"
            label="P(Rain|not Cloudy)"
            min={0.01}
            max={0.99}
            step={0.01}
            value={params.pRainGivenNotCloudy}
            onChange={(value) => setParam("pRainGivenNotCloudy", value)}
            display={toPercent(params.pRainGivenNotCloudy, 1)}
          />
          <SliderInput
            id="lab8-pwsr"
            label="P(Wet|Sprinkler,Rain)"
            min={0.01}
            max={0.999}
            step={0.001}
            value={params.pWetGivenSprinklerAndRain}
            onChange={(value) => setParam("pWetGivenSprinklerAndRain", value)}
            display={toPercent(params.pWetGivenSprinklerAndRain, 1)}
          />
          <SliderInput
            id="lab8-pws"
            label="P(Wet|Sprinkler,not Rain)"
            min={0.01}
            max={0.999}
            step={0.001}
            value={params.pWetGivenSprinklerOnly}
            onChange={(value) => setParam("pWetGivenSprinklerOnly", value)}
            display={toPercent(params.pWetGivenSprinklerOnly, 1)}
          />
          <SliderInput
            id="lab8-pwr"
            label="P(Wet|not Sprinkler,Rain)"
            min={0.01}
            max={0.999}
            step={0.001}
            value={params.pWetGivenRainOnly}
            onChange={(value) => setParam("pWetGivenRainOnly", value)}
            display={toPercent(params.pWetGivenRainOnly, 1)}
          />
          <SliderInput
            id="lab8-pwn"
            label="P(Wet|neither)"
            min={0.001}
            max={0.2}
            step={0.001}
            value={params.pWetGivenNeither}
            onChange={(value) => setParam("pWetGivenNeither", value)}
            display={toPercent(params.pWetGivenNeither, 1)}
          />
          <label className="input-row" htmlFor="lab8-seed">
            <span>Simulation seed</span>
            <input id="lab8-seed" type="number" value={seed} onChange={(event) => setSeed(Number(event.target.value) || 808)} />
          </label>
          <SliderInput
            id="lab8-sim-trials"
            label="Simulation trials"
            min={500}
            max={50000}
            step={500}
            value={simTrials}
            onChange={setSimTrials}
          />
        </div>

        <div>
          <h4>Set evidence</h4>
          <EvidenceSelect
            id="lab8-ev-c"
            label="Cloudy"
            value={evidence.C}
            onChange={(value) => setEvidence((prev) => ({ ...prev, C: value }))}
          />
          <EvidenceSelect
            id="lab8-ev-s"
            label="Sprinkler"
            value={evidence.S}
            onChange={(value) => setEvidence((prev) => ({ ...prev, S: value }))}
          />
          <EvidenceSelect
            id="lab8-ev-r"
            label="Rain"
            value={evidence.R}
            onChange={(value) => setEvidence((prev) => ({ ...prev, R: value }))}
          />
          <EvidenceSelect
            id="lab8-ev-w"
            label="WetGrass"
            value={evidence.W}
            onChange={(value) => setEvidence((prev) => ({ ...prev, W: value }))}
          />

          <div className="result-grid">
            <p>
              <strong>P(Rain|evidence)</strong>: {toPercent(posteriors.rain, 2)}
            </p>
            <p>
              <strong>P(Cloudy|evidence)</strong>: {toPercent(posteriors.cloudy, 2)}
            </p>
            <p>
              <strong>P(Sprinkler|evidence)</strong>: {toPercent(posteriors.sprinkler, 2)}
            </p>
            <p>
              <strong>P(evidence)</strong>: {roundTo(posteriors.evidenceProbability, 4)}
            </p>
          </div>

          <MathDisplay
            math={`P(R\\mid e)=\\frac{P(R,e)}{P(e)}\\approx ${roundTo(posteriors.rain, 4)},\\quad P(e)=${roundTo(
              posteriors.evidenceProbability,
              4
            )}`}
          />
          <SimulationAgreementPanel
            label="P(Rain|evidence)"
            theoretical={posteriors.rain}
            estimate={simulation.estimate}
            trials={simulation.trials}
            tolerance={0.03}
          />
        </div>
      </div>
    </article>
  );
}
