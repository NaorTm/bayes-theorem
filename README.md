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

## Deployment

This project includes a GitHub Actions workflow that automatically:
- Builds the site on every push to `main` and pull requests
- Deploys the built site to GitHub Pages when changes are pushed to `main`
- Makes the site available at: `https://naortm.github.io/bayes-theorem/`

The workflow is defined in `.github/workflows/build-and-deploy.yml` and runs on:
- Push to `main` branch (builds and deploys)
- Pull requests (builds only, no deployment)
- Manual workflow dispatch

### GitHub Pages Setup

To enable GitHub Pages deployment:
1. Go to repository Settings > Pages
2. Set Source to "GitHub Actions"
3. The site will be automatically deployed on the next push to `main`

## Project Structure

- `src/pages` - route pages
- `src/components` - shared UI and lab components
- `src/components/labs` - all visual labs
- `src/data` - tutorial, examples, practice, glossary, references
- `src/utils` - Bayes math, RNG, formatting helpers

## Notes

- Example dataset is available in both `src/data/examples.js` and `src/data/examples.json`.
- Simulations are designed to be seedable for consistent demo runs.
