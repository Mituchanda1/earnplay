import { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, CreditCard, ExternalLink } from 'lucide-react';
import UserProfileModal from './UserProfileModal';

const topThree = [
  {
    rank: 2,
    name: "SneakySniper",
    points: 3492,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    color: "text-[#94A3B8]" // Silver
  },
  {
    rank: 1,
    name: "developer",
    points: 8450,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=raccoon",
    color: "text-[#FACC15]" // Gold
  },
  {
    rank: 3,
    name: "Vicious Viper",
    points: 3492,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
    color: "text-[#D97706]" // Bronze
  }
];

const leaderboardData = [
  ...topThree.slice(1, 2), // Rank 1
  topThree.slice(0, 1)[0], // Rank 2
  topThree.slice(2, 3)[0], // Rank 3
  { rank: 4, name: "DarkDiva", points: 3492, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "bg-purple-900/40 text-purple-400" },
  { rank: 5, name: "Konkolrepo689", points: 3492, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack", color: "bg-emerald-900/40 text-emerald-400" },
  { rank: 6, name: "Marupkondokar678", points: 3492, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jocelyn", color: "bg-fuchsia-900/40 text-fuchsia-400" },
  { rank: 7, name: "Manurlop689", points: 3492, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nolan", color: "bg-teal-900/40 text-teal-400" },
  { rank: 8, name: "CunningCobra", points: 2343, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cobra", color: "bg-purple-900/40 text-purple-400" },
  { rank: 9, name: "MalevolentDagger", points: 2343, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dagger", color: "bg-indigo-900/40 text-indigo-400" },
  { rank: 10, name: "MysticWitch", points: 2343, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Witch", color: "bg-rose-900/40 text-rose-400" },
];

export default function Leaderboard({ showUSD, userData }: { showUSD: boolean; userData?: any }) {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Calculate points from total cumulative earnings ($1 = 1000 coins)
  const userPoints = Math.round((userData?.totalEarnings || 0) * 1000);
  
  // Combine user with leaderboard data
  const allData = [
    ...leaderboardData.filter(d => d.name !== userData?.username),
    { 
      rank: 0, // temporary 
      name: userData?.username || "You", 
      points: userPoints, 
      avatar: userData?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=You", 
      color: "bg-[#00D166]/20 text-[#00D166]",
      isCurrentUser: true,
      history: userData?.activities || []
    }
  ].sort((a, b) => b.points - a.points);

  // Assign ranks
  const rankedData = allData.map((d, index) => ({ ...d, rank: index + 1 }));
  
  // Top three for podium
  const currentTopThree = [
    rankedData.find(d => d.rank === 2),
    rankedData.find(d => d.rank === 1),
    rankedData.find(d => d.rank === 3)
  ].filter(Boolean) as any[];

  return (
    <div className="pt-12 pb-24 px-4 max-w-4xl mx-auto">
      {/* Podium Section */}
      <div className="flex items-end justify-center gap-2 mb-6 pt-10 h-[280px]">
        {currentTopThree.map((user: any, idx) => (
          <PodiumCard 
            key={user.rank} 
            user={user} 
            isFirst={user.rank === 1} 
            height={user.rank === 1 ? "h-[240px]" : user.rank === 2 ? "h-[200px]" : "h-[180px]"} 
            onClick={() => setSelectedUser(user)} 
            showUSD={showUSD}
          />
        ))}
      </div>

      {/* Stats Bar */}
      <div className="flex flex-col items-center gap-3 mb-12">
        <div className="bg-[#1A1D27] rounded-[20px] px-6 py-4 flex items-center gap-3 w-max justify-center">
          <CreditCard className="w-5 h-5 text-[#00D166]" />
          <span className="text-white font-bold tracking-tight">
            Total Earned: {showUSD ? `$${(userData?.totalEarnings || 0).toFixed(2)}` : `${userPoints.toLocaleString()} Coins`}
          </span>
        </div>
        <div className="bg-[#1A1D27] rounded-[20px] px-6 py-4 flex items-center gap-3 w-max justify-center">
          <Clock className="w-5 h-5 text-[#00D166]" />
          <span className="text-white font-bold tracking-tight">Ends in 1d 19h 36m 10s</span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="w-full">
        <div className="flex items-center text-[#94A3B8] font-bold text-[15px] mb-4 px-4">
          <div className="w-[80px]">Rank</div>
          <div className="flex-1">User</div>
          <div className="text-right">Points</div>
        </div>

        <div className="space-y-[1px]">
          {rankedData.map((user: any, index) => (
            <div 
              key={user.rank}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center border-b border-white/5 py-4 px-4 hover:bg-white/[0.02] transition-colors cursor-pointer group ${user.isCurrentUser ? 'bg-[#00D166]/5' : 'bg-transparent'}`}
            >
              {/* Rank Badge */}
              <div className="w-[80px] flex items-center">
                {user.rank <= 3 ? (
                  <div className={`relative flex items-center justify-center w-8 h-10 ${user.rank === 1 ? 'text-[#FACC15]' : user.rank === 2 ? 'text-[#94A3B8]' : 'text-[#D97706]'}`}>
                    <svg viewBox="0 0 24 32" fill="currentColor" className="w-8 h-10 drop-shadow-md">
                      <path d="M0 0h24v32l-12-8-12 8z" />
                    </svg>
                    <span className="absolute top-1 text-[#10141D] font-black text-sm">{user.rank}</span>
                  </div>
                ) : (
                  <div className={`flex items-center justify-center w-[30px] h-[30px] rounded-full text-xs font-black ${user.color || 'bg-white/10 text-white'}`}>
                    {user.rank}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#1A1D27] shrink-0 border border-white/5">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold text-[15px] tracking-tight">{user.name}</span>
                  {user.isCurrentUser && <span className="text-[10px] bg-[#00D166] text-black px-1.5 py-0.5 rounded font-black ml-1 uppercase">You</span>}
                  <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] ml-1" />
                </div>
              </div>

              {/* Points */}
              <div className="text-right text-[#00D166] font-black tracking-tight text-[15px]">
                {showUSD ? `$${(user.points / 1000).toFixed(2)}` : user.points.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <UserProfileModal 
        user={selectedUser} 
        onClose={() => setSelectedUser(null)} 
        showUSD={showUSD} 
      />
    </div>
  );
}

function PodiumCard({ user, isFirst = false, height, onClick, showUSD }: { user: any, isFirst?: boolean, height: string, onClick: () => void, showUSD: boolean, key?: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`bg-[#181B24] rounded-t-[32px] flex flex-col items-center pt-8 px-2 relative cursor-pointer hover:bg-[#232731] transition-colors ${
        isFirst ? 'w-[35%] z-10' : 'w-[28%]'
      } ${height}`}
    >
      <div className={`absolute -top-[6px] right-4 flex items-center justify-center w-[30px] h-[40px] ${user.rank === 1 ? 'text-[#FACC15]' : user.rank === 2 ? 'text-[#94A3B8]' : 'text-[#D97706]'} z-20`}>
        <svg viewBox="0 0 24 32" fill="currentColor" className="w-[30px] h-[40px] drop-shadow-md">
          <path d="M0 0h24v32l-12-8-12 8z" />
        </svg>
        <span className="absolute top-1 text-[#181B24] font-black text-sm">{user.rank}</span>
      </div>

      <div className={`relative mb-4 shrink-0 overflow-hidden z-10 ${isFirst ? 'w-[72px] h-[72px]' : 'w-[64px] h-[64px]'}`}>
        <div className="w-full h-full rounded-full overflow-hidden bg-[#1A1D27]">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        {isFirst && (
          <div className="absolute -top-4 -right-1 text-[32px] drop-shadow-xl z-30 filter">
            👑
          </div>
        )}
      </div>

      <div className="text-center font-bold text-white text-[15px] mb-1.5 break-all line-clamp-2 leading-tight tracking-tight px-1 z-10">
        {user.name}
      </div>
      <div className="text-[#00D166] font-black text-[15px] z-10">
        {showUSD ? `$${(user.points / 1000).toFixed(2)}` : user.points.toLocaleString()}
      </div>
    </motion.div>
  );
}
