import { ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const shopSections = [
  {
    title: 'Crypto',
    items: [
      { id: 'binance', name: 'Binance', iconType: 'svg-binance', bg: 'bg-[#090B0E]', min: 0.10 },
      { id: 'litecoin', name: 'Litecoin', iconType: 'svg-litecoin', bg: 'bg-[#7E7E7E]', min: 0.20 },
      { id: 'tron', name: 'Tron', iconType: 'svg-tron', bg: 'bg-[#090B0E]', min: 1.00 },
      { id: 'bitcoin', name: 'Bitcoin', iconType: 'svg-bitcoin', bg: 'bg-[#FDA01B]', min: 5.00, amounts: [5, 10] },
      { id: 'dogecoin', name: 'Dogecoin', iconType: 'img-dogecoin', bg: 'bg-[#F9CF70]', min: 1.00 },
    ]
  },
  {
    title: 'Gift Card',
    items: [
      { id: 'google-play', name: 'Google Play', iconType: 'svg-googleplay', bg: 'bg-[#090B0E]', min: 5.00, amounts: [5, 10], fee: 0.05, notAvailable: true },
      { id: 'walmart', name: 'Walmart', iconType: 'svg-walmart', bg: 'bg-[#090B0E]', min: 5.00, notAvailable: true },
      { id: 'paypal', name: 'paypal', iconType: 'svg-paypal', bg: 'bg-[#00CBEF]', min: 2.00, amounts: [2, 3, 5, 10], notAvailable: true },
    ]
  },
  {
    title: 'Cash',
    items: [
      { id: 'wise', name: 'Wise', iconType: 'svg-wise', bg: 'bg-[#090B0E]', min: 10.00, notAvailable: true },
      { id: 'payoneer', name: 'Payoneer', iconType: 'svg-payoneer', bg: 'bg-[#090B0E]', min: 8.00, notAvailable: true },
      { id: 'payeer', name: 'Payeer', iconType: 'svg-payeer', bg: 'bg-[#F6F6F6]', min: 1.00, notAvailable: true },
      { id: 'western-union', name: 'western un...', iconType: 'svg-wu', bg: 'bg-[#090B0E]', min: 1.00, notAvailable: true },
      { id: 'faucetpay', name: 'faucetpay', iconType: 'svg-faucetpay', bg: 'bg-[#090B0E]', min: 1.00, notAvailable: true },
    ]
  }
];

function BrandIcon({ type, className = "w-[60px] h-[60px]" }: { type: string, className?: string }) {
  switch (type) {
    case 'svg-binance':
      return (
        <svg viewBox="0 0 24 24" fill="#FCD535" className={className}>
          <path d="M16.624 13.9202l2.7175 2.7154-7.353 7.353-7.353-7.352 2.7175-2.7164 4.6355 4.6595 4.6356-4.6595zm4.6366-4.6366L24 12l-2.7394 2.7153-2.767-2.715zM7.3614 9.2847L10.08 12l-2.7186 2.7164L4.6355 12zM12 0l7.353 7.353-2.7176 2.7152L12 5.4326 7.3646 10.068 4.647 7.353 12 0zm0 8.581l3.419 3.419-3.419 3.419-3.419-3.419z"/>
        </svg>
      );
    case 'svg-litecoin':
      return (
        <svg viewBox="0 0 24 24" fill="#FFF" className={className}>
          <path d="M8.2 18.5H18l-1.1 3.5H3l3.6-11.5L4.8 11l1.1-3.5 1.8-.5 1-3 3.5-1-1.1 3.5 2.5-.8-1 3-2.5.8L8.2 18.5z"/>
        </svg>
      );
    case 'svg-tron':
      return (
        <svg viewBox="0 0 512 512" className={className}>
          <circle cx="256" cy="256" r="256" fill="#FF0013"/>
          <path d="M96 170.6L256 96l160 74.6L256 416 96 170.6z" fill="none" stroke="#000" strokeWidth="24"/>
          <path d="M256 96v320l160-245.4-160-74.6z" fill="none" stroke="#000" strokeWidth="24"/>
        </svg>
      );
    case 'svg-bitcoin':
      return (
        <svg viewBox="0 0 24 24" fill="#FFF" className={className}>
          <path d="M14.6 13.9c1.4-.4 2.2-1.4 2.2-2.9 0-2.3-1.6-3.3-4.5-3.3H9.8V4.8h1.8v2.8h1.2v-2.8h1.8v2.8h.4c3.4 0 5.6 1.4 5.6 4.3 0 1.8-1 3.1-2.6 3.8 2 .6 3.2 2.2 3.2 4.4 0 3-2.3 4.6-5.8 4.6h-.6v2.8H13v-2.8h-1.2v2.8h-1.8v-2.8H7.3v-1.8h1.5v-7.9H7.3V6.3h2.5V3.5h1.8v2.8h4zm-3-4.5v3.4h1.7c1.6 0 2.4-.7 2.4-1.7 0-1-.8-1.7-2.4-1.7h-1.7zm0 5v3.8h2c1.8 0 2.8-.8 2.8-1.9 0-1-.9-1.9-2.8-1.9h-2z"/>
        </svg>
      );
    case 'img-dogecoin':
      return <img src="https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=025" alt="doge" className={`${className} brightness-0 invert`} />;
    case 'svg-googleplay':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#41A0FF" d="M3.7 2.3l11.6 12L3.7 21.6c-.4.4-1 .1-1-.5V2.8c0-.6.6-.9 1-.5z"/>
          <path fill="#FFC933" d="M15.3 14.3l3.6 3.7c.6.6 1.7.6 2.3 0l1.4-1.4c.5-.5.5-1.4 0-1.9L15.3 7.3v7z"/>
          <path fill="#FF4456" d="M15.3 14.3L3.7 21.6c.4.4.9.4 1.3.1l10.3-7.4"/>
          <path fill="#02CE7E" d="M3.7 2.3L15.3 9.7l10.3-7.4c-.4-.3-.9-.3-1.3.1L3.7 21.6"/>
        </svg>
      );
    case 'svg-walmart':
      return (
         <div className="flex items-center justify-center p-2 pt-4">
           <svg viewBox="0 0 100 30" fill="#0071CE" className="h-[20px]">
            <text x="0" y="24" fontFamily="Arial" fontWeight="bold" fontSize="24">Walmart</text>
           </svg>
           <svg viewBox="0 0 24 24" fill="#FFC220" className="w-[18px] h-[18px] ml-1">
             <path d="M12 0v5h-2V0h2zm0 19v5h-2v-5h2zM0 12h5v-2H0v2zm19 0h5v-2h-5v2zm-3.5-7.5l3.5-3.5-1.4-1.4-3.5 3.5 1.4 1.4zM3.5 19.5l3.5-3.5-1.4-1.4-3.5 3.5 1.4 1.4zM3.5 4.5L7 8 8.4 6.6 4.9 3.1 3.5 4.5zm15.5 15l-3.5-3.5-1.4 1.4 3.5 3.5 1.4-1.4z"/>
           </svg>
         </div>
      );
    case 'svg-paypal':
      return (
        <svg viewBox="0 0 24 24" fill="#FFF" className={className}>
          <path d="M7 2h7.8c3.2 0 4.8 1.5 4.8 3.9 0 3.2-2.3 5.4-5.3 5.4H11l-1 6.5H7.5l1.6-10.5H7l-.5 3z"/>
          <path d="M9 20h2.5l1-6.5H15c3 0 5-2.2 5-5.4 0-.8-.1-1.5-.4-2-.7 3.5-3.5 5.5-6.8 5.5h-2L9 20z" opacity="0.6"/>
        </svg>
      );
    case 'svg-wise':
      return (
        <svg viewBox="0 0 24 24" fill="#00B9FF" className={className}>
          <path d="M10 12l2.5-6H20L13.5 22 10 12z" fill="#00D166"/>
          <path d="M4 12l4-10H2l-1.5 5H6l-2 5h6z" fill="#00D166"/>
        </svg>
      );
    case 'svg-payoneer':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="10" stroke="url(#p-grad)" strokeWidth="4"/>
          <defs>
            <linearGradient id="p-grad" x1="0" y1="0" x2="24" y2="24">
              <stop stopColor="#FF4500" />
              <stop offset="1" stopColor="#00AEEF" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'svg-payeer':
       return (
        <div className="flex items-center">
          <span className="font-black text-[#10141D] text-lg">PAY<span className="text-[#00A2D3]">EER</span>®</span>
        </div>
      );
    case 'svg-wu':
      return (
        <svg viewBox="0 0 24 24" fill="#FFD100" className={className}>
          <path d="M2 18h4l4-12h4l-2 6h4l2-6h4M5.5 13H15M8 9h10" fill="none" stroke="#FFD100" strokeWidth="4"/>
          <path d="M2 18h4l4-12M15 13h4O10 9" fill="none" stroke="#000" strokeWidth="1" opacity="0.3"/>
        </svg>
      );
    case 'svg-faucetpay':
      return (
        <svg viewBox="0 0 24 24" fill="#2E71F3" className={className}>
          <path d="M3 12l9-9 4 4-5 5 5 5-4 4-9-9zM12 3l9 9-4 4-5-5 5-5-4-4-9-9z" opacity="0.5"/>
          <path d="M7 12l5-5 5 5-5 5-5-5z"/>
        </svg>
      );
    default:
      return null;
  }
}

