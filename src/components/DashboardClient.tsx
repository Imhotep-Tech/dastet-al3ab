"use client";

import { useState } from "react";
import AppSplash from "@/components/AppSplash";
import GameGrid from "@/components/GameGrid";
import Footer from "@/components/Footer";
import { BookOpen } from "lucide-react";
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
          <div className="relative w-44 h-44 mb-6">
            <img src="/dasta.png" alt="Dastet Al3ab Logo" className="relative w-full h-full object-contain" />
          </div>
          <h1 className="text-6xl font-black mb-4 pb-4 leading-normal text-slate-100 tracking-wider">
            {t("dashboardTitle")}
          </h1>
          <p className="text-brand-bronze text-xl font-medium tracking-wide">{t("dashboardSubtitle")}</p>
          <Link href="/creator" className="inline-block mt-10 px-8 py-4 bg-brand-maroon hover:bg-brand-maroon-hover text-brand-cream border border-brand-bronze/35 font-black text-lg rounded-full shadow-md transition-all duration-300 cursor-pointer">
            {t("createGame")}
          </Link>
        </div>

        <GameGrid games={games} />

        {/* Instructions Section */}
        <section className="w-full max-w-5xl mx-auto px-4 py-16">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <h2 className="text-3xl font-black text-brand-bronze mb-8 flex items-center justify-center gap-3">
              <BookOpen className="w-8 h-8" /> {t("guideTitle")}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-slate-950/40 rounded-2xl border border-slate-800/60">
                <div className="w-16 h-16 rounded-full bg-brand-bronze/10 flex items-center justify-center text-brand-bronze mb-4 border border-brand-bronze/20">
                  <span className="text-2xl font-bold">١</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{t("step1Title")}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t("step1Desc")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-slate-950/40 rounded-2xl border border-slate-800/60">
                <div className="w-16 h-16 rounded-full bg-brand-bronze/10 flex items-center justify-center text-brand-bronze mb-4 border border-brand-bronze/20">
                  <span className="text-2xl font-bold">٢</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{t("step2Title")}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t("step2Desc")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-slate-950/40 rounded-2xl border border-slate-800/60">
                <div className="w-16 h-16 rounded-full bg-brand-bronze/10 flex items-center justify-center text-brand-bronze mb-4 border border-brand-bronze/20">
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
