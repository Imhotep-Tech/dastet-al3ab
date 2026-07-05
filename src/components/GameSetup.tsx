"use client";

import Link from "next/link";
import { ArrowRight, Play, UserMinus, UserPlus, Users, Clock, Info } from "lucide-react";
import { Entity, GameConfig } from "@/utils/gameUtils";
import { useLanguage } from "@/i18n/LanguageContext";

interface GameSetupProps {
  config: GameConfig;
  entities: Entity[];
  setEntities: (entities: Entity[]) => void;
  customTimer: number;
  setCustomTimer: (timer: number) => void;
  startGame: () => void;
  minEntities?: number;
  timerLabel?: string;
}

export default function GameSetup({ config, entities, setEntities, customTimer, setCustomTimer, startGame, minEntities = 2, timerLabel = "زمن العداد (بالثواني)" }: GameSetupProps) {
  const { t } = useLanguage();
  const isStartDisabled = entities.filter(e => e.name.trim() !== "").length < minEntities;

  return (
    <div className="flex flex-col min-h-screen bg-[#02020f] p-4 pt-12 md:pt-20">
      <div className="max-w-lg w-full mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-black text-white">{config.title}</h1>
            {config.author && (
              <p className="text-slate-400 text-sm font-medium">{t("developedBy")}: <span className="text-slate-300 font-bold">{config.author}</span></p>
            )}
          </div>
          <Link href="/play" className="flex items-center gap-2 px-5 py-2.5 bg-[#0d0d21] hover:bg-[#141432] text-slate-300 font-bold rounded-full transition-all border border-slate-800 hover:border-pink-500/50 shadow-sm">
            <ArrowRight className="w-4 h-4 rtl:rotate-180" /> {t("back")}
          </Link>
        </div>

        <div className="bg-[#0d0d21]/85 backdrop-blur-xl border border-slate-900 rounded-[2.5rem] p-8 shadow-2xl">
          {config.instructions && (
            <div className="mb-8 bg-pink-950/15 border border-pink-500/20 rounded-2xl p-6 shadow-inner animate-pulse-slow">
              <h3 className="text-pink-400 font-bold mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" /> {t("howToPlay")}
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-line">
                {config.instructions}
              </p>
            </div>
          )}

          <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-100">
            <Users className="w-6 h-6 text-cyan-400" />
            {t("enterNames")}
          </h2>
          
          <div className="space-y-4">
            {entities.map((ent, idx) => (
              <div key={ent.id} className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-slate-500 font-bold shrink-0 border border-slate-900">{idx + 1}</span>
                <input
                  type="text"
                  value={ent.name}
                  onChange={(e) => {
                    const newEnts = [...entities];
                    newEnts[idx].name = e.target.value;
                    setEntities(newEnts);
                  }}
                  className="flex-1 bg-slate-950 border border-slate-900 rounded-2xl px-5 py-4 text-white font-medium focus:outline-none focus:border-pink-500 transition-all focus:ring-1 focus:ring-pink-500/50"
                  placeholder={`${t("playerName")} ${idx + 1}`}
                />
                {config.mode !== 'two-team' && entities.length > 2 && (
                  <button onClick={() => setEntities(entities.filter((_, i) => i !== idx))} className="p-4 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all shrink-0 active:scale-95"><UserMinus className="w-6 h-6" /></button>
                )}
              </div>
            ))}
          </div>

          {config.mode !== 'two-team' && (
            <button onClick={() => setEntities([...entities, { id: Date.now().toString(), name: "", score: 0, isEliminated: false }])} className="mt-6 w-full py-4 rounded-2xl border-2 border-dashed border-slate-800 text-slate-400 hover:text-white hover:border-pink-500/50 hover:bg-slate-950/50 transition-all flex items-center justify-center gap-3 font-medium active:scale-95">
              <UserPlus className="w-6 h-6" /> {t("addPlayer")}
            </button>
          )}

          {config.hasTimer && config.isTimerCustomizable && (
            <div className="mt-8 flex flex-col gap-3">
              <label className="text-slate-400 text-sm font-medium flex items-center gap-2"><Clock className="w-4 h-4" /> {timerLabel}</label>
              <input 
                type="number" 
                value={customTimer} 
                onChange={(e) => setCustomTimer(Number(e.target.value))} 
                className="w-full bg-slate-950 border border-slate-900 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-pink-500 transition-all focus:ring-1 focus:ring-pink-500/50"
              />
            </div>
          )}

          <button 
            onClick={startGame} 
            disabled={isStartDisabled}
            className="mt-10 w-full py-5 rounded-[1.5rem] text-slate-950 font-black text-xl shadow-2xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale cursor-pointer" 
            style={{ backgroundColor: '#eab308', boxShadow: `0 10px 25px -5px rgba(234,179,8,0.4)` }}
          >
            {t("startReady")}
          </button>
        </div>
      </div>
    </div>
  );
}
