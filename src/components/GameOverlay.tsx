"use client";

import { Users, User } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface GameOverlayProps {
  title: string;
  themeColor: string;
  logo: string;
  author?: string;
}

export default function GameOverlay({ title, themeColor, logo, author }: GameOverlayProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white animate-in zoom-in-95 fade-in slide-in-from-bottom-10 duration-700 ease-out" style={{ backgroundColor: themeColor }}>
      <div className="absolute inset-0 bg-black/20 pointer-events-none mix-blend-overlay"></div>
      
      <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-8 relative animate-in zoom-in-50 spin-in-12 duration-1000 delay-150">
        {logo.includes('team') ? <Users className="w-16 h-16 relative z-10" /> : <span className="text-6xl relative z-10">{logo.length < 4 ? logo : <User className="w-16 h-16" />}</span>}
        <div className="absolute inset-0 rounded-[2.5rem] border-4 border-white/30 animate-ping opacity-20"></div>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-2xl text-center relative animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300">{title}</h1>
      
      {author && (
        <p className="mt-6 text-white/90 font-medium text-lg drop-shadow-md bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm relative animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
          {t("created_by")} <span className="font-bold text-amber-300">{author}</span>
        </p>
      )}
    </div>
  );
}
