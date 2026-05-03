import { Gift, Info, Calendar, Sparkles, Send } from 'lucide-react';
import { useState } from 'react';

interface RewardsProps {
  onUpdateBalance?: (amount: number, activity?: any) => void;
  userData?: { username: string; avatar: string; balance: number; activities?: any[]; isPrivate?: boolean };
}

export default function Rewards({ onUpdateBalance, userData }: RewardsProps) {
  const [couponCode, setCouponCode] = useState('');
  const [claimedDaily, setClaimedDaily] = useState(false);

  const handleClaimDaily = () => {
    if (!claimedDaily && onUpdateBalance) {
      const amountUSD = 0.05;
      const coins = 50;
      const activity = {
        id: Date.now(),
        name: 'Daily Reward',
        time: 'Just now',
        coins: coins,
        type: 'earnings'
      };

      onUpdateBalance(amountUSD, activity);
      setClaimedDaily(true);
      setCouponCode('');

      // Dispatch event for LiveFeed
      const event = new CustomEvent('rewardClaimed', {
        detail: {
          name: userData?.username || 'MysticMage',
          amount: `$${amountUSD.toFixed(2)}`,
          coins: coins,
          offer: 'Daily Reward',
          avatar: userData?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avatar1',
          history: [activity, ...(userData?.activities || [])],
          isPrivate: userData?.isPrivate
        }
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="pt-12 pb-32 w-full max-w-lg mx-auto px-4 space-y-6">
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-2">
        <Gift className="w-[26px] h-[26px] text-[#00D166]" />
        <h1 className="text-[22px] font-bold text-white tracking-tight">Rewards</h1>
      </div>

      {/* Daily Reward Section */}
      <div className="bg-[#181B24] rounded-[24px] p-6 border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D166]/10 blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#00D166]/20 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#00D166]/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#00D166]" />
            </div>
            <div>
              <h2 className="text-white font-bold">Daily Reward</h2>
              <p className="text-[#94A3B8] text-xs">Claim your daily 50 coins bonus</p>
            </div>
          </div>
          
          <div className="bg-[#1E222D] rounded-2xl p-4 flex items-center justify-between border border-white/5 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00D166] flex items-center justify-center font-black text-xs text-black italic">C</div>
              <span className="text-white font-black text-lg">50</span>
            </div>
            <button 
              onClick={handleClaimDaily}
              disabled={claimedDaily}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                claimedDaily 
                ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                : 'bg-[#00D166] text-black hover:scale-105 shadow-[0_4px_12px_rgba(0,209,102,0.2)]'
              }`}
            >
              {claimedDaily ? 'Claimed' : 'Claim Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Coupon Box Section */}
      <div className="bg-[#181B24] rounded-[24px] p-6 border border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#00D166]/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#00D166]" />
          </div>
          <div>
            <h2 className="text-white font-bold">Bonus Coupon</h2>
            <p className="text-[#94A3B8] text-xs">Enter a secret code for extra rewards</p>
          </div>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Enter coupon code..." 
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full bg-[#1E222D] border border-white/5 rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00D166]/50 transition-colors pr-14 font-medium"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#00D166] rounded-xl flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-[#00D166]/20">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-[#181B24] rounded-[24px] p-6 border border-white/5">
        <h2 className="text-[18px] font-bold text-white mb-2">Streak Rewards</h2>
        <p className="text-[#94A3B8] text-sm mb-6 leading-relaxed">
          Earn <span className="text-[#00D166] font-medium">$2.00</span> or more within <span className="text-[#00D166] font-medium">24 hours</span> to keep your streak active and unlock higher tier rewards.
        </p>

        <div className="bg-[#1E222D] rounded-[16px] p-4 flex gap-3 items-start border border-white/10">
          <Info className="w-5 h-5 text-[#94A3B8] shrink-0 mt-0.5" />
          <p className="text-white/90 text-[14px] leading-snug">
            You need to earn <span className="text-[#00D166] font-bold italic">2,000 more coins today</span> to maintain your current streak!
          </p>
        </div>
      </div>

    </div>
  );
}
