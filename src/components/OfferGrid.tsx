import { motion } from 'motion/react';

interface Offer {
  id: string;
  title: string;
  amount: string;
  image: string;
  status: string;
}

const offers: Offer[] = [
  {
    id: '1',
    title: 'Bingo Journey',
    amount: '$78.97',
    image: 'https://i.ibb.co/RGTGhcwR/1.webp',
    status: 'Complete...'
  },
  {
    id: '2',
    title: 'Blast Friends',
    amount: '$4.05',
    image: 'https://i.ibb.co/VYSZhWGv/2.png',
    status: 'Complete...'
  },
  {
    id: '3',
    title: 'Zen Life: Tile Match',
    amount: '$3.91',
    image: 'https://i.ibb.co/kg1Cc2L1/3.webp',
    status: 'Complete...'
  },
  {
    id: '4',
    title: 'Epic Games',
    amount: '$16.50',
    image: 'https://i.ibb.co/1fKybvc1/games.avif',
    status: 'Complete...'
  }
];

export default function OfferGrid() {
  return (
    <section id="offers-section" className="px-4 pb-12 overflow-x-auto no-scrollbar">
      <div className="flex gap-4 min-w-max md:min-w-0 md:grid md:grid-cols-4 md:max-w-[70rem] md:mx-auto">
        {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              id={`offer-card-${offer.id}`}
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-44 md:w-full bg-[#1A1D27] rounded-[32px] p-5 border border-white/5 flex flex-col items-center text-center group cursor-pointer shadow-lg hover:shadow-[#00D166]/10"
            >
              <div className="relative w-full aspect-square mb-5 rounded-2xl overflow-hidden shadow-2xl">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-white font-black text-base mb-1 truncate w-full tracking-tight">{offer.title}</h3>
              <p className="text-[#94A3B8] text-xs font-medium mb-4">{offer.status}</p>
              <div className="text-2xl font-black text-white tracking-tighter">{offer.amount}</div>
            </motion.div>
        ))}
      </div>
    </section>
  );
}
