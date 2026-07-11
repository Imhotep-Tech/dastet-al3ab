"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerProps {
  defaultSeconds: number;
  themeColor: string;
  onTimeUp?: () => void; // Tell the parent engine when time is out
}

export default function Timer({ defaultSeconds, themeColor: _themeColor, onTimeUp }: TimerProps) {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Re-initialize seconds if defaultSeconds changes (e.g. next round/card)
    setSeconds(defaultSeconds);
    setIsRunning(false);
  }, [defaultSeconds]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && seconds === 0) {
      setIsRunning(false);
      
      // Attempt to play alert sound
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.log("Sound play prevented:", err));
      }
      
      // Callback to engine
      if (onTimeUp) {
        onTimeUp();
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds, onTimeUp]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setSeconds(defaultSeconds);
    setIsRunning(false);
  };

  const isLowTime = seconds <= 10 && seconds > 0;
  const isTimeUp = seconds === 0;

  // Percentage of timer remaining
  const percentage = (seconds / defaultSeconds) * 100;

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-5 p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-md">
      {/* Audio element for timer alert */}
      <audio ref={audioRef} src="/sounds/timer-beep.mp3" preload="auto" />

      {/* Numerical time display */}
      <div className="flex flex-col items-center">
        <span 
          className={`text-6xl font-black font-mono tracking-widest transition-colors duration-300 ${
            isTimeUp 
              ? "text-red-500 animate-bounce" 
              : isLowTime 
                ? "text-red-400" 
                : "text-slate-100"
          }`}
        >
          {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, "0")}
        </span>
        <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">المؤقت</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            isTimeUp 
              ? "bg-red-500" 
              : isLowTime 
                ? "bg-red-400" 
                : "bg-brand-maroon"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3 w-full">
        <button
          onClick={resetTimer}
          className="p-4 bg-slate-800 hover:bg-slate-750 text-slate-350 hover:text-white rounded-2xl active:scale-95 transition-all cursor-pointer border border-slate-750"
          title="إعادة ضبط"
        >
          <RotateCcw className="w-6 h-6" />
        </button>

        <button
          onClick={toggleTimer}
          className="flex-1 py-4.5 bg-brand-maroon hover:bg-brand-maroon-hover text-brand-cream border border-brand-bronze/20 rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          {isRunning ? (
            <>
              <Pause className="w-6 h-6 fill-current" />
              <span>إيقاف مؤقت</span>
            </>
          ) : (
            <>
              <Play className="w-6 h-6 fill-current" />
              <span>ابدأ العداد</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}