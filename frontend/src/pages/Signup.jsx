import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Button from '../components/Button';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await signup(formData.name, formData.email, formData.password);
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
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black"></div>
      
      <div className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl sm:p-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 shadow-inner shadow-cyan-500/20">
            <Landmark className="h-7 w-7 text-cyan-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-slate-400">Start your mindful financial journey</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Full Name</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <User className="h-5 w-5 text-slate-500" />
              </div>
              <input 
                type="text" 
                required
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-3.5 pl-11 pr-4 text-slate-200 placeholder:text-slate-500 hover:bg-slate-800 focus:border-cyan-400 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Mail className="h-5 w-5 text-slate-500" />
              </div>
              <input 
                type="email" 
                required
                placeholder="you@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-3.5 pl-11 pr-4 text-slate-200 placeholder:text-slate-500 hover:bg-slate-800 focus:border-cyan-400 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-3.5 pl-11 pr-4 text-slate-200 placeholder:text-slate-500 hover:bg-slate-800 focus:border-cyan-400 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full py-4 text-base" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}