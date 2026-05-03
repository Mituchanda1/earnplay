import React from 'react';
import { Bell, ChevronLeft, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface NotificationsPageProps {
  onBack: () => void;
  userData?: any;
  onUpdateUserData?: (data: Partial<any>) => void;
}

export default function NotificationsPage({ onBack, userData, onUpdateUserData }: NotificationsPageProps) {
  const notifications = userData?.notifications || [];

  const handleClearAll = () => {
    onUpdateUserData?.({ notifications: [] });
  };

  const handleMarkRead = (id: number) => {
    const updated = notifications.map((n: any) => 
      n.id === id ? { ...n, read: true } : n
    );
    onUpdateUserData?.({ notifications: updated });
  };

  return (
    <div className="pt-6 pb-32 w-full max-w-2xl mx-auto px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back</span>
        </button>
        
        <button 
          onClick={handleClearAll}
          className="text-[#94A3B8] hover:text-[#FF4A4A] transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#00D166]/10 flex items-center justify-center">
          <Bell className="w-6 h-6 text-[#00D166]" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Notifications</h1>
          <p className="text-[#94A3B8] text-sm">Stay updated with your latest earnings and account updates.</p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif, index) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-5 rounded-[24px] border border-white/5 transition-all relative overflow-hidden group ${
              notif.read ? 'bg-[#181B24]/50' : 'bg-[#181B24] border-l-4 border-l-[#00D166]'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                notif.read ? 'bg-white/5 text-white/20' : 'bg-[#00D166]/10 text-[#00D166]'
              }`}>
                {notif.read ? <CheckCircle2 className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <h3 className={`font-bold truncate ${notif.read ? 'text-white/60' : 'text-white'}`}>
                    {notif.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[#94A3B8] whitespace-nowrap text-[10px] font-bold uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    {notif.time}
                  </div>
                </div>
                <p className={`text-sm leading-relaxed ${notif.read ? 'text-[#94A3B8]/60' : 'text-[#94A3B8]'}`}>
                  {notif.message}
                </p>
              </div>
            </div>
            
            {/* Mark as read ghost button for desktop */}
            {!notif.read && (
              <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleMarkRead(notif.id)}
                  className="text-[10px] font-black text-[#00D166] uppercase tracking-widest border border-[#00D166]/20 px-3 py-1 rounded-lg bg-[#00D166]/5 hover:bg-[#00D166]/10"
                >
                  Mark Read
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <Bell className="w-8 h-8 text-white/20" />
          </div>
          <div className="space-y-1">
            <h3 className="text-white font-bold italic">All caught up!</h3>
            <p className="text-[#94A3B8] text-sm">You have no new notifications.</p>
          </div>
        </div>
      )}
    </div>
  );
}
