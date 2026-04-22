# AGENTS.md

## Product Definition

Project name:
- `大学文凭能有多文盲`

Project purpose:
- Build a lightweight web quiz game that tests whether college students can still answer basic school-level questions.
- The tone can be lightly satirical, but the interaction should stay simple and direct.
- The key idea is contrast: these should look like easy points, so failure itself becomes the message.

Current delivery scope:
- Frontend-only React site
- Subject selection before each round
- Multiple-choice questions only
- Local static question bank in the repo
- Mobile-first single-screen gameplay

Current content scope:
- Use easy school-level questions for now
- Topics include `语文` `数学` `英语` `物理` `化学`
- Do not overcomplicate the first version with difficult or niche questions

## Build Rules

- Use `pnpm` as the package manager
- Use React with Vite
- Keep the implementation lightweight
- Avoid routing, global state libraries, or backend code unless explicitly requested

## Repository Structure

- `index.html`: Vite entry
- `src/main.jsx`: React bootstrap
- `src/App.jsx`: shared gameplay flow, theme switching, theme copy, and theme backdrop structure
- `src/data/questions.js`: local quiz bank by subject
- `src/styles.css`: mobile-first UI styles and full theme-specific skins for `glass` `kawaii` `anime`
- `DEVELOPMENT_PLAN.md`: current project plan

## Product Requirements

- The homepage must be concise
- Users must be able to choose a subject before answering questions
- Each question must be multiple choice
- Clicking an option should immediately lock the answer
- The game should auto-advance to the next question after a very short delay
- The last question should auto-enter the result screen
- The result screen should show score, accuracy, and simple review items

## Content Rules

- Questions should feel like basic school knowledge, not trivia-night gimmicks
- Wording should be direct and familiar to Chinese users
- Prefer obvious-answer questions that expose weak fundamentals when answered wrong
- Keep each question object consistent:
  - `id`
  - `subject`
  - `prompt`
  - `options`
  - `answer`
  - `explanation`
  - `level`

## UX Guidance

- Treat the app like a lightweight mini-game, not a content-heavy website
- Keep the gameplay screen minimal: progress, score, question, options
- Remove nonessential helper text during play if it slows the rhythm
- Prioritize mobile layout first, then scale up cleanly for desktop
- Avoid large side panels, dense intro sections, or heavy explanatory blocks

## Theme Guidance

- The default UI style is `glass`, based on `gemini_新形态玻璃拟态.html`
- The project now includes three switchable themes: `glass` `kawaii` `anime`
- The theme system must stay extensible because these themes are derived from reference HTML files and need further polish without changing the gameplay flow
- New UI work should preserve a shared gameplay structure and swap visual language through theme-level styles instead of rewriting page flow for each theme
- `src/styles.css` should remain the main place for theme variables and theme-specific visual treatment
- `src/App.jsx` should keep gameplay state and screen structure theme-agnostic where practical
- When adjusting the default glass style, keep the core traits from the reference: soft gradient background, floating ambient blobs, translucent panels, rounded cards, and compact single-screen layout
- `kawaii` should keep its creamy card, candy palette, soft rounded buttons, and floating cute decorations
- `anime` should keep its manga-card silhouette, thick ink borders, hard offset shadows, and decorative character/star elements
- Theme fidelity matters more than forcing all themes into the same visual component treatment
- Theme additions must not break mobile-first layout or the fast quiz rhythm

## Engineering Guidance

- Prefer small pure helper functions over abstraction-heavy patterns
- Keep state local unless complexity proves otherwise
- Separate question data from rendering logic
- Do not silently drift away from the “simple game” product direction

## Validation

Before handoff, run:

```bash
pnpm build
```

If `pnpm` is unavailable in the local PATH or blocked by the current environment, document the limitation clearly and use an equivalent local build command only as a fallback verification step.

Manually verify:
- subject selection
- theme switching across `glass` `kawaii` `anime`
- mobile layout
- answer locking
- 100ms auto-advance behavior
- score calculation
- result summary
- replay flow

## Next Planned Extensions

- expand question banks for each subject
- simplify the home screen even further if needed
- add lightweight motion between questions
- tune result copy by score band
- support external question import later if needed
