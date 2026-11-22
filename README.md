# anti-slop-linter

> Static analysis linter designed for AI coding agents (OpenAI Codex, Claude, Cursor) and CI/CD pipelines to catch LLM frontend visual defects, cliché styles, and uncalibrated template leaks.

[![CI](https://github.com/roclee0703/anti-slop-linter/actions/workflows/ci.yml/badge.svg)](https://github.com/roclee0703/anti-slop-linter/actions/workflows/ci.yml)
[![Node.js CI](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![AI Code QA](https://img.shields.io/badge/Codex-Anti--Slop-orange.svg)](https://openai.com)

---

## Why Anti-Slop?

Large Language Models are remarkably productive at generating UI components, but frequently fall into recognizable "AI code smells":
- **Generic Gradient Overuse**: Defaulting to the same purple/indigo gradients (`from-purple-500 to-indigo-600`) across every hero section.
- **Leaked Placeholders**: Leaving behind `Lorem ipsum`, `[Insert company name]`, or mock domains.
- **Card-in-Card Nesting**: Stacking borders, rounded corners, and drop shadows 3+ layers deep.
- **Inaccessible Contrast**: Outputting faint gray text on pure white or muted slate backgrounds that fail WCAG standards.

`anti-slop-linter` runs in milliseconds in any CI or agent workflow to enforce clean, human-caliber frontend engineering.

---

## Quickstart

```bash
# Clone and setup
git clone https://github.com/roclee0703/anti-slop-linter.git
cd anti-slop-linter

# Run tests
npm test

# Scan any directory containing JSX, TSX, HTML, or Vue files
node bin/anti-slop.mjs scan ./src
```

---

## Active Rules

| Rule Name | Severity | What It Catches |
|-----------|----------|-----------------|
| `gradient-abuse` | Warning | Cliché AI gradients (purple-indigo-fuchsia) |
| `placeholder-leak` | Error | Residual `lorem ipsum`, mock URLs, or prompt brackets |
| `card-nesting` | Warning | Deeply stacked cards/borders causing visual clutter |
| `contrast-check` | Error | Faint text pairings failing WCAG AA contrast |
| `responsive-image` | Warning | Image markup missing descriptive alt attributes |

---

## Roadmap

- [x] Core AST & regex rule runners.
- [x] Tailwind CSS low-contrast detection.
- [ ] Automated Codex fix-prompt generator for self-healing PRs.
- [ ] GitHub Action runner for automated PR annotations.

---

## License

MIT License (c) 2026 roclee0703
