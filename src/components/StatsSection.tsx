import { Clock, TrendingUp, DollarSign } from 'lucide-react';

export default function StatsSection() {
  return (
    <section id="stats-section" className="px-4 py-12">
      <div className="max-w-md mx-auto bg-[#1A1D27] rounded-[40px] p-10 border border-white/5 text-center space-y-16 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00D166]/10 rounded-full blur-3xl" />
        
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-[#00D166]">
            <Clock className="w-8 h-8" />
            <span id="cashout-time" className="text-4xl font-black tracking-tighter">02h 12m</span>
          </div>
          <p className="text-[#94A3B8] text-base font-medium max-w-[200px] mx-auto leading-tight">Average time until user makes first cashout</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-[#00D166]">
            <span id="avg-daily-earn" className="text-5xl font-black tracking-tighter">$0.48</span>
          </div>
          <p className="text-[#94A3B8] text-base font-medium max-w-[240px] mx-auto leading-tight">Average money earned by users per yesterday</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-[#00D166]">
            <span id="total-earned" className="text-5xl font-black tracking-tighter">$80.55</span>
          </div>
          <p className="text-[#94A3B8] text-base font-medium max-w-[200px] mx-auto leading-tight">Total USD earned on EarnPlay</p>
        </div>
      </div>
    </section>
  );
}
