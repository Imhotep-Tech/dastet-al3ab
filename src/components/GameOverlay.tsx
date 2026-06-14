import { Users, User } from "lucide-react";

interface GameOverlayProps {
  title: string;
  themeColor: string;
  logo: string;
  author?: string;
}

export default function GameOverlay({ title, themeColor, logo, author }: GameOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white transition-opacity duration-500" style={{ backgroundColor: themeColor }}>
      <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-8 animate-pulse">
        {logo.includes('team') ? <Users className="w-16 h-16" /> : <User className="w-16 h-16" />}
      </div>
      <h1 className="text-5xl font-black tracking-tighter drop-shadow-lg">{title}</h1>
      {author && (
        <p className="mt-4 text-white/90 font-medium text-lg drop-shadow-md bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
          تم الإنشاء بواسطة: <span className="font-bold">{author}</span>
        </p>
      )}
    </div>
  );
}
