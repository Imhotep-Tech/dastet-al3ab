"use client";

import { useState } from "react";
import Timer from "@/components/Timer";
import { GameProps } from "@/utils/gameUtils";
import { useGameEngine } from "@/hooks/useGameEngine";
import BaseEngineLayout from "@/components/BaseEngineLayout";

const normalizeText = (text: string) => {
  if (!text) return "";
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
};

const isCorrectOption = (option: string, answer: string) => {
  if (!option || !answer) return false;
  const normOpt = normalizeText(option);
  const normAns = normalizeText(answer);
  if (normOpt === normAns) return true;

  // Remove leading option identifiers like "A) ", "1. ", "B- "
  const strippedOpt = normOpt.replace(/^[a-d1-4][\.\)-]\s*/i, '');
  const strippedAns = normAns.replace(/^[a-d1-4][\.\)-]\s*/i, '');
  return strippedOpt === strippedAns || normOpt.includes(normAns) || normAns.includes(normOpt);
};

export default function McqEngine({ config }: GameProps) {
  const engineState = useGameEngine(config);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
    setSelectedOption(null);
  }

  const currentCard = deck[currentCardIndex];
  const cardQuestion = typeof currentCard === 'string' ? currentCard : (currentCard?.question || '');
  const cardAnswer = typeof currentCard === 'object' ? (currentCard?.answer || '') : '';
  const cardOptions: string[] | null = (typeof currentCard === 'object' && Array.isArray(currentCard?.options) && currentCard.options.length > 0)
    ? currentCard.options
    : null;

  const isRevealed = showAnswer || selectedOption !== null;

  const handleSelectOption = (opt: string) => {
    if (isRevealed) return;
    setSelectedOption(opt);
    setShowAnswer(true);
  };

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
        className="w-full bg-slate-900 border border-slate-800 rounded-[3rem] p-6 md:p-10 min-h-[300px] flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-105 transition-transform duration-700 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-105 transition-transform duration-700 pointer-events-none"></div>

        <div className="z-10 flex flex-col items-center gap-6 w-full">
          <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
            {cardQuestion}
          </p>

          {cardOptions ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
              {cardOptions.map((opt: string, i: number) => {
                const isCorrect = isCorrectOption(opt, cardAnswer);
                const isSelected = selectedOption === opt;

                let optionClasses = "bg-slate-800/80 border-slate-700/50 text-slate-200 hover:bg-slate-750 hover:border-slate-500 cursor-pointer hover:scale-[1.01] active:scale-[0.99]";
                let statusIcon = null;

                if (isRevealed) {
                  if (isCorrect) {
                    optionClasses = "bg-emerald-950/80 border-2 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-950/50 ring-2 ring-emerald-500/30 scale-[1.01]";
                    statusIcon = (
                      <span className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm shrink-0 shadow-md">
                        ✓
                      </span>
                    );
                  } else if (isSelected) {
                    optionClasses = "bg-rose-950/80 border-2 border-rose-500 text-rose-100 shadow-lg shadow-rose-950/50 ring-2 ring-rose-500/30";
                    statusIcon = (
                      <span className="w-7 h-7 rounded-full bg-rose-500 text-white font-black flex items-center justify-center text-sm shrink-0 shadow-md">
                        ✕
                      </span>
                    );
                  } else {
                    optionClasses = "bg-slate-900/40 border-slate-800 text-slate-500 opacity-40";
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={isRevealed}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-5 rounded-2xl border text-xl md:text-2xl font-bold shadow-sm transition-all duration-300 flex items-center justify-between gap-3 text-right ${optionClasses}`}
                  >
                    <span className="flex-1 text-center">{opt}</span>
                    {statusIcon}
                  </button>
                );
              })}
            </div>
          ) : (
            showAnswer && (
              <p className="text-3xl md:text-4xl font-black text-brand-bronze leading-tight mt-4">
                {cardAnswer}
              </p>
            )
          )}

          {isRevealed && cardOptions && (
            <div className="mt-2 w-full py-3 px-5 rounded-2xl font-bold text-lg md:text-xl flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300">
              {selectedOption !== null ? (
                isCorrectOption(selectedOption, cardAnswer) ? (
                  <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-6 py-2 rounded-xl">
                    ✨ إجابة صحيحة!
                  </span>
                ) : (
                  <span className="text-rose-400 bg-rose-950/60 border border-rose-500/40 px-6 py-2 rounded-xl">
                    ❌ إجابة خاطئة!
                  </span>
                )
              ) : (
                <span className="text-brand-bronze bg-slate-800/80 border border-brand-bronze/30 px-6 py-2 rounded-xl">
                  💡 الإجابة الصحيحة: {cardAnswer}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {!isRevealed && (
        <button 
          onClick={() => setShowAnswer(true)} 
          className="w-full max-w-sm py-4 rounded-xl bg-brand-maroon hover:bg-brand-maroon-hover text-brand-cream border border-brand-bronze/20 font-bold text-xl shadow-md active:translate-y-0.5 transition-all cursor-pointer"
        >
          كشف الإجابة
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

