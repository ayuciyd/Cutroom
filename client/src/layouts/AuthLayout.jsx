import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Film } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-paper flex flex-col justify-center items-center p-4">
      {/* Brand Header */}
      <Link to="/" className="flex items-center space-x-2 mb-8">
        <div className="bg-primary text-white p-2.5 rounded-lg shadow-soft">
          <Film className="h-7 w-7" />
        </div>
        <span className="font-heading font-bold text-3xl text-ink tracking-tight">Cutroom</span>
      </Link>

      {/* Auth Card Container */}
      <div className="w-full max-w-md bg-surface border border-mist rounded-xl shadow-card p-6 md:p-8">
        <Outlet />
      </div>

      {/* Footer link */}
      <p className="mt-8 text-xs text-ink/60 text-center">
        Cutroom — Professional Film Collaboration Platform
      </p>
    </div>
  );
};
