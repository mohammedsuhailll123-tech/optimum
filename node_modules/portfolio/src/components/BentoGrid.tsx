import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Star, Warehouse, Truck, Headset, Landmark, Zap } from 'lucide-react';
import { translations } from '../data/translations';

interface BentoGridProps {
  currentLang: 'en' | 'ar';
}

export const BentoGrid: React.FC<BentoGridProps> = ({ currentLang: initialLang }) => {
  const [lang, setLang] = useState<'en' | 'ar'>(initialLang);

  // Synchronize language state
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'en' | 'ar'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('lang-change', handleLangChange);
    return () => window.removeEventListener('lang-change', handleLangChange);
  }, []);

  const t = translations[lang].whyUs;

  // Mouse move handler for card radial glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Map of icons
  const icons = [
    <ShieldCheck className="w-6 h-6 text-accent-blue" />,
    <UserCheck className="w-6 h-6 text-accent-cyan" />,
    <Star className="w-6 h-6 text-amber-500" />,
    <Warehouse className="w-6 h-6 text-purple-500" />,
    <Truck className="w-6 h-6 text-emerald-500" />,
    <Headset className="w-6 h-6 text-pink-500" />,
    <Landmark className="w-6 h-6 text-accent-cyan" />
  ];

  // Specific grid layouts for Bento items (desktop scale)
  const gridClasses = [
    'md:col-span-1 md:row-span-1', // Auth Dist (1x1)
    'md:col-span-2 md:row-span-1', // Engineers (2x1)
    'md:col-span-1 md:row-span-1', // Premium Prod (1x1)
    'md:col-span-2 md:row-span-2', // Large Inventory (2x2)
    'md:col-span-1 md:row-span-1', // Fast Delivery (1x1)
    'md:col-span-1 md:row-span-1', // Tech Support (1x1)
    'md:col-span-2 md:row-span-1 bg-gradient-to-r from-accent-blue/10 via-accent-cyan/10 to-transparent border-accent-cyan/20' // Vision 2030 (2x1)
  ];

  return (
    <section id="why-us" className="py-24 bg-canvas-soft border-t border-glass-border select-none">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="caption-mono text-accent-blue mb-3 block">
            {t.badge}
          </span>
          <h2 className="display-lg text-ink">
            {t.headline}
          </h2>
        </div>

        {/* Responsive Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px]">
          {t.list.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              onMouseMove={handleMouseMove}
              className={`glow-card p-6 glass-panel rounded-2xl flex flex-col justify-between group cursor-default ${gridClasses[idx]}`}
            >
              {/* Card top layer */}
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-lg bg-glass-border/40 flex items-center justify-center border border-glass-border shadow-sm group-hover:scale-105 transition-transform">
                  {icons[idx]}
                </div>
                {/* Micro tech indicator label */}
                <span className="text-[10px] font-mono text-mute select-none uppercase tracking-widest">
                  SYS-0{idx + 1}
                </span>
              </div>

              {/* Card details */}
              <div className="mt-4">
                <h3 className="text-sm font-bold text-ink mb-1 group-hover:text-accent-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-body leading-relaxed max-w-md line-clamp-3">
                  {item.desc}
                </p>
              </div>

              {/* Glowing energy line flow inside bottom border on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden rounded-b-2xl">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-accent-cyan to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BentoGrid;
