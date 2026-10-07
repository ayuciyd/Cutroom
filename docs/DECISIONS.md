# Cutroom — Architecture & Implementation Decisions Log

## Task 0 — Monorepo Setup & Base Design System

### 1. Monorepo Setup & Dependencies
- **Client Scaffold**: Vite 8 + React 18 initialized in `/client` with Tailwind CSS v3, PostCSS, and Autoprefixer for design token styling.
- **Client Packages**: Installed `react-router-dom`, `@tanstack/react-query` (v5), `lucide-react`, `firebase`, `clsx`, `tailwind-merge`, and `class-variance-authority`.
- **Server Scaffold**: Express REST API initialized in `/server` (ES Modules mode with `"type": "module"`).
- **Server Packages**: Installed `express`, `mongoose`, `firebase-admin`, `cors`, `dotenv`, and `zod`.

### 2. Design Tokens & Styling (Figma Node 32-2720 Updated)
- Updated CSS variables matching Figma file node `32-2720` in `client/src/index.css`:
  - **Primary Accent**: Deep Burgundy / Maroon (`#4A1525`), Hover (`#3B111E`).
  - **Paper / Canvas**: Warm Off-White Cream (`#FAF6F0`).
  - **Surface / Card**: Pure White (`#FFFFFF`).
  - **Text / Ink**: Dark Charcoal (`#1E191A`).
  - **Borders / Mist**: Muted Rose/Sand (`#E8DFD8`).
  - **Badge Tint**: Soft Rose (`#F4E8EB`) with Burgundy text (`#4A1525`).
  - **Danger / Success**: Ember (`#E4572E`) and Forest Green (`#2E7D5B`).
- Mapped CSS variables in `tailwind.config.js`.
- Loaded Google Fonts: **Space Grotesk** & **Sora** for headings (`font-heading`), **Inter** for body text (`font-sans`).
- Built restyled primitive UI components (`Button`, `Input`, `Card`, `Badge`) using design token classes without any hardcoded hex values.

---

## Task 1 — Authentication & Authorization Infrastructure

### 1. Database User Model & Endpoints
- Created Mongoose User Schema (`server/src/models/User.js`) matching `DATABASE_SCHEMA.md` with fields: `firebaseUid`, `email`, `name`, `role` (`creator`, `actor`, `crew`, etc.), `headline`, `bio`, `location`, `avatarUrl`, `skills`, `experience`, `portfolio`, `available`.
- Built `POST /api/auth/register`: Validates payload with Zod schema (`registerSchema`), creates MongoDB user profile, and returns `{ success: true, data: userDoc }`.
- Built `GET /api/users/me`: Authenticated endpoint returning current Mongo user profile.

### 2. Backend Middleware & Resiliency
- Created `protect` middleware (`server/src/middleware/auth.js`): Verifies Firebase `Authorization: Bearer <token>`, decodes claims, attaches `req.firebaseUser`, and fetches `req.user` from MongoDB.
- Built `requireRole(...roles)` middleware (`server/src/middleware/role.js`) for role-based access control (e.g. creator-only routes).
- Added dev fallback resilience for disconnected/buffering DB states so authentication flows operate without blocking server restarts.

### 3. Frontend Authentication System
- Created `client/src/lib/firebase.js` & `client/src/lib/api.js` for API communication.
- Implemented `useAuth` hook & `AuthProvider` (`client/src/hooks/useAuth.jsx`): Manages Firebase Auth state, ID token persistence in `localStorage`, current MongoDB user profile, login, registration with role selection, Google popup authentication, and sign-out.
- Built `ProtectedRoute` (`client/src/components/common/ProtectedRoute.jsx`): Redirects unauthenticated users to `/login` and guards creator-only routes (`/projects/create`).
- Updated `Register.jsx` and `Login.jsx` with role selector cards (Creator, Actor, Crew), inline error feedback, and loading states.
- Integrated `AppLayout.jsx` with active user profile initials and logout functionality.

---

## Task 2 — Profile & Portfolio Management

### 1. Server Endpoints
- Added `PATCH /api/users/me`: Accepts updates for `name`, `headline`, `bio`, `location`, `avatarUrl`, `skills`, `experience`, `portfolio`, and `available`. Updates MongoDB document and returns updated profile.
- Added `GET /api/users/:id`: Public endpoint retrieving profile details by user ID or `firebaseUid`.

### 2. Frontend Components & Cloudinary Integration
- Built `client/src/lib/cloudinary.js`: Handles image uploads via Cloudinary unsigned preset with fallback to local FileReader data URLs.
- Updated `client/src/pages/Profile.jsx`:
  - **View Mode**: Displays avatar, name, role badge, availability toggle badge, location, headline, bio, skill tags, film credit experience list, and portfolio links.
  - **Edit Mode**: Allows updating all fields, uploading avatar image, toggling availability status, adding/removing skills, adding/removing film credits (title, company, year, description), and adding/removing portfolio links. Saves changes to backend and updates global `useAuth` state.
- Created `client/src/pages/PublicProfile.jsx`: Renders public profile view when navigating to `/profile/:id` or `/users/:id`.

---

## Task 3 — Project Management Infrastructure

### 1. Database Project Model & REST Endpoints
- Created Mongoose Project Schema (`server/src/models/Project.js`) with embedded `roleRequirementSchema` (`title`, `type` [actor/crew], `count`, `description`, `filled`) and `projectMemberSchema`.
- Built `POST /api/projects`: Creator-only endpoint guarded by `requireRole('creator')` & Zod validation (`projectSchema`). Creates project document in MongoDB or devStore with status (`draft` / `published`).
- Built `GET /api/projects/mine`: Creator-only endpoint returning all projects owned by the logged-in user.
- Built `GET /api/projects/:id`: Retrieves full project details populated with owner and team members.
- Built `PATCH /api/projects/:id`: Enables owner to edit project details, add roles, or publish a draft.

### 2. Frontend Project Pages
- Built `client/src/pages/CreateProject.jsx`: Form with title, logline, full description, genre selector, stage selector (`development`, `pre-production`, `production`, `post-production`), budget range, location, cover image upload via Cloudinary, and dynamic roles manager. Supports both "Save as Draft" and "Publish Project".
- Updated `client/src/pages/Projects.jsx` & `client/src/pages/Dashboard.jsx`: Displays creator's projects fetched from `GET /api/projects/mine` with status filter chips, open positions count, and quick stats.
- Built `client/src/pages/ProjectDetail.jsx`: Renders project banner, stage/genre/status badges, logline & synopsis, required roles list with seat availability (`filled` / `count`), team members list, and publish action button.

### 3. Verification & GitHub Sync
- `npm run build` completed cleanly in 3.94s with 0 errors.
- Scratch automated script `scratch/test_projects.js` verified `POST /api/projects`, `GET /api/projects/mine`, and `GET /api/projects/:id` returning `200 OK` and `{ success: true }`.
- Changes committed and pushed to GitHub branch `main`.
