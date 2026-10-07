import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { fetchApi } from '../lib/api';
import { Film, Users, PlusCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const Dashboard = () => {
  const { user, idToken } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      if (!idToken) return;
      setLoading(true);
      try {
        const res = await fetchApi('/projects/mine', { method: 'GET' }, idToken);
        if (res.success && res.data) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error('Fetch dashboard projects error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [idToken]);

  const activeProjects = projects.filter(p => p.status === 'published');
  const openRolesCount = projects.reduce((acc, p) => {
    return acc + (p.roles || []).reduce((rAcc, r) => rAcc + (r.count - (r.filled || 0)), 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-ink">
            Welcome back, {user?.name || 'Creator'}
          </h1>
          <p className="text-sm text-ink/70">Manage your active film productions and talent recruitment.</p>
        </div>

        {user?.role === 'creator' && (
          <Link to="/projects/create">
            <Button className="space-x-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Project</span>
            </Button>
          </Link>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center space-x-4 p-4">
          <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Film className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-ink/60 font-medium">My Projects</p>
            <p className="text-2xl font-bold font-heading text-ink">{projects.length}</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4 p-4">
          <div className="bg-badgeBg text-primary p-3 rounded-lg border border-primary/20">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-ink/60 font-medium">Open Positions</p>
            <p className="text-2xl font-bold font-heading text-ink">{openRolesCount}</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4 p-4">
          <div className="bg-success/10 text-success p-3 rounded-lg">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-ink/60 font-medium">Published Productions</p>
            <p className="text-2xl font-bold font-heading text-ink">{activeProjects.length}</p>
          </div>
        </Card>
      </div>

      {/* Projects List Preview */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>My Projects Overview</CardTitle>
            <CardDescription>Projects you are currently directing or producing</CardDescription>
          </div>
          <Link to="/projects">
            <Button variant="ghost" size="sm" className="text-xs space-x-1">
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="py-8 text-center text-xs text-ink/60">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="py-8 text-center space-y-3">
              <p className="text-sm text-ink/60">No projects created yet.</p>
              <Link to="/projects/create">
                <Button size="sm">Create Your First Project</Button>
              </Link>
            </div>
          ) : (
            projects.slice(0, 3).map((project) => (
              <div 
                key={project._id} 
                className="border border-mist rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/40 transition-colors bg-surface"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-base font-heading text-ink">{project.title}</h4>
                    <Badge variant={project.status === 'published' ? 'primary' : 'secondary'} className="capitalize">
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-ink/70">{project.logline || project.description || 'No logline available.'}</p>
                </div>
                <Link to={`/projects/${project._id}`}>
                  <Button variant="outline" size="sm">Manage Project</Button>
                </Link>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
