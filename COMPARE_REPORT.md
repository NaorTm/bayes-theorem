# Compare Report: Local vs `origin/main`

Date: 2026-02-23

## Scope

Compared this workspace (`HEAD` + local uncommitted work) against:

- Remote repository: `origin/main`
- Remote URL: `https://github.com/NaorTm/bayes-theorem`

Goal:

- Keep stronger implementation details from both versions
- Merge without dropping current local improvements
- Leave project in a buildable state

## High-Value Items Imported from `origin/main`

- GitHub Pages CI/CD workflow:
  - `.github/workflows/build-and-deploy.yml`
- Improved ignore rules:
  - `.gitignore`
- Lazy-loaded visual labs:
  - `src/components/labs/index.js`
  - `src/pages/VisualLabsPage.jsx`
  - `src/pages/TutorialPage.jsx`
- Adaptive practice system with mastery tracking:
  - `src/data/practice.js`
  - `src/pages/PracticePage.jsx`
- Simulation agreement utility and integrations across labs:
  - `src/components/labs/SimulationAgreementPanel.jsx`
  - `src/utils/rng.js`
  - Lab updates in `src/components/labs/*`
- Stronger synchronized Bayes lens experience:
  - `src/components/BayesLensPanel.jsx`
- Fully authored examples 19-30:
  - merged into canonical dataset `src/data/examples.json`

## High-Value Items Preserved from Local Workspace

- Canonical JSON data model for examples:
  - `src/data/examples.json` as source of truth
  - `src/data/examples.js` thin wrapper export
- Enhanced example presentation and previews:
  - `src/pages/ExampleLibraryPage.jsx`
  - `src/components/ExampleVisualPreview.jsx`
- Home coverage snapshot:
  - `src/pages/HomePage.jsx`
- Expanded docs set:
  - `README.md`
  - `docs/README.md`
  - `docs/ARCHITECTURE.md`
  - `docs/CONTENT_GUIDE.md`
  - `docs/DEVELOPMENT.md`
  - `docs/AGENTS_ACCEPTANCE.md`
- Bundle optimization setup:
  - `vite.config.js` manual chunking

## Reconciliation Fixes Applied

- Re-applied local Example/Home style blocks after remote style merge:
  - `src/styles.css`
- Fixed notation regressions introduced during merge:
  - `src/components/labs/LabAreaDiagram.jsx`
  - `src/components/labs/LabConfusionMatrix.jsx`
- Removed/avoided encoding artifacts that caused toolchain issues (BOM/mojibake).
- Kept GitHub Pages `base` config and manual chunk splitting together:
  - `vite.config.js`

## Verification

- `npm run build` passes successfully after merge.
- `npm audit --omit=dev` reports `0 vulnerabilities`.
- Data integrity checks:
  - Examples: 30 total
  - Template placeholders: 0 (examples 19-30 are authored)
  - Practice counts: 12, 14, 14, 12, 10 (total 62)
  - Tutorial modules: `P, A, B, C, D, E, F, G, H, I, J`

## Result

Merged codebase now combines:

- Remote strengths: adaptive learning workflow, simulation rigor, lazy lab loading, CI/CD
- Local strengths: canonical JSON model, richer docs, better example browsing UX, bundle chunking

This report is intended to document what was kept from each side and why.

