import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  PlusCircle, 
  FolderKanban, 
  User as UserIcon, 
  Film, 
  LogOut, 
  Bell
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: Home },
    { label: 'Browse', path: '/browse', icon: Compass },
    { label: 'Create', path: '/projects/create', icon: PlusCircle },
    { label: 'Projects', path: '/projects', icon: FolderKanban },
    { label: 'Profile', path: '/profile', icon: UserIcon },
  ];

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'CR';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col md:flex-row">
      {/* Mobile Top App Bar */}
      <header className="md:hidden sticky top-0 z-40 bg-surface border-b border-mist px-4 py-3 flex items-center justify-between shadow-soft">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="bg-primary text-white p-1.5 rounded-md">
            <Film className="h-5 w-5" />
          </div>
          <span className="font-heading font-bold text-xl text-ink">Cutroom</span>
        </Link>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-ink hover:bg-paper rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center">
            <Bell className="h-5 w-5" />
          </button>
          {user ? (
            <button onClick={handleLogout} className="text-xs font-medium text-danger hover:underline p-2">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-xs font-medium text-ink hover:text-primary">
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Desktop Sidebar (240px) */}
      <aside className="hidden md:flex flex-col w-[240px] bg-surface border-r border-mist min-h-screen sticky top-0 h-screen p-4 justify-between z-30">
        <div>
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 px-3 py-4 mb-6">
            <div className="bg-primary text-white p-2 rounded-lg">
              <Film className="h-6 w-6" />
            </div>
            <span className="font-heading font-bold text-2xl text-ink tracking-tight">Cutroom</span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-md font-medium text-sm transition-colors ${
                    active
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-ink/80 hover:bg-paper hover:text-ink'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-primary' : 'text-ink/60'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile summary / Auth actions */}
        <div className="border-t border-mist pt-4 space-y-3">
          {user ? (
            <>
              <div className="flex items-center space-x-3 px-2">
                <div className="h-9 w-9 rounded-full bg-badgeBg text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                  {getInitials(user.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{user.name}</p>
                  <p className="text-xs text-ink/60 truncate capitalize">{user.role}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full justify-start space-x-2 text-danger hover:bg-danger/10">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </Button>
            </>
          ) : (
            <Link to="/login" className="w-full">
              <Button variant="primary" size="sm" className="w-full">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-8 p-4 md:p-8 max-w-[1200px] mx-auto w-full">
        <Outlet />
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-mist px-2 py-1 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 min-h-[44px] min-w-[44px] rounded-lg transition-colors ${
                active ? 'text-primary font-semibold' : 'text-ink/60 hover:text-ink'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
