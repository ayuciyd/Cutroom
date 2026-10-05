import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';

export const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [logline, setLogline] = useState('');
  const [genre, setGenre] = useState('drama');
  const [stage, setStage] = useState('development');
  const [budgetRange, setBudgetRange] = useState('');
  const [roles, setRoles] = useState([
    { title: '', type: 'actor', count: 1, description: '' }
  ]);

  const addRole = () => {
    setRoles([...roles, { title: '', type: 'actor', count: 1, description: '' }]);
  };

  const removeRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project submit:', { title, logline, genre, stage, budgetRange, roles });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading text-ink">Create New Project</h1>
        <p className="text-sm text-ink/70">Fill out project details and list needed roles for recruitment.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Project Title</label>
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
                placeholder="A short one-sentence summary of your film..."
                value={logline}
                onChange={(e) => setLogline(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <option value="documentary">Documentary</option>
                  <option value="sci-fi">Sci-Fi</option>
                  <option value="horror">Horror</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">Stage</label>
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
            </div>

            {/* Roles section */}
            <div className="pt-4 border-t border-mist space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-heading font-semibold text-lg">Required Roles</h3>
                <Button type="button" variant="outline" size="sm" onClick={addRole} className="space-x-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Role</span>
                </Button>
              </div>

              {roles.map((role, idx) => (
                <div key={idx} className="p-4 border border-mist rounded-lg space-y-3 relative bg-paper/50">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-ink/60">Role #{idx + 1}</span>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input 
                      placeholder="Role title (e.g. Cinematographer)"
                      value={role.title}
                      onChange={(e) => {
                        const updated = [...roles];
                        updated[idx].title = e.target.value;
                        setRoles(updated);
                      }}
                    />
                    <select
                      className="flex h-10 w-full rounded-md border border-mist bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
                      value={role.type}
                      onChange={(e) => {
                        const updated = [...roles];
                        updated[idx].type = e.target.value;
                        setRoles(updated);
                      }}
                    >
                      <option value="actor">Actor</option>
                      <option value="crew">Crew</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-mist">
              <Button type="button" variant="outline">Save Draft</Button>
              <Button type="submit" variant="primary">Publish Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
