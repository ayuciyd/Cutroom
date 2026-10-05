# Cutroom — Product Requirements Document

## 1. Overview
Cutroom is a web platform where filmmakers, actors and crew find each other, build projects and collaborate in one place. It is a final-year software engineering project; the prototype must look professional and work end to end for the core flow.

## 2. Roles
Stored on every user (`role` field). Prototype builds dashboards for the first three only.
| Role | Prototype | Purpose |
|---|---|---|
| creator (Director/Producer) | Yes | Creates projects, defines needed roles, reviews applicants |
| actor | Yes | Builds portfolio, applies to roles |
| crew | Yes | Builds portfolio, applies to roles |
| writer, investor, equipment_provider, distributor, admin | Stored only | Phase 2 (CONFIRM exact list against SRS section on user classes) |

## 3. MVP scope (tonight's prototype)
1. **Auth (FR 4.1):** register with role, email/password login, Google sign-in, logout, protected routes.
2. **Profile and portfolio (FR 4.2):** name, headline, bio, location, skills, experience, portfolio items (image/link), availability toggle.
3. **Create project (FR 4.3):** title, logline, genre, stage, budget range, location, save as draft or publish, add required roles (role name, type, count, description).
4. **Talent recruitment (FR 4.5):** browse and search projects, browse people, filter (genre, role, location), apply to a role, creator accepts or rejects, status visible to applicant.
5. **Project dashboard (FR 4.9):** overview, team list (accepted members), simple task board (To do / In progress / Done) with assignee.
6. **Creator dashboard:** my projects, pending applicants, stats.
7. **Landing page.**

## 4. Phase 2 (list in report, do not build now)
Script collaboration, equipment sharing, funding, real-time chat (Socket.io), scheduling, contracts, notifications, AI script review and budget estimates (Gemini), admin panel, remaining role dashboards.

## 5. Key user flows
- **Creator:** register → complete profile → create project → add roles → publish → review applicants → accept → manage tasks.
- **Actor/Crew:** register → complete profile and portfolio → browse projects → apply to role → track status → see project once accepted.

## 6. Non-functional requirements
- Responsive: desktop and mobile (390px) layouts.
- Free tier hosting only. Page loads feel fast; show loading and empty states everywhere.
- Secure: Firebase ID token verified on every API call, role-based access, input validation.
- Accessible: AA contrast, keyboard focus, labels on inputs.

## 7. Demo definition of done
A live URL where a creator and an actor (two accounts) can complete the full flow above with seeded demo data, no crashes, and a clean UI matching the Figma designs.
