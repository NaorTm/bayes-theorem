# Bayes' Theorem Tutorial Website

Interactive educational website for learning Bayes' theorem deeply and intuitively.

## What It Includes

- Full tutorial track with prerequisites and modules `A` to `J`
- 8 interactive visual labs:
  - Area diagram
  - Tree builder
  - Confusion matrix playground
  - Odds / Bayes factor updater
  - Beta-Binomial updater
  - Gaussian-Gaussian updater
  - Naive Bayes text classifier
  - Bayes net playground
- Example library with:
  - 30 total examples
  - 18 rich step-by-step fully written examples
- Practice section with required problem counts:
  - Level 1: 12
  - Level 2: 14
  - Level 3: 14
  - Level 4: 12
  - Level 5: 10
- Glossary and references
- Light/dark mode
- KaTeX math rendering
- Seeded reproducible simulation utilities

## Stack

- React + Vite
- React Router
- KaTeX (`react-katex`)
- D3

## Getting Started

```bash
npm install
npm run dev
```

App will run at the local Vite URL shown in terminal.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

- `src/pages` - route pages
- `src/components` - shared UI and lab components
- `src/components/labs` - all visual labs
- `src/data` - tutorial, examples, practice, glossary, references
- `src/utils` - Bayes math, RNG, formatting helpers

## Notes

- Example dataset is available in both `src/data/examples.js` and `src/data/examples.json`.
- Simulations are designed to be seedable for consistent demo runs.
