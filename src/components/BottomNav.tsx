import { Trophy, Wallet, Home, Gift, MessageSquare } from 'lucide-react';

interface BottomNavProps {
  currentView: 'home' | 'leaderboard' | 'shop' | 'rewards' | 'chat' | 'earn' | 'profile' | 'referrals';
  onNavigate: (view: 'home' | 'leaderboard' | 'shop' | 'rewards' | 'chat' | 'earn' | 'profile' | 'referrals') => void;
}

export default function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'leaderboard', view: 'leaderboard' as const, icon: Trophy, label: 'Ranking', active: currentView === 'leaderboard' },
    { id: 'shop', view: 'shop' as const, icon: Wallet, label: 'Cashout', active: currentView === 'shop' },
    { id: 'home', view: 'earn' as const, icon: Home, label: 'Home', active: currentView === 'earn' || currentView === 'home' },
    { id: 'rewards', view: 'rewards' as const, icon: Gift, label: 'Rewards', active: currentView === 'rewards' },
    { id: 'chat', view: 'chat' as const, icon: MessageSquare, label: 'Chat', active: currentView === 'chat' },
  ];

  return (
    <div id="bottom-nav" className="fixed bottom-0 left-0 right-0 z-[60] bg-[#10141D] border-t border-white/5 pb-safe">
      <div className="flex items-center justify-around h-20">
        {navItems.map((item) => (
          <button
            key={item.id}
            id={`nav-item-${item.id}`}
            onClick={() => onNavigate(item.view)}
            className={`flex flex-col items-center gap-1.5 transition-all px-4 py-2 rounded-xl ${
              item.active ? 'text-[#00D166]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[11px] font-bold tracking-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
