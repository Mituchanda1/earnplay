import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, EyeOff, Eye, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'signIn' | 'signUp';
  onSuccess?: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, initialView = 'signIn', onSuccess }: AuthModalProps) {
  const [view, setView] = useState<'signIn' | 'signUp'>(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update view when initialView changes
  useEffect(() => {
    setView(initialView);
    setError(null);
    setIdentifier('');
    setPassword('');
    setEmail('');
  }, [initialView, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const endpoint = view === 'signIn' ? '/api/auth/login' : '/api/auth/register';
      const body = view === 'signIn' 
        ? { username: identifier, password } 
        : { username: identifier, email: email || undefined, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const contentType = res.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Server returned unexpected response (${res.status}). Please try again later.`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (onSuccess) {
        onSuccess(data.user);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#1E222D] rounded-[24px] overflow-hidden shadow-2xl border border-white/5"
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b mx-4 px-0 border-white/5">
            <div className="flex items-center gap-3">
              {view === 'signUp' && (
                <button 
                  onClick={() => setView('signIn')}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-[#94A3B8] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <h2 className="text-xl font-bold text-white">
                {view === 'signIn' ? 'Sign In' : 'Sign Up'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-[#00D166]" />
            </button>
          </div>

          <div className="p-6 pt-4 space-y-6">
            {/* Tabs */}
            <div className="flex bg-[#10141D] rounded-xl p-1 gap-1">
              <button
                type="button"
                onClick={() => setView('signIn')}
                className={`flex-1 py-2.5 text-[15px] font-bold rounded-lg transition-colors ${
                  view === 'signIn' ? 'bg-[#00D166] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setView('signUp')}
                className={`flex-1 py-2.5 text-[15px] font-bold rounded-lg transition-colors ${
                  view === 'signUp' ? 'bg-[#00D166] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            <p className="text-white text-[17px] leading-snug">
              Please {view === 'signIn' ? 'sign-in' : 'sign-up'} to your account and start the adventure 🚀
            </p>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-white/90 ml-1">Username</label>
                <input 
                  type="text" 
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="w-full bg-[#10141D] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00D166] focus:ring-1 focus:ring-[#00D166] transition-all text-base"
                />
              </div>

              {view === 'signUp' && (
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-white/90 ml-1">Email (Optional)</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#10141D] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00D166] focus:ring-1 focus:ring-[#00D166] transition-all text-base"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1 pr-1">
                  <label className="text-[13px] font-medium text-white/90">Password</label>
                  {view === 'signIn' && (
                    <button type="button" className="text-[13px] text-[#00D166] hover:underline font-medium">
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#10141D] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00D166] focus:ring-1 focus:ring-[#00D166] transition-all text-base tracking-widest"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-white transition-colors"
                  >
                     {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00D166] hover:bg-[#00E673] disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-3.5 rounded-xl transition-colors text-[15px] mt-2 uppercase tracking-tight flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (view === 'signIn' ? 'Login' : 'Register Now')}
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-[14px] text-white/90">
                {view === 'signIn' ? 'New on our platform? ' : 'Already have an account? '}
                <button 
                  onClick={() => setView(view === 'signIn' ? 'signUp' : 'signIn')}
                  className="text-[#00D166] hover:underline font-medium"
                >
                  {view === 'signIn' ? 'Create an account' : 'Sign in instead'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
