import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { fetchApi } from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import { PlusCircle, Film, Users, ArrowRight } from 'lucide-react';

export const Projects = () => {
  const { idToken } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, published, draft

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const res = await fetchApi('/projects/mine', { method: 'GET' }, idToken);
        if (res.success && res.data) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error('Fetch my projects error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [idToken]);

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-ink">My Projects</h1>
          <p className="text-sm text-ink/70">Manage all your created projects, roles, and recruitments.</p>
        </div>
        <Link to="/projects/create">
          <Button className="space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Create Project</span>
          </Button>
        </Link>
      </div>

      {/* Filter Chips */}
      <div className="flex space-x-2">
        {['all', 'published', 'draft'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-surface border border-mist text-ink hover:bg-paper'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="min-h-[250px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card className="text-center py-12 space-y-4">
          <Film className="h-12 w-12 mx-auto text-ink/30" />
          <div className="space-y-1">
            <h3 className="font-heading font-semibold text-lg">No Projects Found</h3>
            <p className="text-sm text-ink/60 max-w-sm mx-auto">You haven't created any {filter !== 'all' ? filter : ''} projects yet.</p>
          </div>
          <Link to="/projects/create">
            <Button variant="primary">Create Your First Project</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => {
            const openRolesCount = (project.roles || []).reduce((acc, r) => acc + (r.count - (r.filled || 0)), 0);
            return (
              <Card key={project._id} className="hover:border-primary/40 transition-colors">
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle>{project.title}</CardTitle>
                      <Badge variant={project.status === 'published' ? 'primary' : 'secondary'} className="capitalize">
                        {project.status}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {project.stage}
                      </Badge>
                    </div>
                    <CardDescription>{project.logline || project.description || 'No description provided.'}</CardDescription>
                  </div>
                  <Link to={`/projects/${project._id}`}>
                    <Button variant="outline" size="sm" className="space-x-1">
                      <span>Manage</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4 text-xs text-ink/70 pt-2 border-t border-mist/40 mt-2">
                  <span>📍 {project.location || 'Location TBD'}</span>
                  <span>💰 {project.budgetRange || 'Budget TBD'}</span>
                  <span>🎬 {openRolesCount} Open Role Position{openRolesCount !== 1 ? 's' : ''}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
