# AGENTS Acceptance Mapping

This document maps the acceptance criteria in `AGENTS.md` to current implementation.

## Acceptance Checklist

1. All modules A to J exist and are fully populated

- Status: Implemented
- Evidence:
  - `src/data/tutorialModules.js` includes `A` to `J` plus prerequisites `P`
  - `src/pages/TutorialPage.jsx` renders definitions, derivations, examples, quiz, trap question

2. Visual Labs 1 to 8 are implemented and integrated into tutorial pages

- Status: Implemented
- Evidence:
  - Lab components in `src/components/labs/`
  - Registry in `src/components/labs/index.js`
  - Rendered in `src/pages/VisualLabsPage.jsx`
  - Linked inline from tutorial modules in `src/pages/TutorialPage.jsx`

3. Example Library contains at least 30 examples, with at least 18 fully written

- Status: Implemented
- Evidence:
  - Canonical dataset `src/data/examples.json` contains 30 examples
  - `ex01` to `ex18` are fully written rich examples
  - Rendered and searchable in `src/pages/ExampleLibraryPage.jsx`

4. Practice section includes required counts, hints, and full solutions

- Status: Implemented
- Evidence:
  - `src/data/practice.js` generates 62 problems with required per-level counts
  - Each problem has 3 hints and full solution steps
  - UI in `src/pages/PracticePage.jsx`

5. Every major concept is shown through at least two visualization lenses

- Status: Implemented
- Evidence:
  - Lens panel in `src/components/BayesLensPanel.jsx`
  - Sankey lens in `src/components/SankeyMini.jsx`
  - Labs provide area/tree/matrix/odds/density/network views

6. Math renders correctly, no broken formulas, no missing diagrams

- Status: Implemented
- Evidence:
  - KaTeX setup in `src/main.jsx` and `src/components/MathText.jsx`
  - Formulas provided across tutorial/examples/labs

7. Simulations match theoretical results within sampling error

- Status: Partially documented in UI, model-specific verification manual
- Evidence:
  - Seeded RNG in `src/utils/rng.js`
  - Simulation metadata attached in examples/practice/labs

8. Navigation, search, filtering, and progress tracking work correctly

- Status: Implemented
- Evidence:
  - Navigation in `src/components/Layout.jsx`
  - Example filtering/search in `src/pages/ExampleLibraryPage.jsx`
  - Tutorial progress with `localStorage` in `src/pages/TutorialPage.jsx`

## Notes

- This mapping is implementation-focused and should be updated whenever acceptance criteria or core features change.