function WithdrawModal({ item, onClose, onUpdateBalance, userData, isLoggedIn }: { item: any, onClose: () => void, onUpdateBalance?: (amount: number, activity?: any) => void, userData?: any, isLoggedIn: boolean }) {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState<number | string>(item.amounts ? item.amounts[0] : 0);
  
  const getAddressLabel = () => {
    if (item.id === 'google-play') return 'ENTER EMAIL ADDRESS';
    return `YOUR ${item.name.toUpperCase()} ADDRESS`;
  };

  const finalAmount = typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
  const fee = item.fee || 0;
  const totalPrice = finalAmount + fee;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-md bg-[#1B1E26] rounded-[24px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center shadow-lg border border-white/5`}>
              <BrandIcon type={item.iconType} className="w-6 h-6" />
            </div>
            <h2 className="text-[20px] font-bold text-white tracking-tight">{item.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>

        <div className="p-6 pt-2 space-y-5">
          {/* Amount Selection if applicable */}
          {item.amounts && (
            <div>
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-3 block">Select Amount</label>
              <div className="grid grid-cols-1 gap-2">
                {item.amounts.map((amt: number) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className={`flex items-center justify-between px-4 py-3 rounded-[12px] border-2 transition-all ${
                      amount === amt 
                        ? 'bg-[#00D166]/10 border-[#00D166]' 
                        : 'bg-white/5 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                       <BrandIcon type={item.iconType} className="w-5 h-5" />
                    </div>
                    <span className="text-white font-bold text-[15px]">${amt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Address Input */}
          <div>
            <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-2 block">{getAddressLabel()}</label>
            <input 
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#13151D] border-2 border-white/5 rounded-[12px] px-4 py-3 text-white focus:outline-none focus:border-[#00D166]/50 transition-all font-medium"
              placeholder={item.id === 'google-play' ? 'Enter your email' : 'Paste address here'}
            />
          </div>

          {/* Amount Input for non-preset */}
          {!item.amounts && (
            <div>
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Amount USD</label>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#13151D] border-2 border-white/5 rounded-[12px] px-4 py-3 text-white focus:outline-none focus:border-[#00D166]/50 transition-all font-bold text-lg"
                placeholder="0"
                min={item.min}
              />
              <p className="text-[11px] text-white/20 mt-1.5 font-medium">Minimum: ${item.min.toFixed(2)}</p>
            </div>
          )}

          {/* Details */}
          <div className="space-y-1.5 pt-2">
             <div className="flex items-center justify-between">
                <span className="text-white/40 text-[14px]">Fee</span>
                <span className="text-white font-medium">${fee.toFixed(2)}</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-white/40 text-[14px]">Total Price</span>
                <span className="text-white font-bold">${totalPrice.toFixed(2)}</span>
             </div>
          </div>

          {/* Action */}
          <button 
            className="w-full bg-[#00D166] hover:bg-[#00E673] text-black font-extrabold py-4 rounded-[16px] text-[16px] transition-all transform active:scale-[0.98] shadow-[0_0_20px_rgba(0,209,102,0.3)]"
            onClick={() => {
              if (!isLoggedIn) {
                alert("Please login to withdraw funds.");
                return;
              }

              if (finalAmount < item.min) {
                alert(`Minimum withdrawal is $${item.min.toFixed(2)}`);
                return;
              }

              if (totalPrice > (userData?.balance || 0)) {
                alert(`Insufficient balance. You have $${(userData?.balance || 0).toFixed(2)}.`);
                return;
              }

              if (!address || address.length < 5) {
                alert(`Please enter a valid address`);
                return;
              }
              
              if (onUpdateBalance) {
                const coinsToSubtract = Math.round(totalPrice * 1000);
                const activity = {
                  id: Date.now(),
                  name: `Withdraw: ${item.name}`,
                  time: 'Just now',
                  coins: -coinsToSubtract,
                  type: 'withdrawals',
                  status: 'pending'
                };

                onUpdateBalance(-totalPrice, activity);
                setAddress('');

                // Add notification for withdrawal request successfully submitted
                const newNotification = {
                  id: Date.now() + 1,
                  title: 'Withdrawal Requested',
                  message: `Your request for $${totalPrice.toFixed(2)} (${item.name}) has been submitted and is pending approval.`,
                  time: 'Just now',
                  type: 'info',
                  read: false
                };
                
                // We need to update notifications in userData too
                // Since handleUpdateBalance only handles earnings notifications, 
                // we'll rely on the parent updating this if we could, but let's try to trigger it via an event or just alert
                // Actually App.tsx handles onUpdateBalance, I'll update App.tsx's onUpdateBalance to also handle negative amounts if I want
                // But for now let's just make sure the user sees it.

                // Dispatch event for LiveFeed
                const event = new CustomEvent('rewardClaimed', {
                  detail: {
                    name: userData?.username || 'MysticMage',
                    amount: `-$${totalPrice.toFixed(2)}`,
                    coins: -coinsToSubtract,
                    offer: `Withdraw: ${item.name}`,
                    avatar: userData?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avatar1',
                    history: [activity, ...(userData?.activities || [])],
                    isPrivate: userData?.isPrivate
                  }
                });
                window.dispatchEvent(event);
                alert(`Withdrawal of $${totalPrice.toFixed(2)} submitted for approval!`);
                onClose();
              }
            }}
          >
            Withdraw Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Shop({ onUpdateBalance, userData, isLoggedIn }: { onUpdateBalance?: (amount: number, activity?: any) => void, userData?: any, isLoggedIn: boolean }) {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <>
      <div className="pt-12 pb-32 w-full max-w-lg mx-auto">
        <div className="bg-[#181B24] rounded-t-[32px] min-h-[80vh] px-4 py-8">
          
          {/* Title */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <ShoppingCart className="w-[26px] h-[26px] text-[#00D166]" />
            <h1 className="text-[22px] font-bold text-white tracking-tight">Shop</h1>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {shopSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-[17px] font-bold text-white mb-4 px-2 tracking-tight">{section.title}</h2>
                <div className="grid grid-cols-3 gap-3">
                  {section.items.map((item: any) => (
                    <div 
                      key={item.id}
                      onClick={() => !item.notAvailable && setSelectedItem(item)}
                      className={`${item.bg} rounded-[20px] p-3 flex flex-col items-center justify-center aspect-[3/4] cursor-pointer hover:scale-[1.02] transition-transform relative group border border-transparent hover:border-white/10 ${item.notAvailable ? 'opacity-60 grayscale-[0.5] cursor-not-allowed' : ''}`}
                    >
                      {item.notAvailable && (
                        <div className="absolute top-2 left-0 right-0 flex justify-center z-20">
                          <span className="bg-rose-500/90 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-lg">
                            Not Available
                          </span>
                        </div>
                      )}
                      
                      <div className="h-16 w-16 mb-4 flex items-center justify-center pointer-events-none">
                        <BrandIcon type={item.iconType} />
                      </div>
                      
                      <span className="font-normal text-[14px] text-center w-full truncate px-1 tracking-tight text-white">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <WithdrawModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
            onUpdateBalance={onUpdateBalance} 
            userData={userData} 
            isLoggedIn={isLoggedIn}
          />
        )}
      </AnimatePresence>
    </>
  );
}
