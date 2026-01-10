import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: just navigate to dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo3.png" alt="Quiz Lobby" className="h-24 w-auto drop-shadow-2xl" />
        </div>

        {/* Login Card */}
        <div className="bg-surface-dark border border-surface-border rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-text-muted text-sm">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Email or Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted text-[20px]">
                  person
                </span>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-darker border border-surface-border rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Enter your email or username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted text-[20px]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-surface-darker border border-surface-border rounded-xl pl-12 pr-12 py-3 text-white placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-surface-border bg-surface-darker text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-text-muted">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-2"
            >
              Sign In
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-text-muted text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-text-muted/50 text-xs mt-8">
          © 2026 Quiz Lobby. All rights reserved.
        </p>
      </div>
    </div>
  );
}
