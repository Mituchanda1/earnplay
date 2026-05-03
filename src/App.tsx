/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OfferGrid from './components/OfferGrid';
import BottomNav from './components/BottomNav';
import StatsSection from './components/StatsSection';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SignUpSection from './components/SignUpSection';
import ProviderLogos from './components/ProviderLogos';
import CTASection from './components/CTASection';
import Sidebar from './components/Sidebar';
import Leaderboard from './components/Leaderboard';
import Shop from './components/Shop';
import Rewards from './components/Rewards';
import Chat from './components/Chat';
import Earn from './components/Earn';
import LiveFeed from './components/LiveFeed';
import AuthModal from './components/AuthModal';
import ProfileSetupModal from './components/ProfileSetupModal';
import Profile from './components/Profile';
import Referrals from './components/Referrals';
import PartnersPage from './components/PartnersPage';
import NotificationsPage from './components/NotificationsPage';
import { offerPartners, surveyPartners } from './constants';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'leaderboard' | 'shop' | 'rewards' | 'chat' | 'earn' | 'profile' | 'referrals' | 'partners' | 'surveys_partners' | 'notifications'>(() => {
    return localStorage.getItem('isLoggedIn') === 'true' ? 'earn' : 'home';
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'signIn' | 'signUp'>('signIn');
  const [profileSetupOpen, setProfileSetupOpen] = useState(false);
  const [showUSD, setShowUSD] = useState(true);
  const [chatMessages, setChatMessages] = useState<any[]>(() => {
    const saved = localStorage.getItem('chatMessages');
    try {
      return (saved && saved !== 'undefined') ? JSON.parse(saved) : [
        {
          id: '1',
          sender: 'System',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=System',
          text: 'Welcome to the global chat!',
          time: 'Just now'
        }
      ];
    } catch(e) {
      return [
        {
          id: '1',
          sender: 'System',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=System',
          text: 'Welcome to the global chat!',
          time: 'Just now'
        }
      ];
    }
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('userData');
    let data;
    try {
      data = (saved && saved !== 'undefined') ? JSON.parse(saved) : { id: null, username: '', avatar: '', balance: 0.00, totalEarnings: 0.00, activities: [], notifications: [], isPrivate: false, isAdmin: false };
    } catch(e) {
      data = { id: null, username: '', avatar: '', balance: 0.00, totalEarnings: 0.00, activities: [], notifications: [], isPrivate: false, isAdmin: false };
    }
    if (!data.activities) data.activities = [];
    if (!data.notifications) data.notifications = [];
    if (data.isPrivate === undefined) data.isPrivate = false;
    if (data.isAdmin === undefined) data.isAdmin = false;
    // Fix: initialize totalEarnings from balance if it's 0 or missing but balance exists
    if (data.totalEarnings === undefined || (data.totalEarnings === 0 && data.balance > 0)) {
      data.totalEarnings = data.balance || 0;
    }
    return data;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [isLoggedIn, userData, chatMessages]);

  useEffect(() => {
    if (isLoggedIn && userData.id) {
      fetch(`/api/user/${userData.id}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setUserData(prev => ({
              ...prev,
              ...data,
              balance: parseFloat(data.balance),
              totalEarnings: parseFloat(data.totalEarnings)
            }));
          }
        })
        .catch(console.error);
    }
  }, [isLoggedIn, userData.id]);

  useEffect(() => {
    const fetchChat = () => {
      fetch('/api/chat')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setChatMessages(data);
          }
        })
        .catch(console.error);
    };

    fetchChat();
    const interval = setInterval(fetchChat, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, isChatOpen]);

  const openAuthModal = (view: 'signIn' | 'signUp') => {
    setAuthModalView(view);
    setAuthModalOpen(true);
  };

  const handleRegisterSuccess = () => {
    setAuthModalOpen(false);
    setProfileSetupOpen(true);
  };

  const handleLoginSuccess = (user?: any) => {
    setAuthModalOpen(false);
    if (user) {
      setUserData(user);
      setIsLoggedIn(true);
      setCurrentView('earn');
    } else {
      // Fallback for demo
      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'MysticMage' })
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUserData(data.user);
          setIsLoggedIn(true);
          setCurrentView('earn');
        }
      });
    }
  };

  const handleProfileSave = (username: string, avatar: string) => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, avatar })
    })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        setUserData(data.user);
        setIsLoggedIn(true);
        setProfileSetupOpen(false);
        setCurrentView('earn');
      }
    });
  };

  const handleUpdateBalance = (amount: number, activity?: any) => {
    if (activity && userData.id) {
       fetch('/api/activity', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           user_id: userData.id,
           name: activity.name,
           coins: amount,
           type: activity.type || 'reward',
           status: activity.status || 'Completed',
           time: activity.time || 'Just now'
         })
       }).catch(console.error);
    }

    setUserData(prev => {
      const newNotifications = [...(prev.notifications || [])];
      
      if (activity) {
        if (amount > 0) {
          newNotifications.unshift({
            id: Date.now(),
            title: 'Offer Completed!',
            message: `You have successfully completed "${activity.name}" and earned ${activity.coins} coins.`,
            time: 'Just now',
            type: 'reward',
            read: false
          });
        } else if (amount < 0) {
          newNotifications.unshift({
            id: Date.now(),
            title: 'Withdrawal Requested',
            message: `Your withdrawal for "${activity.name.replace('Withdraw: ', '')}" has been submitted successfully and is pending approval.`,
            time: 'Just now',
            type: 'info',
            read: false
          });
        }
      }

      return { 
        ...prev, 
        balance: (prev.balance || 0) + amount,
        totalEarnings: (prev.totalEarnings || 0) + (amount > 0 ? amount : 0),
        activities: activity ? [activity, ...(prev.activities || [])] : (prev.activities || []),
        notifications: newNotifications.slice(0, 50)
      };
    });
  };

  const handleUpdateUserData = (newData: Partial<any>) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const onSendMessage = (msg: any) => {
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg)
    }).catch(console.error);

    setChatMessages(prev => {
      const newMessages = [...prev, msg];
      return newMessages.slice(-50);
    });
  };

  return (
    <div id="app-container" className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#00D166]/30 selection:text-[#00D166]">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentView={isChatOpen ? 'chat' : currentView}
        onNavigate={(view) => {
          if (view === 'chat') {
            setIsChatOpen(!isChatOpen);
          } else {
            setCurrentView(view as any);
            setIsChatOpen(false);
          }
          setIsSidebarOpen(false);
        }}
      />
      <Navbar 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onSignInClick={() => openAuthModal('signIn')}
        onSignUpClick={() => openAuthModal('signUp')}
        isLoggedIn={isLoggedIn}
        userData={userData}
        onLogout={() => {
          setIsLoggedIn(false);
          setCurrentView('home');
        }}
        onNavigate={(view) => {
          if (view === 'chat') {
            setIsChatOpen(!isChatOpen);
          } else {
            setCurrentView(view);
            setIsChatOpen(false);
          }
        }}
        showUSD={showUSD}
        setShowUSD={setShowUSD}
      />
      
      <main id="main-content" className="relative pt-[92px]">
        <div className="px-2.5 mb-6">
          <LiveFeed userData={userData} showUSD={showUSD} />
        </div>
        
        {currentView === 'home' && (
          <>
            <Hero onSignUpClick={() => openAuthModal('signUp')} />
            <OfferGrid />
            <SignUpSection onRegisterSuccess={handleRegisterSuccess} />
            <StatsSection />
            <HowItWorks />
            <ProviderLogos />
            <FAQ />
            <CTASection onSignUpClick={() => openAuthModal('signUp')} />
          </>
        )}
        {currentView === 'earn' && <Earn onNavigate={setCurrentView} showUSD={showUSD} balance={userData.balance || 0} />}
        {currentView === 'leaderboard' && <Leaderboard showUSD={showUSD} userData={userData} />}
        {currentView === 'shop' && <Shop onUpdateBalance={handleUpdateBalance} userData={userData} isLoggedIn={isLoggedIn} />}
        {currentView === 'rewards' && <Rewards onUpdateBalance={handleUpdateBalance} userData={userData} />}
        {currentView === 'profile' && <Profile userData={userData} onUpdateUserData={handleUpdateUserData} />}
        {currentView === 'referrals' && <Referrals />}
        {currentView === 'partners' && <PartnersPage onBack={() => setCurrentView('earn')} title="Offerwall Partners" partners={offerPartners} />}
        {currentView === 'surveys_partners' && <PartnersPage onBack={() => setCurrentView('earn')} title="Survey Partners" partners={surveyPartners} />}
        {currentView === 'notifications' && <NotificationsPage onBack={() => setCurrentView('earn')} userData={userData} onUpdateUserData={handleUpdateUserData} />}
      </main>

      <Footer />
      <BottomNav 
        currentView={isChatOpen ? 'chat' : currentView} 
        onNavigate={(view) => {
          if (view === 'chat') {
            setIsChatOpen(!isChatOpen);
          } else {
            setCurrentView(view);
            setIsChatOpen(false);
          }
        }} 
      />
      
      {isChatOpen && (
        <Chat 
          onBack={() => setIsChatOpen(false)} 
          isLoggedIn={isLoggedIn} 
          userData={userData} 
          messages={chatMessages}
          onSendMessage={onSendMessage}
        />
      )}
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialView={authModalView} 
        onRegisterSuccess={handleRegisterSuccess}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <ProfileSetupModal
        isOpen={profileSetupOpen}
        onClose={() => setProfileSetupOpen(false)}
        onSave={(username, avatar) => handleProfileSave(username, avatar)}
      />
    </div>
  );
}

