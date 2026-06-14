import { RotateCcw } from "lucide-react";
import { Entity } from "@/utils/gameUtils";

interface GameOverProps {
  entities: Entity[];
  themeColor: string;
  restartGame: () => void;
  winnerOnly?: boolean;
}

export default function GameOver({ entities, themeColor, restartGame, winnerOnly }: GameOverProps) {
  const winner = entities.find(e => !e.isEliminated);

  return (
    <div className="text-center w-full bg-slate-900 p-10 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-2" style={{ backgroundColor: themeColor }}></div>
      <h2 className="text-5xl font-black text-white mb-8 mt-4">النهاية!</h2>
      
      {winnerOnly ? (
        <>
          <p className="text-slate-400 text-xl mb-6">الفائز والناجي هو:</p>
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 mb-10 shadow-inner">
            <h3 className="text-4xl font-black text-emerald-400 flex items-center justify-center gap-4">
              <span className="text-4xl animate-bounce">🏆</span> {winner?.name}
            </h3>
          </div>
        </>
      ) : (
        <div className="space-y-4 mb-10">
          {[...entities].sort((a,b) => b.score - a.score).map((ent, idx) => (
            <div key={ent.id} className={`flex items-center justify-between p-5 rounded-2xl border ${idx === 0 ? 'bg-indigo-500 border-indigo-400 text-white shadow-xl shadow-indigo-500/20 scale-105' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>
              <span className="font-bold flex items-center gap-3 text-lg">
                {idx === 0 && <span className="text-2xl animate-bounce">🏆</span>} {ent.name}
              </span>
              <span className="text-2xl font-black">{ent.score} <span className="text-sm font-medium opacity-80">نقطة</span></span>
            </div>
          ))}
        </div>
      )}

      <button onClick={restartGame} className="w-full py-5 rounded-2xl font-bold text-xl text-white flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95 hover:brightness-110" style={{ backgroundColor: themeColor }}>
        <RotateCcw className="w-6 h-6" /> لعب مرة أخرى
      </button>
    </div>
  );
}
