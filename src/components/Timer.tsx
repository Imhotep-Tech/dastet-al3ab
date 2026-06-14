"use client";

import { useState, useEffect } from "react";
import { Play, RotateCcw } from "lucide-react";

interface TimerProps {
  defaultSeconds: number;
  themeColor: string;
  onTimeUp?: () => void; // Tell the parent engine when time is out
}

export default function Timer({ defaultSeconds, themeColor, onTimeUp }: TimerProps) {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const next = prev - 1;
          
          // Haptic Feedback: Short pulses for the last 5 seconds
          if (next <= 5 && next > 0) {
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              navigator.vibrate(200); 
            }
          }
          
          // Time's up triggers!
          if (next === 0) {
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              navigator.vibrate([500, 200, 500]); // Long, aggressive vibration
            }
            if (onTimeUp) onTimeUp(); // Notify the Game Engine
            setIsRunning(false);
          }
          
          return next;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds, onTimeUp]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(defaultSeconds);
  };

  const isLow = seconds <= 10 && seconds > 0;

  return (
    <div className="flex flex-col items-center gap-3 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl w-full max-w-xs mx-auto">
      <div 
        className={`text-6xl font-black font-mono tracking-widest transition-colors duration-300 ${isLow ? 'text-red-500 animate-pulse' : 'text-slate-100'}`}
      >
        {seconds.toString().padStart(2, '0')}
      </div>
      <div className="flex gap-2 w-full">
        <button
          onClick={toggleTimer}
          disabled={seconds === 0}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold transition-all active:scale-95 disabled:opacity-50"
          style={{ backgroundColor: isRunning ? '#ef4444' : themeColor }}
        >
          {isRunning ? "إيقاف العداد" : "ابدأ العداد"}
          {!isRunning && <Play className="w-5 h-5 fill-current" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-3.5 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}