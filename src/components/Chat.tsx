import React from 'react';
import { Users, Send, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
}

interface ChatProps {
  onBack: () => void;
  isLoggedIn?: boolean;
  userData?: { username: string; avatar: string };
  messages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
}

export default function Chat({ onBack, isLoggedIn, userData, messages, onSendMessage }: ChatProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim() || !isLoggedIn || !userData) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: userData.username,
      avatar: userData.avatar,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onSendMessage(newMessage);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-20 top-0 md:top-[104px] md:bottom-0 md:inset-x-auto md:right-0 md:w-96 bg-[#1A1C23] z-[50] flex flex-col font-sans md:border-l border-white/5 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#1E222D]">
        <div className="flex items-center gap-2 bg-[#2E2836] bg-opacity-70 rounded-full px-3 py-1.5 border border-white/5">
          <Users className="w-4 h-4 text-[#00D166]" />
          <span className="text-[#00D166] text-[13px] font-bold">0</span>
        </div>
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors md:hidden text-white/60">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <img src={msg.avatar} alt={msg.sender} className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
            <div>
              <div className="flex items-baseline gap-2">
                <span className={`font-bold text-sm ${msg.sender === 'System' ? 'text-red-500' : 'text-white'}`}>
                  {msg.sender}
                </span>
                <span className="text-white/40 text-[10px]">{msg.time}</span>
              </div>
              <p className="text-white/80 text-[15px] leading-snug mt-0.5">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer / Input Area */}
      <div className="p-4 bg-[#1E222D] border-t border-white/5">
        {isLoggedIn ? (
          <div className="flex items-center gap-2 bg-[#1E222D] rounded-xl border border-white/5 p-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..." 
              className="flex-1 bg-transparent px-3 py-2 text-white placeholder:text-[#475569] focus:outline-none text-base"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="p-2 bg-[#00D166] hover:bg-[#00E673] disabled:opacity-50 rounded-lg transition-colors text-white"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button className="w-full bg-[#00D166] hover:bg-[#00b558] text-[#181B24] font-semibold text-[16px] py-4 rounded-xl transition-colors">
            Login to chat
          </button>
        )}
      </div>
    </div>
  );
}
