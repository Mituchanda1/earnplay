import { Menu, UserPlus, LogIn, Bell, CreditCard, ChevronDown, LogOut, Users, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  onMenuClick: () => void;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  isLoggedIn?: boolean;
  userData?: { username: string; avatar: string; balance?: number };
  onLogout?: () => void;
  onNavigate?: (view: any) => void;
  showUSD: boolean;
  setShowUSD: (val: boolean) => void;
}

export default function Navbar({ onMenuClick, onSignInClick, onSignUpClick, isLoggedIn = false, userData, onLogout, onNavigate, showUSD, setShowUSD }: NavbarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const balanceUSD = typeof userData?.balance === 'number' ? userData.balance : parseFloat(userData?.balance as any) || 0;
  const balanceCoins = balanceUSD * 1000;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'Welcome to EarnPlay!', message: 'Start earning by completing offers.', time: 'Just now' },
    { id: 2, title: 'Daily Reward', message: 'Your daily reward is ready to claim.', time: '1h ago' },
    { id: 3, title: 'New Partner', message: 'Checkout our new offerwall partner PixyLabs.', time: '5h ago' },
  ];

  return (
    <div id="nav-wrapper" className="fixed top-4 left-0 right-0 z-50 px-2.5">
      {/* Main Floating Navbar */}
      <nav id="navbar" className="bg-[#181B24] rounded-[24px] shadow-2xl border border-white/5 max-w-7xl mx-auto w-full">
        <div className="px-4 h-[60px] flex items-center justify-between">
          <div className="flex items-center shrink-0">
            <button 
              id="menu-btn" 
              onClick={onMenuClick}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <div 
              className="ml-3 flex items-center gap-1.5 cursor-pointer"
              onClick={() => onNavigate?.('earn')}
            >
              <div className="w-8 h-8 bg-[#00D166] rounded-lg flex items-center justify-center rotate-3 border-2 border-white/10 shadow-[0_0_15px_rgba(0,209,102,0.3)]">
                <span className="text-black font-black text-lg italic">E</span>
              </div>
              <span className="text-white font-black text-xl tracking-tighter hidden sm:block">
                EARN<span className="text-[#00D166]">PLAY</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 overflow-visible h-full">
            {isLoggedIn && userData ? (
              <>
                <div className="relative h-full flex items-center" ref={notificationsRef}>
                  <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="p-2 hover:bg-white/5 rounded-xl transition-colors relative"
                  >
                    <Bell className="w-5 h-5 text-white" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-[#00D166] rounded-full border border-[#181B24]"></div>
                  </button>

                  <AnimatePresence>
                    {isNotificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="fixed sm:absolute top-[76px] sm:top-full mt-0 sm:mt-2 left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 sm:right-0 w-[calc(100vw-32px)] sm:w-[320px] max-w-[360px] bg-[#1E222D] rounded-2xl shadow-2xl border border-white/5 overflow-hidden z-[100] origin-top sm:origin-top-right whitespace-normal"
                      >
                        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                          <h3 className="text-white font-bold">Notifications</h3>
                          <span className="text-[10px] bg-[#00D166]/10 text-[#00D166] px-2 py-0.5 rounded-full font-bold">3 NEW</span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                          {notifications.map((notif) => (
                            <div key={notif.id} className="px-6 py-4 hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer">
                              <h4 className="text-white text-sm font-bold mb-1">{notif.title}</h4>
                              <p className="text-white/60 text-xs mb-2">{notif.message}</p>
                              <span className="text-[10px] text-white/40 font-medium">{notif.time}</span>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={() => {
                            onNavigate?.('notifications');
                            setIsNotificationsOpen(false);
                          }}
                          className="w-full py-3 text-[#00D166] text-xs font-bold hover:bg-white/5 transition-colors"
                        >
                          VIEW ALL
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="flex items-center bg-[#2B313E] rounded-[16px] px-3 md:px-4 py-1.5 opacity-90 h-9 shrink-0">
                  <span className="text-white font-bold text-[13px] md:text-sm mr-2">
                    {showUSD ? `$ ${balanceUSD.toFixed(2)}` : `${Math.floor(balanceCoins).toLocaleString()}`}
                  </span>
                  <div className="w-4 h-4 bg-[#00D166]/20 rounded-full flex items-center justify-center">
                    {showUSD ? (
                      <CreditCard className="w-3 h-3 text-[#00D166]" />
                    ) : (
                      <div className="w-2.5 h-2.5 bg-[#00D166] rounded-full flex items-center justify-center font-black text-[6px] text-black italic">C</div>
                    )}
                  </div>
                </div>

                <div className="relative h-full flex items-center" ref={menuRef}>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1 md:gap-2 bg-[#2B313E] rounded-[20px] px-2 py-1.5 hover:bg-[#323846] transition-colors h-9 shrink-0 border border-transparent focus:border-[#00D166]/50"
                  >
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-white/10 shrink-0">
                        <img src={userData.avatar} alt={userData.username} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00D166] border-2 border-[#181B24]"></div>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-2 right-0 w-[260px] bg-[#1E222D] rounded-2xl shadow-2xl border border-white/5 overflow-hidden z-50 pt-6"
                      >
                        {/* Dropdown Header */}
                        <div className="flex flex-col items-center px-6 pb-4 border-b border-white/5">
                          <div className="relative mb-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-[#2B313E] border border-white/10 shrink-0">
                              <img src={userData.avatar} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#00D166] border-2 border-[#1E222D]"></div>
                          </div>
                          <h3 className="text-white font-bold text-lg mb-2">{userData.username}</h3>
                          
                          <div className="w-full relative py-1 mb-1">
                            <div className="flex justify-between text-[11px] font-bold text-[#00D166] absolute -top-1 left-0 right-0 px-0.5">
                              <span>lvl 1</span>
                              <span className="text-white/40">lvl 2</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#2B313E] rounded-full overflow-hidden mt-3">
                              <div className="w-1/4 h-full bg-[#00D166] rounded-full"></div>
                            </div>
                          </div>
                        </div>

                        <div className="py-2">
                          <button 
                            onClick={() => {
                              onNavigate?.('profile');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span className="text-[15px] font-medium">Profile</span>
                          </button>
                          <button 
                            onClick={() => {
                              onNavigate?.('referrals');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Users className="w-4 h-4" />
                            <span className="text-[15px] font-medium">Affiliates</span>
                          </button>
                          <button 
                            onClick={() => {
                              onLogout?.();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-[15px] font-medium">Logout</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-t border-white/5">
                          <span className="text-[15px] font-medium text-white/90">Show USD</span>
                          <button 
                            onClick={() => setShowUSD(!showUSD)}
                            className={`w-9 h-5 rounded-full relative transition-colors ${showUSD ? 'bg-[#00D166]' : 'bg-[#475569]'}`}
                          >
                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${showUSD ? 'translate-x-4' : ''}`} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <motion.button
                  id="signup-btn-nav"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSignUpClick}
                  className="bg-[#00D166] text-white font-black px-4 py-3 rounded-[20px] flex items-center gap-2 text-sm whitespace-nowrap shrink-0"
                >
                  <UserPlus className="w-5 h-5 text-white" />
                  Sign Up
                </motion.button>
                <motion.button
                  id="signin-btn-nav"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSignInClick}
                  className="bg-[#3D4452] text-white font-black px-4 py-3 rounded-[20px] flex items-center gap-2 text-sm whitespace-nowrap shrink-0"
                >
                  <LogIn className="w-5 h-5 text-white" />
                  Sign In
                </motion.button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
