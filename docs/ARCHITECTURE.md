# Cutroom — Architecture

## Stack (all free tier)
| Layer | Choice | Host |
|---|---|---|
| Frontend | React 18 + Vite + Tailwind + shadcn/ui + React Router + TanStack Query | Vercel |
| Backend | Node.js + Express REST API | Render (sleeps when idle; open once before demo) |
| Database | MongoDB Atlas M0 via Mongoose | Atlas |
| Auth | Firebase Auth (email/password + Google); Express verifies ID token with firebase-admin | Firebase |
| Uploads | Cloudinary (unsigned preset for images) | Cloudinary |
| Later | Socket.io (chat), Gemini API (AI) | |

## Repo layout (monorepo)
```
cutroom/
  client/                 # Vite React app
    src/
      components/ui/      # shadcn components
      components/         # shared components
      pages/              # Landing, Login, Register, Dashboard, Browse, ProjectDetail, CreateProject, Profile
      layouts/            # AppLayout (sidebar/bottom tabs), AuthLayout
      lib/                # api.js (fetch wrapper), firebase.js, utils.js
      hooks/              # useAuth, useProjects ...
      routes.jsx
  server/
    src/
      config/             # db.js, firebase.js, env.js
      middleware/         # auth.js (verify token), role.js, error.js, validate.js
      models/             # User, Project, Application, Task
      routes/             # auth, users, projects, applications, tasks
      controllers/
      seed/seed.js        # demo data
      app.js, server.js
  docs/                   # these files
```

## Auth flow
1. Client signs in with Firebase, gets ID token.
2. Client sends `Authorization: Bearer <token>` on every API call.
3. `auth` middleware verifies via firebase-admin, loads the user by `firebaseUid`.
4. First login calls `POST /api/auth/register` to create the Mongo user with chosen role.
5. `role` middleware guards creator-only routes.

## REST API (prefix `/api`)
| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | /auth/register | token | Create user doc with role |
| GET | /users/me | auth | Current user |
| PATCH | /users/me | auth | Update profile |
| GET | /users | auth | Browse talent (query: role, skill, location, q) |
| GET | /users/:id | auth | Public profile |
| GET | /projects | auth | Browse published (query: genre, stage, q) |
| POST | /projects | creator | Create (status draft/published) |
| GET | /projects/:id | auth | Detail |
| PATCH | /projects/:id | owner | Edit, publish |
| GET | /projects/mine | creator | Own projects |
| POST | /projects/:id/applications | actor/crew | Apply to a role |
| GET | /projects/:id/applications | owner | Applicants |
| PATCH | /applications/:id | owner | Accept or reject |
| GET | /applications/mine | auth | My applications |
| GET | /projects/:id/tasks | member | List tasks |
| POST | /projects/:id/tasks | owner | Create |
| PATCH | /tasks/:id | member | Update status/assignee |

Response shape: `{ success, data, error? }`. Errors use proper HTTP codes.

## Environment variables
Client: `VITE_API_URL`, `VITE_FIREBASE_*`, `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_PRESET`.
Server: `PORT`, `MONGODB_URI`, `FIREBASE_SERVICE_ACCOUNT` (JSON string), `CLIENT_ORIGIN`.
Never commit `.env`; provide `.env.example`.

## Deployment
- Client: Vercel, root `client`, build `npm run build`, output `dist`, add SPA rewrite to index.html.
- Server: Render web service, root `server`, start `node src/server.js`, set env vars, CORS allow `CLIENT_ORIGIN`.
- Database: Atlas M0, allow 0.0.0.0/0 for the demo.
