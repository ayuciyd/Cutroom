import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchApi } from '../lib/api';
import { 
  CalendarDays, 
  Clapperboard, 
  UserPlus, 
  Inbox, 
  ListChecks, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Check 
} from 'lucide-react';

import projectAfterLastTrain from '../assets/project_after_last_train.png';
import projectSaltwaterStatic from '../assets/project_saltwater_static.png';
import projectBorrowedLight from '../assets/project_borrowed_light.png';

export const Dashboard = () => {
  const { user, idToken } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadDashboardData() {
      if (!idToken) return;
      try {
        const res = await fetchApi('/projects/mine', { method: 'GET' }, idToken);
        if (res.success && res.data) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error('Fetch dashboard projects error:', err);
      }
    }

    loadDashboardData();
  }, [idToken]);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Mara';

  return (
    <div className="space-y-8 max-w-[1150px] mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="font-heading font-semibold text-2xl md:text-3xl text-ink">
            Good morning, {firstName}
          </h1>
          <p className="text-sm font-medium text-danger">
            Here’s what’s moving across your productions today.
          </p>
        </div>

        <div className="bg-page px-4 py-2 rounded-[12px] flex items-center space-x-2 text-xs text-ink font-medium border border-mist/40">
          <CalendarDays className="h-4 w-4 text-ink/70" />
          <span>2 production milestones this week</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1 */}
        <div className="bg-surface border border-mist rounded-[16px] p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-[38px] w-[38px] rounded-[10px] bg-page flex items-center justify-center text-ink">
              <Clapperboard className="h-4.5 w-4.5" />
            </div>
            <span className="px-2 py-1 rounded-[18px] bg-subtle text-[11px] font-semibold text-ink uppercase tracking-wider">
              +1 this month
            </span>
          </div>
          <div className="space-y-0.5">
            <p className="font-heading font-semibold text-xl text-ink">3</p>
            <p className="text-xs font-semibold text-ink">Active projects</p>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-surface border border-mist rounded-[16px] p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-[38px] w-[38px] rounded-[10px] bg-page flex items-center justify-center text-ink">
              <UserPlus className="h-4.5 w-4.5" />
            </div>
            <span className="px-2 py-1 rounded-[18px] bg-subtle text-[11px] font-semibold text-ink uppercase tracking-wider">
              4 urgent
            </span>
          </div>
          <div className="space-y-0.5">
            <p className="font-heading font-semibold text-xl text-ink">11</p>
            <p className="text-xs font-semibold text-ink">Open roles</p>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-surface border border-mist rounded-[16px] p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-[38px] w-[38px] rounded-[10px] bg-page flex items-center justify-center text-ink">
              <Inbox className="h-4.5 w-4.5" />
            </div>
            <span className="px-2 py-1 rounded-[18px] bg-subtle text-[11px] font-semibold text-primary uppercase tracking-wider">
              +8 this week
            </span>
          </div>
          <div className="space-y-0.5">
            <p className="font-heading font-semibold text-xl text-ink">28</p>
            <p className="text-xs font-semibold text-ink">Applications</p>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-surface border border-mist rounded-[16px] p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-[38px] w-[38px] rounded-[10px] bg-page flex items-center justify-center text-ink">
              <ListChecks className="h-4.5 w-4.5" />
            </div>
            <span className="px-2 py-1 rounded-[18px] bg-subtle text-[11px] font-semibold text-danger uppercase tracking-wider">
              2 overdue
            </span>
          </div>
          <div className="space-y-0.5">
            <p className="font-heading font-semibold text-xl text-ink">7</p>
            <p className="text-xs font-semibold text-ink">Tasks due</p>
          </div>
        </div>
      </div>

      {/* Dashboard Columns (Projects & Applications) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Projects Panel (Left / Main) */}
        <div className="flex-1 w-full bg-surface border border-mist rounded-[16px] p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-semibold text-lg text-ink">My projects</h2>
              <p className="text-xs text-muted">Three productions currently in motion</p>
            </div>
            <Link to="/projects">
              <button className="h-9 px-3.5 rounded-[10px] border border-primary text-primary hover:bg-subtle text-xs font-semibold flex items-center space-x-2">
                <span>View all</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>

          {/* Project List */}
          <div className="divide-y divide-mist">
            {/* Project Row 1 */}
            <div className="py-4 flex items-center justify-between space-x-4 first:pt-0 last:pb-0">
              <img 
                src={projectAfterLastTrain} 
                alt="After the Last Train" 
                className="h-[54px] w-[76px] object-cover rounded-[8px] flex-shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center space-x-2">
                  <h3 className="font-heading font-semibold text-sm text-ink truncate">After the Last Train</h3>
                  <span className="px-2 py-0.5 rounded-full bg-subtle text-[10px] font-semibold text-ink">
                    Drama
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-1.25 bg-page rounded-full overflow-hidden max-w-[200px]">
                    <div className="h-full bg-primary rounded-full w-[72%]" />
                  </div>
                  <span className="text-[11px] text-ink font-medium">72%</span>
                </div>
              </div>

              <div className="text-right space-y-1 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full bg-ink text-surface text-[10px] font-semibold">
                  In production
                </span>
                <p className="text-[11px] text-ink font-semibold">Due Oct 28</p>
              </div>

              <ChevronRight className="h-4 w-4 text-ink/40 flex-shrink-0" />
            </div>

            {/* Project Row 2 */}
            <div className="py-4 flex items-center justify-between space-x-4">
              <img 
                src={projectSaltwaterStatic} 
                alt="Saltwater Static" 
                className="h-[54px] w-[76px] object-cover rounded-[8px] flex-shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center space-x-2">
                  <h3 className="font-heading font-semibold text-sm text-ink truncate">Saltwater Static</h3>
                  <span className="px-2 py-0.5 rounded-full bg-subtle text-[10px] font-semibold text-ink">
                    Thriller
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-1.25 bg-page rounded-full overflow-hidden max-w-[200px]">
                    <div className="h-full bg-accent rounded-full w-[43%]" />
                  </div>
                  <span className="text-[11px] text-ink font-medium">43%</span>
                </div>
              </div>

              <div className="text-right space-y-1 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full bg-ink text-surface text-[10px] font-semibold">
                  Pre-production
                </span>
                <p className="text-[11px] text-ink font-semibold">Due Nov 12</p>
              </div>

              <ChevronRight className="h-4 w-4 text-ink/40 flex-shrink-0" />
            </div>

            {/* Project Row 3 */}
            <div className="py-4 flex items-center justify-between space-x-4">
              <img 
                src={projectBorrowedLight} 
                alt="Borrowed Light" 
                className="h-[54px] w-[76px] object-cover rounded-[8px] flex-shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center space-x-2">
                  <h3 className="font-heading font-semibold text-sm text-ink truncate">Borrowed Light</h3>
                  <span className="px-2 py-0.5 rounded-full bg-subtle text-[10px] font-semibold text-ink">
                    Documentary
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-1.25 bg-page rounded-full overflow-hidden max-w-[200px]">
                    <div className="h-full bg-primary rounded-full w-[18%]" />
                  </div>
                  <span className="text-[11px] text-ink font-medium">18%</span>
                </div>
              </div>

              <div className="text-right space-y-1 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full bg-ink text-surface text-[10px] font-semibold">
                  Recruiting
                </span>
                <p className="text-[11px] text-ink font-semibold">Due Dec 05</p>
              </div>

              <ChevronRight className="h-4 w-4 text-ink/40 flex-shrink-0" />
            </div>
          </div>

          {/* Production Pulse Banner */}
          <div className="bg-page rounded-[12px] p-4 flex items-center justify-between space-x-4 border border-mist/40">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-[10px] bg-primary flex items-center justify-center text-surface flex-shrink-0">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-ink">Production pulse</h4>
                <p className="text-xs text-ink/80">
                  After the Last Train completed 9 tasks and added 2 collaborators this week.
                </p>
              </div>
            </div>
            <button className="h-[38px] px-4 rounded-[10px] border border-primary text-primary hover:bg-subtle text-xs font-semibold bg-surface flex-shrink-0">
              Open
            </button>
          </div>
        </div>

        {/* Applications Panel (Right - 360px) */}
        <div className="w-full lg:w-[360px] bg-surface border border-mist rounded-[16px] p-6 space-y-6 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-semibold text-lg text-ink">Recent applications</h2>
              <p className="text-xs text-muted">5 need your review</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-ink text-surface text-[10px] font-semibold">
              5 new
            </span>
          </div>

          {/* Applications List */}
          <div className="divide-y divide-mist">
            {/* Applicant 1 */}
            <div className="py-4 flex items-start space-x-3 first:pt-0">
              <div className="h-[38px] w-[38px] rounded-full bg-page text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">
                MO
              </div>
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-ink truncate">Maya Ortiz</p>
                  <span className="text-[11px] text-ink/60">18m</span>
                </div>
                <p className="text-xs font-semibold text-primary">Lead Actor</p>
                <p className="text-xs text-ink">After the Last Train</p>
              </div>
            </div>

            {/* Applicant 2 */}
            <div className="py-4 flex items-start space-x-3">
              <div className="h-[38px] w-[38px] rounded-full bg-page text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">
                NK
              </div>
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-ink truncate">Noah Kim</p>
                  <span className="text-[11px] text-ink/60">2h</span>
                </div>
                <p className="text-xs font-semibold text-primary">1st AC</p>
                <p className="text-xs text-ink">Saltwater Static</p>
              </div>
            </div>

            {/* Applicant 3 */}
            <div className="py-4 flex items-start space-x-3">
              <div className="h-[38px] w-[38px] rounded-full bg-page text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">
                AB
              </div>
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-ink truncate">Avery Brooks</p>
                  <span className="text-[11px] text-ink/60">5h</span>
                </div>
                <p className="text-xs font-semibold text-primary">Sound Mixer</p>
                <p className="text-xs text-ink">After the Last Train</p>
              </div>
            </div>

            {/* Applicant 4 */}
            <div className="py-4 flex items-start space-x-3">
              <div className="h-[38px] w-[38px] rounded-full bg-page text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">
                PS
              </div>
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-ink truncate">Priya Shah</p>
                  <span className="text-[11px] text-ink/60">Yesterday</span>
                </div>
                <p className="text-xs font-semibold text-primary">Editor</p>
                <p className="text-xs text-ink">Borrowed Light</p>
              </div>
            </div>
          </div>

          <button className="w-full h-11 rounded-[10px] border border-primary text-primary hover:bg-subtle text-xs font-semibold">
            Review all applications
          </button>
        </div>
      </div>

      {/* Upcoming Tasks Banner */}
      <div className="bg-surface border border-mist rounded-[12px] p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
        <div className="w-full lg:w-[220px] space-y-1 flex-shrink-0">
          <h2 className="font-heading font-semibold text-lg text-ink">Next up</h2>
          <p className="text-xs font-medium text-danger">Three tasks due today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 w-full">
          {/* Task 1 */}
          <div className="flex items-start space-x-3">
            <div className="h-[22px] w-[22px] rounded-[6px] border border-accent flex items-center justify-center flex-shrink-0 mt-0.5 relative">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
            </div>
            <div className="min-w-0 space-y-0.5">
              <p className="text-xs font-semibold text-ink truncate">Approve wardrobe references</p>
              <p className="text-[11px] text-ink truncate">After the Last Train</p>
            </div>
          </div>

          {/* Task 2 */}
          <div className="flex items-start space-x-3">
            <div className="h-[22px] w-[22px] rounded-[6px] border border-mist flex items-center justify-center flex-shrink-0 mt-0.5">
            </div>
            <div className="min-w-0 space-y-0.5">
              <p className="text-xs font-semibold text-ink truncate">Confirm soundstage hold</p>
              <p className="text-[11px] text-ink truncate">Saltwater Static</p>
            </div>
          </div>

          {/* Task 3 */}
          <div className="flex items-start space-x-3">
            <div className="h-[22px] w-[22px] rounded-[6px] border border-mist flex items-center justify-center flex-shrink-0 mt-0.5">
            </div>
            <div className="min-w-0 space-y-0.5">
              <p className="text-xs font-semibold text-ink truncate">Review casting shortlist</p>
              <p className="text-[11px] text-ink truncate">After the Last Train</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

