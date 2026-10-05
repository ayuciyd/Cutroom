import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged 
} from '../lib/firebase';
import { fetchApi } from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cutroom_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [idToken, setIdToken] = useState(() => localStorage.getItem('cutroom_token') || null);
  const [loading, setLoading] = useState(true);

  // Sync state & fetch Mongo user profile
  const syncUserProfile = async (fbUser) => {
    if (!fbUser) {
      setUser(null);
      setIdToken(null);
      localStorage.removeItem('cutroom_user');
      localStorage.removeItem('cutroom_token');
      setLoading(false);
      return;
    }

    try {
      let token = null;
      try {
        token = await fbUser.getIdToken();
      } catch (err) {
        token = fbUser.accessToken || `demo-uid-${fbUser.uid || 'dev'}`;
      }

      setIdToken(token);
      localStorage.setItem('cutroom_token', token);

      // Fetch user profile from MongoDB
      const res = await fetchApi('/users/me', { method: 'GET' }, token);
      if (res.success && res.data) {
        setUser(res.data);
        localStorage.setItem('cutroom_user', JSON.stringify(res.data));
      }
    } catch (err) {
      console.warn('[useAuth] User profile sync warning:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      syncUserProfile(fbUser);
    });

    return () => unsubscribe();
  }, []);

  // Register function
  const register = async ({ name, email, password, role }) => {
    setLoading(true);
    try {
      let fbUser = null;
      let token = null;

      try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        fbUser = userCred.user;
        token = await fbUser.getIdToken();
      } catch (fbErr) {
        console.warn('[Firebase Auth fallback]:', fbErr.message);
        // Dev fallback mode if Firebase app keys are unconfigured
        const devUid = `uid-${Date.now()}`;
        token = `demo-token-${devUid}`;
        fbUser = { uid: devUid, email, displayName: name };
      }

      setFirebaseUser(fbUser);
      setIdToken(token);
      localStorage.setItem('cutroom_token', token);

      // Call backend POST /api/auth/register
      const res = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, role }),
      }, token);

      if (res.success && res.data) {
        setUser(res.data);
        localStorage.setItem('cutroom_user', JSON.stringify(res.data));
        return res.data;
      } else {
        throw new Error(res.error?.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      let fbUser = null;
      let token = null;

      try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        fbUser = userCred.user;
        token = await fbUser.getIdToken();
      } catch (fbErr) {
        console.warn('[Firebase Auth fallback]:', fbErr.message);
        // Fallback demo login
        const devUid = `uid-demo-creator`;
        token = `demo-token-${devUid}`;
        fbUser = { uid: devUid, email };
      }

      setFirebaseUser(fbUser);
      setIdToken(token);
      localStorage.setItem('cutroom_token', token);

      const res = await fetchApi('/users/me', { method: 'GET' }, token);
      if (res.success && res.data) {
        setUser(res.data);
        localStorage.setItem('cutroom_user', JSON.stringify(res.data));
        return res.data;
      } else {
        // Create fallback profile if none exists
        const regRes = await fetchApi('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name: email.split('@')[0], email, role: 'creator' }),
        }, token);
        setUser(regRes.data);
        localStorage.setItem('cutroom_user', JSON.stringify(regRes.data));
        return regRes.data;
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const loginWithGoogle = async (role = 'actor') => {
    setLoading(true);
    try {
      let fbUser = null;
      let token = null;

      try {
        const result = await signInWithPopup(auth, googleProvider);
        fbUser = result.user;
        token = await fbUser.getIdToken();
      } catch (fbErr) {
        console.warn('[Firebase Google Auth fallback]:', fbErr.message);
        const devUid = `google-${Date.now()}`;
        token = `demo-token-${devUid}`;
        fbUser = { uid: devUid, email: 'google.user@example.com', displayName: 'Google User' };
      }

      setFirebaseUser(fbUser);
      setIdToken(token);
      localStorage.setItem('cutroom_token', token);

      // Attempt register or get profile
      try {
        const meRes = await fetchApi('/users/me', { method: 'GET' }, token);
        if (meRes.success && meRes.data) {
          setUser(meRes.data);
          localStorage.setItem('cutroom_user', JSON.stringify(meRes.data));
          return meRes.data;
        }
      } catch (e) {
        // Register if not found
        const regRes = await fetchApi('/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            name: fbUser.displayName || 'Google User',
            email: fbUser.email,
            role,
          }),
        }, token);
        setUser(regRes.data);
        localStorage.setItem('cutroom_user', JSON.stringify(regRes.data));
        return regRes.data;
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setFirebaseUser(null);
    setUser(null);
    setIdToken(null);
    localStorage.removeItem('cutroom_user');
    localStorage.removeItem('cutroom_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        idToken,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
