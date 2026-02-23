# Bayes Theorem Tutorial Website

Interactive React + Vite website for learning Bayes theorem with intuition, math rigor, worked examples, and interactive labs.

This project is implemented to follow the requirements in `AGENTS.md`, including:
- Tutorial modules `P` and `A` through `J`
- 8 visual labs
- 30 examples (18 rich step-by-step examples)
- 5 practice levels with required counts
- Glossary and references
- KaTeX math rendering
- Seeded simulations

## Quick Start

Prerequisites:
- Node.js 18+ (Node.js 20+ recommended)
- npm

Install and run:

```bash
npm install
npm run dev
```

Build and preview production output:

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev`: start Vite dev server
- `npm run build`: production build to `dist/`
- `npm run preview`: preview built output

## Deployment

GitHub Actions workflow is available at:

- `.github/workflows/build-and-deploy.yml`

Behavior:

- On push to `main`: build and deploy to GitHub Pages
- On pull request to `main`: build only
- Manual trigger supported via workflow dispatch

GitHub Pages base path is configured in `vite.config.js` for Actions builds.

## Documentation

- Project docs index: `docs/README.md`
- Architecture: `docs/ARCHITECTURE.md`
- Content authoring and data model: `docs/CONTENT_GUIDE.md`
- Development workflow: `docs/DEVELOPMENT.md`
- AGENTS acceptance mapping: `docs/AGENTS_ACCEPTANCE.md`

## Feature Coverage Snapshot

- Tutorial modules: `11` total (`P`, `A`-`J`)
- Visual labs: `8`
- Example library: `30` examples (`18` rich examples + `12` additional examples)
- Practice: `62` problems across 5 levels (`12`, `14`, `14`, `12`, `10`)

## Tech Stack

- React 18
- React Router 6
- Vite 5
- KaTeX via `react-katex`
- D3

## Project Structure

```text
src/
  components/
    labs/                  # Lab 1..8 interactive components
  data/
    tutorialModules.js     # Module P, A..J content
    examples.json          # Canonical examples dataset
    examples.js            # Thin export wrapper for examples.json
    practice.js            # Generated practice levels/problems
    glossary.js
    references.js
  pages/
    HomePage.jsx
    TutorialPage.jsx
    VisualLabsPage.jsx
    ExampleLibraryPage.jsx
    PracticePage.jsx
    GlossaryPage.jsx
    ReferencesPage.jsx
  utils/
    bayes.js               # Core probability and update math
    math.js                # PDF/CDF/numeric helpers
    rng.js                 # Seeded RNG + simulation helpers
```

## Notes

- `examples.json` is the canonical examples source.
- Manual chunk splitting is configured in `vite.config.js` for `react`, `d3`, and `katex`-related dependencies.
- `node_modules/` and `dist/` are ignored by `.gitignore`.
