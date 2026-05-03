import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (username: string, avatar: string) => void;
}

const ADJECTIVES = ['Vengeful', 'Sneaky', 'Happy', 'Lucky', 'Fast', 'Brave', 'Clever', 'Mighty', 'Silent', 'Cosmic'];
const NOUNS = ['Vulture', 'Shadow', 'Tiger', 'Panda', 'Falcon', 'Wolf', 'Dragon', 'Eagle', 'Ninja', 'Rider'];

// Array of random background hex colors
const BG_COLORS = 'b6e3f4,c0aede,d1d4f9,ffdfbf,ffdce0,c2efeb,bbf7d0,fef08a,fbcfe8,e9d5ff';

export default function ProfileSetupModal({ isOpen, onClose, onSave }: ProfileSetupModalProps) {
  const [username, setUsername] = useState('VengefulVulture');
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const handleRandomize = () => {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    setUsername(`${adj}${noun}`);
  };

  const avatars = Array.from({ length: 31 }).map((_, i) => 
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Avatar${i * 42}&backgroundColor=${BG_COLORS}`
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md h-[85vh] flex flex-col bg-[#1A1D27] rounded-[24px] overflow-hidden shadow-2xl border border-white/5"
        >
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-28">
            <h2 className="text-lg md:text-xl font-bold text-white mb-6 leading-snug tracking-tight pr-4">
              Choose your username and avatar, and start the adventure! 🚀
            </h2>

            <div className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-[14px] font-medium text-white/90">Username</label>
                <div className="flex bg-[#10141D] border border-white/10 rounded-xl overflow-hidden focus-within:border-[#00D166] focus-within:ring-1 focus-within:ring-[#00D166] transition-all">
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose your username"
                    className="flex-1 bg-transparent px-4 py-3.5 text-white placeholder:text-[#475569] focus:outline-none text-base"
                  />
                  <button 
                    onClick={handleRandomize}
                    className="bg-[#00D166] hover:bg-[#00E673] text-white font-bold px-4 md:px-5 transition-colors text-sm md:text-base border-l border-[#00D166]"
                  >
                    Randomize
                  </button>
                </div>
              </div>

              {/* Avatar Grid */}
              <div className="space-y-3">
                <label className="text-[14px] font-medium text-white/90">Avatar</label>
                <div className="grid grid-cols-5 gap-3">
                  {avatars.map((avatar, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedAvatar(i)}
                      className={`relative aspect-square rounded-full transition-all flex items-center justify-center ${
                        selectedAvatar === i 
                          ? 'border-[3px] border-[#00D166] scale-105 z-10 p-[2px]' 
                          : 'hover:scale-105 border-2 border-transparent p-[3px]'
                      }`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-white/5">
                         <img src={avatar} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#1A1D27] via-[#1A1D27] to-[#1A1D27]/0 pt-16">
            <button 
              onClick={() => onSave(username, avatars[selectedAvatar])}
              className="w-full bg-[#00D166] hover:bg-[#00E673] text-white font-bold py-4 rounded-xl transition-colors text-[16px] shadow-[0_4px_12px_rgba(0,209,102,0.3)]"
            >
              Save
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
