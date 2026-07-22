"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

interface TimerProps {
  defaultSeconds: number;
  themeColor: string;
  onTimeUp?: () => void; // Tell the parent engine when time is out
}

export default function Timer({ defaultSeconds, themeColor: _themeColor, onTimeUp }: TimerProps) {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const stopBeepRef = useRef<(() => void) | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Prime Web Audio API on user interaction so autoplay policy allows sound
  const primeAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    } catch (e) {
      console.error("Audio prime error:", e);
    }
  }, []);

  const stopBeep = useCallback(() => {
    if (stopBeepRef.current) {
      stopBeepRef.current();
      stopBeepRef.current = null;
    }
  }, []);

  const startBeepLoop = useCallback(() => {
    stopBeep();
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      let active = true;

      const playTone = () => {
        if (!active) return;
        try {
          // Re-resume if suspended
          if (ctx.state === "suspended") {
            ctx.resume();
          }

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          // High, clear beep frequency (950Hz)
          osc.frequency.setValueAtTime(950, ctx.currentTime);

          // Loud unmuted volume
          gain.gain.setValueAtTime(1.0, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.35);
        } catch (err) {
          console.error("Beep sound error:", err);
        }
      };

      // Play immediately, then loop every 500ms
      playTone();
      const interval = setInterval(playTone, 500);

      stopBeepRef.current = () => {
        active = false;
        clearInterval(interval);
      };
    } catch (e) {
      console.error("Web Audio API error:", e);
    }
  }, [stopBeep]);

  useEffect(() => {
    // Re-initialize seconds if defaultSeconds changes
    setSeconds(defaultSeconds);
    setIsRunning(false);
    stopBeep();
  }, [defaultSeconds, stopBeep]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && seconds === 0) {
      setIsRunning(false);
      
      // Start continuous looping beep sound
      startBeepLoop();
      
      // Callback to engine
      if (onTimeUp) {
        onTimeUp();
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds, onTimeUp, startBeepLoop]);

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      stopBeep();
    };
  }, [stopBeep]);

  const toggleTimer = () => {
    primeAudio();
    stopBeep();
    if (seconds === 0) {
      setSeconds(defaultSeconds);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    primeAudio();
    stopBeep();
    setSeconds(defaultSeconds);
    setIsRunning(false);
  };

  const isLowTime = seconds <= 10 && seconds > 0;
  const isTimeUp = seconds === 0;

  // Percentage of timer remaining
  const percentage = (seconds / defaultSeconds) * 100;

  return (
    <div className={`w-full max-w-sm mx-auto flex flex-col items-center gap-5 p-5 bg-slate-900 border rounded-3xl shadow-md transition-all duration-300 ${
      isTimeUp ? "border-red-500/80 shadow-lg shadow-red-950/50 ring-2 ring-red-500/30" : "border-slate-800"
    }`}>
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
        {isTimeUp ? (
          <span className="text-red-400 text-sm font-bold uppercase tracking-wider mt-1 flex items-center gap-1.5 animate-pulse">
            <Volume2 className="w-4 h-4 animate-spin" />
            ⏰ انتهى الوقت!
          </span>
        ) : (
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">المؤقت</span>
        )}
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
              <span>{isTimeUp ? "إعادة تشغيل" : "ابدأ العداد"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}