"use client";

import { useState } from "react";
import AppSplash from "@/components/AppSplash";
import GameGrid from "@/components/GameGrid";
import Footer from "@/components/Footer";

export default function DashboardClient({ games }: { games: any[] }) {
  const [splashComplete, setSplashComplete] = useState(false);

  return (
    <>
      {!splashComplete && <AppSplash onComplete={() => setSplashComplete(true)} />}
      
      <main className={`flex-1 flex flex-col items-center pt-16 transition-opacity duration-1000 ${splashComplete ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-12 px-4">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            إيمحو
          </h1>
          <p className="text-slate-400 text-lg font-medium">اختر نمط اللعب وابدأ المتعة!</p>
        </div>

        <GameGrid games={games} />
      </main>

      {splashComplete && <Footer />}
    </>
  );
}
