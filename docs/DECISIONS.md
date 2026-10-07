# Cutroom — Architecture & Implementation Decisions Log

> [!IMPORTANT]
> **Strict UI Policy Directive**: Do not design or build any UI from AI judgment. Every screen must be built strictly from Figma designs only. Until the user confirms the Figma MCP / token connection works, only backend APIs, database schemas, controllers, and non-UI logic will be implemented. All existing UI components and pages listed below are marked as **[To be rebuilt from Figma]**.

---

## UI Inventory — Pending Figma Rebuild

The following UI files currently serve as functional layout placeholders and are marked for 100% rebuild directly from Figma frames:

### UI Primitives (`client/src/components/ui/`)
- `client/src/components/ui/button.jsx` — **[To be rebuilt from Figma]**
- `client/src/components/ui/input.jsx` — **[To be rebuilt from Figma]**
- `client/src/components/ui/card.jsx` — **[To be rebuilt from Figma]**
- `client/src/components/ui/badge.jsx` — **[To be rebuilt from Figma]**

### Layout Containers (`client/src/layouts/`)
- `client/src/layouts/AppLayout.jsx` — **[To be rebuilt from Figma]**
- `client/src/layouts/AuthLayout.jsx` — **[To be rebuilt from Figma]**

### Page Components (`client/src/pages/`)
- `client/src/pages/Landing.jsx` — **[To be rebuilt from Figma]**
- `client/src/pages/Login.jsx` — **[To be rebuilt from Figma]**
- `client/src/pages/Register.jsx` — **[To be rebuilt from Figma]**
- `client/src/pages/Dashboard.jsx` — **[To be rebuilt from Figma]**
- `client/src/pages/Browse.jsx` — **[To be rebuilt from Figma]**
- `client/src/pages/Projects.jsx` — **[To be rebuilt from Figma]**
- `client/src/pages/ProjectDetail.jsx` — **[To be rebuilt from Figma]**
- `client/src/pages/CreateProject.jsx` — **[To be rebuilt from Figma]**
- `client/src/pages/Profile.jsx` — **[To be rebuilt from Figma]**
- `client/src/pages/PublicProfile.jsx` — **[To be rebuilt from Figma]**

---

## Completed Non-UI & Backend Infrastructure

### Task 0 — Monorepo & Express Server Scaffold
- Monorepo structure (`/client` and `/server`).
- Express server configuration with CORS, JSON parsing, and `GET /api/health`.

### Task 1 — Authentication & Authorization (Backend)
- Mongoose User model (`server/src/models/User.js`).
- Token verification middleware (`server/src/middleware/auth.js`).
- Role-based access control middleware (`server/src/middleware/role.js`).
- Zod payload validation middleware (`server/src/middleware/validate.js`).
- `POST /api/auth/register` & `GET /api/users/me`.

### Task 2 — Profile & Portfolio (Backend)
- `PATCH /api/users/me` (Profile update endpoint).
- `GET /api/users/:id` (Public user profile endpoint).

### Task 3 — Projects Infrastructure (Backend)
- Mongoose Project model (`server/src/models/Project.js`).
- `POST /api/projects` (Create project endpoint with roles array & validation).
- `GET /api/projects/mine` (Creator project listing).
- `GET /api/projects/:id` (Project details endpoint).
- `PATCH /api/projects/:id` (Update project endpoint).
