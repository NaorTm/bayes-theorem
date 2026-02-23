import { Suspense, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProgressSidebar from "../components/ProgressSidebar";
import QuizBlock from "../components/QuizBlock";
import { MathDisplay } from "../components/MathText";
import BayesLensPanel from "../components/BayesLensPanel";
import SankeyMini from "../components/SankeyMini";
import { tutorialModules } from "../data/tutorialModules";
import { getLabById } from "../components/labs";

const defaultModuleId = tutorialModules[0].id;

function loadProgress() {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const stored = window.localStorage.getItem("bayes-tutorial-progress");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export default function TutorialPage() {
  const [activeModuleId, setActiveModuleId] = useState(defaultModuleId);
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    window.localStorage.setItem("bayes-tutorial-progress", JSON.stringify(progress));
  }, [progress]);

  const activeModule = useMemo(
    () => tutorialModules.find((module) => module.id === activeModuleId) || tutorialModules[0],
    [activeModuleId]
  );

  const completion = useMemo(() => {
    const completed = tutorialModules.filter((module) => progress[module.id]).length;
    return {
      completed,
      total: tutorialModules.length,
      ratio: completed / tutorialModules.length
    };
  }, [progress]);

  return (
    <section className="tutorial-layout">
      <ProgressSidebar
        modules={tutorialModules}
        activeId={activeModule.id}
        progress={progress}
        onSelect={setActiveModuleId}
        onToggleComplete={(moduleId) =>
          setProgress((prev) => ({
            ...prev,
            [moduleId]: !prev[moduleId]
          }))
        }
      />

      <article className="tutorial-content">
        <header className="card">
          <p className="eyebrow">Module {activeModule.id}</p>
          <h2>{activeModule.title}</h2>
          <p>{activeModule.oneSentenceIntuition}</p>
          <p>
            Progress: {completion.completed}/{completion.total} modules complete
          </p>
          <div className="progress-track" aria-label="Tutorial progress">
            <div className="progress-fill" style={{ width: `${completion.ratio * 100}%` }} />
          </div>
        </header>

        <section className="card">
          <h3>Intuition First</h3>
          <p>{activeModule.visualHint}</p>
        </section>

        <section className="card">
          <h3>Formal Definition</h3>
          <p>{activeModule.formalDefinition.text}</p>
          {activeModule.formalDefinition.formulas.map((formula) => (
            <MathDisplay key={formula} math={formula} />
          ))}
        </section>

        <section className="card">
          <h3>Derivation Sketch</h3>
          <ol>
            {activeModule.derivationSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="card">
          <h3>Worked Examples</h3>
          {activeModule.workedExamples.map((example) => (
            <article key={example.title} className="sub-card">
              <h4>{example.title}</h4>
              <p>{example.statement}</p>
              <p>{example.solution}</p>
              <MathDisplay math={example.formula} />
              <p>
                <strong>Takeaway:</strong> {example.takeaway}
              </p>
            </article>
          ))}
        </section>

        {activeModule.id === "D" ? (
          <>
            <BayesLensPanel
              prior={activeModule.lensConfig.prior}
              pBGivenA={activeModule.lensConfig.pBGivenA}
              pBGivenNotA={activeModule.lensConfig.pBGivenNotA}
            />
            <SankeyMini
              prior={activeModule.lensConfig.prior}
              pBGivenA={activeModule.lensConfig.pBGivenA}
              pBGivenNotA={activeModule.lensConfig.pBGivenNotA}
            />
          </>
        ) : null}

        {activeModule.quickCheck?.length ? <QuizBlock questions={activeModule.quickCheck} /> : null}

        <section className="card trap-card">
          <h3>Trap Question</h3>
          <p>{activeModule.trapQuestion.prompt}</p>
          <p>
            <strong>Common mistake:</strong> {activeModule.trapQuestion.commonMistake}
          </p>
          <p>
            <strong>Fix:</strong> {activeModule.trapQuestion.correction}
          </p>
        </section>

        {activeModule.debuggingChecklist ? (
          <section className="card">
            <h3>Bayes Debugging Checklist</h3>
            <ul>
              {activeModule.debuggingChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="card">
          <h3>Linked Visual Labs</h3>
          <p>
            These labs are embedded here and also available in the dedicated
            <Link to="/labs"> Visual Labs page</Link>.
          </p>
          {activeModule.linkedLabs.map((labId) => {
            const lab = getLabById(labId);
            if (!lab) {
              return null;
            }
            const LabComponent = lab.component;
            return (
              <details key={lab.id} className="lab-inline">
                <summary>
                  {lab.id.toUpperCase()} - {lab.title}
                </summary>
                <Suspense fallback={<div className="card">Loading lab...</div>}>
                  <LabComponent />
                </Suspense>
              </details>
            );
          })}
        </section>
      </article>
    </section>
  );
}
