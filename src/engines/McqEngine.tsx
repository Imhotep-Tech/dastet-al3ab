"use client";

import { useState } from "react";
import Timer from "@/components/Timer";
import { GameProps } from "@/utils/gameUtils";
import { useGameEngine } from "@/hooks/useGameEngine";
import BaseEngineLayout from "@/components/BaseEngineLayout";

export default function McqEngine({ config }: GameProps) {
  const engineState = useGameEngine(config);
  const [showAnswer, setShowAnswer] = useState(false);
  const [prevCardIndex, setPrevCardIndex] = useState(0);

  const {
    entities,
    deck,
    currentCardIndex,
    activeEntity,
    customTimer,
    turnStrategy,
    handleScore,
    handleOpenScore,
    skipCard,
    passTurn,
    eliminateActive
  } = engineState;

  if (currentCardIndex !== prevCardIndex) {
    setPrevCardIndex(currentCardIndex);
    setShowAnswer(false);
  }

  return (
    <BaseEngineLayout config={config} engineState={engineState}>
      <div className="text-center">
        {turnStrategy === "open" ? (
          <h2 className="text-3xl font-black text-white mb-2" style={{ color: config.themeColor }}>
            سؤال مفتوح للجميع
          </h2>
        ) : (
          <>
            <span className="text-slate-500 font-medium text-sm mb-2 block uppercase tracking-widest">الدور على</span>
            <h2 className="text-4xl font-black text-white" style={{ color: config.themeColor }}>
              {activeEntity?.name}
            </h2>
          </>
        )}
      </div>

      <div 
        className="w-full bg-slate-900 border border-slate-800 rounded-[3rem] p-10 min-h-[300px] flex items-center justify-center text-center shadow-md relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-105 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-105 transition-transform duration-700"></div>
        {showAnswer ? (
          <div className="z-10 flex flex-col gap-6 w-full">
             <p className="text-xl font-medium text-slate-400 opacity-80">{deck[currentCardIndex]?.question}</p>
             <p className="text-4xl md:text-5xl font-black text-brand-bronze leading-tight">{deck[currentCardIndex]?.answer}</p>
          </div>
        ) : (
          <div className="z-10 flex flex-col items-center gap-8 w-full">
             <p className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {typeof deck[currentCardIndex] === 'string' ? deck[currentCardIndex] : (deck[currentCardIndex]?.question || '')}
             </p>
             {deck[currentCardIndex]?.options && Array.isArray(deck[currentCardIndex]?.options) && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
                 {deck[currentCardIndex].options.map((opt: string, i: number) => (
                   <div key={i} className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-5 text-xl md:text-2xl font-bold text-slate-200 shadow-sm text-center flex items-center justify-center">
                     {opt}
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}
      </div>
      
      {!showAnswer && (
         <button onClick={() => setShowAnswer(true)} className="w-full max-w-sm py-4 rounded-xl bg-brand-maroon hover:bg-brand-maroon-hover text-brand-cream border border-brand-bronze/20 font-bold text-xl shadow-md active:translate-y-0.5 transition-all cursor-pointer">
           إظهار الإجابة
         </button>
      )}

      {config.hasTimer && (
        <Timer defaultSeconds={customTimer} themeColor={config.themeColor} />
      )}

      {turnStrategy === "open" ? (
        <div className="w-full flex flex-col gap-4 mt-auto md:mt-0">
          <p className="text-slate-400 text-sm font-medium text-center">اختر من أجاب بشكل صحيح:</p>
          <div className="grid grid-cols-2 gap-3">
            {entities.map((ent, idx) => !ent.isEliminated && (
              <button
                key={ent.id}
                onClick={() => handleOpenScore(idx)}
                className="py-4 rounded-xl bg-brand-maroon hover:bg-brand-maroon-hover text-brand-cream border border-brand-bronze/20 font-bold text-lg shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                {ent.name} (+1)
              </button>
            ))}
          </div>
          <button
            onClick={skipCard}
            className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-lg active:scale-95 transition-all cursor-pointer"
          >
            لا أحد (تخطي السؤال)
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3 mt-auto md:mt-0">
          <div className="w-full flex gap-4">
            <button onClick={() => handleScore(0)} className="flex-1 py-5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-bold text-2xl active:translate-y-0.5 transition-all cursor-pointer">
              غلط / 0
            </button>
            <button onClick={() => handleScore(1)} className="flex-1 py-5 rounded-2xl bg-brand-maroon hover:bg-brand-maroon-hover text-brand-cream border border-brand-bronze/20 font-bold text-2xl active:translate-y-0.5 transition-all shadow-md cursor-pointer">
              كسب / +1
            </button>
          </div>
          
          {config.allowPass && (
            <button onClick={passTurn} className="w-full py-4 rounded-2xl bg-slate-800 border border-slate-750 hover:bg-slate-750 text-slate-300 font-bold text-lg active:scale-95 transition-all mt-2 cursor-pointer">
              مرر السؤال للي بعده ➡️
            </button>
          )}
        </div>
      )}

      {config.allowElimination && turnStrategy !== "open" && (
        <button onClick={eliminateActive} className="w-full py-4 rounded-2xl bg-slate-900 text-red-500 hover:bg-red-650 hover:text-white font-bold text-lg border border-red-500/30 hover:border-red-500 transition-all active:scale-95 mt-2 cursor-pointer">
          خروج من اللعبة (إقصاء)
        </button>
      )}
    </BaseEngineLayout>
  );
}
