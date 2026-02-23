# Architecture

## Stack

- Framework: React 18
- Bundler: Vite 5
- Routing: React Router 6
- Math rendering: KaTeX (`react-katex`)
- Visualization helpers: D3

## Route Map

Routes are defined in `src/App.jsx`:

- `/` -> `HomePage`
- `/tutorial` -> `TutorialPage`
- `/labs` -> `VisualLabsPage`
- `/examples` -> `ExampleLibraryPage`
- `/practice` -> `PracticePage`
- `/glossary` -> `GlossaryPage`
- `/references` -> `ReferencesPage`

Global shell and navigation are provided by `src/components/Layout.jsx`.

## Core Folders

- `src/pages`: top-level page components
- `src/components`: reusable UI widgets and visual blocks
- `src/components/labs`: Lab 1 to Lab 8 implementations
- `src/data`: content datasets and structured learning material
- `src/utils`: probability math, numerical helpers, formatting, seeded RNG

## Data Flow

1. Page components import static content from `src/data/*`.
2. Interactive labs use local component state and utility functions from `src/utils/*`.
3. Tutorial progress and theme preferences are persisted in `localStorage`.

## Content Sources

- Tutorial modules: `src/data/tutorialModules.js`
- Examples (canonical): `src/data/examples.json`
- Examples export wrapper: `src/data/examples.js`
- Practice: `src/data/practice.js`
- Glossary: `src/data/glossary.js`
- References: `src/data/references.js`

## Visualization and Labs

Labs are declared in `src/components/labs/index.js` and rendered:

- On `/labs` (full page)
- Inline inside relevant tutorial modules

Implemented labs:

1. Area Diagram
2. Tree Diagram Builder
3. Confusion Matrix Playground
4. Odds and Bayes Factor
5. Beta-Binomial Updater
6. Gaussian-Gaussian Updater
7. Naive Bayes Toy Text
8. Bayes Net Playground

## Build and Bundling

- Vite output is written to `dist/`.
- Manual chunk splitting is configured in `vite.config.js`:
  - `react-vendor`
  - `viz-vendor`
  - `math-vendor`

