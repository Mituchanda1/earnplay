import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronLeft, Search, Filter } from 'lucide-react';
import { offerPartners } from '../constants';

interface Partner {
  id: string;
  name: string;
  logo: string;
  bg: string;
}

interface PartnersPageProps {
  onBack: () => void;
  title: string;
  partners: Partner[];
}

export default function PartnersPage({ onBack, title, partners }: PartnersPageProps) {
  return (
    <div className="pt-6 pb-32 w-full max-w-4xl mx-auto px-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6">
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
          
          <div className="flex items-center gap-2">
            <div className="bg-[#00D166]/10 px-3 py-1 rounded-full border border-[#00D166]/20">
              <span className="text-[#00D166] text-xs font-bold uppercase tracking-wider">{partners.length} Partners</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[#00D166]" fill="currentColor" />
            {title}
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Maximize your earnings with our trusted {title.toLowerCase()}.
          </p>
        </div>

        {/* Search & Filter Mockup */}
        <div className="flex gap-3">
           <div className="flex-1 relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
             <input 
               type="text" 
               placeholder="Search partner..." 
               className="w-full bg-[#181B24] border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00D166]/50 transition-colors"
             />
           </div>
           <button className="bg-[#181B24] border border-white/5 rounded-2xl px-5 flex items-center gap-2 text-white/60 hover:text-white transition-colors">
             <Filter className="w-4 h-4" />
             <span className="font-medium">Sort</span>
           </button>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {partners.map((partner, index) => (
          <motion.div 
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative p-[1px] rounded-[24px] overflow-hidden group/card bg-white/5 hover:bg-gradient-to-br hover:from-[#00D166] hover:to-transparent transition-all duration-500 shadow-lg aspect-[4/5]"
          >
            <div className={`relative ${partner.bg} rounded-[23px] h-full flex flex-col items-center justify-center z-10 transition-all group-hover/card:scale-[0.98] p-6`}>
              <div className="z-10 w-full flex-1 flex items-center justify-center">
                 <img src={partner.logo} alt={partner.name} className="w-full h-auto max-h-[80px] object-contain brightness-110 group-hover/card:scale-110 transition-transform duration-500" />
              </div>
              <div className="mt-4 w-full text-center">
                <h3 className="text-white font-bold tracking-tight text-[15px] group-hover/card:text-[#00D166] transition-colors">{partner.name}</h3>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                  <div className="w-1 h-1 rounded-full bg-[#00D166] animate-pulse" />
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">Active Now</span>
                </div>
              </div>
              
              {/* Hover Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00D166]/10 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#00D166]/5 border border-[#00D166]/10 rounded-[32px] p-8 text-center space-y-4">
        <h3 className="text-white font-bold text-xl">Need more {title.toLowerCase()}?</h3>
        <p className="text-[#94A3B8] max-w-md mx-auto">We're constantly adding new partners. If you have a specific request, let us know in the support chat!</p>
        <button className="bg-[#00D166] text-black font-black px-8 py-3 rounded-2xl hover:scale-105 transition-transform shadow-[0_4px_20px_rgba(0,209,102,0.3)]">
          Suggest a Partner
        </button>
      </div>
    </div>
  );
}
