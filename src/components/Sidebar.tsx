import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Home, PoundSterling, Sparkles, Edit3, ShoppingCart, 
  BarChart2, Users, Gift, User, MessageCircle, ChevronDown, Rocket, Tag
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: 'home' | 'leaderboard' | 'shop' | 'rewards' | 'chat' | 'earn' | 'profile' | 'referrals' | 'partners' | 'surveys_partners' | 'notifications';
  onNavigate: (view: 'home' | 'leaderboard' | 'shop' | 'rewards' | 'chat' | 'earn' | 'profile' | 'referrals' | 'partners' | 'surveys_partners' | 'notifications') => void;
}

export default function Sidebar({ isOpen, onClose, currentView, onNavigate }: SidebarProps) {
  const [isOffersOpen, setIsOffersOpen] = useState(true); // Default open as in screenshot

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[300px] bg-[#181B24] z-[70] overflow-y-auto no-scrollbar pb-24 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-2">
                {/* Logo icon placeholder */}
                <div className="w-8 h-8 rounded-lg bg-[#00D166]/20 flex items-center justify-center">
                  <span className="text-[#00D166] font-black text-xs">EP</span>
                </div>
                <span className="text-xl font-black text-[#00D166] tracking-tight">EarnPlay</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="px-4 py-2 flex flex-col gap-1">
              <NavItem icon={Home} label="Home" onClick={() => onNavigate('earn')} isActive={currentView === 'earn' || currentView === 'home'} />
              <NavItem icon={PoundSterling} label="Earn" onClick={() => onNavigate('earn')} />
              
              {/* Expandable Offers */}
              <div className="flex flex-col">
                <button 
                  onClick={() => setIsOffersOpen(!isOffersOpen)}
                  className="w-full flex items-center justify-between p-3.5 rounded-[18px] transition-colors hover:bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    <Sparkles className={`w-5 h-5 ${isOffersOpen ? 'text-[#00D166]' : 'text-white'}`} />
                    <span className={`font-semibold text-base ${isOffersOpen ? 'text-[#00D166]' : 'text-white'}`}>Offers</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOffersOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className={`w-4 h-4 ${isOffersOpen ? 'text-[#00D166]' : 'text-[#94A3B8]'}`} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOffersOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col gap-1 mt-1 pl-4 ml-[22px] border-l border-white/10"
                    >
                      <SubNavItem icon={Rocket} label="All" />
                      <SubNavItem icon={Tag} label="Games" badge="508" activeBadge />
                      <SubNavItem icon={Tag} label="Other" badge="403" activeBadge />
                      <SubNavItem 
                        icon={Tag} 
                        label="Surveys" 
                        badge="10" 
                        activeBadge 
                        onClick={() => onNavigate('surveys_partners')}
                        isActive={currentView === 'surveys_partners'}
                      />
                      <SubNavItem 
                        icon={Sparkles} 
                        label="Partners" 
                        badge="11" 
                        activeBadge 
                        onClick={() => onNavigate('partners')}
                        isActive={currentView === 'partners'}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavItem icon={Edit3} label="Surveys" badge="1" activeBadge onClick={() => onNavigate('earn')} />
              <NavItem icon={ShoppingCart} label="Shop" onClick={() => onNavigate('shop')} isActive={currentView === 'shop'} />
              
              {/* Active Leaderboard Item */}
              <NavItem icon={BarChart2} label="Leaderboard" onClick={() => onNavigate('leaderboard')} isActive={currentView === 'leaderboard'} />
              
              <NavItem icon={Users} label="Referrals" onClick={() => onNavigate('referrals')} isActive={currentView === 'referrals'} />
              <NavItem icon={Gift} label="Rewards" onClick={() => onNavigate('rewards')} isActive={currentView === 'rewards'} />
              <NavItem icon={User} label="Profile" onClick={() => onNavigate('profile')} isActive={currentView === 'profile'} />
              <NavItem icon={MessageCircle} label="Support" onClick={() => onNavigate('chat')} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NavItem({ 
  icon: Icon, 
  label, 
  isActive, 
  badge, 
  activeBadge,
  onClick
}: { 
  icon: any, 
  label: string, 
  isActive?: boolean,
  badge?: string,
  activeBadge?: boolean,
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3.5 rounded-[18px] transition-colors ${
        isActive 
          ? 'bg-gradient-to-r from-[#00D166] to-[#00b558] text-white shadow-[0_4px_20px_rgba(0,209,102,0.3)]' 
          : 'text-white hover:bg-white/5'
      }`}
    >
      <div className="flex items-center gap-4">
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white'}`} />
        <span className="font-semibold text-base">{label}</span>
      </div>
      {badge && (
        <div className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
          activeBadge 
            ? 'bg-[#00D166] text-white' 
            : 'bg-white/10 text-white'
        }`}>
          {badge}
        </div>
      )}
    </button>
  );
}

function SubNavItem({ 
  icon: Icon, 
  label, 
  badge, 
  activeBadge,
  isActive,
  onClick
}: { 
  icon: any, 
  label: string, 
  badge?: string,
  activeBadge?: boolean,
  isActive?: boolean,
  onClick?: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-2.5 rounded-[16px] transition-colors relative group ${
        isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
      }`}
    >
      {/* Hierarchy Line & Dot */}
      <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-4 h-[1px] bg-white/10 group-hover:bg-white/20 transition-colors" />
      <div className="absolute left-[-18.5px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-white/20 group-hover:bg-[#00D166] transition-colors shadow-[0_0_0_2px_#181B24]" />

      <div className="flex items-center gap-4">
        <Icon className="w-[18px] h-[18px]" />
        <span className="font-medium text-[15px]">{label}</span>
      </div>
      {badge && (
        <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
          activeBadge 
            ? 'bg-[#00D166] text-white' 
            : 'bg-white/10 text-white'
        }`}>
          {badge}
        </div>
      )}
    </button>
  );
}
