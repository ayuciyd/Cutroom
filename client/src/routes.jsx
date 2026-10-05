import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { LandingPage } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Browse } from './pages/Browse';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { CreateProject } from './pages/CreateProject';
import { Profile } from './pages/Profile';
import { PublicProfile } from './pages/PublicProfile';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected App Routes with AppLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<PublicProfile />} />
          <Route path="/users/:id" element={<PublicProfile />} />

          {/* Creator Only Routes */}
          <Route element={<ProtectedRoute allowedRoles={['creator']} />}>
            <Route path="/projects/create" element={<CreateProject />} />
          </Route>
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
