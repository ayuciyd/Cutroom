# Agent Rules for Antigravity — Cutroom

Read PRD.md, ARCHITECTURE.md, DATABASE_SCHEMA.md and DESIGN_SYSTEM.md before writing code. Work through TASKS.md in order, one task at a time.

## Process
1. Do one task, run it, confirm it works, then tick it in TASKS.md. Do not start the next until the current one runs without errors.
2. Do not build anything listed under Phase 2 in PRD.md.
3. If a requirement is ambiguous, pick the simplest option consistent with the docs and note it in `docs/DECISIONS.md`.
4. Never change the stack or folder structure without being asked.

## Code standards
- JavaScript (ES modules) with JSDoc where helpful. Functional React components and hooks only.
- Small files, one component per file, PascalCase components, camelCase functions.
- Server: routes -> controllers -> models. No business logic in routes. Use async/await with a central error handler.
- Validate all request bodies (zod or express-validator). Never trust client role; read role from the verified user.
- No hardcoded colours, URLs or secrets. Use design tokens and env vars.
- Consistent API response shape `{ success, data, error }`.

## UI standards
- Match the Figma designs and DESIGN_SYSTEM.md exactly: tokens, fonts, spacing, radii.
- Every screen must be responsive (desktop and 390px mobile).
- Every data view needs loading, empty and error states. Forms need inline validation and disabled/submitting states.
- Use shadcn/ui primitives, restyled via tokens. Icons: lucide-react.

## Quality bar
- No console errors or warnings. No unused code or dead imports.
- Commit after each task with a clear message (`feat: ...`, `fix: ...`).
- Keep `.env.example` and README (setup, run, deploy) up to date.
- Seed script must produce a polished demo state.
