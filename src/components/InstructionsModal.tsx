import { X } from "lucide-react";

export default function InstructionsModal({
  isOpen,
  onClose,
  instructions,
  themeColor
}: {
  isOpen: boolean;
  onClose: () => void;
  instructions: string;
  themeColor: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div 
          className="px-6 py-4 flex items-center justify-between text-white"
          style={{ backgroundColor: themeColor }}
        >
          <h2 className="text-xl font-bold">تعليمات اللعبة</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-slate-300 leading-relaxed whitespace-pre-line text-lg">
            {instructions}
          </p>
        </div>
        <div className="p-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-medium transition-all"
          >
            حسناً، فهمت
          </button>
        </div>
      </div>
    </div>
  );
}
