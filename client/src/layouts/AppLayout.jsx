import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  Clapperboard, 
  ChevronsUpDown, 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Inbox, 
  CheckSquare, 
  UserRound, 
  CircleHelp, 
  Settings, 
  Plus, 
  Search, 
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Projects', path: '/projects', icon: FolderKanban },
    { label: 'Discover Talent', path: '/browse', icon: Users },
    { label: 'Applications', path: '/applications', icon: Inbox, count: 5 },
    { label: 'Tasks', path: '/tasks', icon: CheckSquare },
    { label: 'Profile', path: '/profile', icon: UserRound },
  ];

  const supportNav = [
    { label: 'Help & resources', path: '/help', icon: CircleHelp },
    { label: 'Settings', path: '/settings', icon: Settings },
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
    if (!name) return 'MC';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-page flex flex-col md:flex-row font-body text-ink">
      {/* Desktop Sidebar (248px) */}
      <aside className="hidden md:flex flex-col w-[248px] bg-surface border-r border-mist sticky top-0 h-screen p-6 justify-between z-30 flex-shrink-0">
        <div className="space-y-6">
          {/* Cutroom Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-[10px] bg-primary flex items-center justify-center text-surface">
              <Clapperboard className="h-5 w-5" />
            </div>
            <span className="font-heading font-semibold text-[16px] text-primary">Cutroom</span>
          </Link>

          {/* Workspace Switcher */}
          <div className="bg-page rounded-[12px] p-4 flex items-center justify-between space-x-2 border border-mist/50">
            <div className="flex items-center space-x-2 min-w-0">
              <div className="h-8 w-8 rounded-[8px] bg-ink flex items-center justify-center text-surface text-[12px] font-semibold flex-shrink-0">
                NS
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-ink truncate leading-tight">North Star Films</p>
                <p className="text-[11px] text-muted truncate">Independent studio</p>
              </div>
            </div>
            <ChevronsUpDown className="h-3.5 w-3.5 text-ink/60 flex-shrink-0" />
          </div>

          {/* Primary Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`h-11 px-4 rounded-[12px] flex items-center justify-between text-xs font-medium transition-colors ${
                    active
                      ? 'bg-subtle text-primary font-semibold'
                      : 'bg-surface text-ink hover:bg-page'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4.5 w-4.5 ${active ? 'text-primary' : 'text-ink/60'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="h-[22px] min-w-[22px] px-1.5 rounded-full bg-ink text-surface text-[11px] font-semibold flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Support */}
          <div className="pt-2 space-y-1">
            {supportNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="h-11 px-4 rounded-[12px] flex items-center space-x-3 text-xs font-medium text-ink hover:bg-page transition-colors"
                >
                  <Icon className="h-4.5 w-4.5 text-ink/60" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Storage Card & User Action */}
        <div className="space-y-4">
          <div className="bg-page border border-mist rounded-[16px] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-ink">
              <span>Storage</span>
              <span className="text-muted text-[11px]">68%</span>
            </div>
            <div className="h-1.5 w-full bg-mist/60 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[68%]" />
            </div>
            <p className="text-[11px] text-muted">6.8 GB of 10 GB used</p>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full h-9 px-3 rounded-[10px] border border-mist hover:bg-page text-xs text-danger font-medium flex items-center justify-center space-x-2"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-[72px] px-8 bg-surface border-b border-mist flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="font-heading font-semibold text-xl text-ink">
              Dashboard
            </h1>
            <p className="text-xs text-muted font-heading">
              Monday, October 5
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/projects/create">
              <button className="h-11 px-4 rounded-[10px] bg-primary text-surface hover:opacity-95 text-xs font-semibold flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create project</span>
              </button>
            </Link>

            <button className="h-10 w-10 rounded-[10px] border border-mist flex items-center justify-center text-ink hover:bg-page">
              <Search className="h-4.5 w-4.5" />
            </button>

            <button className="h-10 w-10 rounded-[12px] border border-mist flex items-center justify-center text-ink hover:bg-page relative">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-[7px] right-[7px] h-2 w-2 rounded-full bg-danger border-2 border-surface"></span>
            </button>

            <div className="h-10 w-10 rounded-full bg-page text-primary flex items-center justify-center font-heading font-semibold text-xs border border-mist">
              {getInitials(user?.name)}
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

