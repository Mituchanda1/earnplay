import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, EyeOff, Eye, BadgeDollarSign, Chrome } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'signIn' | 'signUp';
  onRegisterSuccess?: () => void;
  onLoginSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, initialView = 'signIn', onRegisterSuccess, onLoginSuccess }: AuthModalProps) {
  const [view, setView] = useState<'signIn' | 'signUp'>(initialView);
  const [showPassword, setShowPassword] = useState(false);

  // Update view when initialView changes
  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  if (!isOpen) return null;

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
                onClick={() => setView('signIn')}
                className={`flex-1 py-2.5 text-[15px] font-bold rounded-lg transition-colors ${
                  view === 'signIn' ? 'bg-[#00D166] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
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

            {/* Form */}
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-white/90 ml-1">Email</label>
                <input 
                  type="text" 
                  placeholder={view === 'signIn' ? "Enter your email" : "Enter your email or username"}
                  className="w-full bg-[#10141D] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00D166] focus:ring-1 focus:ring-[#00D166] transition-all text-base"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1 pr-1">
                  <label className="text-[13px] font-medium text-white/90">Password</label>
                  {view === 'signIn' && (
                    <a href="#" className="text-[13px] text-[#00D166] hover:underline font-medium">
                      Forgot Password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
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

              {/* Checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    id="auth-checkbox"
                    className="peer w-5 h-5 appearance-none border border-white/20 rounded-[6px] bg-[#10141D] checked:bg-[#00D166] checked:border-[#00D166] transition-colors cursor-pointer"
                  />
                  <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <label htmlFor="auth-checkbox" className="text-[13px] text-white/90 cursor-pointer select-none">
                  {view === 'signIn' ? 'Remember Me' : (
                    <>I agree to the <span className="text-[#00D166] hover:underline">terms and conditions</span></>
                  )}
                </label>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => {
                  if (view === 'signUp' && onRegisterSuccess) {
                    onRegisterSuccess();
                  } else if (view === 'signIn' && onLoginSuccess) {
                    onLoginSuccess();
                  }
                }}
                className="w-full bg-[#00D166] hover:bg-[#00E673] text-black font-black py-3.5 rounded-xl transition-colors text-[15px] mt-2 uppercase tracking-tight"
              >
                {view === 'signIn' ? 'Login' : 'Register Now'}
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

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative bg-[#1E222D] px-4 text-[13px] text-[#475569] font-medium uppercase tracking-tight">
                or
              </div>
            </div>

            <button 
              onClick={() => {
                if (view === 'signUp' && onRegisterSuccess) {
                  onRegisterSuccess();
                } else if (view === 'signIn' && onLoginSuccess) {
                  onLoginSuccess();
                }
              }}
              className="w-full bg-white hover:bg-gray-100 flex items-center justify-center gap-3 py-3 rounded-xl transition-colors text-[#10141D] font-bold text-[15px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {view === 'signIn' ? 'Sign In with Google' : 'Sign up with Google'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
