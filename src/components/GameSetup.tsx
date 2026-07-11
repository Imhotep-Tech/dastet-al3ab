"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Trash2, Shield, Timer } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface GameSetupProps {
  config: any;
  entities: any[];
  setEntities: (entities: any[]) => void;
  customTimer: number;
  setCustomTimer: (seconds: number) => void;
  startGame: () => void;
  minEntities?: number;
  timerLabel?: string;
}

export default function GameSetup({
  config,
  entities,
  setEntities,
  customTimer,
  setCustomTimer,
  startGame,
  minEntities = 2,
  timerLabel
}: GameSetupProps) {
  const { t } = useLanguage();
  const [newEntityName, setNewEntityName] = useState("");

  const addEntity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntityName.trim()) return;
    setEntities([
      ...entities,
      {
        id: `e-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: newEntityName.trim(),
        score: 0,
        isEliminated: false
      }
    ]);
    setNewEntityName("");
  };

  const removeEntity = (id: string) => {
    if (entities.length <= minEntities) return;
    setEntities(entities.filter((e) => e.id !== id));
  };

  const updateEntityName = (id: string, name: string) => {
    setEntities(entities.map((e) => (e.id === id ? { ...e, name } : e)));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 p-4 sm:p-6 justify-center items-center">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-850">
          <h1 className="text-2xl font-black text-slate-100 flex items-center gap-3">
             <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: config.themeColor }}>
               {config.logo || "🎮"}
             </span>
             {config.title}
          </h1>
          <Link href="/play" className="p-2 text-slate-400 hover:text-white transition-all cursor-pointer">
             <ArrowRight className="w-6 h-6 rotate-180" />
          </Link>
        </header>

        {/* Entities Setup */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-bronze" />
            {config.mode === "multi-team" ? "تجهيز الفرق" : "تجهيز اللاعبين"}
          </h2>
          
          <form onSubmit={addEntity} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newEntityName}
              onChange={(e) => setNewEntityName(e.target.value)}
              placeholder={config.mode === "multi-team" ? "اسم الفريق الجديد..." : "اسم اللاعب الجديد..."}
              maxLength={15}
              className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 focus:border-brand-bronze/40 rounded-xl text-slate-200 placeholder-slate-500 font-bold focus:outline-none transition-colors"
            />
            <button type="submit" className="p-3 bg-brand-maroon hover:bg-brand-maroon-hover border border-brand-bronze/20 text-brand-cream rounded-xl transition-all cursor-pointer">
              <Plus className="w-5 h-5" />
            </button>
          </form>

          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
            {entities.map((entity, index) => (
              <div key={entity.id} className="flex items-center gap-2 bg-slate-950/60 border border-slate-850 p-2.5 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-black text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={entity.name}
                  onChange={(e) => updateEntityName(entity.id, e.target.value)}
                  className="flex-1 bg-transparent text-slate-200 font-bold focus:outline-none"
                  maxLength={15}
                />
                {entities.length > minEntities && (
                  <button
                    onClick={() => removeEntity(entity.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Timer Setup */}
        {config.hasTimer && config.isTimerCustomizable && (
          <section className="mb-8 p-4 bg-slate-950/40 border border-slate-850 rounded-2xl">
            <h2 className="text-base font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Timer className="w-5 h-5 text-brand-bronze" />
              {timerLabel || "تعديل العداد (بالثواني)"}
            </h2>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="600"
                step="5"
                value={customTimer}
                onChange={(e) => setCustomTimer(parseInt(e.target.value))}
                className="flex-1 accent-brand-maroon"
              />
              <span className="text-xl font-mono font-black text-slate-200 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl shrink-0">
                {customTimer} ث
              </span>
            </div>
          </section>
        )}

        <button
          onClick={startGame}
          disabled={entities.filter((e) => e.name.trim() !== "").length < minEntities}
          className="w-full py-4.5 bg-brand-maroon hover:bg-brand-maroon-hover border border-brand-bronze/35 text-brand-cream rounded-2xl font-black text-xl shadow-lg active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
        >
          {t("startGame")}
        </button>
      </div>
    </div>
  );
}
