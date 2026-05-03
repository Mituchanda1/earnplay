import React, { useEffect, useState } from 'react';
import { Rocket, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import UserProfileModal from './UserProfileModal';

const mockActivities = [
  { 
    id: 1, 
    name: 'SneakyShadow', 
    amount: '$0.85', 
    coins: 850, 
    time: 'Just now', 
    offer: 'PubScale', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow',
    history: [
      { name: 'PubScale', coins: 850, time: 'Just now' },
      { name: 'Daily Reward', coins: 50, time: '2h ago' }
    ]
  },
  { 
    id: 2, 
    name: 'CrystalWave', 
    amount: '$12.50', 
    coins: 12500, 
    time: '2 mins ago', 
    offer: 'Lootably', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Crystal',
    history: [
      { name: 'Lootably', coins: 12500, time: '2 mins ago' },
      { name: 'BitLabs', coins: 450, time: '1h ago' }
    ]
  },
  { 
    id: 3, 
    name: 'NeonPulse', 
    amount: '$4.20', 
    coins: 4200, 
    time: '5 mins ago', 
    offer: 'AdGate', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neon',
    history: [
      { name: 'AdGate', coins: 4200, time: '5 mins ago' }
    ]
  },
  { 
    id: 4, 
    name: 'CyberWolf', 
    amount: '$0.45', 
    coins: 450, 
    time: '8 mins ago', 
    offer: 'CPALead', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wolf',
    history: [
      { name: 'CPALead', coins: 450, time: '8 mins ago' }
    ]
  },
  { 
    id: 5, 
    name: 'StarGazer', 
    amount: '$25.00', 
    coins: 25000, 
    time: '12 mins ago', 
    offer: 'Hang My Ads', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Star',
    history: [
      { name: 'Hang My Ads', coins: 25000, time: '12 mins ago' },
      { name: 'Daily Reward', coins: 50, time: '5h ago' }
    ]
  },
];

export default function LiveFeed({ userData, showUSD }: { userData?: any; showUSD: boolean }) {
  const [activities, setActivities] = useState<any[]>(mockActivities);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const formatValue = (amount: string, coins: number) => {
    if (showUSD) return amount;
    return `${coins.toLocaleString()} Coins`;
  };

  useEffect(() => {
    const handleNewReward = (e: any) => {
      const { name, amount, coins, offer, avatar, isPrivate, history } = e.detail;
      const newActivity = {
        id: Date.now(),
        name,
        amount,
        coins,
        time: 'Just now',
        offer,
        avatar,
        isPrivate,
        history: history || [{ name: offer, coins, time: 'Just now' }]
      };
      setActivities(prev => [newActivity, ...prev.slice(0, 19)]); // Keep last 20
    };

    window.addEventListener('rewardClaimed', handleNewReward as EventListener);
    return () => window.removeEventListener('rewardClaimed', handleNewReward as EventListener);
  }, []);

  return (
    <>
      <div id="ticker-bar" className="flex gap-2 max-w-7xl mx-auto w-full overflow-hidden relative group">
        {/* Rocket Icon Card */}
        <div className="bg-[#181B24] rounded-[20px] p-2 flex items-center justify-center border border-white/5 h-[56px] w-[56px] shrink-0 z-10 shadow-lg">
          <Rocket className="w-6 h-6 text-[#00D166] fill-[#00D166]/20" />
        </div>

        <div className="flex gap-2 w-full overflow-x-auto no-scrollbar scroll-smooth">
          <AnimatePresence mode="popLayout" initial={false}>
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => setSelectedUser(activity)}
                className="bg-[#181B24] rounded-[20px] p-2 px-4 flex items-center gap-3 border border-white/5 min-w-[220px] h-[56px] shrink-0 shadow-sm cursor-pointer hover:bg-[#232731] transition-colors group/item relative"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-white/10 bg-[#3D4452] relative">
                  <img src={activity.avatar} alt="avatar" />
                  {activity.isPrivate && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Lock className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-white whitespace-nowrap tracking-tight">
                      {activity.isPrivate ? "Private User" : activity.name}
                    </span>
                    <span className="bg-[#00D166]/20 text-[#00D166] text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap border border-[#00D166]/20">
                      {formatValue(activity.amount, activity.coins)}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#94A3B8] font-bold">{activity.time}</span>
                </div>

                {/* Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none z-[100] w-max">
                  <div className="bg-[#1B1E26] text-white p-3 rounded-xl shadow-2xl border border-white/10 text-[12px] font-medium space-y-0.5 min-w-[180px]">
                    {activity.isPrivate ? (
                      <div className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-[#00D166]" />
                        <span>Private Activity</span>
                      </div>
                    ) : (
                      <>
                        <div><span className="text-white/40">Username:</span> {activity.name}</div>
                        <div><span className="text-white/40">Name:</span> {activity.offer}</div>
                        <div><span className="text-white/40">Amount:</span> {formatValue(activity.amount, activity.coins)}</div>
                      </>
                    )}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#1B1E26]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Fade effects on edges */}
        <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-0" />
      </div>

      {/* User Profile Modal */}
      <UserProfileModal 
        user={selectedUser} 
        onClose={() => setSelectedUser(null)} 
        showUSD={showUSD}
      />
    </>
  );
}
