'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';

const PartnersSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const content = contentRef.current;
    if (!scrollContainer || !content) return;

    const scrollSpeed = isMobile ? 0.3 : 0.5; // Slower speed on mobile
    let scrollPosition = 0;
    let animationFrameId: number;

    const scroll = () => {
      if (isHovered.current) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      scrollPosition += scrollSpeed;
      
      // Reset position when scrolled through one set of partners
      if (scrollPosition >= content.offsetWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      animationFrameId = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  const partners = [
    'Helius-Horizontal-Logo.png',
    'Dune-Logo-PrimaryLarge.png',
    'Arkham Combination Black.png',
    'stfr-logo.webp'
  ];

  // Duplicate the partners array to create seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="w-full overflow-hidden py-2">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-center text-sm font-medium text-black/60 mb-8">
          Transparency and insights made possible by 
        </h2>
      </div>
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex whitespace-nowrap"
        >
          <div 
            ref={contentRef}
            className={`flex items-center ${isMobile ? 'gap-16' : 'gap-32'}`}
          >
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={`${partner}-${index}`}
                className="flex-shrink-0 relative group"
              >
                <div className="absolute inset-0 group-hover:bg-black/0 transition-colors duration-300 z-10" />
                <Image
                  src={`/partners/${partner}`}
                  alt={partner.replace(/\.(png|webp)$/, '')}
                  width={isMobile ? 80 : 120}
                  height={isMobile ? 30 : 40}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection; 