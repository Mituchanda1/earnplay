import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqCategories = ['General', 'Earn', 'Withdraw', 'Account', 'Policies'];

const faqs = [
  {
    category: 'General',
    question: 'Are surveys reliable?',
    answer: 'All surveys on EarnPlay are secure. Any information you provide in the surveys is kept anonymous, and the survey providers implement numerous measures to guarantee the safety of the surveys. We do not have access to the details you enter, as only the survey administrators can view and manage this information.'
  },
  {
    category: 'General',
    question: 'What steps do I need to take to begin?',
    answer: 'Simply create an account, verify your email, and head over to the offer wall to start completing tasks!'
  },
  {
    category: 'General',
    question: 'What exactly are coins?',
    answer: 'Coins are our internal currency. 1000 coins equal $1 USD. You can exchange these coins for various rewards like PayPal cash, gift cards, and more.'
  },
  {
    category: 'General',
    question: 'What are the rules for chat?',
    answer: 'Keep the conversation respectful, no spamming, and no sharing of personal information. Our moderators ensure a friendly environment for everyone.'
  },
  {
    category: 'General',
    question: 'What is EarnPlay all about?',
    answer: 'EarnPlay is a platform that rewards users for their time and feedback. We partner with top research companies to bring you high-paying offers.'
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('General');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="faq-section" className="px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#00D166] mb-4">Frequently Asked Questions</h2>
          <p className="text-[#94A3B8]">Have a question? Check out our FAQ section to find answers to the most common questions.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10 pb-2">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-lg font-black transition-all ${
                activeCategory === cat
                  ? 'bg-[#00D166] text-black shadow-[0_0_25px_rgba(0,209,102,0.4)]'
                  : 'bg-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {faqs.filter(f => f.category === activeCategory).map((faq, index) => (
            <div key={index} className="bg-[#1A1D27] rounded-3xl overflow-hidden border border-white/5 shadow-xl">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-8 py-7 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-white font-black text-xl tracking-tight">{faq.question}</span>
                <ChevronDown className={`w-6 h-6 text-[#94A3B8] transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-[#94A3B8] text-lg font-medium leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
