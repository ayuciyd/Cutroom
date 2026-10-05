# Cutroom — Film Collaboration Platform

Cutroom is a web application designed for filmmakers, actors, and crew members to discover projects, build teams, and collaborate end-to-end.

## Stack Overview
- **Frontend (`/client`)**: React 18 (Vite), Tailwind CSS, shadcn/ui primitives, React Router v6, TanStack Query v5.
- **Backend (`/server`)**: Node.js + Express REST API, Mongoose (MongoDB Atlas), Firebase Admin SDK, Zod.
- **Design System**: Space Grotesk & Inter typography, custom cinema palette (`#0B0F14`, `#0F766E`, `#D9A441`, `#F7F4EE`, `#FFFFFF`, `#D8D4CA`, `#E4572E`, `#2E7D5B`).

## Project Structure
```
Cutroom/
├── client/           # Vite React frontend
├── server/           # Express REST backend
└── docs/             # Product requirements, architecture & database specs
```

## Setup & Running Locally

### 1. Prerequisites
- Node.js v18+ & npm
- MongoDB Atlas cluster or local MongoDB instance

### 2. Environment Configuration
- Copy `client/.env.example` to `client/.env`
- Copy `server/.env.example` to `server/.env` and update `MONGODB_URI` and `FIREBASE_SERVICE_ACCOUNT`.

### 3. Install Dependencies
```bash
cd client && npm install
cd ../server && npm install
```

### 4. Running the App
In separate terminal windows (or from the root):

**Backend Server (Port 5000):**
```bash
cd server
npm run dev
```

**Frontend Client (Port 5173):**
```bash
cd client
npm run dev
```

### 5. Health Check Verification
Visit `http://localhost:5000/api/health` to confirm the backend API is operating.
Open `http://localhost:5173` to access the Cutroom application.
