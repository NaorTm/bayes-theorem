import { useMemo, useState } from "react";
import { MathDisplay } from "../MathText";
import { roundTo } from "../../utils/format";
import { simulateEventFrequency } from "../../utils/rng";
import SimulationAgreementPanel from "./SimulationAgreementPanel";

const vocabulary = ["free", "offer", "meeting", "project", "click", "schedule", "win", "invoice"];

const model = {
  priorSpam: 0.4,
  wordProbSpam: { free: 0.25, offer: 0.3, meeting: 0.02, project: 0.03, click: 0.22, schedule: 0.02, win: 0.18, invoice: 0.03 },
  wordProbHam: { free: 0.03, offer: 0.04, meeting: 0.18, project: 0.16, click: 0.02, schedule: 0.15, win: 0.01, invoice: 0.13 }
};

export default function LabNaiveBayesText() {
  const [text, setText] = useState("free offer click now");
  const [seed, setSeed] = useState(707);
  const [simTrials, setSimTrials] = useState(7000);

  const tokens = text.toLowerCase().split(/\s+/).filter(Boolean);

  const analysis = useMemo(() => {
    let logSpam = Math.log(model.priorSpam);
    let logHam = Math.log(1 - model.priorSpam);

    const rows = vocabulary.map((word) => {
      const present = tokens.includes(word);
      const pSpam = model.wordProbSpam[word];
      const pHam = model.wordProbHam[word];
      const contribSpam = Math.log(present ? pSpam : 1 - pSpam);
      const contribHam = Math.log(present ? pHam : 1 - pHam);
      logSpam += contribSpam;
      logHam += contribHam;
      return { word, present, pSpam, pHam, contribSpam, contribHam };
    });

    const maxLog = Math.max(logSpam, logHam);
    const spamScore = Math.exp(logSpam - maxLog);
    const hamScore = Math.exp(logHam - maxLog);
    const posteriorSpam = spamScore / (spamScore + hamScore);

    return {
      rows,
      logSpam,
      logHam,
      posteriorSpam,
      posteriorHam: 1 - posteriorSpam,
      prediction: posteriorSpam >= 0.5 ? "Spam" : "Ham"
    };
  }, [tokens]);

  const simulation = useMemo(
    () => simulateEventFrequency({ probability: analysis.posteriorSpam, trials: simTrials, seed }),
    [analysis.posteriorSpam, seed, simTrials]
  );

  return (
    <article className="card lab-card" aria-label="Lab 7 naive Bayes text classifier">
      <h3>Lab 7: Naive Bayes Toy Text Classifier</h3>
      <p>Type a short message. The model computes log-likelihood sums per class to avoid underflow.</p>

      <label className="input-row" htmlFor="lab7-text">
        <span>Input text</span>
        <input id="lab7-text" type="text" value={text} onChange={(event) => setText(event.target.value)} />
      </label>
      <label className="input-row" htmlFor="lab7-seed">
        <span>Simulation seed</span>
        <input id="lab7-seed" type="number" value={seed} onChange={(event) => setSeed(Number(event.target.value) || 707)} />
      </label>
      <label className="input-row" htmlFor="lab7-trials">
        <span>Simulation trials</span>
        <input id="lab7-trials" type="number" min={500} step={500} value={simTrials} onChange={(event) => setSimTrials(Number(event.target.value) || 7000)} />
      </label>

      <div className="word-table">
        {analysis.rows.map((row) => (
          <p key={row.word}>
            <strong>{row.word}</strong> ({row.present ? "present" : "absent"}) → log contrib spam {roundTo(row.contribSpam, 3)}, ham {roundTo(row.contribHam, 3)}
          </p>
        ))}
      </div>

      <div className="result-grid two-col">
        <p><strong>log score spam</strong>: {roundTo(analysis.logSpam, 4)}</p>
        <p><strong>log score ham</strong>: {roundTo(analysis.logHam, 4)}</p>
        <p><strong>P(spam|text)</strong>: {roundTo(analysis.posteriorSpam, 4)}</p>
        <p><strong>P(ham|text)</strong>: {roundTo(analysis.posteriorHam, 4)}</p>
        <p><strong>Prediction</strong>: {analysis.prediction}</p>
      </div>

      <MathDisplay math={`\\log P(c\\mid x) \\propto \\log P(c)+\\sum_i\\log P(w_i\\mid c)`} />
      <SimulationAgreementPanel label="P(spam|text)" theoretical={analysis.posteriorSpam} estimate={simulation.estimate} trials={simulation.trials} tolerance={0.03} />
    </article>
  );
}
