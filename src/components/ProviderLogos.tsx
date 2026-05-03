export default function ProviderLogos() {
  return (
    <section id="providers-section" className="px-4 py-16 text-center">
      <h2 className="text-[40px] font-black text-[#00D166] mb-3 tracking-tighter">Providers</h2>
      <p className="text-[#94A3B8] mb-12 text-lg font-medium">We work with the best providers to ensure you have the best experience</p>
      
      <div className="max-w-4xl mx-auto bg-[#1A1D27] rounded-[48px] p-16 border border-white/5 flex flex-col items-center gap-12 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[#00D166]/[0.02] group-hover:bg-[#00D166]/[0.05] transition-colors" />
        
        <div className="grid grid-cols-2 gap-16 items-center justify-items-center relative z-10 w-full">
          <div className="text-4xl font-black text-[#94A3B8] tracking-tighter flex items-center gap-1">
            <span className="text-[#00D166] font-black">:</span> GemiAd
          </div>
          <div className="text-4xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-xl text-white">P</div>
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Pixy Labs</span>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 w-full relative z-10">
          <div className="text-3xl font-black text-[#94A3B8]/60 uppercase tracking-[0.2em] flex items-center justify-center gap-3">
             <div className="w-8 h-8 rounded-full border-2 border-white/10" />
             CPX RESEARCH
          </div>
        </div>
      </div>
    </section>
  );
}
