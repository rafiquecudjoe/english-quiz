import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock signup - navigate to dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-dark via-surface-darker to-bg-dark p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo3.png" alt="Quiz Lobby" className="h-16 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(15,98,197,0.4)]" />
          <h1 className="text-3xl font-black text-white mb-2">Create Account</h1>
          <p className="text-text-muted">Join Quiz Lobby and start learning</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="bg-surface-dark/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
          <div className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">Full Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted text-[20px]">person</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-3 bg-surface-light border border-white/10 rounded-xl text-white placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted text-[20px]">mail</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-surface-light border border-white/10 rounded-xl text-white placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-muted mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted text-[20px]">lock</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full pl-12 pr-4 py-3 bg-surface-light border border-white/10 rounded-xl text-white placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-muted mb-2">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted text-[20px]">lock</span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-4 py-3 bg-surface-light border border-white/10 rounded-xl text-white placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-white/20 bg-surface-light text-primary focus:ring-primary/20"
                required
              />
              <label htmlFor="terms" className="text-sm text-text-muted">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-text-muted text-sm">or continue with</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center gap-2 py-3 bg-surface-light hover:bg-surface-border rounded-xl border border-white/10 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-white text-sm font-medium">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-3 bg-surface-light hover:bg-surface-border rounded-xl border border-white/10 transition-colors">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="text-white text-sm font-medium">GitHub</span>
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
