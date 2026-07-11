"use client";

import Link from "next/link";
import { Users, User, UsersRound, Bomb } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function GameGrid({ games }: { games: any[] }) {
  const { t } = useLanguage();

  const renderLogo = (logo: string) => {
    // Check if the logo is a known string, else treat it as an emoji or short string.
    switch (logo) {
      case "individual": return <User className="w-8 h-8" />;
      case "two-team": return <Users className="w-8 h-8" />;
      case "multi-team": return <UsersRound className="w-8 h-8" />;
      case "bomb": return <Bomb className="w-8 h-8" />;
      default: return <span className="text-3xl">{logo || "𓋹"}</span>;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-4 pb-16">
      {games.map((game, index) => (
        <Link
          key={game.id}
          href={`/${game.id}`}
          className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand-bronze/30 shadow-md animate-in fade-in slide-in-from-bottom-8 cursor-pointer"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Subtle geometric background pattern inside card */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(196,139,108,0.03) 0%, transparent 60%)' }}></div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-brand-maroon"
          />
          <div 
            className="relative w-20 h-20 rounded-full flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundColor: game.themeColor }}
          >
            <div className="absolute inset-0 border-[3px] border-slate-700/30 rounded-full scale-110"></div>
            {renderLogo(game.logo)}
          </div>
          <h2 className="text-2xl font-black text-slate-100 mt-2 tracking-wide group-hover:text-brand-bronze transition-colors">{game.title}</h2>
          <div className="flex gap-3 text-xs font-bold">
            <span className="px-4 py-1.5 rounded-full border border-slate-800 bg-slate-950/50 text-slate-350">
              {game.hasTimer ? `⏳ ${t("timer")}` : `✨ ${t("noTimer")}`}
            </span>
            <span className="px-4 py-1.5 rounded-full border border-slate-800 bg-slate-950/50 text-slate-350">
              {game.allowElimination ? `⚔️ ${t("elimination")}` : `🛡️ ${t("protection")}`}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
