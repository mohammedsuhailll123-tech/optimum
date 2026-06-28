import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, MapPin, Layers } from 'lucide-react';
import { translations } from '../data/translations';

interface GalleryMasonryProps {
  currentLang: 'en' | 'ar';
}

interface GalleryItem {
  id: number;
  title: { en: string; ar: string };
  location: { en: string; ar: string };
  aspect: string; // Tailwind heights for masonry columns
  color: string;
}

export const GalleryMasonry: React.FC<GalleryMasonryProps> = ({ currentLang: initialLang }) => {
  const [lang, setLang] = useState<'en' | 'ar'>(initialLang);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Sync language selection
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'en' | 'ar'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('lang-change', handleLangChange);
    return () => window.removeEventListener('lang-change', handleLangChange);
  }, []);

  const t = translations[lang].gallery;

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: { en: 'Central Riyadh Logistics Warehouse', ar: 'مستودع الخدمات اللوجستية المركزي بالرياض' },
      location: { en: 'Al-Malaz, Riyadh', ar: 'الملز، الرياض' },
      aspect: 'h-64',
      color: 'from-blue-600/10 to-cyan-500/5'
    },
    {
      id: 2,
      title: { en: 'Cables & Conductors Inspection Desk', ar: 'مكتب فحص الكابلات والموصلات' },
      location: { en: 'Central Depot, Riyadh', ar: 'المستودع الرئيسي، الرياض' },
      aspect: 'h-48',
      color: 'from-purple-600/10 to-pink-500/5'
    },
    {
      id: 3,
      title: { en: 'Lightning Protection Rods Assembly', ar: 'تجميع مانعات الصواعق وحمايتها' },
      location: { en: 'Jeddah Port Depot', ar: 'مستودع ميناء جدة' },
      aspect: 'h-72',
      color: 'from-emerald-600/10 to-teal-500/5'
    },
    {
      id: 4,
      title: { en: 'Custom Panel Board Calibration Line', ar: 'خط معايرة لوحات التوزيع المخصصة' },
      location: { en: 'Factory Precinct, Dammam', ar: 'المنطقة الصناعية، الدمام' },
      aspect: 'h-52',
      color: 'from-indigo-600/10 to-blue-500/5'
    },
    {
      id: 5,
      title: { en: 'Dry-Type Transformers Quality Check', ar: 'فحص جودة المحولات الجافة المعزولة' },
      location: { en: 'Central Depot, Riyadh', ar: 'المستودع الرئيسي، الرياض' },
      aspect: 'h-64',
      color: 'from-amber-600/10 to-orange-500/5'
    },
    {
      id: 6,
      title: { en: 'PPR Fittings & Valves Delivery Sorting', ar: 'فرز تسليم أنابيب وتوصيلات PPR' },
      location: { en: 'Central Warehouse, Riyadh', ar: 'المستودع المركزي، الرياض' },
      aspect: 'h-48',
      color: 'from-teal-600/10 to-cyan-500/5'
    }
  ];

  return (
    <section className="py-24 bg-canvas border-t border-glass-border select-none">
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

        {/* Masonry Layout: Responsive Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 max-w-6xl mx-auto">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedItem(item)}
              className={`relative break-inside-avoid glass-panel rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between ${item.aspect} bg-gradient-to-tr ${item.color} border border-glass-border`}
            >
              {/* Dynamic blueprint grid backdrop inside card */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] z-0" />
              
              {/* Custom SVG design representing logistics/materials */}
              <div className="absolute inset-0 flex items-center justify-center p-6 opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500 z-0">
                <svg className="w-full h-full max-h-24" viewBox="0 0 100 40">
                  <rect x="10" y="5" width="20" height="30" rx="1" stroke="currentColor" className="text-slate-400" strokeWidth="0.5" />
                  <rect x="40" y="10" width="20" height="25" rx="1" stroke="currentColor" className="text-slate-400" strokeWidth="0.5" />
                  <rect x="70" y="15" width="20" height="20" rx="1" stroke="currentColor" className="text-slate-400" strokeWidth="0.5" />
                  <line x1="0" y1="35" x2="100" y2="35" stroke="currentColor" className="text-slate-400" strokeWidth="0.5" />
                  <circle cx="50" cy="20" r="3" fill="var(--accent-cyan)" />
                </svg>
              </div>

              {/* Hover magnifying control */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-ink/75 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Info Overlay */}
              <div className="p-5 relative z-10 mt-auto bg-gradient-to-t from-canvas-soft via-canvas-soft/80 to-transparent pt-12">
                <div className="flex items-center gap-1.5 text-[9px] text-mute mb-1 font-mono uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 text-accent-blue" />
                  <span>{lang === 'ar' ? item.location.ar : item.location.en}</span>
                </div>
                <h4 className="text-xs font-bold text-ink leading-tight group-hover:text-accent-cyan transition-colors">
                  {lang === 'ar' ? item.title.ar : item.title.en}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Lightbox Modal Overlay */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="absolute inset-0 bg-[#070a0e]/80 backdrop-blur-md"
              />

              {/* Lightbox container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-2xl w-full glass-panel p-8 rounded-3xl shadow-2xl z-10 text-ink border-t border-t-accent-cyan/35 flex flex-col items-center"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-glass-border/30 hover:bg-glass-border/60 text-body hover:text-ink transition-colors focus:outline-none z-10"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Big Blueprint Display Area */}
                <div className={`w-full h-80 rounded-2xl bg-gradient-to-tr ${selectedItem.color} border border-glass-border relative overflow-hidden flex items-center justify-center mb-6`}>
                  {/* Dense technical grids */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:10px_10px]" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_40px,transparent_40px),linear-gradient(to_bottom,#ffffff08_40px,transparent_40px)] bg-[size:40px_40px]" />
                  
                  {/* Detailed complex SVG mockups */}
                  <svg className="w-4/5 h-4/5 opacity-40 animate-pulse" viewBox="0 0 100 40">
                    <circle cx="50" cy="20" r="16" stroke="var(--accent-blue)" strokeWidth="0.5" strokeDasharray="3,3" />
                    <circle cx="50" cy="20" r="8" stroke="var(--accent-cyan)" strokeWidth="0.5" />
                    <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" className="text-slate-500" strokeWidth="0.3" />
                    <line x1="50" y1="0" x2="50" y2="40" stroke="currentColor" className="text-slate-500" strokeWidth="0.3" />
                    {/* Matrix nodes */}
                    <circle cx="20" cy="10" r="1.5" fill="var(--accent-blue)" />
                    <circle cx="80" cy="30" r="1.5" fill="var(--accent-blue)" />
                    <circle cx="20" cy="30" r="1.5" fill="var(--accent-cyan)" />
                    <circle cx="80" cy="10" r="1.5" fill="var(--accent-cyan)" />
                  </svg>
                  
                  {/* Metadata Tag */}
                  <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-md bg-ink text-white text-[9px] font-mono uppercase tracking-widest border border-glass-border">
                    ID-00{selectedItem.id} // SECURE LOGISTICS SYS
                  </span>
                </div>

                {/* Details Footer */}
                <div className="w-full text-center sm:text-left rtl:sm:text-right">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[10px] text-mute mb-1 font-mono uppercase tracking-widest">
                    <MapPin className="w-4 h-4 text-accent-blue" />
                    <span>{lang === 'ar' ? selectedItem.location.ar : selectedItem.location.en}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-ink mb-2">
                    {lang === 'ar' ? selectedItem.title.ar : selectedItem.title.en}
                  </h3>
                  <p className="text-xs text-body leading-relaxed max-w-xl">
                    {lang === 'ar'
                      ? 'هذه اللقطة توثق عمليات فحص السلامة وتجهيز الشحنات الهندسية في الوقت الفعلي لدعم مشاريع البنية التحتية والمباني السكنية الكبرى بالمملكة العربية السعودية وفق مواصفات SASO.'
                      : 'This technical capture documents real-time engineering inspection, sorting, and logistics dispatch protocols, supporting premium corporate infrastructure installations across the Kingdom under SASO rules.'}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
export default GalleryMasonry;
