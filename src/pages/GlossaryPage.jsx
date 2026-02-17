import { useState } from "react";
import { glossaryTerms } from "../data/glossary";

export default function GlossaryPage() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <section className="stack-page">
      <header className="card">
        <h2>Glossary</h2>
        <p>Core Bayesian terminology with examples.</p>
        <label className="input-row" htmlFor="glossary-advanced">
          <span>Show advanced sigma-algebra entry</span>
          <input
            id="glossary-advanced"
            type="checkbox"
            checked={showAdvanced}
            onChange={() => setShowAdvanced((prev) => !prev)}
          />
        </label>
      </header>

      {glossaryTerms
        .filter((entry) => showAdvanced || !entry.term.toLowerCase().includes("sigma"))
        .map((entry) => (
          <article key={entry.term} className="card">
            <h3>{entry.term}</h3>
            <p>{entry.definition}</p>
            <p>
              <strong>Example:</strong> {entry.example}
            </p>
          </article>
        ))}
    </section>
  );
}
