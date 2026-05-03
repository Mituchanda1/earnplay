import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Plane, Sparkles, Edit3, Smartphone, Monitor, Lock, AlertCircle, X } from 'lucide-react';
import { offerPartners, surveyPartners } from '../constants';

const topOffers = [
  {
    id: 'acebet',
    title: 'Acebet',
    subtitle: 'Complet...',
    price: '$760.92',
    icon: (
      <div className="w-[60px] h-[60px] flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="#4ade80" className="w-12 h-12">
          <path d="M12 2L2 22h4l2.5-5h7L18 22h4L12 2zm-2.5 12L12 7l2.5 7h-5z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'cases',
    title: 'Cases.gg',
    subtitle: 'Complet...',
    price: '$573.66',
    icon: (
      <div className="w-[80px] h-[60px] flex items-center justify-center gap-1">
        <span className="text-white font-bold text-xl">CASES</span>
        <span className="text-[#00D166] text-sm mt-1">GG</span>
      </div>
    ),
  },
  {
    id: 'rust',
    title: 'RustClash',
    subtitle: 'Complet...',
    price: '$407.18',
    icon: (
      <div className="w-[80px] h-[60px] flex items-center justify-center gap-1">
        <span className="text-white font-bold text-lg">RUST</span>
        <span className="text-purple-500">♦</span>
        <span className="text-white font-bold text-lg">CLASH</span>
      </div>
    ),
  }
];

const featuredOffers = [
  {
    id: 'bingo-journey',
    title: 'Bingo Journey',
    subtitle: 'Play & Win',
    price: '$78.97',
    icon: (
      <div className="w-full h-[100px] rounded-[16px] overflow-hidden mb-4">
        <img src="https://i.ibb.co/RGTGhcwR/1.webp" alt="Bingo Journey" className="w-full h-full object-cover" />
      </div>
    ),
  },
  {
    id: 'blast-friends',
    title: 'Blast Friends',
    subtitle: 'Puzzle Game',
    price: '$4.05',
    icon: (
      <div className="w-full h-[100px] rounded-[16px] overflow-hidden mb-4">
        <img src="https://i.ibb.co/VYSZhWGv/2.png" alt="Blast Friends" className="w-full h-full object-cover" />
      </div>
    ),
  },
  {
    id: 'zen-life',
    title: 'Zen Life',
    subtitle: 'Match Tiles',
    price: '$3.91',
    icon: (
      <div className="w-full h-[100px] rounded-[16px] overflow-hidden mb-4">
        <img src="https://i.ibb.co/kg1Cc2L1/3.webp" alt="Zen Life" className="w-full h-full object-cover" />
      </div>
    ),
  },
  {
    id: 'epic-games',
    title: 'Epic Games',
    subtitle: 'Hot Offer',
    price: '$16.50',
    icon: (
      <div className="w-full h-[100px] rounded-[16px] overflow-hidden mb-4">
        <img src="https://i.ibb.co/1fKybvc1/games.avif" alt="Epic Games" className="w-full h-full object-cover" />
      </div>
    ),
  },
  {
    id: 'discover',
    title: 'Discover ...',
    subtitle: 'Get Quiz ...',
    price: '$0.38',
    icon: (
      <div className="w-full h-[100px] bg-white rounded-[16px] flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" fill="#E2E8F0" className="w-12 h-12">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'golden',
    title: 'Million G...',
    subtitle: '1.Click on...',
    price: '$0.01',
    icon: (
      <div className="w-full h-[100px] bg-gradient-to-b from-blue-900 to-purple-900 rounded-[16px] flex flex-col items-center justify-center mb-4 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center pt-2">
           <span className="text-yellow-400 font-black text-2xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>GOLDEN</span>
        </div>
      </div>
    ),
  }
];

async function dummy() { /* placeholder to find end of featuredOffers */ }

function AppleIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M15.4 8.7c-.5-3 2.3-5 2.5-5.2-1.4-2-3.8-2.3-4.7-2.3-1.8-.2-3.6 1.1-4.6 1.1-1 0-2.4-1.1-4-1-2.1.1-4 1.2-5 3C-2.5 12.3 1 20 2.9 22.8c.9 1.3 2 2.8 3.4 2.8 1.4 0 1.9-.8 3.5-.8 1.6 0 2.2.8 3.6.8 1.5 0 2.4-1.4 3.3-2.7 1.1-1.6 1.6-3.1 1.6-3.2-.1-.1-3-1.1-2.9-4zM12.9 5.8c.8-1 1.3-2.3 1.1-3.7-1.2.1-2.7.7-3.5 1.7-.7.8-1.3 2.1-1.1 3.5 1.3.1 2.6-.6 3.5-1.5z" />
    </svg>
  );
}

