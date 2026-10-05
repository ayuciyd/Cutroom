import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { fetchApi } from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import { MapPin, Film, ExternalLink, ArrowLeft } from 'lucide-react';

export const PublicProfile = () => {
  const { id } = useParams();
  const { idToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const res = await fetchApi(`/users/${id}`, { method: 'GET' }, idToken);
        if (res.success && res.data) {
          setProfile(res.data);
        }
      } catch (err) {
        console.error('Fetch public profile error:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProfile();
    }
  }, [id, idToken]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-ink/70">User profile not found.</p>
        <Link to="/browse">
          <Button variant="outline">Back to Browse</Button>
        </Link>
      </div>
    );
  }

  const getInitials = (n) => {
    if (!n) return 'CR';
    return n.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/browse" className="inline-flex items-center text-xs font-medium text-ink/70 hover:text-primary mb-2">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Talent Browse
      </Link>

      {/* Header Profile Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {profile.avatarUrl ? (
            <img 
              src={profile.avatarUrl} 
              alt={profile.name} 
              className="h-28 w-28 rounded-full object-cover border-4 border-primary/20 shadow-soft"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-badgeBg text-primary flex items-center justify-center font-bold text-3xl font-heading shadow-soft border-4 border-primary/20">
              {getInitials(profile.name)}
            </div>
          )}

          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold font-heading text-ink">{profile.name}</h1>
            <p className="text-sm text-primary font-semibold">{profile.headline || 'Film Collaborator'}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-xs text-ink/70 pt-2">
              <span className="flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1 text-primary" />
                {profile.location || 'Location Not Specified'}
              </span>
              <Badge variant="secondary" className="capitalize">
                Role: {profile.role}
              </Badge>
              <Badge variant={profile.available !== false ? 'success' : 'danger'}>
                {profile.available !== false ? 'Available for Hire' : 'Currently Busy'}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Biography</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-line">
                {profile.bio || 'No biography provided.'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience & Film Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!profile.experience || profile.experience.length === 0 ? (
                <p className="text-xs text-ink/60 italic">No experience credits listed.</p>
              ) : (
                profile.experience.map((exp, idx) => (
                  <div key={idx} className="p-4 border border-mist rounded-lg space-y-1 bg-surface">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-sm text-ink">{exp.title}</h4>
                        <p className="text-xs text-primary font-medium">{exp.company}</p>
                      </div>
                      <span className="text-xs text-ink/60">{exp.year}</span>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-ink/70 mt-2">{exp.description}</p>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio & Reel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!profile.portfolio || profile.portfolio.length === 0 ? (
                <p className="text-xs text-ink/60 italic">No portfolio items listed.</p>
              ) : (
                profile.portfolio.map((item, idx) => (
                  <div key={idx} className="p-4 border border-mist rounded-lg flex justify-between items-center bg-surface">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 text-primary p-2 rounded-md">
                        <Film className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-ink">{item.title}</h4>
                        <p className="text-xs text-ink/60 capitalize">{item.type} • {item.url}</p>
                      </div>
                    </div>
                    {item.url && (
                      <a 
                        href={item.url.startsWith('http') ? item.url : `https://${item.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Skills & Specializations</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {!profile.skills || profile.skills.length === 0 ? (
                <p className="text-xs text-ink/60 italic">No skills listed.</p>
              ) : (
                profile.skills.map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
