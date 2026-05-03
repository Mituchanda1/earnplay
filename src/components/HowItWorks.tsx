import { ShieldCheck, ClipboardList, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    icon: ShieldCheck,
    title: 'Create Account',
    description: 'Sign up for free and become a part of our growing community. Start earning rewards right away!'
  },
  {
    icon: ClipboardList,
    title: 'Complete Offers',
    description: 'Choose from a wide variety of offers—play games, take surveys, or explore apps to start earning.'
  },
  {
    icon: Wallet,
    title: 'Earn Coins',
    description: 'Collect coins for every task you complete 1000 coins = $1 USD. Track your progress easily in your dashboard.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-16 bg-black/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to earn? <span className="text-[#00D166]">Here's how!</span>
          </h2>
          <p className="text-[#94A3B8] max-w-sm mx-auto">
            Earning on EarnPlay is a total blast watch your profits skyrocket to new heights!
          </p>
        </div>

        <div className="grid gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#191C24] rounded-[40px] p-12 border border-white/5 flex flex-col items-center text-center gap-8 min-h-[400px] justify-center"
            >
              <div className="w-32 h-32 bg-[#00D166]/10 rounded-[32px] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[#00D166]/5 rounded-[32px] blur-xl" />
                <step.icon className="w-16 h-16 text-[#00D166] relative z-10" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-4">{step.title}</h3>
                <p className="text-[#94A3B8] text-lg leading-relaxed max-w-xs">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
