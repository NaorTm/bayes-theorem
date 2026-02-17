import { references } from "../data/references";

export default function ReferencesPage() {
  return (
    <section className="stack-page">
      <header className="card">
        <h2>References</h2>
        <p>Books and resources for deeper Bayesian study.</p>
      </header>

      {references.map((reference) => (
        <article key={reference.id} className="card">
          <h3>{reference.title}</h3>
          <p>{reference.author}</p>
          <p>{reference.note}</p>
        </article>
      ))}
    </section>
  );
}
