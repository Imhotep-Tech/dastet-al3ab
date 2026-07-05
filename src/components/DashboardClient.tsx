"use client";

import { useState } from "react";
import AppSplash from "@/components/AppSplash";
import GameGrid from "@/components/GameGrid";
import Footer from "@/components/Footer";
import { BookOpen, Trophy, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";

export default function DashboardClient({ games }: { games: any[] }) {
  const [splashComplete, setSplashComplete] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      {!splashComplete && <AppSplash onComplete={() => setSplashComplete(true)} />}
      
      <main className={`flex-1 flex flex-col items-center pt-16 transition-opacity duration-1000 ${splashComplete ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-12 px-4 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full animate-pulse"></div>
            <img src="/dasta.png" alt="Dasta Logo" className="relative w-28 h-28 mb-6 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] animate-in zoom-in duration-1000 animate-pulse" />
          </div>
          <h1 className="text-6xl font-black mb-4 pb-4 leading-normal bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg tracking-wider">
            {t("dashboardTitle")}
          </h1>
          <p className="text-pink-300/80 text-xl font-medium tracking-wide">{t("dashboardSubtitle")}</p>
          <Link href="/creator" className="inline-block mt-10 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black text-lg rounded-full shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_40px_rgba(234,179,8,0.5)] border border-cyan-400/50 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300">
            {t("createGame")}
          </Link>
        </div>

        <GameGrid games={games} />

        {/* Instructions Section */}
        <section className="w-full max-w-5xl mx-auto px-4 py-16">
          <div className="bg-[#0d0d21]/80 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at top right, rgba(236,72,153,0.5) 0%, transparent 60%)' }}></div>
            
            <h2 className="text-3xl font-black text-pink-500 mb-8 flex items-center justify-center gap-3">
              <BookOpen className="w-8 h-8" /> {t("guideTitle")}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-[#02020f]/50 rounded-2xl border border-slate-800/80">
                <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 mb-4 shadow-inner border border-pink-500/20">
                  <span className="text-2xl font-bold">١</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{t("step1Title")}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t("step1Desc")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-[#02020f]/50 rounded-2xl border border-slate-800/80">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 shadow-inner border border-cyan-500/20">
                  <span className="text-2xl font-bold">٢</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{t("step2Title")}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t("step2Desc")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-[#02020f]/50 rounded-2xl border border-slate-800/80">
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-4 shadow-inner border border-yellow-500/20">
                  <span className="text-2xl font-bold">٣</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{t("step3Title")}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t("step3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {splashComplete && <Footer />}
    </>
  );
}
