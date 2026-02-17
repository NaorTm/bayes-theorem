import { useMemo, useState } from "react";
import { roundTo, toPercent } from "../../utils/format";
import { MathDisplay } from "../MathText";

const model = {
  classes: [
    {
      name: "Spam",
      prior: 0.4,
      likelihoods: {
        free: 0.22,
        offer: 0.21,
        click: 0.2,
        urgent: 0.17,
        project: 0.03,
        meeting: 0.02,
        invoice: 0.08
      }
    },
    {
      name: "Ham",
      prior: 0.6,
      likelihoods: {
        free: 0.01,
        offer: 0.02,
        click: 0.01,
        urgent: 0.03,
        project: 0.18,
        meeting: 0.21,
        invoice: 0.14
      }
    }
  ]
};

const vocabulary = Object.keys(model.classes[0].likelihoods);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export default function LabNaiveBayesText() {
  const [text, setText] = useState("free offer click now");

  const tokens = useMemo(() => tokenize(text), [text]);

  const scores = useMemo(() => {
    const counts = tokens.reduce((acc, token) => {
      acc[token] = (acc[token] || 0) + 1;
      return acc;
    }, {});

    const withLog = model.classes.map((label) => {
      let logScore = Math.log(label.prior);
      const wordBreakdown = [];

      vocabulary.forEach((word) => {
        const c = counts[word] || 0;
        if (c === 0) {
          return;
        }
        const probability = Math.max(label.likelihoods[word], 1e-9);
        const contribution = c * Math.log(probability);
        logScore += contribution;
        wordBreakdown.push({
          word,
          count: c,
          probability,
          contribution
        });
      });

      return {
        name: label.name,
        prior: label.prior,
        logScore,
        wordBreakdown
      };
    });

    const maxLog = Math.max(...withLog.map((entry) => entry.logScore));
    const stabilized = withLog.map((entry) => ({
      ...entry,
      stabilized: Math.exp(entry.logScore - maxLog)
    }));
    const denom = stabilized.reduce((acc, entry) => acc + entry.stabilized, 0) || 1;

    return stabilized.map((entry) => ({
      ...entry,
      posterior: entry.stabilized / denom
    }));
  }, [tokens]);

  const predicted = scores.reduce((best, entry) => (entry.posterior > best.posterior ? entry : best), scores[0]);

  return (
    <article className="card lab-card" aria-label="Lab 7 naive bayes classifier">
      <h3>Lab 7: Naive Bayes Toy Text Classifier</h3>
      <p>Type a short sentence. The model computes log-space class scores to avoid underflow.</p>

      <label className="input-row stacked" htmlFor="lab7-text">
        <span>Input sentence</span>
        <textarea
          id="lab7-text"
          rows={3}
          value={text}
          onChange={(event) => setText(event.target.value)}
          aria-label="Sentence to classify"
        />
      </label>

      <p>
        Vocabulary: {vocabulary.join(", ")}.
      </p>

      <div className="result-grid two-col">
        {scores.map((entry) => (
          <section key={entry.name} className="sub-card">
            <h4>{entry.name}</h4>
            <p>Prior: {toPercent(entry.prior, 1)}</p>
            <p>Log score: {roundTo(entry.logScore, 4)}</p>
            <p>Posterior score: {toPercent(entry.posterior, 2)}</p>
            <div className="word-table" role="table" aria-label={`${entry.name} word contributions`}>
              {entry.wordBreakdown.map((wordEntry) => (
                <p key={`${entry.name}-${wordEntry.word}`}>
                  {wordEntry.word} x{wordEntry.count}: log contribution {roundTo(wordEntry.contribution, 3)}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p>
        <strong>Prediction:</strong> {predicted.name}
      </p>
      <MathDisplay
        math={`\\log P(C\\mid w_{1:n})=\\log P(C)+\\sum_i\\log P(w_i\\mid C)-\\log Z`}
      />
    </article>
  );
}
