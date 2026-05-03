import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, X, Lock } from 'lucide-react';

interface UserProfileModalProps {
  user: any;
  onClose: () => void;
  showUSD: boolean;
}

export default function UserProfileModal({ user, onClose, showUSD }: UserProfileModalProps) {
  return (
    <AnimatePresence>
      {user && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-[340px] bg-[#11141B] rounded-[24px] overflow-hidden shadow-2xl p-5 relative border border-white/5"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {user.isPrivate ? (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                  <Lock className="w-10 h-10 text-[#00D166]" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">Private Profile</h2>
                <p className="text-white/40 text-sm font-medium px-4">
                  This user has set their profile to private. You cannot view their activities or stats.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-8 bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-xl transition-all border border-white/5"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center text-center mt-1 mb-5">
                  <div className="relative mb-3">
                    <div className="w-20 h-20 rounded-full border-4 border-[#00D166] p-1 shadow-[0_0_30px_rgba(0,209,102,0.15)] bg-gradient-to-br from-[#00D166]/20 to-transparent">
                      <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full bg-[#1B1E26]" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#00D166] rounded-full border-4 border-[#11141B]" />
                  </div>
                  <h2 className="text-[24px] font-black text-[#00D166] tracking-tight mb-0.5">{user.name}</h2>
                  <p className="text-white/40 text-[12px] font-bold uppercase tracking-widest mb-2.5">{user.time || 'Just now'}</p>
                  <div className="inline-flex px-3 py-1 bg-[#00D166] text-black rounded-full text-[11px] font-black shadow-[0_0_15px_rgba(0,209,102,0.3)]">Level 1</div>
                </div>

                <div className="space-y-5">
                  {/* Stats */}
                  <div className="border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-white/40" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M5 19h14V5H5v14zm0 2c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5zm4-4h2V7H9v10zm4 0h2v-4h-2v4zm-8 0h2v-6H5v6z"/>
                      </svg>
                      <h3 className="text-white font-bold text-base tracking-tight">Stats</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <p className="text-[#00D166] text-[8px] font-black uppercase tracking-widest mb-1.5 opacity-80">Offers Done</p>
                        <p className="text-white text-lg font-black">{(user.history || []).filter((h: any) => h.coins > 0).length || Math.floor(user.points / 500) || 1}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#00D166] text-[8px] font-black uppercase tracking-widest mb-1.5 opacity-80">
                          {showUSD ? 'Value Earned' : 'Coins Earned'}
                        </p>
                        <p className="text-white text-lg font-black">
                          {showUSD ? 
                            `$${((user.history || []).reduce((sum: number, h: any) => sum + (h.coins > 0 ? h.coins : 0), 0) || user.points || 0 / 1000).toFixed(2)}` :
                            ((user.history || []).reduce((sum: number, h: any) => sum + (h.coins > 0 ? h.coins : 0), 0) || user.points || 0).toLocaleString()
                          }
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#00D166] text-[8px] font-black uppercase tracking-widest mb-1.5 opacity-80">Referrals</p>
                        <p className="text-white text-lg font-black">0</p>
                      </div>
                    </div>
                  </div>

                  {/* Activity */}
                  <div className="border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Rocket className="w-4 h-4 text-white/40" />
                      <h3 className="text-white font-bold text-base tracking-tight">Activity</h3>
                    </div>
                    
                    {/* Table-like headers */}
                    <div className="flex px-4 mb-2">
                      <span className="text-[9px] text-white/20 font-black uppercase tracking-widest flex-1">Name</span>
                      <span className="text-[9px] text-white/20 font-black uppercase tracking-widest w-20 text-center">Time</span>
                      <span className="text-[9px] text-white/20 font-black uppercase tracking-widest w-16 text-right">Reward</span>
                    </div>

                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto no-scrollbar pr-1">
                      {(user.history || [{ name: 'Offer Completion', coins: user.points || 1000, time: '2h ago' }]).map((item: any, idx: number) => (
                        <div key={idx} className="bg-white/[0.02] rounded-xl p-3 flex items-center border border-white/5">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-[#00D166]/10 flex items-center justify-center shrink-0">
                              <Rocket className="w-3.5 h-3.5 text-[#00D166]" />
                            </div>
                            <div className="text-white font-bold text-[13px] truncate">{item.name || item.offer}</div>
                          </div>
                          <div className="text-white/20 text-[10px] font-bold w-20 text-center shrink-0">{item.time}</div>
                          <div className="flex items-center gap-1.5 w-16 justify-end shrink-0">
                            <div className="w-2 h-2 bg-[#FFD100] rounded-full shadow-[0_0_8px_rgba(255,209,0,0.5)]" />
                            <span className={`font-black text-[13px] ${item.coins > 0 ? 'text-[#00D166]' : 'text-red-500'}`}>
                              {showUSD ? 
                                `${item.coins > 0 ? '+' : ''}${(item.coins / 1000).toFixed(2)}` : 
                                (item.coins > 0 ? `+${item.coins}` : item.coins)
                              }
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
