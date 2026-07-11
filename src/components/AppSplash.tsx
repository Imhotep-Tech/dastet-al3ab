"use client";

import { useEffect, useState } from "react";

export default function AppSplash({ onComplete }: { onComplete: () => void }) {
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in text elements shortly after mount
    const entryTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(onComplete, 500); // Wait for fade transition
    }, 2200); 

    return () => {
      clearTimeout(entryTimer);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-500 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div 
        className={`relative flex flex-col items-center transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Large Logo Image */}
        <div className="w-44 h-44 mb-8 relative">
          <img src="/dasta.png" alt="Dastet Al3ab Logo" className="w-full h-full object-contain" />
        </div>

        {/* Brand Name in Franco-Arabic */}
        <h1 className="text-5xl font-black tracking-tight text-white mb-3">
          Dastet Al3ab
        </h1>
        
        {/* Official Slogan */}
        <p className="text-brand-bronze text-xl font-medium tracking-wide">
          ألعابي في جيبي
        </p>
        
        {/* Simple Minimalist Loading Line */}
        <div className="mt-12 w-16 h-0.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-brand-maroon animate-[shimmer_1.5s_infinite_ease-in-out]"></div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
