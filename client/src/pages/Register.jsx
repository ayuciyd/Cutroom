import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { Film, UserCheck, Clapperboard, Video } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const [role, setRole] = useState('creator');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register({ name, email, password, role });
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-heading text-ink">Create an account</h2>
        <p className="text-sm text-ink/70 mt-1">Join Cutroom to start collaborating</p>
      </div>

      {error && (
        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Select your primary role</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'creator', label: 'Creator', desc: 'Director/Producer', icon: Clapperboard },
              { id: 'actor', label: 'Actor', desc: 'Perform & audition', icon: UserCheck },
              { id: 'crew', label: 'Crew', desc: 'Technical & creative', icon: Video },
            ].map((r) => {
              const Icon = r.icon;
              const isSelected = role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all min-h-[56px] ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20'
                      : 'border-mist bg-surface hover:bg-paper text-ink'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-1">
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-primary' : 'text-ink/60'}`} />
                    <span className="font-semibold text-xs md:text-sm">{r.label}</span>
                  </div>
                  <span className="text-[10px] text-ink/60">{r.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Full Name</label>
          <Input 
            type="text" 
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Email address</label>
          <Input 
            type="email" 
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Password</label>
          <Input 
            type="password" 
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : `Create Account as ${role}`}
        </Button>
      </form>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-mist"></div>
        <span className="flex-shrink mx-4 text-xs text-ink/50 uppercase">or</span>
        <div className="flex-grow border-t border-mist"></div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isSubmitting}>
        Sign up with Google
      </Button>

      <p className="text-center text-sm text-ink/70 pt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};
