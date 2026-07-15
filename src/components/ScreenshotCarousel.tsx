import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ScreenshotCarouselProps {
  screenshots: string[];
  appName: string;
}

export const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({
  screenshots,
  appName,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-warm-surface-light/40 dark:bg-warm-surface-dark/40 border border-warm-border-light/20 dark:border-warm-border-dark/20 flex flex-col items-center justify-center text-warm-muted-light dark:text-warm-muted-dark">
        <ImageIcon className="w-12 h-12 mb-2 stroke-[1.5]" />
        <span className="text-sm">No screenshots available for {appName}</span>
      </div>
    );
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  return (
    <div
      className="relative group w-full aspect-video rounded-2xl overflow-hidden bg-black/5 dark:bg-black/20 border border-warm-border-light/20 dark:border-warm-border-dark/20 outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`${appName} screenshot gallery. Use left and right arrow keys to navigate.`}
    >
      {/* Slides */}
      <div className="w-full h-full relative">
        {screenshots.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Standard fallback container and beautiful gradient text overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-warm-accent-light/10 to-indigo-500/10 dark:from-warm-accent-dark/5 dark:to-indigo-500/5 flex items-center justify-center text-warm-muted-light/30 dark:text-warm-muted-dark/20 font-bold select-none text-2xl">
              {appName} Mockup Preview
            </div>
            
            {/* The actual image */}
            <img
              src={src}
              alt={`${appName} screenshot preview ${index + 1}`}
              className="w-full h-full object-cover relative z-10"
              onError={(e) => {
                // Hide broken image placeholder, show standard fallback grid text
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {screenshots.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 dark:bg-slate-900/80 border border-warm-border-light/40 dark:border-warm-border-dark/40 flex items-center justify-center text-warm-text-light dark:text-warm-text-dark hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-200"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 dark:bg-slate-900/80 border border-warm-border-light/40 dark:border-warm-border-dark/40 flex items-center justify-center text-warm-text-light dark:text-warm-text-dark hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-200"
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2 bg-black/20 dark:bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === activeIndex
                    ? 'bg-white dark:bg-warm-accent-dark scale-125'
                    : 'bg-white/40 dark:bg-white/20 hover:bg-white/60'
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
