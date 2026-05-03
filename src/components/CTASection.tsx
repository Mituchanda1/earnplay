import { motion } from 'motion/react';

export default function CTASection({ onSignUpClick }: { onSignUpClick?: () => void }) {
  return (
    <section id="cta-section" className="px-4 py-20 pb-40">
      <div className="max-w-4xl mx-auto bg-[#1A1D27] rounded-[48px] p-12 py-20 border border-white/5 text-center relative overflow-hidden">
        {/* Collage Background images from screenshot 14 */}
        <div className="absolute inset-0 opacity-20 pointer-events-none scale-110">
           <img 
            src="https://images.unsplash.com/photo-1610819013583-69978423405d?w=300" 
            className="w-32 h-32 rounded-3xl absolute top-10 -left-10 rotate-[-15deg] shadow-2xl" 
            alt=""
           />
           <img 
            src="https://images.unsplash.com/photo-1596495573453-185fd82c6b28?w=300" 
            className="w-32 h-32 rounded-3xl absolute -top-10 right-20 rotate-[15deg] shadow-2xl" 
            alt=""
           />
           <img 
            src="https://images.unsplash.com/photo-1557683311-eac922347aa1?w=300" 
            className="w-32 h-32 rounded-3xl absolute top-40 -right-12 rotate-[-10deg] shadow-2xl" 
            alt=""
           />
           <img 
            src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=300" 
            className="w-32 h-32 rounded-3xl absolute -bottom-10 left-32 rotate-[12deg] shadow-2xl" 
            alt=""
           />
           <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300" 
            className="w-32 h-32 rounded-3xl absolute -bottom-10 -right-10 rotate-[-20deg] shadow-2xl" 
            alt=""
           />
        </div>

        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="text-[40px] md:text-5xl font-black text-[#00D166] mb-8 tracking-tighter leading-[1.1]">
            Start Making Money Today!
          </h2>
          <p className="text-[#94A3B8] text-lg font-medium leading-relaxed mb-12">
            Start earning money today by completing offers, playing games, and taking surveys. It's easy, fun, and rewarding!
          </p>

          <motion.button
            id="cta-get-started-btn"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,209,102,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onSignUpClick}
            className="bg-[#00D166] text-black font-black text-2xl px-16 py-6 rounded-[28px] shadow-[0_0_25px_rgba(0,209,102,0.3)] transition-all uppercase"
          >
            GET STARTED
          </motion.button>
        </div>
      </div>
    </section>
  );
}
