import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, ArrowRight, ChevronDown, Check, Clapperboard } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('creator');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions = [
    { id: 'creator', label: 'Creator' },
    { id: 'writer', label: 'Writer' },
    { id: 'director', label: 'Director' },
    { id: 'actor', label: 'Actor' },
    { id: 'crew', label: 'Crew' },
    { id: 'investor', label: 'Investor' },
    { id: 'equipment_provider', label: 'Equipment Provider' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedTerms) {
      setError('You must agree to the Terms of Service.');
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || email.split('@')[0];
    setError('');
    setIsSubmitting(true);

    try {
      await register({ name: fullName, email, password, role });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await loginWithGoogle(role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign in failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedRoleObj = roleOptions.find(r => r.id === role) || roleOptions[0];

  return (
    <div className="space-y-6 max-w-[520px] mx-auto w-full">
      {/* Top Header Prompt */}
      <div className="flex items-center justify-between text-xs text-ink/70 border-b border-mist/40 pb-3">
        <span>Secure creator workspace</span>
        <div className="flex items-center space-x-2">
          <span>Already have an account?</span>
          <Link to="/login">
            <button className="h-8 px-3 rounded-[10px] border border-primary text-primary hover:bg-subtle text-xs font-semibold">
              Log in
            </button>
          </Link>
        </div>
      </div>

      {/* Form Heading */}
      <div className="space-y-1">
        <h1 className="font-heading font-semibold text-2xl md:text-3xl text-ink">Join Cutroom</h1>
        <p className="text-sm text-muted">
          Create a profile, meet collaborators, and get your next production moving.
        </p>
      </div>

      {/* Auth Tabs */}
      <div className="h-11 bg-subtle p-1 rounded-[12px] flex space-x-1">
        <button 
          className="flex-1 rounded-[9px] bg-surface font-semibold text-xs text-ink shadow-sm flex items-center justify-center"
        >
          Create account
        </button>
        <Link to="/login" className="flex-1">
          <button 
            className="w-full h-full rounded-[9px] font-semibold text-xs text-ink/60 hover:text-ink flex items-center justify-center"
          >
            Log in
          </button>
        </Link>
      </div>

      {error && (
        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-xs font-medium">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-ink">First name <span className="text-danger">*</span></label>
            <input 
              type="text" 
              placeholder="Mara"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isSubmitting}
              className="h-[44px] w-full rounded-[10px] border border-mist bg-surface px-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-ink">Last name <span className="text-danger">*</span></label>
            <input 
              type="text" 
              placeholder="Chen"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isSubmitting}
              className="h-[44px] w-full rounded-[10px] border border-mist bg-surface px-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-ink">Email address <span className="text-danger">*</span></label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40" />
            <input 
              type="email" 
              placeholder="mara@northstarfilms.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="h-[44px] w-full rounded-[10px] border border-mist bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Role Field Dropdown */}
        <div className="space-y-1 relative">
          <label className="block text-xs font-medium text-ink">Primary role <span className="text-danger">*</span></label>
          <button 
            type="button" 
            onClick={() => setIsRoleOpen(!isRoleOpen)}
            className="h-[44px] w-full rounded-[12px] border border-primary bg-surface px-4 flex items-center justify-between text-sm text-ink"
          >
            <div className="flex items-center space-x-2">
              <Clapperboard className="h-4 w-4 text-primary" />
              <span className="font-medium">{selectedRoleObj.label}</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-primary transition-transform ${isRoleOpen ? 'rotate-180' : ''}`} />
          </button>

          {isRoleOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-surface border border-mist rounded-[12px] p-2 shadow-lg z-30 space-y-1">
              {roleOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => { setRole(opt.id); setIsRoleOpen(false); }}
                  className={`w-full h-9 px-3 rounded-[8px] flex items-center justify-between text-xs font-medium transition-colors ${
                    role === opt.id ? 'bg-subtle text-primary font-semibold' : 'text-ink hover:bg-paper'
                  }`}
                >
                  <span>{opt.label}</span>
                  {role === opt.id && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-ink">Password <span className="text-danger">*</span></label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40" />
            <input 
              type="password" 
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className="h-[44px] w-full rounded-[10px] border border-mist bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <p className="text-[11px] text-muted">Use 8+ characters with a number and symbol.</p>
        </div>

        {/* Terms Agreement Checkbox */}
        <div className="flex items-start space-x-2 pt-1">
          <button 
            type="button" 
            onClick={() => setAgreedTerms(!agreedTerms)}
            className={`h-4.5 w-4.5 rounded-[5px] flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
              agreedTerms ? 'bg-primary text-white' : 'border border-mist bg-surface'
            }`}
          >
            {agreedTerms && <Check className="h-3 w-3" />}
          </button>
          <span className="text-xs text-ink leading-snug">
            I agree to the Terms of Service and Community Guidelines.
          </span>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="h-[52px] w-full rounded-[10px] bg-primary text-surface hover:opacity-95 text-sm font-semibold flex items-center justify-center space-x-2 transition-opacity pt-1"
        >
          <span>{isSubmitting ? 'Creating account...' : 'Create my account'}</span>
          <ArrowRight className="h-4.5 w-4.5" />
        </button>
      </form>

      {/* Alternative Social Login */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center space-x-4">
          <div className="flex-1 h-[1px] bg-paper"></div>
          <span className="text-[10px] font-bold text-ink/50 tracking-wider uppercase">OR CONTINUE WITH</span>
          <div className="flex-1 h-[1px] bg-paper"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleGoogleSignIn} 
            disabled={isSubmitting}
            className="h-[44px] rounded-[10px] border border-primary text-primary hover:bg-subtle text-xs font-semibold flex items-center justify-center space-x-2"
          >
            <span>Google</span>
          </button>
          <button 
            onClick={handleGoogleSignIn} 
            disabled={isSubmitting}
            className="h-[44px] rounded-[10px] border border-primary text-primary hover:bg-subtle text-xs font-semibold flex items-center justify-center space-x-2"
          >
            <span>Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
};
