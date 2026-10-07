import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await loginWithGoogle('actor');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign in failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[520px] mx-auto w-full">
      {/* Top Header Prompt */}
      <div className="flex items-center justify-between text-xs text-ink/70 border-b border-mist/40 pb-3">
        <span>Secure creator workspace</span>
        <div className="flex items-center space-x-2">
          <span>Need an account?</span>
          <Link to="/register">
            <button className="h-8 px-3 rounded-[10px] border border-primary text-primary hover:bg-subtle text-xs font-semibold">
              Sign up
            </button>
          </Link>
        </div>
      </div>

      {/* Form Heading */}
      <div className="space-y-1">
        <h1 className="font-heading font-semibold text-2xl md:text-3xl text-ink">Welcome back</h1>
        <p className="text-sm text-muted">
          Sign in to your Cutroom account to continue collaborating.
        </p>
      </div>

      {/* Auth Tabs */}
      <div className="h-11 bg-subtle p-1 rounded-[12px] flex space-x-1">
        <Link to="/register" className="flex-1">
          <button 
            className="w-full h-full rounded-[9px] font-semibold text-xs text-ink/60 hover:text-ink flex items-center justify-center"
          >
            Create account
          </button>
        </Link>
        <button 
          className="flex-1 rounded-[9px] bg-surface font-semibold text-xs text-ink shadow-sm flex items-center justify-center"
        >
          Log in
        </button>
      </div>

      {error && (
        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-xs font-medium">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-ink">Password <span className="text-danger">*</span></label>
            <a href="#forgot" className="text-xs text-primary font-medium hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40" />
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className="h-[44px] w-full rounded-[10px] border border-mist bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="h-[52px] w-full rounded-[10px] bg-primary text-surface hover:opacity-95 text-sm font-semibold flex items-center justify-center space-x-2 transition-opacity pt-1"
        >
          <span>{isSubmitting ? 'Signing in...' : 'Sign in to Cutroom'}</span>
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

