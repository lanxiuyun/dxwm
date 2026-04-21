# AGENTS.md

## Project Overview

This repository contains a frontend quiz game built with React and Vite.

Primary goals:
- Keep the app lightweight and easy to extend.
- Focus on a polished single-page quiz experience.
- Treat the current implementation as a frontend-first prototype.

## Tech Stack

- React 18
- Vite 5
- Plain CSS

## Repository Structure

- `index.html`: Vite HTML entry
- `src/main.jsx`: React bootstrap
- `src/App.jsx`: quiz game logic and UI composition
- `src/styles.css`: global styles and responsive layout
- `package.json`: scripts and dependencies

## Run Commands

Use `pnpm` for package management.

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Coding Expectations

- Keep components simple and readable.
- Prefer functional React components and hooks.
- Do not introduce a state library unless the app actually needs it.
- Keep styles in `src/styles.css` unless there is a clear reason to split them.
- Preserve the current game-like visual direction; do not regress into a generic form UI.

## Quiz Data

- The question bank currently lives in `src/App.jsx`.
- If the question set grows, move it into a dedicated module such as `src/data/questions.js`.
- Keep question objects consistent:
  - `id`
  - `category`
  - `prompt`
  - `options`
  - `answer`
  - `insight`

## UI and Product Guidance

- This is a quiz game, not a survey form.
- Immediate feedback is preferred over delayed summary-only scoring.
- Mobile layout must remain usable.
- Visual changes should feel intentional and energetic.

## Change Rules

- Do not add backend code unless explicitly requested.
- Do not replace `pnpm` with another package manager.
- Do not remove existing quiz flow states without replacing them with an equivalent or better interaction.
- Avoid adding heavy dependencies for small features.

## Validation

Before handing off substantial changes, run:

```bash
pnpm build
```

If gameplay logic changes, also manually verify:
- answer selection
- score updates
- next-question flow
- result screen
- restart flow

## Preferred Next Extensions

- timer mode
- combo scoring
- difficulty levels
- remote question source
- persistent leaderboard
