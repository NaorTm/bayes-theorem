# Development Guide

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Vite prints the local URL in terminal.

## Build

```bash
npm run build
```

Production output is generated in `dist/`.

## Preview Build

```bash
npm run preview
```

## Common Tasks

Update tutorial content:

- Edit `src/data/tutorialModules.js`

Add or modify examples:

- Edit `src/data/examples.json`
- Keep `src/data/examples.js` as a thin wrapper only

Add or update labs:

- Edit or add components in `src/components/labs/`
- Register in `src/components/labs/index.js`

## Troubleshooting

Build fails with `spawn EPERM`:

- This can happen in restricted shells/sandboxes.
- Re-run with permissions that allow spawning subprocesses.

JSON parse errors in project config:

- Ensure `package.json` is valid UTF-8 without BOM.

Large bundle warnings:

- Chunk splitting lives in `vite.config.js`.
- Revisit `manualChunks` if warning thresholds are exceeded.

## Repository Hygiene

Ignored artifacts in `.gitignore`:

- `node_modules/`
- `dist/`
- `*.log`

