import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
          const currentProgress = (window.scrollY / totalScroll) * 100;
          setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
        }
        setShowScrollTop(window.scrollY > 400);
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Pinned Top Progress Line */}
      <div 
        id="scroll-progress-bar-container"
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent"
        aria-hidden="true"
      >
        <div
          id="scroll-progress-bar"
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 dark:from-blue-500 dark:via-indigo-400 dark:to-emerald-400 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-2.5 rounded-full bg-zinc-900/90 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-zinc-700/60 dark:border-zinc-300/80 backdrop-blur-md cursor-pointer flex items-center justify-center group"
          title="Scroll back to top"
          aria-label="Scroll back to top of page"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}
    </>
  );
};
