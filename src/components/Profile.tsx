import { useState } from 'react';
import { User, Edit3, AlertCircle, CheckCircle2, Users, Wallet, Clock, ArrowUpRight, Hourglass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileProps {
  userData: {
    username: string;
    avatar: string;
    email?: string;
    balance?: number;
    totalEarnings?: number;
    activities?: any[];
    notifications?: any[];
    isPrivate?: boolean;
    isAdmin?: boolean;
  };
  onUpdateUserData?: (data: Partial<any>) => void;
}

export default function Profile({ userData, onUpdateUserData }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'earnings' | 'withdrawals' | 'pending'>('earnings');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUsername, setEditUsername] = useState(userData.username);
  const [editEmail, setEditEmail] = useState(userData.email || 'karmsk@gmail.com');

  const earnings = (userData.activities || []).filter(a => a.type === 'earnings');
  const finishedWithdrawals = (userData.activities || []).filter(a => a.type === 'withdrawals' && a.status === 'credited');
  const pendingWithdrawals = (userData.activities || []).filter(a => a.type === 'withdrawals' && a.status === 'pending');

  const getActiveList = () => {
    switch(activeTab) {
      case 'earnings': return earnings;
      case 'withdrawals': return finishedWithdrawals;
      case 'pending': return pendingWithdrawals;
      default: return earnings;
    }
  };

  const activeList = getActiveList();

  const totalEarningsCoins = earnings.reduce((sum, a) => sum + (a.coins || 0), 0);

  return (
    <div className="pt-12 pb-32 w-full max-w-4xl mx-auto px-4 space-y-6">
      
      {/* Account Information Card */}
      <div className="bg-[#181B24] rounded-[24px] p-6 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-[#94A3B8]" />
            <h2 className="text-xl font-bold text-white">Account Information</h2>
          </div>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 bg-[#00D166] hover:bg-[#00E673] text-white px-4 py-2 rounded-full font-semibold transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="flex items-start gap-6 mb-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full p-1 border-[3px] border-[#00D166] relative bg-[#1E222D]">
              <img src={userData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              <div className="absolute top-0 -right-2 w-1/2 h-1/2 rounded-full border-t-[3px] border-r-[3px] border-[#00D166]"></div>
            </div>
            <div className="bg-[#3D2545] text-[#D946EF] font-bold text-sm px-4 py-1.5 rounded-xl border border-[#D946EF]/20">
              Level 1
            </div>
          </div>

          <div className="flex-1 pt-2">
            <p className="text-[#94A3B8] text-sm mb-1">Joined 4 minutes ago</p>
            <h3 className="text-3xl font-black text-white mb-2">{userData.username}</h3>
            <div className="flex items-center gap-2">
              <span className="text-[#94A3B8]">{userData.email || 'karmsk@gmail.com'}</span>
              <AlertCircle className="w-4 h-4 text-red-500 fill-red-500/20" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium text-lg border-b border-dashed border-white/30 cursor-help">Private</span>
          </div>
          <button 
            onClick={() => onUpdateUserData?.({ isPrivate: !userData.isPrivate })}
            className={`w-12 h-6 rounded-full relative transition-colors ${userData.isPrivate ? 'bg-[#00D166]' : 'bg-[#3D4452]'}`}
          >
            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${userData.isPrivate ? 'translate-x-6' : ''}`} />
          </button>
        </div>
      </div>

      {/* Stats Cards Row 1 */}
      <div className="bg-[#181B24] rounded-[24px] p-6 border border-white/5">
         <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-5 flex flex-col gap-1">
              <div className="w-2 h-full bg-[#94A3B8] rounded-full self-end"></div>
              <div className="w-full h-1.5 bg-[#94A3B8] rounded-full"></div>
            </div>
            <h2 className="text-xl font-bold text-white">Stats</h2>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1E222D] rounded-[20px] p-6 flex flex-col items-center justify-center text-center gap-3 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-[#00D166]/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#00D166]" />
              </div>
              <div className="text-2xl font-black text-white">{earnings.length}</div>
              <div className="text-[#94A3B8] font-medium">Completed Offers</div>
            </div>
            <div className="bg-[#1E222D] rounded-[20px] p-6 flex flex-col items-center justify-center text-center gap-3 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <p className="text-purple-500 font-bold">0</p>
              </div>
              <div className="text-2xl font-black text-white">0</div>
              <div className="text-[#94A3B8] font-medium">Users Referred</div>
            </div>
         </div>
      </div>

      {/* Stats Cards Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#181B24] rounded-[24px] p-6 flex flex-col items-center justify-center text-center gap-3 border border-white/5">
          <div className="w-12 h-12 rounded-full bg-[#00D166]/10 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-[#00D166]" />
          </div>
          <div className="text-2xl font-black text-white">{totalEarningsCoins.toLocaleString()}</div>
          <div className="text-[#94A3B8] font-medium">Total Earning (Coins)</div>
        </div>
        <div className="bg-[#181B24] rounded-[24px] p-6 flex flex-col items-center justify-center text-center gap-3 border border-white/5">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-white">{totalEarningsCoins.toLocaleString()}</div>
          <div className="text-[#94A3B8] font-medium px-4 leading-tight">Earnings last 30 days</div>
        </div>
      </div>

      {/* Activity Tabs Section */}
      <div className="bg-[#181B24] rounded-[24px] p-6 border border-white/5">
        <div className="flex gap-4 mb-8 border-b border-white/5 pb-4 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('earnings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
              activeTab === 'earnings' ? 'bg-[#00D166] text-white' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Wallet className="w-5 h-5" />
            Earnings
            <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs ml-1">{earnings.length}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('withdrawals')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
              activeTab === 'withdrawals' ? 'bg-[#00D166] text-white' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-5 h-5" />
            Withdrawals
            <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs ml-1">{finishedWithdrawals.length}</span>
          </button>

          <button 
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
              activeTab === 'pending' ? 'bg-[#00D166] text-white' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Hourglass className="w-5 h-5" />
            Pending
            <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs ml-1">{pendingWithdrawals.length}</span>
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between px-4 py-2 text-[#94A3B8] text-sm font-medium border-b border-white/5 mb-4">
            <div className="w-[40%]">Name</div>
            <div className="w-[30%] text-center">Time</div>
            <div className="w-[30%] text-right">Points</div>
          </div>
          
          {activeList.length > 0 ? (
            <div className="space-y-4">
              {activeList.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors group">
                  <div className="w-[40%] flex flex-col">
                    <span className="font-bold text-white group-hover:text-[#00D166] transition-colors">{item.name}</span>
                    {item.type === 'withdrawals' && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'pending' ? 'bg-amber-500 animate-pulse' : 'bg-[#00D166]'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${item.status === 'pending' ? 'text-amber-500' : 'text-[#00D166]'}`}>
                          {item.status === 'pending' ? 'Pending' : 'Credited'}
                        </span>
                        {item.status === 'pending' && userData.isAdmin && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const newActivities = userData.activities?.map(a => 
                                a.id === item.id ? { ...a, status: 'credited', time: 'Just now' } : a
                              );
                              const newNotifications = [...(userData.notifications || [])];
                              newNotifications.unshift({
                                id: Date.now(),
                                title: 'Withdrawal Successful!',
                                message: `Your withdrawal for "${item.name.replace('Withdraw: ', '')}" has been approved and credited to your account.`,
                                time: 'Just now',
                                type: 'update',
                                read: false
                              });
                              onUpdateUserData?.({ 
                                activities: newActivities,
                                notifications: newNotifications.slice(0, 50)
                              });
                            }}
                            className="text-[9px] bg-white/10 hover:bg-[#00D166] text-white hover:text-black px-1.5 py-0.5 rounded transition-colors ml-2 font-black"
                          >
                            APPROVE (DEV)
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="w-[30%] text-center text-[#94A3B8] text-sm">{item.time}</div>
                  <div className="w-[30%] text-right font-black text-[#00D166]">{item.coins > 0 ? `+${item.coins}` : item.coins}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 flex items-center justify-center text-white/20 font-bold uppercase tracking-widest text-sm">
              No activity found
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-[#181B24] rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-[#94A3B8] hover:text-white">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Verify your email</label>
                  <button className="w-full bg-[#5C667B] hover:bg-[#6C768B] text-white font-semibold py-3.5 rounded-xl transition-colors">
                    Resend verification link
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Username</label>
                  <input 
                    type="text" 
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full bg-[#10141D] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00D166] text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-[#10141D] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00D166] text-base"
                  />
                </div>

                <button 
                  onClick={() => {
                    onUpdateUserData?.({ username: editUsername, email: editEmail });
                    setIsEditModalOpen(false);
                  }}
                  className="w-full bg-[#00D166] hover:bg-[#00E673] text-white font-bold py-3.5 rounded-xl transition-colors text-lg mt-4"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
