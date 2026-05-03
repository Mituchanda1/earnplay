import { motion } from 'motion/react';

export default function Hero({ onSignUpClick }: { onSignUpClick?: () => void }) {
  return (
    <section id="hero" className="relative pt-4 pb-12 px-4 text-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://i.ibb.co/kV0JSj12/Pngtree-opulent-gold-star-award-ceremony-15840919.jpg" 
          alt="Golden star background" 
          className="w-full h-full object-cover opacity-50"
        />
        {/* Background gradient from black to transparent back to black for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-[36px] md:text-[64px] font-black text-white mb-3 tracking-tighter leading-[1.1] md:leading-[1] md:max-w-4xl md:mx-auto"
      >
        Get <span className="text-[#00D166]">paid</span> for<br />
        testing apps,<br />
        games & surveys
      </motion.h1>

      <div className="relative z-10 space-y-2 mb-8">
        <p id="offer-limit" className="text-[#94A3B8] text-lg font-bold">
          Earn up to <span className="text-white">$60.00</span> per offer
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#00D166] rounded-full animate-pulse shadow-[0_0_8px_#00D166]" />
          <span id="available-offers" className="text-[#94A3B8] text-sm font-medium">
            <span className="text-white font-black">921</span> available offers now
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <button 
          onClick={onSignUpClick}
          className="bg-[#00D166] text-black font-black text-xl px-12 py-5 rounded-[24px] shadow-[0_0_20px_rgba(0,209,102,0.3)] hover:scale-105 transition-all active:scale-95 uppercase tracking-tight"
        >
          Start Earning Now
        </button>
      </motion.div>
    </section>
  );
}
