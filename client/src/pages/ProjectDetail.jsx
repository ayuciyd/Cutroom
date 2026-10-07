import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { fetchApi } from '../lib/api';
import { Film, Users, MapPin, DollarSign, Calendar, ArrowLeft, Edit3, CheckCircle2, UserCheck } from 'lucide-react';

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, idToken } = useAuth();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      setError('');
      try {
        const res = await fetchApi(`/projects/${id}`, { method: 'GET' }, idToken);
        if (res.success && res.data) {
          setProject(res.data);
        } else {
          setError(res.error?.message || 'Project not found');
        }
      } catch (err) {
        console.error('Fetch project detail error:', err);
        setError(err.message || 'Failed to load project details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProject();
    }
  }, [id, idToken]);

  const handlePublish = async () => {
    if (!project) return;
    setIsPublishing(true);
    try {
      const res = await fetchApi(`/projects/${project._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'published' }),
      }, idToken);

      if (res.success && res.data) {
        setProject(res.data);
      }
    } catch (err) {
      console.error('Publish project error:', err);
    } finally {
      setIsPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-ink/70">{error || 'Project not found'}</p>
        <Link to="/browse">
          <Button variant="outline">Back to Browse</Button>
        </Link>
      </div>
    );
  }

  const isOwner = user && project.owner && (
    project.owner._id === user._id || 
    project.owner.firebaseUid === user.firebaseUid || 
    project.owner === user._id
  );

  const totalRoles = (project.roles || []).reduce((acc, r) => acc + r.count, 0);
  const filledRoles = (project.roles || []).reduce((acc, r) => acc + (r.filled || 0), 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center text-xs font-medium text-ink/70 hover:text-primary mb-2"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </button>

      {/* Header Banner */}
      <div className="relative bg-surface rounded-xl border border-mist shadow-card overflow-hidden">
        {project.coverUrl && (
          <div className="h-48 w-full overflow-hidden bg-ink/5">
            <img src={project.coverUrl} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant={project.status === 'published' ? 'primary' : 'secondary'} className="capitalize">
                {project.status}
              </Badge>
              <Badge variant="accent" className="capitalize">
                {project.genre}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {project.stage}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold font-heading text-ink">{project.title}</h1>
            <p className="text-sm text-ink/70 mt-1">
              Directed by <span className="font-semibold text-primary">{project.owner?.name || 'Creator'}</span>
              {project.location && ` • ${project.location}`}
            </p>
          </div>

          <div className="flex gap-2">
            {isOwner ? (
              <>
                {project.status === 'draft' && (
                  <Button variant="primary" size="sm" onClick={handlePublish} disabled={isPublishing}>
                    {isPublishing ? 'Publishing...' : 'Publish Draft'}
                  </Button>
                )}
                <Link to={`/projects/create`}>
                  <Button variant="outline" size="sm" className="space-x-1">
                    <Edit3 className="h-4 w-4" />
                    <span>New Project</span>
                  </Button>
                </Link>
              </>
            ) : (
              <Button variant="primary" size="sm" className="space-x-1.5">
                <span>Apply to Open Roles</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Overview & Logline */}
          <Card>
            <CardHeader>
              <CardTitle>Logline & Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.logline && (
                <div className="p-3 bg-paper rounded-lg border border-mist text-sm font-medium text-ink italic">
                  "{project.logline}"
                </div>
              )}
              <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-line">
                {project.description || 'No detailed description provided yet.'}
              </p>
            </CardContent>
          </Card>

          {/* Required Roles list */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Open Roles & Positions</CardTitle>
                <CardDescription>Actor auditions and technical crew openings</CardDescription>
              </div>
              <Badge variant="secondary">{filledRoles} / {totalRoles} Filled</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {(!project.roles || project.roles.length === 0) ? (
                <p className="text-xs text-ink/60 italic">No roles listed for this project yet.</p>
              ) : (
                project.roles.map((role) => {
                  const openCount = role.count - (role.filled || 0);
                  return (
                    <div key={role._id} className="p-4 border border-mist rounded-lg flex justify-between items-center bg-surface">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-sm text-ink">{role.title}</h4>
                          <Badge variant={role.type === 'actor' ? 'primary' : 'accent'} className="text-[10px] capitalize">
                            {role.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-ink/60">{role.description || 'No description provided.'}</p>
                        <p className="text-[10px] text-ink/50 font-medium">
                          {openCount > 0 ? `${openCount} position${openCount > 1 ? 's' : ''} available` : 'Position Filled'}
                        </p>
                      </div>

                      {!isOwner && openCount > 0 && (
                        <Button size="sm" variant="primary">
                          Apply Now
                        </Button>
                      )}
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Production Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-mist/50">
                <span className="text-ink/60">Stage</span>
                <span className="font-semibold capitalize">{project.stage}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-mist/50">
                <span className="text-ink/60">Genre</span>
                <span className="font-semibold capitalize">{project.genre}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-mist/50">
                <span className="text-ink/60">Budget</span>
                <span className="font-semibold">{project.budgetRange || 'TBD'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-mist/50">
                <span className="text-ink/60">Location</span>
                <span className="font-semibold">{project.location || 'TBD'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-ink/60">Created</span>
                <span className="font-semibold">{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Team & Cast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(!project.members || project.members.length === 0) ? (
                <p className="text-xs text-ink/60 italic">No accepted team members yet.</p>
              ) : (
                project.members.map((member, idx) => (
                  <div key={idx} className="flex items-center space-x-3 py-1">
                    <div className="h-8 w-8 rounded-full bg-badgeBg text-primary flex items-center justify-center font-bold text-xs">
                      {member.user?.name ? member.user.name[0] : 'T'}
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-medium text-ink truncate">{member.user?.name || 'Teammate'}</p>
                      <p className="text-ink/60 truncate">{member.roleTitle}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
