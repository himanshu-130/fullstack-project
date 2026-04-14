import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email (e.g. name@example.com)';
    const domain = email.split('@')[1]?.toLowerCase();
    const commonTypos = { 'gmial.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gnail.com': 'gmail.com', 'gmaill.com': 'gmail.com', 'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'outllook.com': 'outlook.com', 'outlok.com': 'outlook.com' };
    if (commonTypos[domain]) return `Did you mean ...@${commonTypos[domain]}?`;
    return '';
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    if (emailError) setEmailError(validateEmail(email));
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(formData.email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(formData.email);
    if (emailErr && !emailErr.startsWith('Did you mean')) {
      setEmailError(emailErr);
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      const normalizedEmail = formData.email.toLowerCase().trim();
      const res = await signup(formData.name, normalizedEmail, formData.password);
      if (res) {
        toast.success("Account created successfully!");
        navigate('/');
      }
    } catch (err) {
      console.error('Signup error:', err);
      const errorMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#060a10]">
        {/* Gradient orbs */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#a78bfa]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-[#34d399]/8 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/welcome" className="text-2xl font-extrabold text-[#34d399] tracking-tight">
            ArthVeda
          </Link>

          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Start your journey to <span className="text-[#34d399]">financial clarity</span>.
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Join thousands of users who trust ArthVeda for smarter money management. It's free to get started.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: 'AI Insights', icon: '🤖' },
                { label: 'Smart Charts', icon: '📊' },
                { label: 'Secure', icon: '🔒' },
              ].map((f) => (
                <div key={f.label} className="text-center space-y-1.5">
                  <div className="text-2xl">{f.icon}</div>
                  <div className="text-xs text-gray-600 font-medium">{f.label}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-700 text-xs">© {new Date().getFullYear()} ArthVeda</p>
        </div>
      </div>

      {/* Right Panel — Signup Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#090b10]">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <Link to="/welcome" className="lg:hidden text-2xl font-extrabold text-[#34d399] tracking-tight block mb-12">
            ArthVeda
          </Link>

          <div className="space-y-2 mb-10">
            <h1 className="text-3xl font-bold text-white tracking-tight">Create your account</h1>
            <p className="text-gray-500">Start managing your finances in under a minute</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400 block">Full Name</label>
              <input
                type="text"
                required
                placeholder="Ritesh Vishwakarma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-gray-800 pb-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#34d399] transition-colors text-[15px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400 block">Email</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`w-full bg-transparent border-b pb-3 text-white placeholder:text-gray-700 focus:outline-none transition-colors text-[15px] ${emailError ? 'border-red-500' : 'border-gray-800 focus:border-[#34d399]'}`}
              />
              {emailError && (
                <p className={`text-xs mt-1 ${emailError.startsWith('Did you mean') ? 'text-yellow-400' : 'text-red-400'}`}>
                  {emailError}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400 block">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-transparent border-b border-gray-800 pb-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#34d399] transition-colors text-[15px]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#34d399] hover:bg-[#2ebc87] text-[#090b10] font-bold py-3 rounded-xl transition-all duration-200 text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account →'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-[#34d399] hover:text-[#2ebc87] font-medium transition-colors">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}