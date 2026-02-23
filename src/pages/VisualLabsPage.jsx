import { Suspense } from "react";
import { labs } from "../components/labs";

export default function VisualLabsPage() {
  return (
    <section className="stack-page">
      <header className="card">
        <h2>Visual Labs</h2>
        <p>
          Interactive playgrounds with formulas, sliders, and seeded reproducibility for the same
          Bayes concepts shown in the tutorial.
        </p>
      </header>

      {labs.map((lab) => {
        const LabComponent = lab.component;
        return (
          <section key={lab.id} id={lab.id} className="stack-gap">
            <p className="lab-kicker">
              {lab.id.toUpperCase()} - {lab.description}
            </p>
            <Suspense fallback={<div className="card">Loading lab...</div>}>
              <LabComponent />
            </Suspense>
          </section>
        );
      })}
    </section>
  );
}
