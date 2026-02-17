import { useMemo, useState } from "react";
import { examples } from "../data/examples";
import { MathDisplay } from "../components/MathText";

export default function ExampleLibraryPage() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [tag, setTag] = useState("All");

  const allTags = useMemo(() => {
    const tagSet = new Set();
    examples.forEach((example) => {
      example.tags.forEach((entry) => tagSet.add(entry));
    });
    return ["All", ...Array.from(tagSet).sort()];
  }, []);

  const filtered = useMemo(
    () =>
      examples.filter((example) => {
        const matchesQuery =
          query.trim().length === 0 ||
          example.title.toLowerCase().includes(query.toLowerCase()) ||
          example.problemMarkdown.toLowerCase().includes(query.toLowerCase());

        const matchesDifficulty =
          difficulty === "All" || example.difficulty === difficulty;
        const matchesTag = tag === "All" || example.tags.includes(tag);

        return matchesQuery && matchesDifficulty && matchesTag;
      }),
    [query, difficulty, tag]
  );

  const richCount = useMemo(
    () => examples.filter((example) => Number(example.id.replace("ex", "")) <= 18).length,
    []
  );

  return (
    <section className="stack-page">
      <header className="card">
        <h2>Example Library</h2>
        <p>
          {examples.length} total examples, {richCount} fully written step-by-step examples, spanning
          medical, engineering, security, finance, and everyday reasoning.
        </p>

        <div className="filter-row">
          <label htmlFor="example-search">
            Search
            <input
              id="example-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title or problem"
            />
          </label>

          <label htmlFor="example-difficulty">
            Difficulty
            <select
              id="example-difficulty"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              <option value="All">All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>

          <label htmlFor="example-tag">
            Tag
            <select id="example-tag" value={tag} onChange={(event) => setTag(event.target.value)}>
              {allTags.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <p>
        Showing {filtered.length} example{filtered.length === 1 ? "" : "s"}.
      </p>

      {filtered.map((example) => (
        <details key={example.id} className="card example-card">
          <summary>
            <strong>{example.title}</strong> - {example.difficulty} - {example.tags.join(", ")}
          </summary>
          <p>{example.problemMarkdown}</p>
          <p>
            <strong>Definitions:</strong> {example.definitions.join("; ")}
          </p>

          <section>
            <h4>Solution Steps</h4>
            {example.solutionSteps.map((step) => (
              <article key={`${example.id}-${step.title}`} className="sub-card">
                <h5>{step.title}</h5>
                <p>{step.explanationMarkdown}</p>
                <MathDisplay math={step.mathLatex} />
              </article>
            ))}
          </section>

          <p>
            <strong>Visual mapping:</strong> {example.visuals.map((item) => item.widget).join(", ")}
          </p>
          <p>
            <strong>Simulation:</strong> seed={example.simulationSpec.seed}, method={" "}
            {example.simulationSpec.samplingFunction}
          </p>
          <p>
            <strong>Final answer:</strong> {example.finalAnswer.numeric}
          </p>
          <MathDisplay math={example.finalAnswer.symbolic} />
          <p>
            <strong>Takeaway:</strong> {example.takeaway}
          </p>
        </details>
      ))}
    </section>
  );
}
