# Content Guide

This document describes how educational content is represented and how to add more.

## Tutorial Modules

Source: `src/data/tutorialModules.js`

Each module includes:

- `id`, `title`
- `oneSentenceIntuition`, `visualHint`
- `formalDefinition` with formulas
- `derivationSteps`
- `workedExamples`
- `quickCheck`
- `trapQuestion`
- `linkedLabs`

Optional fields:

- `lensConfig` (used by visualization lens panel)
- `debuggingChecklist` (used in module J)

Current module IDs:

- `P` (prerequisites)
- `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`

## Example Library

Canonical source: `src/data/examples.json`

Wrapper export: `src/data/examples.js`

Example schema:

- `id`, `title`, `difficulty`, `tags`
- `problemMarkdown`
- `variables`
- `definitions`
- `solutionSteps`: array of `{ title, explanationMarkdown, mathLatex }`
- `visuals`: list of widgets and parameters
- `simulationSpec`: seeded simulation metadata
- `finalAnswer`: numeric + symbolic
- `takeaway`

Current counts:

- 30 total examples
- 18 rich step-by-step examples (`ex01` to `ex18`)
- 12 additional examples (`ex19` to `ex30`)

## Practice

Source: `src/data/practice.js`

Practice levels and counts:

- Level 1: 12
- Level 2: 14
- Level 3: 14
- Level 4: 12
- Level 5: 10

Each generated problem includes:

- Prompt
- 3 hints
- Full solution steps
- Optional simulation check metadata with seed

## Glossary and References

- Glossary source: `src/data/glossary.js`
- References source: `src/data/references.js`

## Extending Content Safely

When adding content:

1. Keep formulas KaTeX-compatible in `mathLatex`.
2. Keep `examples.json` as the single source of truth for examples.
3. Include explicit denominator terms in Bayes solutions.
4. Prefer adding at least one matching visualization lens per example.
5. Use deterministic simulation seeds for reproducibility.