interface OfferCardProps {
  title: string;
  price: string;
  icon: React.ReactNode;
  isLocked: boolean;
  lockThreshold: number;
  currentBalance: number;
  onLockedClick: () => void;
  className?: string;
  subtitle?: string;
  showUSD: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({ 
  title, 
  price, 
  icon, 
  isLocked, 
  lockThreshold, 
  currentBalance, 
  onLockedClick, 
  className, 
  subtitle,
  showUSD
}) => {
  const percent = Math.min(Math.round((currentBalance / lockThreshold) * 100), 100);
  
  const formatPrice = (priceStr: string) => {
    const num = parseFloat(priceStr.replace('$', ''));
    if (showUSD) return priceStr;
    return `${Math.round(num * 1000).toLocaleString()}`;
  };

  return (
    <div 
      onClick={isLocked ? onLockedClick : undefined}
      className={`${className || ''} relative p-[1px] rounded-[24px] overflow-hidden group/card bg-white/5 hover:bg-gradient-to-br hover:from-[#00D166] hover:via-[#00D166]/20 hover:to-transparent transition-all duration-500 cursor-pointer w-[140px] md:w-[160px] aspect-[4/5] shrink-0 shadow-lg`}
    >
      <div className="relative bg-[#181B24] rounded-[23px] p-5 h-full flex flex-col justify-between z-10 transition-colors group-hover/card:bg-[#12141C]">
        <div className="absolute inset-0 bg-white/0 group-hover/card:bg-white/[0.02] transition-colors" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      
      {/* Locked Badge */}
      {isLocked && (
        <div className="absolute top-3 right-3 z-20">
          <div className="bg-[#00D166] p-1.5 rounded-full shadow-[0_0_10px_#00D166] animate-pulse">
            <Lock className="w-3 h-3 text-black" />
          </div>
        </div>
      )}

      {/* Progress Bar (at top when locked) */}
      {isLocked && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-20">
          <div className="h-full bg-[#00D166] shadow-[0_0_8px_#00D166]" style={{ width: `${percent}%` }} />
        </div>
      )}

      <div className={`flex items-center gap-1.5 mb-2 z-10 transition-opacity ${isLocked ? 'opacity-50' : 'opacity-80 group-hover:opacity-100'}`}>
        <Smartphone className="w-3 h-3 shrink-0" />
        <AppleIcon className="w-3 h-3 shrink-0" />
        <Monitor className="w-3 h-3 shrink-0" />
      </div>
      
      <div className={`flex-1 flex items-center justify-center z-10 scale-75 transition-all duration-300 ${isLocked ? 'grayscale-[0.5] opacity-60' : 'group-hover:scale-100'}`}>
        {icon}
      </div>

      <div className={`z-10 mt-2 pt-2 border-t border-white/5 transition-opacity ${isLocked ? 'opacity-80' : ''}`}>
        <h3 className="text-white text-[13px] font-semibold tracking-tight truncate">{title}</h3>
        {subtitle && <p className="text-[#94A3B8] text-[11px] truncate mb-0.5">{subtitle}</p>}
        {isLocked ? (
          <div className="flex items-center justify-between mt-1">
            <div className="text-[#00D166] font-bold text-[14px] flex items-center gap-1">
              {formatPrice(price)}
              {!showUSD && <div className="w-3 h-3 bg-[#00D166] rounded-full flex items-center justify-center font-black text-[5px] text-black italic">C</div>}
            </div>
            <div className="bg-white/10 text-white/60 text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/5 uppercase tracking-wider">Locked</div>
          </div>
        ) : (
          <div className="text-[#00D166] font-bold text-[14px] flex items-center gap-1">
            {formatPrice(price)}
            {!showUSD && <div className="w-3 h-3 bg-[#00D166] rounded-full flex items-center justify-center font-black text-[5px] text-black italic">C</div>}
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default function Earn({ onNavigate, showUSD = true, balance = 0.00 }: { onNavigate?: (view: any) => void, showUSD?: boolean, balance?: number }) {
  const [showLockedToast, setShowLockedToast] = useState(false);
  const isLocked = balance < 10.00;
  const lockThreshold = 10.00;

  const handleLockedClick = () => {
    setShowLockedToast(true);
    setTimeout(() => setShowLockedToast(false), 3000);
  };

  return (
    <div className="pt-12 pb-32 w-full max-w-4xl mx-auto px-4 space-y-12">
      
      {/* Simple Toast for Locked Message */}
      <AnimatePresence>
        {showLockedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-[100] bg-[#1E222D] border border-[#00D166]/30 px-6 py-4 rounded-2xl shadow-[0_4px_30px_rgba(0,209,102,0.15)] backdrop-blur-xl flex items-center gap-3 min-w-[300px]"
          >
            <div className="w-10 h-10 bg-[#00D166]/20 rounded-full flex items-center justify-center shrink-0 border border-[#00D166]/40">
              <Lock className="w-4 h-4 text-[#00D166]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Action Required</h4>
              <p className="text-[#94A3B8] text-xs">Earn at least <span className="text-white font-black">{showUSD ? '$10.00' : '10,000 Coins'}</span> to start these offers.</p>
            </div>
            <button 
              onClick={() => setShowLockedToast(false)}
              className="ml-auto p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Offers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#00D166]" />
            <h2 className="text-[20px] font-bold text-white tracking-tight">Top Offers</h2>
          </div>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {topOffers.map(offer => (
            <OfferCard
              key={offer.id}
              title={offer.title}
              price={offer.price}
              icon={offer.icon}
              isLocked={isLocked}
              lockThreshold={lockThreshold}
              currentBalance={balance}
              onLockedClick={handleLockedClick}
              subtitle={offer.subtitle}
              showUSD={showUSD}
            />
          ))}
        </div>
      </div>

      {/* Featured Offers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-[#00D166]" />
            <h2 className="text-[20px] font-bold text-white tracking-tight">Featured Offers</h2>
          </div>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {featuredOffers.map(offer => (
            <OfferCard
              key={offer.id}
              title={offer.title}
              price={offer.price}
              icon={offer.icon}
              isLocked={isLocked}
              lockThreshold={lockThreshold}
              currentBalance={balance}
              onLockedClick={handleLockedClick}
              subtitle={offer.subtitle}
              className="bg-[#1A1D27]"
              showUSD={showUSD}
            />
          ))}
        </div>
      </div>


      {/* Offers Partners */}
      <div>
         <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#00D166]" fill="currentColor" />
            <h2 className="text-[20px] font-bold text-white tracking-tight">Offers Partners</h2>
            <div className="w-[18px] h-[18px] rounded-full bg-white/10 flex items-center justify-center text-white/50 text-[10px] font-bold ml-1 cursor-help hover:bg-white/20 transition-colors">?</div>
          </div>
          <button 
            onClick={() => onNavigate?.('partners')}
            className="bg-white/10 hover:bg-white/20 text-white text-[13px] font-medium px-4 py-1.5 rounded-full transition-colors"
          >
            View All
          </button>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {offerPartners.map(partner => (
            <div 
              key={partner.id} 
              className="relative p-[1px] rounded-[24px] overflow-hidden group/partner bg-white/5 hover:bg-gradient-to-br hover:from-[#00D166] hover:to-transparent transition-all duration-500 shrink-0 w-[140px] md:w-[160px] aspect-[4/5] shadow-lg cursor-pointer"
            >
              <div className={`relative ${partner.bg} rounded-[23px] h-full flex flex-col items-center justify-center z-10 transition-all group-hover/partner:scale-[0.98]`}>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover/partner:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <div className="z-10 w-full p-6">
                   <img src={partner.logo} alt={partner.name} className="w-full h-auto object-contain brightness-110 group-hover/partner:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 py-3 text-center text-[14px] font-medium tracking-tight text-white/80 group-hover/partner:text-white transition-colors">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Survey Partners */}
      <div>
         <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Edit3 className="w-6 h-6 text-[#00D166]" />
            <h2 className="text-[20px] font-bold text-white tracking-tight">Survey Partners</h2>
            <div className="w-[18px] h-[18px] rounded-full bg-white/10 flex items-center justify-center text-white/50 text-[10px] font-bold ml-1 cursor-help hover:bg-white/20 transition-colors">?</div>
          </div>
          <button 
            onClick={() => onNavigate?.('surveys_partners')}
            className="bg-white/10 hover:bg-white/20 text-white text-[13px] font-medium px-4 py-1.5 rounded-full transition-colors"
          >
            View All
          </button>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {surveyPartners.map(partner => (
            <div 
              key={partner.id} 
              className="relative p-[1px] rounded-[24px] overflow-hidden group/survey bg-white/5 hover:bg-gradient-to-r hover:from-purple-500 hover:to-transparent transition-all duration-500 shrink-0 w-[140px] md:w-[160px] aspect-[4/5] shadow-lg cursor-pointer"
            >
              <div className={`relative ${partner.bg} rounded-[23px] h-full flex flex-col items-center justify-center z-10 transition-all group-hover/survey:scale-[0.98]`}>
                 <div className="z-10 w-full p-6 mb-6">
                   <img src={partner.logo} alt={partner.name} className="w-full h-auto object-contain brightness-110 px-2 group-hover/survey:scale-110 transition-transform duration-500" />
                 </div>
                 <div className="absolute bottom-0 left-0 right-0 py-3 text-center text-white/90 text-[14px] font-medium tracking-tight group-hover/survey:text-white transition-colors">
                   {partner.name}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

