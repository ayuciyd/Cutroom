import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { fetchApi } from '../lib/api';
import { uploadToCloudinary } from '../lib/cloudinary';
import { PlusCircle, Trash2, Upload, Film, ArrowLeft } from 'lucide-react';

export const CreateProject = () => {
  const navigate = useNavigate();
  const { idToken } = useAuth();

  const [title, setTitle] = useState('');
  const [logline, setLogline] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('drama');
  const [stage, setStage] = useState('development');
  const [budgetRange, setBudgetRange] = useState('');
  const [location, setLocation] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [roles, setRoles] = useState([
    { title: 'Lead Actor / Actress', type: 'actor', count: 1, description: 'Main protagonist' }
  ]);

  const addRole = () => {
    setRoles([...roles, { title: '', type: 'actor', count: 1, description: '' }]);
  };

  const removeRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleRoleChange = (index, field, value) => {
    const updated = [...roles];
    updated[index][field] = value;
    setRoles(updated);
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setCoverUrl(url);
    } catch (err) {
      console.error('Cover upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e, status = 'published') => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setError('Project title is required');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const payload = {
        title,
        logline,
        description,
        genre,
        stage,
        budgetRange,
        location,
        coverUrl,
        status,
        roles: roles.filter(r => r.title.trim() !== ''),
      };

      const res = await fetchApi('/projects', {
        method: 'POST',
        body: JSON.stringify(payload),
      }, idToken);

      if (res.success && res.data) {
        navigate(`/projects/${res.data._id}`);
      } else {
        throw new Error(res.error?.message || 'Failed to create project');
      }
    } catch (err) {
      console.error('Create project error:', err);
      setError(err.message || 'Could not create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center text-xs font-medium text-ink/70 hover:text-primary mb-2"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </button>

      <div>
        <h1 className="text-3xl font-bold font-heading text-ink">Create New Project</h1>
        <p className="text-sm text-ink/70">Define your film vision, set parameters, and list positions for recruitment.</p>
      </div>

      {error && (
        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm font-medium">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <form className="space-y-6">
            {/* Title & Cover Image */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Project Title *</label>
                <Input 
                  placeholder="e.g. Midnight Horizon"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">Logline</label>
                <Input 
                  placeholder="A short one-sentence hook summarizing your film..."
                  value={logline}
                  onChange={(e) => setLogline(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">Full Description</label>
                <textarea 
                  rows={4}
                  placeholder="Detailed synopsis, vision, shooting schedule, and project overview..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-md border border-mist p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-surface text-ink"
                />
              </div>
            </div>

            {/* Stage, Genre, Budget, Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Genre</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-mist bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="drama">Drama</option>
                  <option value="thriller">Thriller</option>
                  <option value="comedy">Comedy</option>
                  <option value="sci-fi">Sci-Fi</option>
                  <option value="documentary">Documentary</option>
                  <option value="horror">Horror</option>
                  <option value="action">Action</option>
                  <option value="animation">Animation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">Production Stage</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-mist bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                >
                  <option value="development">Development</option>
                  <option value="pre-production">Pre-production</option>
                  <option value="production">Production</option>
                  <option value="post-production">Post-production</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">Budget Range</label>
                <Input 
                  placeholder="e.g. $10,000 - $25,000"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">Location</label>
                <Input 
                  placeholder="e.g. Chicago, IL / Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Poster / Cover Image Upload */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Film Cover / Poster Image</label>
              <div className="flex items-center space-x-4">
                {coverUrl ? (
                  <img src={coverUrl} alt="Cover Preview" className="h-20 w-32 object-cover rounded-lg border border-mist" />
                ) : (
                  <div className="h-20 w-32 rounded-lg bg-paper border border-mist flex flex-col items-center justify-center text-ink/40 text-xs">
                    <Film className="h-6 w-6 mb-1" />
                    <span>No Cover</span>
                  </div>
                )}
                <label className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" className="space-x-1.5" disabled={isUploading}>
                    <Upload className="h-4 w-4" />
                    <span>{isUploading ? 'Uploading...' : 'Upload Cover Image'}</span>
                  </Button>
                  <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                </label>
              </div>
            </div>

            {/* Roles Section */}
            <div className="pt-4 border-t border-mist space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-ink">Required Roles & Crew</h3>
                  <p className="text-xs text-ink/60">List actor and crew positions open for recruitment</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addRole} className="space-x-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Role</span>
                </Button>
              </div>

              {roles.map((role, idx) => (
                <div key={idx} className="p-4 border border-mist rounded-lg space-y-3 bg-surface shadow-soft">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-primary">Role #{idx + 1}</span>
                    {roles.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeRole(idx)}
                        className="text-danger hover:opacity-80 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input 
                      placeholder="Role title (e.g. Lead Detective)"
                      value={role.title}
                      onChange={(e) => handleRoleChange(idx, 'title', e.target.value)}
                      required
                    />
                    <select
                      className="flex h-10 w-full rounded-md border border-mist bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
                      value={role.type}
                      onChange={(e) => handleRoleChange(idx, 'type', e.target.value)}
                    >
                      <option value="actor">Actor</option>
                      <option value="crew">Crew</option>
                    </select>
                    <Input 
                      type="number"
                      min={1}
                      placeholder="Open Positions Count"
                      value={role.count}
                      onChange={(e) => handleRoleChange(idx, 'count', parseInt(e.target.value) || 1)}
                    />
                  </div>

                  <Input 
                    placeholder="Role description, requirements, or age range"
                    value={role.description}
                    onChange={(e) => handleRoleChange(idx, 'description', e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-mist">
              <Button 
                type="button" 
                variant="outline" 
                onClick={(e) => handleSubmit(e, 'draft')}
                disabled={isSubmitting}
              >
                Save as Draft
              </Button>
              <Button 
                type="button" 
                variant="primary" 
                onClick={(e) => handleSubmit(e, 'published')}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Project'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
