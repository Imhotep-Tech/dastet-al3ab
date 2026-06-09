import Link from "next/link";
import { Users, User, UsersRound, Bomb } from "lucide-react";

export default function GameGrid({ games }: { games: any[] }) {
  const getIcon = (logo: string) => {
    switch (logo) {
      case "individual": return <User className="w-8 h-8" />;
      case "two-team": return <Users className="w-8 h-8" />;
      case "multi-team": return <UsersRound className="w-8 h-8" />;
      case "bomb": return <Bomb className="w-8 h-8" />;
      default: return <User className="w-8 h-8" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mx-auto px-4 pb-12">
      {games.map((game) => (
        <Link
          key={game.id}
          href={`/${game.id}`}
          className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95"
          style={{ boxShadow: `0 4px 20px -5px ${game.themeColor}20` }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
            style={{ backgroundColor: game.themeColor }}
          />
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:-translate-y-1"
            style={{ backgroundColor: game.themeColor, boxShadow: `0 8px 24px -8px ${game.themeColor}` }}
          >
            {getIcon(game.logo)}
          </div>
          <h2 className="text-xl font-bold text-slate-100">{game.title}</h2>
          <div className="flex gap-2 text-xs font-medium">
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300">
              {game.hasTimer ? "⏱️ مؤقت" : "بدون مؤقت"}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300">
              {game.allowElimination ? "⚔️ إقصاء" : "بدون إقصاء"}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
