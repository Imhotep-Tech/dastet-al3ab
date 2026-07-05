"use client";

import { useEffect, useState } from "react";
import { Sparkles, Dice5, Layers } from "lucide-react";

export default function AppSplash({ onComplete }: { onComplete: () => void }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(onComplete, 500); // Wait for fade transition
    }, 2200); // Slightly longer to appreciate the bursting deck animation

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02020f] transition-opacity duration-500 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Local keyframes style block for robust visual fanning and glowing effects */}
      <style>{`
        @keyframes deck-burst-left {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; scale: 0.8; }
          20% { opacity: 1; }
          100% { transform: translate(-3.2rem, -0.8rem) rotate(-16deg); opacity: 1; scale: 1; }
        }
        @keyframes deck-burst-middle {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; scale: 0.8; }
          20% { opacity: 1; }
          100% { transform: translate(0, -2rem) rotate(0deg); opacity: 1; scale: 1.05; }
        }
        @keyframes deck-burst-right {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; scale: 0.8; }
          20% { opacity: 1; }
          100% { transform: translate(3.2rem, -0.8rem) rotate(16deg); opacity: 1; scale: 1; }
        }
        @keyframes box-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3), 0 0 35px rgba(6, 182, 212, 0.15); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.7), 0 0 70px rgba(6, 182, 212, 0.35); }
        }
        @keyframes text-neon {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(234, 179, 8, 0.4)) drop-shadow(0 0 15px rgba(236, 72, 153, 0.3)); }
          50% { filter: drop-shadow(0 0 12px rgba(234, 179, 8, 0.8)) drop-shadow(0 0 25px rgba(236, 72, 153, 0.6)); }
        }
        .animate-burst-left {
          animation: deck-burst-left 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.2s;
        }
        .animate-burst-middle {
          animation: deck-burst-middle 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.2s;
        }
        .animate-burst-right {
          animation: deck-burst-right 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.2s;
        }
        .glow-box {
          animation: box-glow 2s infinite ease-in-out;
        }
        .text-glow {
          animation: text-neon 2s infinite ease-in-out;
        }
      `}</style>

      <div className="relative flex flex-col items-center">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-cyan-500/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
        
        {/* Glowing Box / Deck Area */}
        <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
          
          {/* Card Deck Elements Bursting Open */}
          {/* Left Card - Cyan */}
          <div className="absolute w-24 h-36 rounded-2xl border-2 border-cyan-400 bg-[#0d0d21] flex flex-col items-center justify-between p-3 shadow-[0_0_15px_rgba(6,182,212,0.3)] opacity-0 animate-burst-left">
            <span className="text-cyan-400 font-black text-xs self-start">D</span>
            <Dice5 className="w-8 h-8 text-cyan-400" />
            <span className="text-cyan-400 font-black text-xs self-end">D</span>
          </div>

          {/* Right Card - Hot Pink */}
          <div className="absolute w-24 h-36 rounded-2xl border-2 border-pink-400 bg-[#0d0d21] flex flex-col items-center justify-between p-3 shadow-[0_0_15px_rgba(236,72,153,0.3)] opacity-0 animate-burst-right">
            <span className="text-pink-400 font-black text-xs self-start">A</span>
            <Sparkles className="w-8 h-8 text-pink-400" />
            <span className="text-pink-400 font-black text-xs self-end">A</span>
          </div>

          {/* Middle Card - Electric Yellow (Front Card) */}
          <div className="absolute w-24 h-36 rounded-2xl border-2 border-yellow-400 bg-yellow-500 flex flex-col items-center justify-between p-3 shadow-[0_0_20px_rgba(234,179,8,0.4)] opacity-0 animate-burst-middle glow-box">
            <span className="text-slate-950 font-black text-xs self-start">★</span>
            <Layers className="w-10 h-10 text-slate-950" />
            <span className="text-slate-950 font-black text-xs self-end">★</span>
          </div>

        </div>

        {/* Brand Name with Neon Glow */}
        <h1 className="text-5xl font-black tracking-tight text-white mb-2 text-glow bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
          دستة
        </h1>
        <p className="text-cyan-400 font-black tracking-widest text-sm uppercase">
          Dasta Bundle
        </p>
        
        {/* Loading Progress Dots */}
        <div className="mt-12 flex gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-[bounce_0.8s_infinite_0ms]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-[bounce_0.8s_infinite_150ms]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-[bounce_0.8s_infinite_300ms]"></div>
        </div>
      </div>
    </div>
  );
}
