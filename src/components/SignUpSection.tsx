import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';

export default function SignUpSection({ onRegisterSuccess }: { onRegisterSuccess?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter an email address');
      return;
    }
    if (onRegisterSuccess) {
      onRegisterSuccess();
    }
  };

  return (
    <section id="signup-form-section" className="px-4 py-12">
      <div className="max-w-md mx-auto bg-[#1A1D27] rounded-[32px] p-8 border border-white/5 shadow-2xl relative">
        <h2 className="text-3xl font-black text-white mb-2 text-center">Sign up for free</h2>
        <p className="text-[#94A3B8] text-sm mb-8 text-center">and Earn up to daily <span className="text-[#00D166] font-bold">$50 for free</span></p>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white ml-1 block">Email</label>
            <input 
              id="signup-email-input"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="w-full bg-[#0B0E14] border border-white/10 rounded-2xl py-4 px-5 text-white placeholder-[#475569] focus:outline-none focus:border-[#00D166]/50 transition-all font-sans"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <label className="text-xs font-bold text-white block">Password</label>
              <button type="button" className="text-[#00D166] text-xs font-bold hover:underline">Forgot Password?</button>
            </div>
            <div className="relative">
              <input 
                id="signup-password-input"
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0B0E14] border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-[#00D166]/50 transition-all font-mono"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-white transition-colors"
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 px-1 py-1">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded-md border-white/10 bg-[#0B0E14] checked:bg-[#00D166]" />
            <label htmlFor="remember" className="text-xs font-medium text-[#94A3B8]">Remember Me</label>
          </div>
          
          <motion.button
            id="signup-submit-btn"
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#00D166] text-black font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(0,209,102,0.2)] transition-all uppercase tracking-tight"
          >
            Sign Up
          </motion.button>

          <div className="relative py-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <span className="relative bg-[#1A1D27] px-4 text-xs font-bold text-[#94A3B8] uppercase">or</span>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRegisterSuccess}
            className="w-full bg-transparent border border-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/leaf01/google.svg" className="w-5 h-5" alt="google" />
            Sign In with Google
          </motion.button>
        </form>
      </div>
    </section>
  );
}
