import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../hooks/useAuth';
import { fetchApi } from '../lib/api';
import { uploadToCloudinary } from '../lib/cloudinary';
import { 
  User, 
  MapPin, 
  Briefcase, 
  PlusCircle, 
  Trash2, 
  Upload, 
  Link as LinkIcon, 
  CheckCircle2, 
  Edit3, 
  Save, 
  X,
  ExternalLink,
  Film
} from 'lucide-react';

export const Profile = () => {
  const { user, idToken } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Editable state fields
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [available, setAvailable] = useState(true);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [experience, setExperience] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Sync state when user changes
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setHeadline(user.headline || '');
      setBio(user.bio || '');
      setLocation(user.location || '');
      setAvatarUrl(user.avatarUrl || '');
      setAvailable(user.available !== false);
      setSkills(user.skills || []);
      setExperience(user.experience || []);
      setPortfolio(user.portfolio || []);
    }
  }, [user]);

  // Handle Avatar Upload
  const handleAvatarFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingAvatar(true);
    try {
      const url = await uploadToCloudinary(file);
      setAvatarUrl(url);
    } catch (err) {
      console.error('Avatar upload error:', err);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Add/Remove Skills
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // Add/Remove Experience
  const handleAddExperience = () => {
    setExperience([
      ...experience,
      { title: '', company: '', year: '', description: '' }
    ]);
  };

  const handleRemoveExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  // Add/Remove Portfolio
  const handleAddPortfolio = () => {
    setPortfolio([
      ...portfolio,
      { title: '', type: 'link', url: '', thumbnailUrl: '' }
    ]);
  };

  const handleRemovePortfolio = (index) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  // Save Profile Changes
  const handleSaveProfile = async (e) => {
    e?.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const res = await fetchApi('/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
          name,
          headline,
          bio,
          location,
          avatarUrl,
          available,
          skills,
          experience,
          portfolio,
        }),
      }, idToken);

      if (res.success && res.data) {
        localStorage.setItem('cutroom_user', JSON.stringify(res.data));
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error('Save profile error:', err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (n) => {
    if (!n) return 'CR';
    return n.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {message && (
        <div className={`p-4 rounded-lg flex items-center justify-between text-sm font-medium ${
          message.startsWith('Error') 
            ? 'bg-danger/10 text-danger border border-danger/30' 
            : 'bg-success/10 text-success border border-success/30'
        }`}>
          <span>{message}</span>
          <button onClick={() => setMessage('')} className="p-1"><X className="h-4 w-4" /></button>
        </div>
      )}

      {/* Profile Header Card */}
      <Card className="p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar Container */}
          <div className="relative group">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={name} 
                className="h-28 w-28 rounded-full object-cover border-4 border-primary/20 shadow-soft"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-badgeBg text-primary flex items-center justify-center font-bold text-3xl font-heading shadow-soft border-4 border-primary/20">
                {getInitials(name)}
              </div>
            )}

            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-hover shadow-lg">
                <Upload className="h-4 w-4" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarFileChange}
                  disabled={isUploadingAvatar}
                />
              </label>
            )}
          </div>

          {/* User Details */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                {isEditing ? (
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Full Name"
                    className="font-bold text-xl mb-1"
                  />
                ) : (
                  <h1 className="text-3xl font-bold font-heading text-ink">{name}</h1>
                )}

                {isEditing ? (
                  <Input 
                    value={headline} 
                    onChange={(e) => setHeadline(e.target.value)} 
                    placeholder="Headline (e.g. Indie Director & Cinematographer)"
                    className="text-sm mt-1"
                  />
                ) : (
                  <p className="text-sm text-primary font-semibold">{headline || 'Film Creator & Collaborator'}</p>
                )}
              </div>

              {/* Edit / Save Action Button */}
              <div className="flex justify-center md:justify-end gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleSaveProfile} disabled={isSaving}>
                      <Save className="h-4 w-4 mr-1.5" />
                      {isSaving ? 'Saving...' : 'Save Profile'}
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit3 className="h-4 w-4 mr-1.5" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            {/* Badges & Location */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-xs text-ink/70 pt-2">
              <span className="flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1 text-primary" />
                {isEditing ? (
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Chicago, IL"
                    className="border border-mist rounded px-2 py-0.5 text-xs text-ink"
                  />
                ) : (
                  location || 'Location Not Specified'
                )}
              </span>

              <Badge variant="secondary" className="capitalize">
                Role: {user.role}
              </Badge>

              {isEditing ? (
                <label className="flex items-center space-x-1.5 cursor-pointer bg-paper px-2.5 py-1 rounded-full border border-mist">
                  <input 
                    type="checkbox" 
                    checked={available} 
                    onChange={(e) => setAvailable(e.target.checked)}
                    className="accent-primary"
                  />
                  <span className="text-xs font-medium">Available for Hire</span>
                </label>
              ) : (
                <Badge variant={available ? 'success' : 'danger'}>
                  {available ? 'Available for Hire' : 'Currently Busy'}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Bio Section */}
          <Card>
            <CardHeader>
              <CardTitle>Biography</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <textarea 
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell filmmakers and collaborators about yourself, your style, and your film background..."
                  className="w-full rounded-md border border-mist p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-surface text-ink"
                />
              ) : (
                <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-line">
                  {bio || 'No biography provided yet. Click "Edit Profile" to share your background.'}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Experience</CardTitle>
                <CardDescription>Key projects, positions, and film credits</CardDescription>
              </div>
              {isEditing && (
                <Button size="sm" variant="outline" onClick={handleAddExperience} className="space-x-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Credit</span>
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {experience.length === 0 ? (
                <p className="text-xs text-ink/60 italic">No experience credits listed yet.</p>
              ) : (
                experience.map((exp, idx) => (
                  <div key={idx} className="p-4 border border-mist rounded-lg space-y-2 relative bg-surface">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-ink/60">Credit #{idx + 1}</span>
                          <button onClick={() => handleRemoveExperience(idx)} className="text-danger p-1">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <Input 
                            placeholder="Title (e.g. Lead Director)"
                            value={exp.title}
                            onChange={(e) => {
                              const updated = [...experience];
                              updated[idx].title = e.target.value;
                              setExperience(updated);
                            }}
                          />
                          <Input 
                            placeholder="Production/Company"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...experience];
                              updated[idx].company = e.target.value;
                              setExperience(updated);
                            }}
                          />
                          <Input 
                            placeholder="Year (e.g. 2025)"
                            value={exp.year}
                            onChange={(e) => {
                              const updated = [...experience];
                              updated[idx].year = e.target.value;
                              setExperience(updated);
                            }}
                          />
                        </div>
                        <Input 
                          placeholder="Description / Key details"
                          value={exp.description}
                          onChange={(e) => {
                            const updated = [...experience];
                            updated[idx].description = e.target.value;
                            setExperience(updated);
                          }}
                        />
                      </div>
                    ) : (
                      <div>
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
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Portfolio Section */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Portfolio & Reel</CardTitle>
                <CardDescription>Demo reels, short films, and work samples</CardDescription>
              </div>
              {isEditing && (
                <Button size="sm" variant="outline" onClick={handleAddPortfolio} className="space-x-1">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Item</span>
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolio.length === 0 ? (
                <p className="text-xs text-ink/60 italic">No portfolio items added yet.</p>
              ) : (
                portfolio.map((item, idx) => (
                  <div key={idx} className="p-4 border border-mist rounded-lg space-y-2 bg-surface">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-ink/60">Portfolio Item #{idx + 1}</span>
                          <button onClick={() => handleRemovePortfolio(idx)} className="text-danger p-1">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <Input 
                            placeholder="Title (e.g. Director's Reel 2025)"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...portfolio];
                              updated[idx].title = e.target.value;
                              setPortfolio(updated);
                            }}
                          />
                          <select
                            className="flex h-10 w-full rounded-md border border-mist bg-surface px-3 py-2 text-sm text-ink"
                            value={item.type}
                            onChange={(e) => {
                              const updated = [...portfolio];
                              updated[idx].type = e.target.value;
                              setPortfolio(updated);
                            }}
                          >
                            <option value="image">Image</option>
                            <option value="video">Video Reel</option>
                            <option value="link">External Link</option>
                          </select>
                          <Input 
                            placeholder="URL (Vimeo, YouTube, etc.)"
                            value={item.url}
                            onChange={(e) => {
                              const updated = [...portfolio];
                              updated[idx].url = e.target.value;
                              setPortfolio(updated);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
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
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column: Skills & Quick Profile Overview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Specializations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {skills.length === 0 ? (
                  <p className="text-xs text-ink/60 italic">No skills added yet.</p>
                ) : (
                  skills.map((s) => (
                    <Badge key={s} variant="secondary" className="flex items-center space-x-1 py-1 px-2.5">
                      <span>{s}</span>
                      {isEditing && (
                        <button onClick={() => handleRemoveSkill(s)} className="hover:text-danger ml-1">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))
                )}
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-2 border-t border-mist">
                  <Input 
                    placeholder="Add skill (e.g. Editing)" 
                    value={newSkill} 
                    onChange={(e) => setNewSkill(e.target.value)} 
                    className="text-xs"
                  />
                  <Button size="sm" onClick={handleAddSkill} variant="outline">
                    Add
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
