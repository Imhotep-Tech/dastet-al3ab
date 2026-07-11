import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import InstructionsModal from "@/components/InstructionsModal";
import GameOverlay from "@/components/GameOverlay";
import GameSetup from "@/components/GameSetup";
import GameOver from "@/components/GameOver";
import { Entity, GameConfig } from "@/utils/gameUtils";
import { useGameEngine } from "@/hooks/useGameEngine";

interface BaseEngineLayoutProps {
  config: GameConfig;
  engineState: ReturnType<typeof useGameEngine>;
  children: ReactNode;
}

export default function BaseEngineLayout({ config, engineState, children }: BaseEngineLayoutProps) {
  const {
    showOverlay,
    setupPhase,
    entities,
    setEntities,
    customTimer,
    setCustomTimer,
    startGame,
    restartGame,
    activeEntityIndex,
    turnStrategy,
    showInstructions,
    setShowInstructions,
    isGameOver,
    finishGame
  } = engineState;

  if (showOverlay) {
    return <GameOverlay title={config.title} themeColor={config.themeColor} logo={config.logo} author={config.author} />;
  }

  if (setupPhase) {
    return (
      <GameSetup 
        config={config} 
        entities={entities} 
        setEntities={setEntities} 
        customTimer={customTimer} 
        setCustomTimer={setCustomTimer} 
        startGame={startGame} 
      />
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-950 overflow-hidden">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900">
        <button onClick={() => setShowInstructions(true)} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 rounded-full text-slate-300 hover:text-white hover:border-slate-700 transition-all font-medium text-sm border border-slate-800 active:scale-95 cursor-pointer">
          <Info className="w-4 h-4" /> تعليمات اللعبة
        </button>

        <div className="flex items-center gap-2">
          {!isGameOver && (
            <button
              onClick={finishGame}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-maroon hover:bg-brand-maroon-hover text-brand-cream border border-brand-bronze/20 rounded-full font-bold text-sm active:scale-95 transition-all cursor-pointer"
            >
              إنهاء اللعبة
            </button>
          )}

          <Link href="/play" className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 rounded-full text-slate-300 hover:text-white hover:border-slate-700 transition-all font-medium text-sm border border-slate-800 active:scale-95 cursor-pointer">
            رجوع <ArrowRight className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </header>

      <div className="w-full overflow-x-auto pb-6 pt-8 px-4 scrollbar-hide">
        <div className="flex gap-4 w-max mx-auto">
          {entities.map((ent: Entity, idx: number) => (
            <div 
              key={ent.id}
              className={`flex flex-col items-center justify-center px-8 py-4 rounded-3xl border-2 transition-all duration-300 min-w-[140px] ${
                ent.isEliminated 
                  ? 'border-slate-950 bg-slate-950/20 opacity-40 grayscale' 
                  : (idx === activeEntityIndex && turnStrategy === "sequential")
                    ? 'border-current shadow-md scale-105 z-10 bg-slate-900' 
                    : 'border-slate-950 bg-slate-900 scale-95 opacity-80'
              }`}
              style={{ borderColor: (idx === activeEntityIndex && turnStrategy === "sequential" && !ent.isEliminated) ? config.themeColor : undefined }}
            >
              <span className="text-sm font-bold text-slate-400 truncate max-w-[110px] mb-2">{ent.name}</span>
              <span className="text-3xl font-black text-white">{ent.score}</span>
              {ent.isEliminated && <span className="text-xs text-red-400 font-bold mt-2 bg-red-400/10 px-3 py-1 rounded-full">مقصى</span>}
            </div>
          ))}
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-6 pb-12 w-full max-w-md mx-auto">
        {!isGameOver ? children : <GameOver entities={entities} themeColor={config.themeColor} restartGame={restartGame} />}
      </main>

      <InstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)} instructions={config.instructions} themeColor={config.themeColor} />
    </div>
  );
}
