import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';

interface LogoWallProps {
  currentLang: 'en' | 'ar';
}

export const LogoWall: React.FC<LogoWallProps> = ({ currentLang: initialLang }) => {
  const [lang, setLang] = useState<'en' | 'ar'>(initialLang);

  // Sync language selection
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<'en' | 'ar'>;
      setLang(customEvent.detail);
    };
    window.addEventListener('lang-change', handleLangChange);
    return () => window.removeEventListener('lang-change', handleLangChange);
  }, []);

  const badgeText = lang === 'ar' ? 'العلامات التجارية المعتمدة' : 'Authorized Distributorships';
  const headlineText = lang === 'ar' ? 'نوزع لأكثر من ٥١ علامة تجارية عالمية' : 'Authorized Distributor of 51+ World-Class Brands';

  // List of major premium electrical & mechanical brands
  const brandsRow1 = [
    'SIEMENS', 'SCHNEIDER ELECTRIC', 'ABB', 'LEGRAND', 'PHILIPS LIGHTING', 
    'PRYSMIAN GROUP', 'FURSE', 'OBO BETTERMANN', 'RIYADH CABLES', 'DUCAB', 
    'PANASONIC', 'HONEYWELL'
  ];

  const brandsRow2 = [
    'SAUDI CABLES', '3M ELECTRICAL', 'RAYCHEM', 'RECTORSEAL', 'PEGLER', 
    'VIEGA', 'GRUNDFOS', 'GEBERIT', 'GROHE', 'MK ELECTRIC', 'BICC', 'FEDERAL'
  ];

  return (
    <section className="py-20 bg-canvas border-t border-glass-border select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="caption-mono text-accent-blue mb-3 block">
          {badgeText}
        </span>
        <h2 className="display-sm text-ink max-w-xl mx-auto">
          {headlineText}
        </h2>
      </div>

      {/* Infinite scrolling logo marquee container */}
      <div className="flex flex-col gap-4 w-full relative">
        {/* Soft edge shaders */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-canvas to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-canvas to-transparent z-10 pointer-events-none" />

        {/* Row 1: LTR scrolling */}
        <div className="flex overflow-hidden w-full py-1">
          <div className="animate-marquee gap-4 flex shrink-0">
            {/* First render pass */}
            {brandsRow1.concat(brandsRow1).map((brand, idx) => (
              <div 
                key={`r1-${idx}`} 
                className="px-6 py-3 glass-panel rounded-lg border border-glass-border flex items-center justify-center min-w-[160px] text-xs font-mono font-bold tracking-widest text-mute hover:text-accent-blue hover:border-accent-blue/40 hover:scale-105 transition-all select-none cursor-pointer shadow-sm"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: RTL scrolling (reverse layout animation classes) */}
        <div className="flex overflow-hidden w-full py-1">
          <div className="animate-marquee gap-4 flex shrink-0 [animation-direction:reverse]">
            {/* First render pass */}
            {brandsRow2.concat(brandsRow2).map((brand, idx) => (
              <div 
                key={`r2-${idx}`} 
                className="px-6 py-3 glass-panel rounded-lg border border-glass-border flex items-center justify-center min-w-[160px] text-xs font-mono font-bold tracking-widest text-mute hover:text-accent-cyan hover:border-accent-cyan/40 hover:scale-105 transition-all select-none cursor-pointer shadow-sm"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default LogoWall;
