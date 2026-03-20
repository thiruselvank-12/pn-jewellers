import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    if (!isLogin && !form.name) {
      setError('Please enter your name');
      return;
    }

    // Mock auth — in production, call Laravel API
    const user = { name: form.name || form.email.split('@')[0], email: form.email };
    const token = 'mock-jwt-' + Date.now();
    login(user, token);
    navigate('/account');
  };

  return (
    <div className="pt-20 min-h-screen bg-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
            <span className="text-white font-heading font-bold text-lg">PN</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-primary">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="font-accent text-sm text-gray-500 mt-1">
            {isLogin ? 'Sign in to your PN Jewellers account' : 'Join the PN Jewellers family'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-accent font-semibold text-gray-500 tracking-wider uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 font-accent text-sm transition-all duration-300"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-accent font-semibold text-gray-500 tracking-wider uppercase mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 font-accent text-sm transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-xs font-accent font-semibold text-gray-500 tracking-wider uppercase mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 font-accent text-sm transition-all duration-300"
              />
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 font-accent">
                {error}
              </motion.p>
            )}

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs font-accent text-gold hover:underline">Forgot password?</button>
              </div>
            )}

            <button type="submit" className="btn-gold w-full">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs font-accent text-gray-500">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-gold font-semibold hover:underline"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-xs font-accent text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
