# Cutroom — Build Tasks (prototype)

Tick each when it works. Acceptance criteria in brackets.

## 0. Setup
- [x] Create monorepo, `client` (Vite React + Tailwind + shadcn) and `server` (Express). [both start locally]
- [x] Apply design tokens, fonts, base layout. [matches DESIGN_SYSTEM.md]
- [x] Connect MongoDB Atlas and Firebase (client + admin). [server connects, health route returns ok]

## 1. Auth
- [x] Register page with role picker, login page, Google sign-in. [user doc created with role]
- [x] `auth` and `role` middleware, `GET /users/me`, protected routes on client. [unauthenticated users redirected]

## 2. Profile and portfolio
- [x] Profile page view/edit with skills, experience, portfolio items, Cloudinary image upload. [changes persist]
- [x] Public profile page for other users.

## 3. Projects
- [x] Create project form (draft/publish) with dynamic roles list. [saved in DB]
- [x] My projects list on creator dashboard.
- [x] Project detail page (overview, roles, team).

## 4. Recruitment
- [ ] Browse projects with search and filters. [filters work with query params]
- [ ] Browse talent with filters.
- [ ] Apply to a role with a message. [duplicate applications blocked]
- [ ] Creator applicant review: accept/reject. [accepting adds member and updates role count]
- [ ] Applicant "My applications" with status.

## 5. Task board
- [ ] Task CRUD and 3-column board in project dashboard with assignee. [status changes persist]

## 6. Landing and polish
- [ ] Landing page from Figma.
- [ ] Mobile layouts (bottom tab bar, bottom-sheet filters, stacked cards).
- [ ] Loading, empty and error states on all screens.
- [ ] Seed script with demo data.

## 7. Deploy
- [ ] Deploy server to Render, client to Vercel, set env vars and CORS.
- [ ] Smoke test full creator and actor flow on the live URL.
