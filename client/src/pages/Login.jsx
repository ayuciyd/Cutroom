import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';

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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-heading text-ink">Welcome back</h2>
        <p className="text-sm text-ink/70 mt-1">Sign in to your Cutroom account</p>
      </div>

      {error && (
        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Email address</label>
          <Input 
            type="email" 
            placeholder="director@example.com"
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
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-mist"></div>
        <span className="flex-shrink mx-4 text-xs text-ink/50 uppercase">or</span>
        <div className="flex-grow border-t border-mist"></div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isSubmitting}>
        Sign in with Google
      </Button>

      <p className="text-center text-sm text-ink/70 pt-2">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};
