import { Facebook, Twitter, Send, Star, FileText, ShieldCheck, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="main-footer" className="px-4 pt-10 pb-32 bg-[#181B24] border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <h4 className="text-white font-black text-2xl">About</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#94A3B8] hover:text-white flex items-center gap-4 text-base font-medium"><FileText className="w-5 h-5" /> Terms of Service</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-white flex items-center gap-4 text-base font-medium"><ShieldCheck className="w-5 h-5" /> Privacy Policy</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-black text-2xl">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#94A3B8] hover:text-white flex items-center gap-4 text-base font-medium"><Mail className="w-5 h-5" /> Contact Us</a></li>
              <li><a href="#" className="text-[#94A3B8] hover:text-white flex items-center gap-4 text-base font-medium"><MessageCircle className="w-5 h-5" /> FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center space-y-8">
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-white font-black text-xl tracking-tight">Social media</h4>
            <div className="flex gap-5">
              <a href="#" className="w-12 h-12 bg-[#1A1D27] rounded-2xl flex items-center justify-center hover:bg-[#00D166] hover:text-black transition-all group">
                <Facebook className="w-6 h-6 text-[#94A3B8] group-hover:text-black" />
              </a>
              <a href="#" className="w-12 h-12 bg-[#1A1D27] rounded-2xl flex items-center justify-center hover:bg-[#00D166] hover:text-black transition-all group">
                <Send className="w-6 h-6 text-[#94A3B8] group-hover:text-black" />
              </a>
              <a href="#" className="w-12 h-12 bg-[#1A1D27] rounded-2xl flex items-center justify-center hover:bg-[#00D166] hover:text-black transition-all group">
                <Star className="w-6 h-6 text-[#94A3B8] group-hover:text-black" />
              </a>
            </div>
          </div>

          <div className="w-full h-px bg-white/5 my-8" />
          <div id="footer-logo-branding" className="pt-0">
            <div id="footer-logo" className="text-4xl font-black flex items-center justify-center gap-3">
               <div className="w-12 h-12 bg-[#00D166]/10 rounded-[14px] flex items-center justify-center border border-[#00D166]/20 shadow-lg shadow-[#00D166]/5">
                 <span className="text-[#00D166] font-black text-2xl">EP</span>
               </div>
               <span className="text-white tracking-tighter"><span className="text-[#00D166]">Earn</span>Play</span>
            </div>
            
            <p className="text-[#94A3B8] text-lg font-medium mt-4">
              EarnPlay | All rights reserved © 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
