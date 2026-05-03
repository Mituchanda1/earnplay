import { Users, Coins } from 'lucide-react';

export default function Referrals() {
  return (
    <div className="pt-12 pb-32 w-full max-w-4xl mx-auto px-4 space-y-6">
      
      {/* Header */}
      <div className="bg-[#181B24] rounded-[24px] p-6 border border-white/5">
        <div className="flex items-center gap-3 mb-6">
           <svg className="w-6 h-6 text-[#00D166]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
             <circle cx="9" cy="7" r="4"></circle>
             <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
           </svg>
           <h2 className="text-xl font-bold text-white">Referrals</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1E222D] rounded-[20px] p-6 flex flex-col items-center justify-center text-center gap-3 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-white">0</div>
            <div className="text-[#94A3B8] font-medium">Users Referred</div>
          </div>
          <div className="bg-[#1E222D] rounded-[20px] p-6 flex flex-col items-center justify-center text-center gap-3 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Coins className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-2xl font-black text-white">$0.00</div>
            <div className="text-[#94A3B8] font-medium">Referral Earnings</div>
          </div>
        </div>
      </div>

      {/* Refer a Friend Section */}
      <div className="bg-[#181B24] rounded-[24px] p-6 border border-white/5 space-y-4">
        <h3 className="text-2xl font-bold text-white tracking-tight">Refer a Friend</h3>
        
        <p className="text-white/90 text-[15px] leading-relaxed">
          Get <span className="font-bold">5%</span> of their earnings for life!<br />
          Referred friends will also receive a bonus of <span className="text-[#00D166] font-bold">5 coins</span> when they sign up.
        </p>

        <div className="flex bg-[#10141D] border border-white/10 rounded-xl overflow-hidden mt-6">
          <input 
            type="text" 
            readOnly
            value="https://paidnova.com/ref/14B9C"
            className="flex-1 bg-transparent px-4 py-3.5 text-white focus:outline-none text-base"
          />
          <button 
            className="bg-[#2B313E] hover:bg-[#323846] text-white font-bold px-6 transition-colors text-base border-l border-white/10"
          >
            Copy
          </button>
        </div>
      </div>
      
    </div>
  );
}
