import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const [progressVal, setProgressVal] = useState(0);

  useEffect(() => {
    const unsubY = scrollY.on('change', (y) => {
      setIsVisible(y > 350);
    });
    const unsubProgress = scrollYProgress.on('change', (p) => {
      setProgressVal(p);
    });

    return () => {
      unsubY();
      unsubProgress();
    };
  }, [scrollY, scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circumference = 2 * Math.PI * 18; // r = 18
  const strokeDashoffset = circumference - progressVal * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#121110]/95 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:border-[#d4af37] hover:text-[#fff2cc] transition-colors group cursor-pointer"
          aria-label="Scroll back to top"
        >
          {/* Circular SVG Scroll Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="transparent"
              stroke="#2e271c"
              strokeWidth="2"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="transparent"
              stroke="#d4af37"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-75"
            />
          </svg>

          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
